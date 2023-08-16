import "./App.css";
import { React, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import {useWindowSize} from 'react-use';
import Confetti from "react-confetti";

function App() {
  const [Dice, setDice] = useState(initialDice());
  const [Tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();

  function random6Num() {
    return Math.ceil(Math.random() * 6);
  }

  function initialDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      const diceElement = {
        id: nanoid(),
        dieNum: random6Num(),
        clicked: false
      };
      diceArray.push(diceElement);
    }
    return diceArray;
  }

  const handleClicking = (Id) => {
    setDice((oldDice) =>
      oldDice.map((oldDie) =>
        oldDie.id === Id
          ? { ...oldDie, clicked: !oldDie.clicked }
          : { ...oldDie }
      )
    );
  };

  useEffect(() => {
    const holdDice = Dice.filter((die) => die.clicked);
    const trueHeld = holdDice.filter(
      (Die) => Die.dieNum === holdDice[0].dieNum
    );
    if (trueHeld.length > 9) {
      setTenzies(true);
    }
  }, [Dice]);

  function RollingAndRestart() {
    !Tenzies
      ? setDice((prevDie) =>
          prevDie.map((Die) =>
            !Die.clicked ? { ...Die, dieNum: random6Num() } : { ...Die }
          )
        )
      : setDice((prevDice) =>
          prevDice.map((die) =>
            die.clicked
              ? { ...die, dieNum: random6Num(), clicked: false }
              : { ...die }
          )
        );
    setTenzies(false);
  }

  const diceElements = Dice.map((die) => {
    return (
      <div
        key={die.id}
        onClick={() => handleClicking(die.id)}
        className={`die ${die.clicked ? "clicked" : ""}`}
      >
        {die.dieNum}
      </div>
    );
  });

  return (
    <div className="game-page">
      {Tenzies && <Confetti width={width} height={height} />}
      <h1 className="game-header">Tenzies </h1>
      <p className="game-info">
        Roll untile all dice are the same. Click each die to freeze it at it
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={() => RollingAndRestart()} className="roll">
        {Tenzies ? "Restart game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
