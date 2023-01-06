import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

function App() {
  type ArrayGame = [number, number, number, number, number, number, number, number, number]
  type Turn = 0 | 1 | 2
  type WinValues = {values: [number, number, number], orientation: string}

  const [arrayGame, setArrayGame] = useState<ArrayGame>([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState<Turn>(1)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const winnerPositions: WinValues[] = [
    {values: [0, 3, 6], orientation: 'vertical'},
    {values: [1, 4, 7], orientation: 'vertical'},
    {values: [2, 5, 8], orientation: 'vertical'},
    {values: [0, 1, 2], orientation: 'horizontal'},
    {values: [3, 4, 5], orientation: 'horizontal'},
    {values: [6, 7, 8], orientation: 'horizontal'},
    {values: [0, 4, 8], orientation: 'diagonal-1'},
    {values: [2, 4, 6], orientation: 'diagonal-2'},
  ]
  const [winValues, setWinValues] = useState<WinValues | null>(null)

  const [winsX, setWinsX] = useState<number>(0)
  const [winsY, setWinsY] = useState<number>(0)
  const [gaveOld, setGaveOld] = useState<number>(0)

  const fillElement = (index: number) => {
    if(gameOver) return

    if(!arrayGame[index]){
      arrayGame[index] = turn
      setArrayGame(arrayGame)

      if(checkWinner()){
        setGameOver(true)
        turn === 1 ? setWinsX(prev => prev + 1) : setWinsY(prev => prev + 1)
        return
      }

      if(checkGaveOld()){
        setGameOver(true)
        setGaveOld(prev => prev + 1)
      }

      setTurn(prev => prev === 1 ? 2 : 1)

    }else {
      return
    }
  }

  const checkWinner = () => {
    for(let objWinner of winnerPositions) {
      const { values } = objWinner
      
      const firstPostion = values[0]
      const secondPosition = values[1]
      const thirdPostion = values[2]

      const operatorCheckWinner = (arrayGame[firstPostion] === arrayGame[secondPosition]) &&
      (arrayGame[secondPosition] === arrayGame[thirdPostion]) &&
      (arrayGame[firstPostion] !== 0)
      
      if(operatorCheckWinner){
        setWinValues(objWinner)
        return true
      }
    }
  }

  const checkGaveOld = () => {
    return arrayGame.includes(0) ? false : true
  }

  const restartGame = () => {
    setArrayGame([0, 0, 0, 0, 0, 0, 0, 0, 0])
    setTurn(prev => prev === 1 ? 2 : 1)
    setWinValues(null)
    setGameOver(false)
  }

  return (
    <div className="App">
      <div className="head">
        <h1>Tic Tac Toe</h1>

        <h3>Turn <span>{gameOver ? '-' : turn === 1 ? 'X' : 'O'}</span></h3>

        <div className="poster">
          <div className="wins">
            <span>X</span> ({winsX}) x ({winsY}) <span>O</span>
          </div>
          <div className="isTie">
            Is tie: <span>{gaveOld}</span>
          </div>
        </div>
      </div>
      

      <div className="board">
        {arrayGame.map((element, index) => (
          <div 
            key={uuidv4()}
            className={(winValues && winValues.values.includes(index)) ? `element win ${winValues.orientation}` : 'element'}
            onClick={() => fillElement(index)}
          >
              <p className={(element !== 1 && element !== 2) ? 'noElement' : ''}>
                <span className='letterX'>{element === 1 && 'X'}</span>
                <span className='letterY'>{element === 2 && 'O'}</span>
              </p>
          </div>
        ))}
      </div>

      <div className="changeTurn">
        {!(arrayGame.includes(1) || arrayGame.includes(2)) && (
          <button onClick={() => {
            turn === 1 ? setTurn(2) : setTurn(1)          
          }}>
            Change Turn
          </button>
        )}
      </div>

      {gameOver && (
        <div className="restartGame">
          <button onClick={restartGame}>Restart game</button>
        </div>
      )}
      
    </div>
  )
}

export default App
