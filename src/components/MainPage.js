import React, { useState, useEffect } from 'react';
import Question from '../components/Question'
import yellowBlob from '../resources/yellowBlob.png'
import blueBlob from '../resources/blueBlob.png'
import curlyLines from '../resources/curlyLines.png'
import { nanoid } from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import LoadingSpinner from '../components/LoadingSpinner';
import { API } from '../constants';
import { HIGHSCORE_LOCALSTORAGE_KEY } from '../constants';

export default function MainPage(props) {

  const [questions, setQuestions] = useState([])

  const [questionsData, setQuestionsData] = useState([])

  const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0)

  const [hasChecked, setHasChecked] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem("highScore", props.highScore)
  }, [])

  useEffect(() => {
    if (!hasChecked) {
      fetchQuestions();
    }
  }, [hasChecked])

  useEffect(() => {
    setQuestions(
      questionsData.map(questions => {
        const answers = [questions.correct_answer, ...questions.incorrect_answers]
        shuffleArray(answers)
        return (
            { 
              question: questions.question.indexOf("soccer") !== -1 ? questions.question.replace(/soccer/g, "football") : questions.question.replace(/Soccer/g, "Football"),
              correctAnswer: questions.correct_answer,
              incorrectAnswers: questions.incorrect_answers,
              selectedAnswer: null,
              isCorrectlyAnswered: false,
              answers: answers, 
              difficulty: questions.difficulty,
              type: questions.type,
              id: nanoid()
            }
        )
      })
    )
  } , [questionsData])

  function refreshQuestions() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchQuestions();
  }

  const fetchQuestions = () => {
    setIsLoading(true);
    fetch(API+props.selectedDifficulty)
    .then(res => res.json())
    .then(questionsData => {
        setIsLoading(false);
        setHasChecked(false);
        setQuestionsData(questionsData.results)
    })
  }

  function selectAnswer(id, answer) {
    if(!hasChecked){
      setQuestions(prevQuestions => 
        prevQuestions.map(question => question.id === id ? 
          {...question, selectedAnswer: answer} 
          : 
          question
        )
      )
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function checkAnswers() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setHasChecked(prevHasCheckedValue => !prevHasCheckedValue)
  }

  useEffect(() => {
    if (hasChecked) {
      setNumOfCorrectAnswers(questions.reduce((current, question) => question.selectedAnswer === question.correctAnswer ? current + 1 : current, 0));
    }
  }, [hasChecked, questions]);

  useEffect(() => {
    if (numOfCorrectAnswers >= JSON.parse(localStorage.getItem(HIGHSCORE_LOCALSTORAGE_KEY))) {
      localStorage.setItem(HIGHSCORE_LOCALSTORAGE_KEY, numOfCorrectAnswers)
      props.setHighScore(numOfCorrectAnswers);
    }
  }, [numOfCorrectAnswers]);

  var questionsElement = questions.map(question => <Question question = {question} selectAnswer={selectAnswer} key={nanoid()}/>);

  return (
    !isLoading ? 
    <div className="mainPage">
      <img id="yellow-blob-main" src={yellowBlob} alt='Yellow blob, decoration'></img>
      <div className='questions-container'>
        <div className={`questions ${hasChecked ? 'show-answers' : ''}`}>
          {questionsElement}
        </div>
      </div>
      <div className='button-container'>
        <div className='buttons'>
          <button id='refresh-questions' className='btn' onClick={refreshQuestions}><FontAwesomeIcon icon={faRefresh} size="lg"/></button>
          <button id='check-answers' className='btn' onClick={checkAnswers}>{hasChecked ? 'Play again' : 'Check Answers'}</button>
          <button id='restart-quiz' className='btn' onClick={props.switchToLandingPage}><FontAwesomeIcon icon={faPersonRunning} size="lg"/></button>
        </div>
      </div>
      <div className="result">{hasChecked? `You scored ${numOfCorrectAnswers}/10 correct answers` : ''}</div>
      <div className="highscore">{props.highScore > 0 ? `Highscore: ${props.highScore}` : ''}</div>
      <img id="blue-blob-main" src={blueBlob} alt='Blue blob, decoration'></img>
      <img className="curly-lines" src={curlyLines} alt='Curly lines, decoration'></img>
    </div>
    :
    <LoadingSpinner />
  );
}

