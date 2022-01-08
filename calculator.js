"use strict";

let activeButton;
let activeOpr;
let problem;
let oprCount;
let hLength;
let hasDecimal;

const mainLcd = document.getElementById("lcdScreen");
const historyScreen = document.getElementById("history");
hLength = historyScreen.innerText.length;
let ansCount = 0;

let checkdecimal = function () {
  if (mainLcd.innerText.includes(`.`)) {
    hasDecimal === true;
  } else {
    hasDecimal === false;
  }
};

// function to call clear screen - the clear button function cant be called somehow still learning assign independent function to click event
const clearThyScreen = function () {
  mainLcd.innerText = `0`;
  historyScreen.innerText = `0`;
  ansCount = 0;
  hLength = historyScreen.innerText.length;
  oprCount = 0;
  hasDecimal = false;
};

// Clear button function
document.getElementById("clearButton").onclick = function clearLcd() {
  clearThyScreen();
  // mainLcd.innerText = `0`;
  // historyScreen.innerText = `0`;
  // ansCount = 0;
  // hLength = historyScreen.innerText.length;
  // hasDecimal = false;
};

function takeNumbers(activeID) {
  activeButton = document.getElementById(activeID);
  checkdecimal();
  if (ansCount === 0) {
    if (mainLcd.innerText === "0" || mainLcd.innerText === "Welcome") {
      mainLcd.innerText = activeButton.innerText;
    } else {
      mainLcd.insertAdjacentText("beforeend", activeButton.innerText);
    }
  } else if (ansCount === 1 && oprCount === 0 && !hasDecimal) {
    clearThyScreen();
    mainLcd.innerText = activeButton.innerText;
  } else if (ansCount === 1 && oprCount === 0 && hasDecimal) {
    mainLcd.insertAdjacentText("beforeend", activeButton.innerText);
  } else if (
    ansCount === 1 &&
    oprCount === 1 &&
    Number(mainLcd.innerText) === 0
  ) {
    mainLcd.innerText = activeButton.innerText;
  } else if (
    ansCount === 1 &&
    oprCount === 1 &&
    Number(mainLcd.innerText) !== 0
  ) {
    mainLcd.insertAdjacentText("beforeend", activeButton.innerText);
  }
}

// for decimal value
function takeDecimal(activeID) {
  checkdecimal();
  activeButton = document.getElementById(activeID);
  if (!hasDecimal) {
    if (Number(mainLcd.innerText) === 0) {
      mainLcd.innerText = "0.";
    } else if (mainLcd.innerText === "Welcome") {
      mainLcd.innerText = `0.`;
    } else if (Number(mainLcd.innerText) !== 0) {
      mainLcd.insertAdjacentText("beforeend", ".");
    }
    // checkDecimal = true;
  } else if (hasDecimal) {
    return -1;
  }
}

function takeOperators(activeOprID) {
  hLength = historyScreen.innerText.length;
  activeOpr = document.getElementById(activeOprID);
  if (oprCount !== 1) {
    if (hLength === 1 && mainLcd.innerText !== `Welcome`) {
      historyScreen.innerText = `${mainLcd.innerText} ${activeOpr.innerText}`;
      hLength = historyScreen.innerText.length;
    } else if (hLength > 1 && ansCount === 0) {
      historyScreen.insertAdjacentText(
        "beforeend",
        `${mainLcd.innerText} ${activeOpr.innerText}`
      );
    } else if (ansCount === 1) {
      historyScreen.innerText = `${mainLcd.innerText} ${activeOpr.innerText}`;
    }
  }
  mainLcd.innerText = "0";
  hLength = historyScreen.innerText.length;
  oprCount = 1;
}

// Answer button -------------

const reveal = function () {
  //console.log(`count = ${ansCount}`);
  if (oprCount === 1) {
    historyScreen.insertAdjacentText("beforeend", ` ${mainLcd.innerText}`);
    problem = historyScreen.innerText;
    //console.log(problem);
    //console.log(eval(problem));
    mainLcd.innerText = `${eval(problem)}`;
  }
  ansCount = 1;
  oprCount = 0;
};

document.getElementById("answer").onclick = function showAnswer() {
  //console.log(`count = ${ansCount}`);
  if (oprCount === 1) {
    historyScreen.insertAdjacentText("beforeend", ` ${mainLcd.innerText}`);
    problem = historyScreen.innerText;
    //console.log(problem);
    //console.log(eval(problem));
    mainLcd.innerText = `${eval(problem)}`;
  }
  ansCount = 1;
  oprCount = 0;
};

/*Installed GIT */
/* added files to tracking for git */

// adding decimal on aswers not working

// Press Esc key to clear screen
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") clearThyScreen();
});
