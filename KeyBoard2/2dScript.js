const operators = ["caps", "space", "backspace", "123@"];
const numbersArray = [..."0123456789@#$%&*()-+=!?.,_", ...operators];
const smallAlphabets = [..."abcdefghijklmnopqrstuvwxyz", ...operators];
const capsArray = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...operators];

function matrixForm(arr, cols) {
  let matrix = [];
  for (let i = 0; i < arr.length; i += cols) {
    matrix.push(arr.slice(i, i + cols));
  }
  return matrix;
}

let keyBoardGridJSON = {
  arrays: {},
  conditionalVariables: {
    prevIndex: null,
    capsKey: false,
    numsGrid: false,
  },
  gridTools: {
    // index: 0,
    rowIndex: 0,
    columnIndex: 0,
    totalCols: 6,
    totalRows: 5,
  },
};

// 2D arrays creation
const twoDNumbersArray = matrixForm(
  numbersArray,
  keyBoardGridJSON.gridTools.totalCols
);
const twoDSmallAlphabets = matrixForm(
  smallAlphabets,
  keyBoardGridJSON.gridTools.totalCols
);
const twoDCapsArray = matrixForm(
  capsArray,
  keyBoardGridJSON.gridTools.totalCols
);

// Update keyBoardGridJSON after initialization
keyBoardGridJSON.arrays = {
  numbersArray: twoDNumbersArray,
  smallAlphabets: twoDSmallAlphabets,
  capsArray: twoDCapsArray,
};

console.log("Numbers Grid:", twoDNumbersArray);
console.log("Small Alphabets Grid:", twoDSmallAlphabets);
console.log("Caps Alphabets Grid:", twoDCapsArray);
console.log("Updated keyBoardGridJSON:", keyBoardGridJSON);

function moveRight() {
  keyBoardGridJSON.gridTools.columnIndex++;
  if (
    keyBoardGridJSON.gridTools.columnIndex >
    keyBoardGridJSON.gridTools.totalCols - 1
  ) {
    keyBoardGridJSON.gridTools.columnIndex = 0;
    keyBoardGridJSON.gridNavigationKeys.moveDown();
  }
}

function moveLeft() {
  keyBoardGridJSON.gridTools.columnIndex--;

  if (keyBoardGridJSON.gridTools.columnIndex < 0) {
    keyBoardGridJSON.gridTools.columnIndex =
      keyBoardGridJSON.gridTools.totalCols - 1;
    keyBoardGridJSON.gridNavigationKeys.moveUp();
  }
}

function moveDown() {
  keyBoardGridJSON.gridTools.rowIndex++;
  if (
    keyBoardGridJSON.gridTools.rowIndex >= keyBoardGridJSON.gridTools.totalRows
  ) {
    keyBoardGridJSON.gridTools.rowIndex = 0;
  }
}

function moveUp() {
  keyBoardGridJSON.gridTools.rowIndex--;

  if (keyBoardGridJSON.gridTools.rowIndex < 0) {
    keyBoardGridJSON.gridTools.rowIndex =
      keyBoardGridJSON.gridTools.totalRows - 1;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const keyBoardContainer = document.querySelector(".keyBoardContainer");
  const keyBoardGrid = document.querySelector(".keyBoardGrid");
  const input = document.getElementById("keyInput");

  function dataFill(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        const dataKey = document.getElementById(i + "" + j);
        dataKey.innerText = arr[i][j];
      }
    }
  }

  function render(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        const gridKey = document.createElement("span");
        gridKey.innerText = arr[i][j];
        gridKey.classList.add("key", "char");
        gridKey.id = i + "" + j;

        keyBoardGrid.appendChild(gridKey);
      }
    }
  }
  keyBoardContainer.appendChild(keyBoardGrid);
  render(keyBoardGridJSON.arrays.smallAlphabets); //initial render

  keyBoardGrid.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!e.target.classList.contains("key")) {
      return; // Ignore clicks on non-key elements
    }
    let clickedKey = e.target.id;
    rowIndex = Number(clickedKey[0]);
    columnIndex = Number(clickedKey[1]);
    console.log(typeof clickedKey[0], typeof clickedKey);

    //focus management
    moveFocus(clickedKey);

    //processInput
    processInput(clickedKey);
  });

  moveFocus("00");
  function moveFocus(clickedId) {
    const focusKey = document.getElementById(clickedId);
    console.log(focusKey);

    //before adding active class checking if already class present, and remove
    if (keyBoardGridJSON.conditionalVariables.prevIndex) {
      const removeActive = document.getElementById(
        keyBoardGridJSON.conditionalVariables.prevIndex
      );
      removeActive.classList.remove("active");
    }
    //add classlist
    focusKey.classList.add("active");
    //add prevIndex to holder
    keyBoardGridJSON.conditionalVariables.prevIndex = clickedId;
  }

  function processInput(id) {
    const processKey = document.getElementById(id);

    console.log(processKey.innerText);
    switch (processKey.innerText) {
      case "caps":
        if (!keyBoardGridJSON.conditionalVariables.numsGrid) {
          keyBoardGridJSON.conditionalVariables.capsKey =
            !keyBoardGridJSON.conditionalVariables.capsKey;
          if (keyBoardGridJSON.conditionalVariables.capsKey) {
            dataFill(keyBoardGridJSON.arrays.capsArray);
          } else {
            dataFill(keyBoardGridJSON.arrays.smallAlphabets);
          }
        } else {
          document.getElementById(id).classList.remove("active");
          dataFill(keyBoardGridJSON.arrays.numbersArray);
        }
        break;

      case "space":
        input.value += " ";
        break;

      case "backspace":
        input.value = input.value.slice(0, -1);
        break;

      case "123@":
        keyBoardGridJSON.conditionalVariables.numsGrid =
          !keyBoardGridJSON.conditionalVariables.numsGrid;
        if (keyBoardGridJSON.conditionalVariables.numsGrid) {
          dataFill(keyBoardGridJSON.arrays.numbersArray);
        } else {
          dataFill(keyBoardGridJSON.arrays.smallAlphabets);
        }
        break;

      default:
        input.value += processKey.innerText;
        break;
    }
  }

  let arrowHandler = (e) => {
    let gridKeys = document.querySelectorAll(".key");
    let gridItem =
      gridKeys[
        keyBoardGridJSON.gridTools.rowIndex *
          keyBoardGridJSON.gridTools.totalCols +
          keyBoardGridJSON.gridTools.columnIndex
      ];
    // console.log(gridItem);
    if (e.code === "ArrowRight") {
      moveRight();
    } else if (e.code === "ArrowLeft") {
      moveLeft();
    } else if (e.code === "ArrowUp") {
      moveUp();
    } else if (e.code === "ArrowDown") {
      moveDown();
    } else if (e.code === "Enter") {
      processInput(gridItem.id);
    }

    moveFocus(gridItem.id);
  };
  document.removeEventListener("keydown", arrowHandler); //Before adding a new keydown listener, remove any existing one:
  document.addEventListener("keydown", arrowHandler);
});
