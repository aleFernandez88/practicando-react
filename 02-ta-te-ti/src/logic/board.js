import { WINNER_COMBOS } from "../constants"

export   const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      //revisamos todas las opciones ganadoras en cada jugada.
      if (boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]) {
        return boardToCheck[a] //si hay ganador
      }
    }
    return null //si no hay ganador
  }

  export const checkEndGame = (newBoard) => {
    //revisamos si hay un empate, si todas las posiciones están ocupadas y winner es falso.
   return newBoard.every((square) => square != null)
  }