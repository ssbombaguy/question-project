import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App =() =>{
  const [count, setCount] = useState(0)
  const [currentquestion, setCurrnetquestion] = useState([])
  const [currentAnswers, setCurrentAnswers] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
    const [userAnswers, setUserAnswers] = useState([])
    const [score, setScore] = useState(0)
  useEffect(()=>{
      axios.get('https://opentdb.com/api.php?amount=10')
          .then(function (response) {

              setCurrnetquestion(response.results.question);
              setCurrentAnswers(response.results.incorrect_answers)
              setCurrentAnswers(currentAnswers.push(response.results.correct_answer))
              setCorrectAnswers(response.results.correct_answer)

          })
          .catch(function (error) {

              console.log(error);
          })
          .finally(function () {

          });
  }, [count])
    const nextHandler =() =>{
      setCount(count + 1)
    }
    const userAnswerHandler = (iteam) =>{
        setUserAnswers(userAnswers.push(iteam))
    }
    const finishHandler =() =>{
        userAnswers.map((value,answer) =>{
            if (correctAnswers.includes(answer)){
                setScore(score+1)
            } else {
                setScore(score+1)
            }
        })
    }


  return (
    <div className="container">
      <h1>Quiz</h1>
        {currentquestion.results && currentquestion.results.question && currentquestion.results.correct_answer && currentquestion.results.incorrect_answers ?
            <div>
                <ul>
                    {currentquestion.map((index, iteam) =>
                        <li key={index}>
                            <h2>{iteam}</h2>
                            {currentAnswers.map((index, iteam) => <li key={index}>
                                <button value={iteam} onClick={userAnswerHandler}>{iteam}</button>
                            </li>)}
                        </li>
                    )}
                </ul>
            </div> : null}
        <div className="buttons">
            <button onClick={finishHandler}>Finish</button>
            <button onClick={nextHandler}>Next</button>
        </div>

    </div>
  )
}

export default App
