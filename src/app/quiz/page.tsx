"use client";

import { useState, useEffect } from 'react';
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
      setScore(prevScore => prevScore + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      
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
          // In a real app, you would make an API call to save points
          // Example: await saveUserPoints(user.id, earnedPoints);
          setPointsSaved(true);
        } catch (error) {
          console.error("Error saving points:", error);
        }
      }
    };
    
    savePoints();
  }, [user, pointsSaved, earnedPoints, score, quizCompleted]);
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <FaSpinner className="h-12 w-12 text-green-500 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Preparing Your Quiz</h2>
              <p className="text-gray-600">We're generating thought-provoking questions about e-waste recycling...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Quiz completion screen
  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTrophy className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
              
              <div className="mb-6">
                <p className="text-xl text-gray-700 mb-2">Your Score</p>
                <div className="text-4xl font-bold text-green-600">{score} / {questions.length}</div>
                
                <div className="mt-4">
                  {score === questions.length ? (
                    <p className="text-green-600 font-medium">Perfect score! You're an e-waste recycling expert!</p>
                  ) : score >= Math.floor(questions.length * 0.7) ? (
                    <p className="text-green-600 font-medium">Great job! You know your e-waste facts.</p>
                  ) : (
                    <p className="text-amber-600 font-medium">Good effort! There's still more to learn about e-waste.</p>
                  )}
                </div>
                
                {/* Points earned section */}
                {score > 0 && (
                  <div className="mt-6 bg-green-50 p-4 rounded-lg">
                    {user ? (
                      <div>
                        <p className="text-gray-800 font-medium">You earned</p>
                        <p className="text-2xl font-bold text-green-600">{earnedPoints} points</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {pointsSaved ? "Points added to your account!" : "Saving points to your account..."}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-800 font-medium">You earned {earnedPoints} points</p>
                        <p className="text-sm text-gray-600 mt-1 mb-3">Sign up or log in to save your points!</p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <Link href="/signup">
                            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                              Sign Up
                            </button>
                          </Link>
                          <Link href="/login">
                            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                              Log In
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FaUndo className="mr-2 h-4 w-4" />
                  Take Quiz Again
                </button>
                
                {user ? (
                  <Link href="/activity">
                    <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <FaLeaf className="mr-2 h-4 w-4" />
                      View My Points
                    </button>
                  </Link>
                ) : (
                  <Link href="/blog">
                    <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <FaLeaf className="mr-2 h-4 w-4" />
                      Explore our blogs
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Quiz question screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        {currentQuestion && (
          <>
            <div className="max-w-3xl mx-auto mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">E-Waste Recycling Quiz</h1>
                <div className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <motion.div 
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <FaQuestionCircle className="text-green-600 w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{currentQuestion.question}</h2>
                </div>
                
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      disabled={selectedOptions[currentQuestionIndex] !== null}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedOptions[currentQuestionIndex] === option
                          ? option === currentQuestion.correctAnswer
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                      } ${selectedOptions[currentQuestionIndex] && option !== selectedOptions[currentQuestionIndex] && option !== currentQuestion.correctAnswer ? 'opacity-60' : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800">{option}</span>
                        {selectedOptions[currentQuestionIndex] === option && (
                          option === currentQuestion.correctAnswer ? (
                            <FaCheck className="text-green-600 h-5 w-5" />
                          ) : (
                            <FaTimes className="text-red-600 h-5 w-5" />
                          )
                        )}
                        {selectedOptions[currentQuestionIndex] && option === currentQuestion.correctAnswer && selectedOptions[currentQuestionIndex] !== option && (
                          <FaCheck className="text-green-600 h-5 w-5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {selectedOptions[currentQuestionIndex] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                  >
                    <div className="flex items-start">
                      <div className={`mr-3 mt-1 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {isCorrect ? <FaCheck className="h-5 w-5" /> : <FaTimes className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                          {isCorrect ? 'Correct!' : 'Incorrect!'}
                        </p>
                        <button
                          onClick={() => setShowExplanation(!showExplanation)}
                          className="text-sm mt-1 underline text-gray-600 hover:text-gray-800"
                        >
                          {showExplanation ? 'Hide explanation' : 'Show explanation'}
                        </button>
                        
                        {showExplanation && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-gray-600"
                          >
                            {currentQuestion.explanation}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex justify-between">
                  {currentQuestionIndex > 0 && (
                    <button
                      onClick={handlePreviousQuestion}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Previous Question
                    </button>
                  )}
                  <div className={currentQuestionIndex > 0 ? '' : 'ml-auto'}>
                    <button
                      onClick={handleNextQuestion}
                      disabled={!selectedOptions[currentQuestionIndex]}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${!selectedOptions[currentQuestionIndex] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
} 