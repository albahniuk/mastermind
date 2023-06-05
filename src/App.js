import "./App.css";
import React from "react";

function App() {
  const [selectedRow, setSelectedRow] = React.useState(10);
  const [selectedChip, setSelectedChip] = React.useState(1);
  const [roundColors, setRoundColors] = React.useState({});
  const [rowsData, setRowsData] = React.useState({});
  const [cluesData, setCluesData] = React.useState({});
  const [finish, setFinish] = React.useState(false);
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
      setFinish(true);
    } else {
      setSelectedRow(Number(selectedRow - 1));
      setRoundColors({});
      setSelectedChip(1);
      if (Number(selectedRow - 1) === 0) {
        setFinish(true);
      }
    }
  };

  const handleResetGame = () => {
    window.location.reload(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title">MASTERMIND</h1>
        <p className="description">
          Welcome to the Mastermind game. You have 10 rounds to guess the colors
          set of the Mastermind. For each round Mistermind will give you clues:
          a black chip means a chip with the right color in the right position,
          and a white chip means a color with de right color but in a wrong
          position. Good luck!
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
                  backgroundColor: (finish && mastermindColors[chip]) || "#888",
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
        <div className="right-container">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fff"
                  d="m173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69L432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                ></path>
              </svg>
            </button>
          </div>
          <button className="reset-btn" onClick={() => handleResetGame()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M12 22q-1.875 0-3.513-.713t-2.85-1.924q-1.212-1.213-1.924-2.85T3 13h2q0 2.925 2.038 4.963T12 20q2.925 0 4.963-2.038T19 13q0-2.925-2.038-4.963T12 6h-.15l1.55 1.55L12 9L8 5l4-4l1.4 1.45L11.85 4H12q1.875 0 3.513.713t2.85 1.925q1.212 1.212 1.925 2.85T21 13q0 1.875-.713 3.513t-1.924 2.85q-1.213 1.212-2.85 1.925T12 22Z"
              ></path>
            </svg>
            Play again
          </button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
