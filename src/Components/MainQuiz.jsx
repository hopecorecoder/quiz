import React from "react"
import questions from "/src/Questions.js"
import Confetti from 'react-confetti'
export default function MainQuiz(props){
    const [isSelected, setIsSelected] = React.useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
    const [isSubmitted,setIsSubmitted] = React.useState(false)
    const [score, setScore] = React.useState(3)
    const currentQuestion = questions[currentQuestionIndex]

    const answers = [
        { key: 'answer1', text: currentQuestion.answer1 },
        { key: 'answer2', text: currentQuestion.answer2 },
        { key: 'answer3', text: currentQuestion.answer3 },
        { key: 'answer4', text: currentQuestion.answer4 },
      ]
      function submitHandler(event) {
        event.preventDefault();
        setIsSubmitted(true);
        
        if (isSelected ===  currentQuestion.correct){
            console.log("nice")
        }
        else if(isSelected !== currentQuestion.correct){
            setScore(prevScore => prevScore - 1)
            console.log(score)
        }
        
      }
      
        
      
    
    function selectOption(answerKey){
        setIsSelected(answerKey);
    }

    function buttonDesign(key){
        if(isSelected===key && !isSubmitted) {
            return  "selected-input"
        }
        else if(key===currentQuestion.correct  && isSubmitted){
             return "correct-input"
        }
        else if(isSelected===key && key!=currentQuestion.correct && isSubmitted){
            return "wrong-input"
        }else{
            return "normal-input"
        }
    }
    function nextQuestion(){
        setIsSubmitted(false)
        setIsSelected(false)
        setCurrentQuestionIndex(prevIndex => prevIndex +1)

    }
    return(
        <div className="MainQuiz">
                    <div className="extra">
                        <button onClick={props.switchState}>  Quit</button>
                        <p>Time Elapsed: 00:00</p>
                        <p>Questions : {currentQuestionIndex + 1}/{questions.length}</p>
                        {[...Array(3)].map(( _, index) => (
                                <img
                                    key={index}
                                    src={index < score ? "/heart.png" : "/empty-heart.png"}
                                    alt="heart"
                                   
                                />
                        ))}
                    </div>
                    {score === 0 && (
                        <div className="popup-overlay">
                        <div className="popup-window">
                            <h2>Game Over</h2>
                            <p>Your score reached zero. Better luck next time!</p>
                            <button onClick={() => window.location.reload()}>Restart</button>
                        </div>
                        </div>
                    )}

                    <p> {currentQuestion.question}</p>
                    <form>
                        {answers.map(answer => (
                            <input type="button" key={answer.text} 
                            onClick={isSubmitted ? null : () => selectOption(answer.key)}
                            value={answer.text}
                            className={buttonDesign(answer.key)}
                            />
                        ))}
                        <div className="buttons">
                            {isSelected &&<button onClick={isSubmitted ? (event) => {event.preventDefault();} : submitHandler}
                            type="submit">
                            Submit
                            </button> }

                            {isSubmitted && 
                            <button onClick={nextQuestion}
                            type="submit">
                            Next
                            </button> }
                        </div>
                    </form>
                {isSubmitted && currentQuestionIndex === questions.length - 1 && score > 0 && 
                    <div className="popup-overlay">
                    <div className="popup-window">
                        <Confetti />
                        <h2>You Won!!</h2>
                        <p>You finished the Quiz!</p>
                        <button onClick={() => window.location.reload()}>New Game</button>
                    </div>
                    </div>
                }
        </div>
 
    )
}

