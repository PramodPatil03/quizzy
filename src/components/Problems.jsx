import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import { data } from '../assets/data.js'
import Countdown from './Countdown.jsx'

const Problems = () => {
    const [start, setStart] = useState(false)
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[0])
    const [lock, setLock] = useState(false)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)
    const [performance, setPerformance] = useState('')
    const [answered, setAnswered] = useState(0)

    // ? Creating references to the options (To add correct and wrong answers)
    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);
    let option_arr = [option1, option2, option3, option4];
    function shuffleArray(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    useEffect(() => {
        shuffleArray(data)
        let avg = parseFloat(score / data.length)|| 0
        // ?If the last answer is done then the result page will be set as true and calculate the performance
        // console.log(avg)
        if (avg < 0.20) {
            setPerformance("Poor")
        }
        else if(avg>=0.20 && avg<0.33){
            setPerformance('Low')
        }
        else if (avg < 0.5 && avg >= 0.33) {
            setPerformance("Below average")
        }
        else if (avg >= 0.5 && avg < 0.7) {
            setPerformance("Awesome")
        }
        else if(avg >=0.7 && avg<0.9){
            setPerformance("Super")
        }
        else {
            setPerformance("Excellent")    
        }
    })

    const setResultVal = (val) => {
        setResult(val)
    }

    const checkAns = (e, ans) => {
        if (lock === false) {
            setAnswered(prev => prev + 1)
            if (document.getElementById('warning')) {
                document.getElementById('warning').style.display = 'none'
            }
            if (ans === question.ans) {
                e.target.classList.add('correct')
                //? If the answer is correct we lock the option
                setLock(true)
                // ? Increase the score by one for every correct answer
                setScore(prev => prev + 1)
                
            } else {
                e.target.classList.add('wrong')
                //? Even though the answer is incorrect the lock will become true so that the user cannot change the options
                setLock(true);
                option_arr[question.ans - 1].current.classList.add('correct');
            }
        }

    }


    const nextOp = () => {

        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true)
                return 0;
            }
            // ? Increment the index and update the question on every next button click
            setIndex(1+index)
            setQuestion(data[index + 1])
            setLock(false)
    
            // ?  After every next button click the previous question selections will be made null
            option_arr.map((option) => {
                option.current.classList.remove("correct")
                option.current.classList.remove("wrong")
                return null;
            })
        } else {
            document.getElementById('warning').style.display = 'block'
        }

    }

    const reset = () => {
        setIndex(0)
        setQuestion(data[0])
        setLock(false)
        setScore(0)
        setResult(false)
        setStart(false)
        setAnswered(0)
        setPerformance('')
    }

    let pageContent;
    if (start && result) {
        pageContent =
            <>
                <h2>The score is {score} out of {data.length}</h2>
                <p>Answered: {answered}</p>
                <p>Unanswered: {data.length - answered}</p>
                <p>Correct : {score}</p>
                <p>Incorrect: {answered - score}</p>
                <p>Your performance is {performance}</p>
                <button className='btn' onClick={reset}>Reset</button>
            </>
    }
    else if (start && !result) {
        pageContent = <>
            <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
            </ul>
            <p id="warning">Please select an option</p>
            <button className='btn' onClick={nextOp}>Next</button>
            <div className='index'><p>Question {index + 1} of {data.length}</p><Countdown setResultVal={setResultVal} /></div>
        </>
    }
    else {
        pageContent = <>
            <h2>You have 10 minutes to complete the Quiz</h2>
            <h3>Instructions</h3>
                <ol>
                    <li>Only one answer can be selected.</li>
                    <li>After selecting answer please click on Next button.</li>
                    <li>Once selected the answer cannot be modified</li>
                </ol>
            <button className="btn" onClick={() => setStart(true)}>Start</button>
        </>
    }
    return (

        <div className='container'>
            <h1>Quizzy</h1>
            <hr />
            {pageContent}
        </div>
    )
}

export default Problems
