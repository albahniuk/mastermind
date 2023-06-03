import "./App.css";
import React from "react";

function App() {
  const [selectedRow, setSelectedRow] = React.useState(10);
  const [selectedChip, setSelectedChip] = React.useState(1);
  const [roundColors, setRoundColors] = React.useState({});
  const [rowsData, setRowsData] = React.useState({});

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
    setSelectedRow(Number(selectedRow - 1));
    setRoundColors({});
    setSelectedChip(1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title">MASTERMIND</h1>
      </header>
      <main className="app-main">
        <div className="board-container">
          <div className="row-mastermind">
            <div className="chip"></div>
            <div className="chip"></div>
            <div className="chip"></div>
            <div className="chip"></div>
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
                  <div className="clue"></div>
                  <div className="clue"></div>
                  <div className="clue"></div>
                  <div className="clue"></div>
                </div>
                {[1, 2, 3, 4].map((chip) => {
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
            {["red", "blue", "white", "green", "black", "yellow"].map(
              (color) => {
                return (
                  <div
                    key={color}
                    className="color-chip"
                    style={{ backgroundColor: color }}
                    onClick={() => handleClickColor(color)}
                  ></div>
                );
              }
            )}
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
