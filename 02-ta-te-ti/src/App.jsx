/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'

const TURNS = {
  X: "🔵",
  O: "🟢"
}


const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square${isSelected ? " is-selected" : ""}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    // cuando hagan click en algún cuadrado (div square), va a ejecutar el handleClick que ejecuta a updateBoard que hace un toggle entre X y O.
    <div
      className={className}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //null es que no hay ganador, y false es que hay empate. 
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]) {
        return boardToCheck[a] //si hay ganador
      }
    }
    return null //si no hay ganador
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  const checkEndGame = (newBoard) => {
    //revisamos si hay un empate, si todas las posiciones están ocupadas y winner es falso.
   return newBoard.every((square) => square != null)
  }
  const updateBoard = (index) => {
    if (board[index] || winner) return /* No actualizamos esta posición si ya tiene algo */

    const newBoard = [...board] /*Actualizar el tablero */
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X //cambiar el turno de jugador
    setTurn(newTurn)
    //revisar si hay ganador en cada vuelta.
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }


  return (
    <main className='board'>
      <h1>Ta te ti</h1>
      <button onClick={resetGame} className='resetGame'>Reset Game</button>
      <section className='game'>
        {
          //el _ seria la primera posición ,en este caso seria el square.
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )

          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner == false ?
                    "Empate" :
                    "Gano : " + winner
                }
              </h2>
            </div>
            <header className='win'>
            {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </section>
        )
      }
    </main>
  )
}

export default App
