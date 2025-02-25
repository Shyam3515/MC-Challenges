const operators = ["caps", "space", "backspace", "123@"];
const numbersArray = [..."0123456789@#$%&*()-+=!?.,_", ...operators];
const smallAlphabets = [..."abcdefghijklmnopqrstuvwxyz", ...operators];
const capsArray = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...operators];

document.addEventListener("DOMContentLoaded", () => {
  const keyBoardContainer = document.querySelector(".keyBoardContainer");
  const keyBoardGrid = document.querySelector(".keyBoardGrid");
  const input = document.getElementById("keyInput");
  let prevIndex = null;
  let capsKey = false,
    numsGrid = false;
  let index = 0,
    rowIndex = 0,
    columnIndex = 0,
    totalCols = 6,
    totalRows = 5,
    row = 0,
    col = 0;

  function dataFill(arr) {
    arr.forEach((char, index) => {
      row = Math.floor(index / totalCols);
      col = index % totalCols;
      const gridKeyId = `char${row}${col}`;
      let gridId = document.getElementById(gridKeyId);
      gridId.innerText = char;
    });
  }
  render(smallAlphabets); // Initial render

  arrowMove(0, 0); //for initial A to display

  function render(arr) {
    arr.forEach((char, index) => {
      const gridKey = document.createElement("span");
      gridKey.textContent = char;
      gridKey.classList.add("char", "key");
      row = Math.floor(index / totalCols);
      col = index % totalCols;
      gridKey.id = `char${row}${col}`;

      keyBoardGrid.appendChild(gridKey);
    });
  }
  keyBoardContainer.appendChild(keyBoardGrid);

  // ***Use event delegation (Single Event Listener)
  keyBoardGrid.addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      if (!e.target.classList.contains("key")) {
        return; // Ignore clicks on non-key elements
      }
      const id = e.target.id;
      rowIndex = Number(id[4]); // Convert to number
      columnIndex = Number(id[5]);
      console.log("click before pass:", rowIndex, columnIndex);
      arrowMove(rowIndex, columnIndex);

      handlingOPerators(e.target.innerText.trim());
    },
    { capture: true }
  );

  var keydownHandler = (e) => {
    let gridKeys = document.querySelectorAll(".key");

    if (e.code === "ArrowRight") {
      columnIndex++;
      if (index >= gridKeys.length - 1) {
        columnIndex = 0;
        rowIndex = 0;
      }
    } else if (e.code === "ArrowLeft") {
      columnIndex--;
      if (columnIndex < 0) {
        columnIndex = totalCols - 1;
        rowIndex--;
        if (rowIndex < 0) {
          rowIndex = totalRows - 1;
        }
      }
    } else if (e.code === "ArrowDown") {
      rowIndex++;
      if (rowIndex >= totalRows) {
        rowIndex = 0;
      }
    } else if (e.code === "ArrowUp") {
      rowIndex--;
      if (rowIndex < 0) {
        rowIndex = totalRows - 1;
      }
    } else if (e.code === "Enter") {
      let gridItem = gridKeys[rowIndex * totalCols + columnIndex];

      if (gridItem) {
        handlingOPerators(gridItem.innerText);
      }
    }
    arrowMove(rowIndex, columnIndex);
  };

  document.addEventListener("keydown", keydownHandler);

  function handlingOPerators(inputText) {
    if (typeof inputText !== "string") {
      return; // Stop execution if inputText is not a string
    }

    switch (inputText.toLowerCase()) {
      case "space":
        input.value += " ";
        break;
      case "backspace":
        input.value = input.value.slice(0, -1);
        break;
      case "123@":
        numsGrid = !numsGrid;
        if (numsGrid) dataFill(numbersArray);
        else dataFill(smallAlphabets);
        break;
      case "caps":
        capsKey = !capsKey;
        if (!capsKey) {
          dataFill(smallAlphabets);
        } else {
          dataFill(capsArray);
        }
        break;

      default:
        input.value += inputText;
        break;
    }
  }

  function arrowMove(rowIndex, columnIndex) {
    // GridKeys
    let gridKeys = document.querySelectorAll(".key");
    index = rowIndex * totalCols + columnIndex;
    console.log(rowIndex, columnIndex, index);
    let gridItem = gridKeys[index];

    if (!gridItem) return; // Avoid errors if index is out of bounds

    // Remove active class from the previously active key
    if (prevIndex) {
      prevIndex.classList.remove("active");
    }

    // Add active class to the new key
    gridItem.classList.add("active");
    prevIndex = gridItem;
  }
});
