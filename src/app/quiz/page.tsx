"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaQuestionCircle, 
  FaCheck, 
  FaTimes,
  FaSpinner,
  FaUndo,
  FaTrophy,
  FaLeaf
} from 'react-icons/fa';
import Link from 'next/link';
import { generateResponse } from '@/lib/gemini';
import { useAuth } from '@/context/AuthContext';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Define the Quiz Question type
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function QuizPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [pointsSaved, setPointsSaved] = useState(false);
  
  // Generate quiz questions using Gemini API
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      setLoading(true);
      try {
        const prompt = `Create 5 multiple-choice quiz questions about e-waste recycling and proper electronics disposal. For each question:
        - Include the question
        - Provide 4 possible answers
        - Mark the correct answer
        - Give a brief explanation why that answer is correct
        
        Format your response as valid JSON with this structure:
        [
          {
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "The exact text of the correct option",
            "explanation": "Brief explanation of why this answer is correct"
          },
          ...
        ]
        
        Make sure the questions cover topics like:
        - Environmental impact of e-waste
        - Proper disposal methods
        - Recycling benefits
        - Data security concerns
        - Components of e-waste`;
        
        const response = await generateResponse(prompt);
        
        // Parse the JSON response
        let parsedQuestions;
        try {
          const jsonString = response.match(/\[\s*\{[\s\S]*\}\s*\]/)?.[0] || response;
          parsedQuestions = JSON.parse(jsonString);
        } catch (error) {
          console.error("Failed to parse JSON response:", error);
          // Fallback to sample questions
          parsedQuestions = getSampleQuestions();
        }
        
        // Add IDs to questions
        const questionsWithIds = parsedQuestions.map((q: Omit<QuizQuestion, 'id'>, index: number) => ({
          ...q,
          id: index + 1
        }));
        
        setQuestions(questionsWithIds);
        // Initialize selectedOptions array with nulls for each question
        setSelectedOptions(new Array(questionsWithIds.length).fill(null));
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        // Fallback to sample questions if API fails
        const sampleQuestions = getSampleQuestions();
        setQuestions(sampleQuestions);
        // Initialize selectedOptions array with nulls for each question
        setSelectedOptions(new Array(sampleQuestions.length).fill(null));
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizQuestions();
  }, []);

  // Fallback sample questions if API fails
  const getSampleQuestions = (): QuizQuestion[] => [
    {
      id: 1,
      question: "What makes e-waste particularly harmful to the environment?",
      options: [
        "It takes up more space in landfills than other waste",
        "It contains toxic materials like lead, mercury, and cadmium",
        "It produces more methane when decomposing",
        "It's harder to collect than regular waste"
      ],
      correctAnswer: "It contains toxic materials like lead, mercury, and cadmium",
      explanation: "Electronic waste contains various toxic materials including lead, mercury, cadmium, and flame retardants that can leach into soil and groundwater when improperly disposed of in landfills."
    },
    {
      id: 2,
      question: "What percentage of e-waste materials can typically be recycled or recovered?",
      options: [
        "Around 20-30%",
        "Around 40-50%",
        "Around 70-80%",
        "Over 90%"
      ],
      correctAnswer: "Over 90%",
      explanation: "More than 90% of the materials in electronic devices can be recovered and reused, including valuable metals like gold, silver, copper, and rare earth elements."
    },
    {
      id: 3,
      question: "What should you do with your data before recycling a computer or smartphone?",
      options: [
        "Simply delete all files",
        "Perform a factory reset",
        "Use secure data wiping software or services",
        "Remove the hard drive or storage and keep it"
      ],
      correctAnswer: "Use secure data wiping software or services",
      explanation: "Simply deleting files or even performing a factory reset doesn't completely remove data. Using secure data wiping software that overwrites the data multiple times ensures your personal information cannot be recovered."
    },
    {
      id: 4,
      question: "Which of these items is generally NOT considered e-waste?",
      options: [
        "LED light bulbs",
        "Wooden furniture with embedded LED lights",
        "Electric toothbrushes",
        "Printer ink cartridges"
      ],
      correctAnswer: "Wooden furniture with embedded LED lights",
      explanation: "While furniture with electronic components does contain some electronic elements, it's primarily classified as furniture waste. The electronic components would ideally be removed and recycled separately."
    },
    {
      id: 5,
      question: "How much e-waste is globally generated each year?",
      options: [
        "Less than 10 million tons",
        "Around 20-30 million tons",
        "Around 50-60 million tons",
        "Over 100 million tons"
      ],
      correctAnswer: "Around 50-60 million tons",
      explanation: "According to recent global e-waste monitors, approximately 50-60 million metric tons of electronic waste is generated worldwide each year, making it one of the fastest-growing waste streams."
    }
  ];
  
  const handleOptionSelect = (option: string) => {
    if (selectedOptions[currentQuestionIndex] || loading) return;
    
    // Update the selected option for the current question
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
    
    // Update current selection state
    setSelectedOption(option);
    
    const currentQuestion = questions[currentQuestionIndex];
    const correct = option === currentQuestion.correctAnswer;
    
    setIsCorrect(correct);
    if (correct) {
      setScore((prevScore: number) => prevScore + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
      
      // Set the selected option to what was previously selected for the next question (if any)
      const nextIndex = currentQuestionIndex + 1;
      setSelectedOption(selectedOptions[nextIndex]);
      
      // Only reset these states if there's no selection for the next question
      if (!selectedOptions[nextIndex]) {
        setIsCorrect(null);
        setShowExplanation(false);
      }
    } else {
      setQuizCompleted(true);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      
      // Set the selected option to what was previously selected for the previous question
      const prevSelectedOption = selectedOptions[prevIndex];
      setSelectedOption(prevSelectedOption);
      
      // Update the isCorrect state based on the previous selection
      if (prevSelectedOption) {
        const correct = prevSelectedOption === questions[prevIndex].correctAnswer;
        setIsCorrect(correct);
      }
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setSelectedOptions(new Array(questions.length).fill(null));
    setIsCorrect(null);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
    setPointsSaved(false);
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Calculate points (10 points per correct answer)
  const earnedPoints = score * 10;
  
  // Save points for logged in users - moved outside conditional render
  useEffect(() => {
    const savePoints = async () => {
      if (user && !pointsSaved && score > 0 && quizCompleted) {
        try {
          // Simulate saving points to user account
          console.log(`Saving ${earnedPoints} points to user account`);
          setPointsSaved(true);
          // In a real app, you would call an API to save points
          // await saveUserPoints(user.id, earnedPoints);
        } catch (error) {
          console.error("Error saving points:", error);
        }
      }
    };
    
    if (quizCompleted) {
      savePoints();
    }
  }, [quizCompleted, user, score, earnedPoints, pointsSaved]);
  
  return (
    <>
      <PageHeader
        title="E-Waste Recycling Quiz"
        description="Test your knowledge about electronic waste recycling and sustainability practices"
        backgroundImage="/green-globe.jpg"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {loading ? (
          <Card className="p-12 text-center">
            <CardBody>
              <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
              <p className="text-gray-600">Generating quiz questions...</p>
            </CardBody>
          </Card>
        ) : quizCompleted ? (
          <Card>
            <CardBody className="text-center py-8">
              <FaTrophy className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
              <p className="text-xl text-gray-600 mb-4">You scored {score} out of {questions.length} questions correctly.</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaLeaf className="text-green-500" />
                  <p className="font-medium text-gray-800">Points Earned: {earnedPoints}</p>
                </div>
                
                {user ? (
                  pointsSaved ? (
                    <p className="text-sm text-green-600">Points successfully added to your account!</p>
                  ) : (
                    <p className="text-sm text-gray-500">Points will be added to your account</p>
                  )
                ) : (
                  <p className="text-sm text-gray-500">
                    <Link href="/login" className="text-green-600 hover:underline">Sign in</Link> to save your points
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <Button
                  onClick={handleRestartQuiz}
                  className="flex items-center gap-2"
                  variant="secondary"
                >
                  <FaUndo />
                  Restart Quiz
                </Button>
                
                <Button
                  href="/activity"
                  className="flex items-center gap-2" 
                  variant="primary"
                >
                  View Activity
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Button
                  onClick={() => router.back()}
                  variant="secondary"
                  className="mr-4"
                >
                  <FaArrowLeft className="mr-2" /> Back
                </Button>
                <h2 className="text-xl font-medium text-gray-900">Question {currentQuestionIndex + 1} of {questions.length}</h2>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Score: {score}/{questions.length}</p>
              </div>
            </div>
            
            {currentQuestion && (
              <Card>
                <CardBody>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="mt-1 text-green-600 flex-shrink-0">
                      <FaQuestionCircle size={24} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">{currentQuestion.question}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => handleOptionSelect(option)}
                          disabled={selectedOptions[currentQuestionIndex] !== null}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            selectedOptions[currentQuestionIndex] === option
                              ? option === currentQuestion.correctAnswer
                                ? 'bg-green-50 border-green-500 text-green-700'
                                : 'bg-red-50 border-red-500 text-red-700'
                              : selectedOptions[currentQuestionIndex] !== null && option === currentQuestion.correctAnswer
                                ? 'bg-green-50 border-green-500 text-green-700'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {selectedOptions[currentQuestionIndex] === option && (
                              option === currentQuestion.correctAnswer ? (
                                <FaCheck className="text-green-600" />
                              ) : (
                                <FaTimes className="text-red-600" />
                              )
                            )}
                            {selectedOptions[currentQuestionIndex] !== null && 
                             selectedOptions[currentQuestionIndex] !== option && 
                             option === currentQuestion.correctAnswer && (
                              <FaCheck className="text-green-600" />
                            )}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  
                  {selectedOptions[currentQuestionIndex] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-lg mb-6 ${
                        isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </h4>
                        <button 
                          onClick={() => setShowExplanation(!showExplanation)}
                          className="text-sm underline"
                        >
                          {showExplanation ? 'Hide' : 'Show'} explanation
                        </button>
                      </div>
                      
                      {showExplanation && (
                        <p className="text-sm">{currentQuestion.explanation}</p>
                      )}
                    </motion.div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      variant="secondary"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedOptions[currentQuestionIndex] === null}
                      variant="primary"
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}
          </>
        )}
      </div>
    </>
  );
} 