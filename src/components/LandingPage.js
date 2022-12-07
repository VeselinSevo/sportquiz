import React from 'react';
import yellowLandingBlob from '../resources/yellowLandingBlob.png'
import blueLandingBlob from '../resources/blueLandingBlob.png'
import curlyLines from '../resources/curlyLines.png'

export default function LandingPage(props) {
  return (
    <div className="landingPage">
      <img id="yellow-blob-landing" src={yellowLandingBlob} alt='Yellow blob, decoration'></img>
      <section className='greeting-section'>
        <div className='greeting-section__title'>Sportquiz</div>
        <div className='greeting-section__description'>Sport based quiz for fun and enjoyment</div>
        <button className='greeting-section__start-quiz btn' onClick={() => props.setDifficulty('')}>Start quiz</button>
      </section>

      <section className='select-difficulty-section'>
        <h2 className='select-difficulty-section__title'>Choose difficulty</h2>
        <div className='select-difficulty-section__button-container'>
          <button className='select-difficulty-easy-btn btn' onClick={() => props.setDifficulty('easy')}>Easy</button>
          <button className='select-difficulty-medium-btn btn' onClick={() => props.setDifficulty('medium')}>Medium</button>
          <button className='select-difficulty-hard-btn btn' onClick={() => props.setDifficulty('hard')}>Hard</button>
        </div>
      </section>
      <div className="highscore">{props.highScore > 0 ? `Highscore: ${props.highScore}` : ''}</div>
      <img id="blue-blob-landing" src={blueLandingBlob} alt='Blue blob, decoration'></img>
      <img className="curly-lines" src={curlyLines} alt='Curly lines, decoration'></img>
    </div>
  );
}