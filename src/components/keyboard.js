import React from "react";
import { keyboardData } from "./keyboarddata";
import { ContextData } from "../context/context";

export default function Keyboard() {
  const { word } = React.useContext(ContextData);
  let entry = [];

  function onclickKey(letter) {
    if (entry.length > 0 && letter === "BACKSPACE") {
      entry.pop();
    } else if (letter === "ENTER") {
      onEntrySubmit();
    } else if (entry.length < 5) {
      entry.push(letter);
    }
  }

  function onEntrySubmit() {
    if (entry.length !== 5) {
      alert("Not enough letters");
    } else {
      console.log(entry);
      entry = [];
    }
  }

  const firstrow = keyboardData[0].map((letter) => {
    return (
      <button className="keyboard-button" onClick={() => onclickKey(letter)} key={letter} >
        {letter}
      </button>
    );
  });
  const secondrow = keyboardData[1].map((letter) => {
    return (
      <button className="keyboard-button" onClick={() => onclickKey(letter)} key={letter}>
        {letter}
      </button>
    );
  });
  const thirdrow = keyboardData[2].map((letter) => {
    if (letter === "BACKSPACE")
      return (
        <button className="keyboard-button" onClick={() => onclickKey(letter)} key={letter}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="var(--color-tone-1)"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </button>
      );
    else
      return (
        <button className="keyboard-button" onClick={() => onclickKey(letter)} key={letter}>
          {letter}
        </button>
      );
  });

  return (
    <div id="keyboard-cont">
      <div className="first-row">{firstrow}</div>
      <div className="second-row">{secondrow}</div>
      <div className="third-row">{thirdrow}</div>
    </div>
  );
}
