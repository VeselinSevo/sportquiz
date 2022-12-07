import React, { useState, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage'
import './css/index.css'
import { LANDING_PAGE, MAIN_PAGE, THEME_DARK, THEME_LIGHT } from './constants';


export default function App() {

  const darkModeToggleBtnRef = useRef(null);

  const [page, setPage] = useState(LANDING_PAGE)

  const[selectedDifficulty, setSelectedDifficulty] = useState('')

  const[mode, setMode] = useState(THEME_LIGHT)

  const[highScore, setHighScore] = useState(localStorage.getItem('highScore'))

  function handleSetHighScore(highScore) {
    setHighScore(highScore)
  }
  
  function switchToMainPage() {
    setPage(MAIN_PAGE)
  }

  function switchToLandingPage() {
    setPage(LANDING_PAGE)
  }

  function setDifficulty(difficulty) {
    setSelectedDifficulty(difficulty)
    setPage(MAIN_PAGE)
  }

  function switchMode() {
    if (mode === THEME_DARK) {
      setMode(THEME_LIGHT);
      return;
    }

    setMode(THEME_DARK);
  }

  useEffect(() => {
    darkModeToggleBtnRef.current.checked = mode === THEME_DARK;
  }, [mode]);


  useEffect(() => {
    const body = document.querySelector('body')
    if (!body) {
      return;
    }
    if (mode === THEME_LIGHT) {
      body.classList.remove('dark')
      body.classList.add('light')
    } else {
      body.classList.remove('light')
      body.classList.add('dark')
    }
  }, [mode]);

  return (
    <div id="app-container">
    <div className="darkmode-toggle-container">
      <input ref={darkModeToggleBtnRef} type="checkbox" id="darkmode-toggle"></input>
      <label className="darkmode-label" onClick={switchMode} htmlFor="darkomode-toggle">
        <svg className="sun" enable-background="new 0 0 496 496" version="1.1" viewBox="0 0 496 496" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">  
          <rect transform="matrix(.3827 .9239 -.9239 .3827 168.62 -118.51)" x="152.99" y="58.921" width="40.001" height="16"/>
          <rect transform="matrix(.9239 .3827 -.3827 .9239 71.29 -12.435)" x="46.9" y="164.98" width="40.001" height="16"/>
          <rect transform="matrix(.9239 -.3827 .3827 .9239 -118.53 50.212)" x="46.947" y="315.05" width="40.001" height="16"/>
          <rect transform="matrix(-.9238 -.3828 .3828 -.9238 168.49 891.75)" x="164.97" y="409.11" width="16" height="39.999"/>
          <rect transform="matrix(-.3827 -.9239 .9239 -.3827 50.276 891.67)" x="303.03" y="421.04" width="40.001" height="16"/>
          <rect transform="matrix(-.9239 -.3827 .3827 -.9239 701.9 785.66)" x="409.09" y="315.02" width="40.001" height="16"/>
          <rect transform="matrix(-.9239 .3827 -.3827 -.9239 891.66 168.66)" x="409.05" y="165.01" width="40.001" height="16"/>
          <rect transform="matrix(.9238 .3828 -.3828 .9238 50.212 -118.55)" x="315" y="46.895" width="16" height="39.999"/>
          <path d="m248 88c-88.224 0-160 71.776-160 160s71.776 160 160 160 160-71.776 160-160-71.776-160-160-160zm0 304c-79.4 0-144-64.6-144-144s64.6-144 144-144 144 64.6 144 144-64.6 144-144 144z"/>
          <rect x="240" width="16" height="72"/>
          <rect transform="matrix(.7071 .7071 -.7071 .7071 98.096 -40.633)" x="62.097" y="90.096" width="71.999" height="16"/>
          <rect y="240" width="72" height="16"/>
          <rect transform="matrix(-.7071 -.7071 .7071 -.7071 -113.92 748.64)" x="90.091" y="361.92" width="16" height="71.999"/>
          <rect x="240" y="424" width="16" height="72"/>
          <rect transform="matrix(-.7071 -.7071 .7071 -.7071 397.86 960.63)" x="361.88" y="389.92" width="71.999" height="16"/>
          <rect x="424" y="240" width="72" height="16"/>
          <rect transform="matrix(.7071 .7071 -.7071 .7071 185.91 -252.64)" x="389.91" y="62.091" width="16" height="71.999"/>
        </svg>
        <svg className="moon" enable-background="new 0 0 49.739 49.739" version="1.1" viewBox="0 0 49.739 49.739" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
          <path d="m25.068 48.889c-9.173 0-18.017-5.06-22.396-13.804-6.045-12.077-1.508-26.618 10.331-33.106l2.061-1.129-0.615 2.268c-1.479 5.459-0.899 11.25 1.633 16.306 2.75 5.493 7.476 9.587 13.305 11.526 5.831 1.939 12.065 1.492 17.559-1.258 0.25-0.125 0.492-0.258 0.734-0.391l2.061-1.13-0.585 2.252c-1.863 6.873-6.577 12.639-12.933 15.822-3.584 1.794-7.398 2.643-11.155 2.644zm-13.066-43.953c-9.413 6.428-12.756 18.837-7.54 29.253 5.678 11.34 19.522 15.945 30.864 10.268 5.154-2.582 9.136-7.012 11.181-12.357-5.632 2.427-11.882 2.702-17.752 0.748-6.337-2.108-11.473-6.557-14.463-12.528-2.393-4.779-3.182-10.16-2.29-15.384z"/>
        </svg>
      </label>
    </div>
      
    {page === LANDING_PAGE ?
    <LandingPage highScore={highScore} setDifficulty={setDifficulty} switchToMainPage={switchToMainPage} mode={mode}/>
    :
    <MainPage highScore={highScore} setHighScore={handleSetHighScore} selectedDifficulty={selectedDifficulty} switchToLandingPage={switchToLandingPage} mode={mode}/>
    }
    </div>
  );
  
}
