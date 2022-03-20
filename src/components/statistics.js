import React from "react";

const Statistics = ({ setShowStat }) => {
  return (
    <div className="rule-container">
      <div className="title-para">
        <div className="back-container">
          <h2>STATISTICS</h2>
          <h2
            className="back"
            onClick={() => {
              setShowStat(false);
            }}
          >
            X
          </h2>
        </div>
        <ul>
          <li className="list-item">Played: </li>
          <li className="list-item">Win %:</li>
          <li className="list-item">Current Streak:</li>
          <li className="list-item">Max Streak:</li>
        </ul>
      </div>
      <div className="title-para">
        <h2>GUESS DISTRIBUTION</h2>
        <ul>
          <li className="list-item">1</li>
          <li className="list-item">2</li>
          <li className="list-item">3</li>
          <li className="list-item">4</li>
          <li className="list-item">5</li>
          <li className="list-item">6</li>
        </ul>
      </div>
      <div className="title-para">
        <h2>NEXT WORDLE</h2>
        <h3>Time</h3>
      </div>
    </div>
  );
};

export default Statistics;
