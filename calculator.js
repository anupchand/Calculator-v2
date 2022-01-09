"use strict";

// required variables
let activeButton;
let activeOpr;
let problem;
let hasDecimal;
let ansCount = 0;
let oprCount = 0;

const mainLcd = document.getElementById("lcdScreen");
const historyScreen = document.getElementById("history");
let hLength = historyScreen.innerText.length;

// check if number has decimal
let checkDecimal = function () {
  if (mainLcd.innerText.includes(".")) {
    hasDecimal = true;
  } else {
    hasDecimal = false;
  }
};

// Function to clear screen ==========
const clearThyScreen = function () {
  mainLcd.innerText = "0";
  historyScreen.innerText = "0";
  ansCount = 0;
  oprCount = 0;
  hasDecimal = false;
};

// Clear button "C" Function ==========
document.getElementById("clearButton").onclick = function () {
  clearThyScreen();
};

// Input values from number keys ==========
function takeNumbers(activeID) {
  activeButton = document.getElementById(activeID);
  checkDecimal();

  // Level 1
  if (ansCount === 0) {
    if (mainLcd.innerText === "0" || mainLcd.innerText === "Welcome") {
      mainLcd.innerText = activeButton.innerText;
    } else {
      mainLcd.insertAdjacentText("beforeend", activeButton.innerText);
    }

    // Level 1
  } else if (ansCount === 1) {
    /// ------ Level 2 ------
    if (oprCount === 0) {
      if (!hasDecimal) {
        mainLcd.innerText = activeButton.innerText;
      } else if (hasDecimal) {
        mainLcd.insertAdjacentText("beforeend", activeButton.innerText);
      }
      /// ------ Level 2 ------
    } else if (oprCount === 1) {
      if (mainLcd.innerText === "0" && mainLcd.innerText !== "0.") {
        mainLcd.innerText = activeButton.innerText;
      } else if (mainLcd.innerText === "0.") {
        mainLcd.insertAdjacentText("beforeend", activeButton.innerText);
      } else if (Number(mainLcd.innerText) !== 0) {
        mainLcd.insertAdjacentText("beforeend", activeButton.innerText);
      }
    }
  }
}

// For decimal value =============
function takeDecimal(activeID) {
  activeButton = document.getElementById(activeID);
  checkDecimal();

  if (hasDecimal) return;

  if (!hasDecimal) {
    if (Number(mainLcd.innerText) === 0 || mainLcd.innerText === "Welcome") {
      mainLcd.innerText = "0.";
      hasDecimal = true;
    } else if (Number(mainLcd.innerText) !== 0) {
      mainLcd.insertAdjacentText("beforeend", ".");
      hasDecimal = true;
    }
  }
}

// Take operators ============
function takeOperators(activeOprID) {
  hLength = historyScreen.innerText.length;
  activeOpr = document.getElementById(activeOprID);
  checkDecimal();
  if (hLength === 1 && ansCount === 0 && mainLcd.innerText !== `Welcome`) {
    historyScreen.innerText = `${mainLcd.innerText} ${activeOpr.innerText}`;
    hLength = historyScreen.innerText.length;
  } else if (hLength > 1 && ansCount === 0) {
    historyScreen.insertAdjacentText(
      "beforeend",
      ` ${mainLcd.innerText} ${activeOpr.innerText}`
    );
  } else if (ansCount === 1) {
    historyScreen.innerText = `${mainLcd.innerText} ${activeOpr.innerText}`;
  }

  mainLcd.innerText = "0";

  hLength = historyScreen.innerText.length;
  oprCount = 1;
}

// Answer button ==========
document.getElementById("answer").onclick = function showAnswer() {
  if (oprCount === 1) {
    historyScreen.insertAdjacentText("beforeend", ` ${mainLcd.innerText}`);
    problem = historyScreen.innerText;
    mainLcd.innerText = `${eval(problem)}`;
  }
  checkDecimal();

  ansCount = 1;
  oprCount = 0;
};

// Press Esc key to clear screen ===============
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") clearThyScreen();
});
