import "./App.css";
import React from "react";

function App() {
  const [selectedRow, setSelectedRow] = React.useState(10);
  const [selectedChip, setSelectedChip] = React.useState(1);
  const [roundColors, setRoundColors] = React.useState({});
  const [rowsData, setRowsData] = React.useState({});
  const [cluesData, setCluesData] = React.useState({});
  const [winner, setWinner] = React.useState(false);
  const [mastermindColors, setMastermindColors] = React.useState({});
  const colors = ["red", "blue", "white", "green", "black", "yellow"];
  const chipsRow = [1, 2, 3, 4];
  const getRandomColor = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  React.useEffect(() => {
    let randomColors = {};
    chipsRow.forEach((chip) => {
      randomColors[chip] = getRandomColor(colors);
    });

    setMastermindColors(randomColors);
  }, []);

  const handleClickColor = (color) => {
    let newRoundColors = { ...roundColors };
    newRoundColors[selectedChip] = color;
    setRoundColors(newRoundColors);

    if (selectedChip + 1 <= 4) {
      setSelectedChip(Number(selectedChip + 1));
    }
  };

  const handleFinishRound = () => {
    const newRowsData = { ...rowsData };
    newRowsData[Number(selectedRow)] = roundColors;
    setRowsData(newRowsData);

    const newCluesData = { ...cluesData };
    let clues = [];
    const newRoundColors = { ...roundColors };
    Object.keys(newRoundColors).forEach((key) => {
      if (newRoundColors[key] === mastermindColors[key]) {
        clues.push("black");
        delete newRoundColors[key];
      } else {
        Object.keys(mastermindColors).forEach((chip) => {
          if (chip !== key && newRoundColors[key] === mastermindColors[chip]) {
            clues.push("white");
            delete newRoundColors[key];
          }
        });
      }
    });

    newCluesData[Number(selectedRow)] = clues;
    setCluesData(newCluesData);

    if (
      clues.length === chipsRow.length &&
      !clues.find((color) => color === "white")
    ) {
      setWinner(true);
    } else {
      setSelectedRow(Number(selectedRow - 1));
      setRoundColors({});
      setSelectedChip(1);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title">MASTERMIND</h1>
        <p className="description">
          Welcome to Mastermind game! You have 10 rounds to guess the colors set
          of the Mastermind. For each round Mistermind will give you clues: a
          black chip means a chip with the right color in the right position,
          and a white chip means a color with de right color but in a wrong
          position. Are you ready? Good luck!
        </p>
      </header>
      <main className="app-main">
        <div className="board-container">
          <div className="row-mastermind">
            {chipsRow.map((chip) => (
              <div
                className="chip"
                key={chip}
                style={{
                  backgroundColor: (winner && mastermindColors[chip]) || "#888",
                }}
              ></div>
            ))}
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => {
            return (
              <div
                className={`row-chips row-chip-${row} ${
                  selectedRow === row && "selected"
                }`}
                key={row}
              >
                <div className="clues">
                  {chipsRow.map((chip, index) => (
                    <div
                      className="clue"
                      key={chip}
                      style={{
                        backgroundColor:
                          (cluesData[Number(row)] &&
                            cluesData[Number(row)][index]) ||
                          "#907e7e",
                      }}
                    ></div>
                  ))}
                </div>
                {chipsRow.map((chip) => {
                  return (
                    <div
                      key={chip}
                      className={`chip chip-${chip} ${
                        selectedChip === chip ? "selected-chip" : ""
                      }`}
                      onClick={() =>
                        selectedRow === row && setSelectedChip(Number(chip))
                      }
                      style={{
                        backgroundColor:
                          selectedRow === row
                            ? roundColors[Number(chip)]
                            : rowsData[Number(row)]
                            ? rowsData[Number(row)][Number(chip)]
                            : selectedChip === chip && selectedRow === row
                            ? "#ccc"
                            : "#888",
                      }}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="colors-container">
          <div className="colors">
            {colors.map((color) => {
              return (
                <div
                  key={color}
                  className="color-chip"
                  style={{ backgroundColor: color }}
                  onClick={() => handleClickColor(color)}
                ></div>
              );
            })}
          </div>
          <button className="play-btn" onClick={() => handleFinishRound()}>
            Play
          </button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
