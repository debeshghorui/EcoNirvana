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
  FaLeaf,
  FaExclamationTriangle
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
  const [error, setError] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [pointsSaved, setPointsSaved] = useState(false);
  
  // Generate quiz questions using Gemini API
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const prompt = `Create 5 multiple-choice quiz questions about e-waste recycling and proper electronics disposal. For each question:
        - Include the question
        - Provide 4 possible answers
        - Mark the correct answer
        - Give a brief explanation why that answer is correct
        
        Focus on one of these randomly selected topics:
        - Environmental impact of e-waste
        - Proper disposal methods for different electronics
        - Recycling benefits and statistics
        - Data security concerns when recycling electronics
        - Valuable components in e-waste
        - E-waste regulations and compliance
        - Innovative e-waste recycling technologies
        - E-waste reduction strategies
        
        Format your response as valid JSON with this structure:
        [
          {
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "The exact text of the correct option",
            "explanation": "Brief explanation of why this answer is correct"
          },
          ...
        ]`;
        
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
        setError("Failed to load quiz questions. Please try again.");
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
  
  // Save points for logged in users
  useEffect(() => {
    const savePoints = async () => {
      if (user && !pointsSaved && score > 0 && quizCompleted) {
        try {
          // Log the attempt to save points
          console.log(`Saving ${earnedPoints} points to user account`);
          
          // Import the addPoints function from firebase.ts
          const { addPoints } = await import('@/lib/firebase');
          
          // Save points to Firebase (this updates Firestore and tracks the activity)
          const success = await addPoints(
            user.id, 
            earnedPoints, 
            'Quiz Completion', 
            'Knowledge'
          );
          
          if (success) {
            console.log(`Successfully saved ${earnedPoints} points to user's Firebase account`);
            setPointsSaved(true);
          } else {
            console.error("Failed to save points to Firebase");
          }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50">
      <div className="sticky top-0 z-10 bg-gray-50 shadow-sm">
        {/* Main Navigation Bar will be rendered here by layout */}
      </div>
      
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              onClick={() => router.back()}
              variant="secondary"
              className="mr-4 p-2.5 rounded-full hover:bg-gray-100"
            >
              <FaArrowLeft />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">E-Waste Quiz</h1>
          </div>
          
          {!loading && !error && questions.length > 0 && !quizCompleted && (
            <div className="bg-green-50 py-1.5 px-3 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-gray-700">Score: <span className="text-green-600 font-bold">{score}</span></p>
            </div>
          )}
        </div>
        
        {!loading && !error && questions.length > 0 && !quizCompleted && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="text-sm font-medium text-gray-500">{Math.round((currentQuestionIndex / questions.length) * 100)}% complete</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-2 bg-green-500 rounded-full" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {loading ? (
          <Card className="shadow-xl border-0 p-10 text-center bg-white rounded-2xl">
            <CardBody>
              <FaSpinner className="animate-spin text-5xl text-green-500 mx-auto mb-6" />
              <p className="text-gray-600 text-lg">Generating quiz questions...</p>
            </CardBody>
          </Card>
        ) : error ? (
          <Card className="shadow-xl border-0 overflow-hidden rounded-2xl bg-white">
            <div className="h-2 bg-red-500"></div>
            <CardBody className="text-center py-10 px-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-3xl text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">{error}</h2>
              <Button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5"
                variant="primary"
              >
                Try Again
              </Button>
            </CardBody>
          </Card>
        ) : questions.length === 0 ? (
          <Card className="shadow-xl border-0 overflow-hidden rounded-2xl bg-white">
            <div className="h-2 bg-yellow-500"></div>
            <CardBody className="text-center py-10 px-6">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-3xl text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">No quiz questions available</h2>
              <Button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5"
                variant="primary"
              >
                Reload Quiz
              </Button>
            </CardBody>
          </Card>
        ) : quizCompleted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-0 overflow-hidden rounded-2xl bg-white">
              <div className="h-8 bg-gradient-to-r from-green-400 to-green-600"></div>
              <CardBody className="text-center py-10 px-6">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                    <FaTrophy className="text-4xl text-yellow-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Quiz Completed!</h2>
                  <p className="text-xl text-gray-600 mb-2">
                    You scored <span className="font-semibold text-green-600">{score} out of {questions.length}</span> questions correctly.
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 mb-8 max-w-sm mx-auto border border-green-100">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <FaLeaf className="text-green-500 text-xl" />
                    <p className="font-medium text-gray-800 text-lg">Points Earned: {earnedPoints}</p>
                  </div>
                  
                  {user ? (
                    pointsSaved ? (
                      <p className="text-sm text-green-600 bg-green-100 py-2 px-3 rounded-md">Points successfully added to your account!</p>
                    ) : (
                      <p className="text-sm text-gray-500">Points will be added to your account</p>
                    )
                  ) : (
                    <div className="mt-3 py-2 px-3 bg-blue-50 rounded-md border border-blue-100">
                      <p className="text-sm text-gray-700">
                        <Link href="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link> to save your points
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center mt-6">
                  <Button
                    onClick={handleRestartQuiz}
                    className="flex items-center gap-2 px-5 py-2.5"
                    variant="secondary"
                  >
                    <FaUndo />
                    Restart Quiz
                  </Button>
                  
                  <Button
                    href="/activity"
                    className="flex items-center gap-2 px-5 py-2.5" 
                    variant="primary"
                  >
                    View Activity
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ) : (
          <>
            {currentQuestion && (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-0 rounded-2xl overflow-hidden bg-white">
                  <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                  <CardBody className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-8 border-b border-gray-100 pb-6">
                      <div className="mt-1 bg-green-100 p-3 rounded-full flex-shrink-0">
                        <FaQuestionCircle className="text-green-600" size={22} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-medium text-gray-800">{currentQuestion.question}</h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {currentQuestion.options.map((option: string, index: number) => {
                        const isSelected = selectedOptions[currentQuestionIndex] === option;
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const showCorrect = selectedOptions[currentQuestionIndex] !== null && isCorrect;
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.1 }}
                          >
                            <button
                              onClick={() => handleOptionSelect(option)}
                              disabled={selectedOptions[currentQuestionIndex] !== null}
                              className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-green-50 border-green-500 text-green-800'
                                    : 'bg-red-50 border-red-500 text-red-800'
                                  : showCorrect
                                    ? 'bg-green-50 border-green-500 text-green-800'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              } ${selectedOptions[currentQuestionIndex] === null ? 'hover:shadow-md' : ''}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center border ${
                                    isSelected
                                      ? isCorrect 
                                        ? 'border-green-500 bg-green-500'
                                        : 'border-red-500 bg-red-500'
                                      : showCorrect
                                        ? 'border-green-500 bg-green-500'
                                        : 'border-gray-300'
                                  }`}>
                                    {isSelected && isCorrect && <FaCheck className="text-white text-xs" />}
                                    {isSelected && !isCorrect && <FaTimes className="text-white text-xs" />}
                                    {!isSelected && showCorrect && <FaCheck className="text-white text-xs" />}
                                  </div>
                                  <span className={`font-medium ${
                                    isSelected || showCorrect 
                                      ? isCorrect
                                        ? 'text-green-800' 
                                        : 'text-red-800'
                                      : 'text-gray-800'
                                  }`}>{option}</span>
                                </div>
                              </div>
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {selectedOptions[currentQuestionIndex] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className={`p-5 rounded-xl mb-8 ${
                          isCorrect ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className={`font-semibold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? 'Correct!' : 'Incorrect'}
                          </h4>
                          <button 
                            onClick={() => setShowExplanation(!showExplanation)}
                            className={`text-sm py-1 px-3 rounded-full ${
                              isCorrect 
                                ? 'bg-green-200 text-green-800 hover:bg-green-300' 
                                : 'bg-red-200 text-red-800 hover:bg-red-300'
                            }`}
                          >
                            {showExplanation ? 'Hide' : 'Show'} explanation
                          </button>
                        </div>
                        
                        {showExplanation && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`text-sm mt-2 leading-relaxed font-medium ${
                              isCorrect ? 'text-green-900' : 'text-red-900'
                            }`}
                          >
                            {currentQuestion.explanation}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                    
                    <div className="flex justify-between pt-2">
                      {currentQuestionIndex > 0 ? (
                        <Button
                          onClick={handlePreviousQuestion}
                          variant="secondary"
                          className="px-5 py-2.5"
                        >
                          Previous
                        </Button>
                      ) : (
                        <div>{/* Empty div to maintain flex spacing */}</div>
                      )}
                      <Button
                        onClick={handleNextQuestion}
                        disabled={selectedOptions[currentQuestionIndex] === null}
                        variant="primary"
                        className="px-5 py-2.5"
                      >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 