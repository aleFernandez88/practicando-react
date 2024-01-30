/* eslint-disable react/prop-types */
import { Square } from "./Square"

export function WinnerModal({winner,resetGame}) {
    if (winner == null) return null

const winnerText = winner == false ? "Empate." : "Ganador."

    return (
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>
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