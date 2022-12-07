import React from "react"
import { nanoid } from 'nanoid'

export default function Question(props) {
  const stylesIfAnswersAreBoolean = {
    justifyContent : props.question.type === 'boolean' ? 'space-around' : 'space-between',
  }

  const mapToClass = (answer) => {
    let cls = ['answer'];
    if (answer !== props.question.selectedAnswer) {
      cls.push(answer === props.question.correctAnswer ? 'correct-answer' : 'incorrect-answer');
    } else {
      cls.push('selected-answer');
    }
    return cls.join(' ');
  }

  const answersElement = props.question.answers.map(answer => 
    <div className={mapToClass(answer)} onClick={() => props.selectAnswer(props.question.id, answer)} dangerouslySetInnerHTML={{ __html:answer}} key={nanoid()}></div>
  )

  return (
    <div className="question-container">
      <div className="question" dangerouslySetInnerHTML={{ __html:props.question.question}}>
      </div>
      <div style={stylesIfAnswersAreBoolean} className="answers">
          {answersElement}
      </div> 
      <hr></hr>
    </div>
  );
}