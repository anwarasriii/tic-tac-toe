import React, { useState } from 'react'
import './App.css';

const SIZE = 9;
const size = 3;

const App = () => {

  const [board, setBoard] = useState(Array(SIZE).fill(null));
  const [turn, setTurn] = useState('X');
  const [winner, SetWinner] = useState('None');

  const findWinner = (board, turn) => {

    const findDiagonal = [];
    const findOtherDiagonal = [];

    for (let i = 0; i < size; i++) {
      const index = i * size + i;
      findDiagonal.push(board[index] === turn)
    }
    if (findDiagonal.every(Boolean)) {
      return true
    }

    for (let i = 0; i < size; i++) {
      const index = i * size + (size - 1 - i);
      findOtherDiagonal.push(board[index] === turn)
    }
    if (findOtherDiagonal.every(Boolean)) {
      return true
    }

    for (let i = 0; i < size; i++) {
      const findRow = [];
      const findColumn = [];

      for (let j = 0; j < size; j++) {
        const indexRow = i * size + j;
        findRow.push(board[indexRow] === turn);

        const indexColumn = j * size + i;
        findColumn.push(board[indexColumn] === turn);

      }
      if (findColumn.every(Boolean) || findRow.every(Boolean)) {
        return true;
      }
    }

    return false;
  }

  const handleClick = (index) => {
    if (board[index] || winner !== 'None') return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard)

    const isWinner = findWinner(newBoard, turn);

    if (isWinner) {
      SetWinner(turn)
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  }

  return (
    <div className='container'>
      <h2>Winner: {winner}</h2>
      <div className='board'>
        {
          board.map((value, index) => (
            <button key={index} onClick={() => handleClick(index)}>
              {value}
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default App