import React from "react"
import MainQuiz from "./MainQuiz.jsx"

export default function Body(){
    const [gameState,setGameState]= React.useState(false)
    function switchState(){
        setGameState(prevValue => !prevValue)
    }
    return(
      <main>

        {gameState === false ?
        <article>
            <h1>Welcome To The Quiz</h1>
            <p>To get Started Press The "Start" Button</p>
            <button onClick={switchState}>Start</button>
        </article> 
         : null}
         {gameState === true? 
         <section>
            <MainQuiz gameState={gameState} switchState={switchState}/>
         </section>
        : null}
      </main>
    )
}