const numbersArray = [..."0123456789@#$%&*()-+=!?.,_"];
const smallAlphabets = [..."abcdefghijklmnopqrstuvwxyz"];
const capsArray = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const operators = ["caps", "space", "backspace", "delete"];

document.addEventListener("DOMContentLoaded", () => {
  const keyBoardContainer = document.querySelector(".keyBoardContainer");
  const keyBoardGrid = document.querySelector(".keyBoardGrid");
  const input = document.getElementById("keyInput");
  let prevIndex = null;
  let capsKey = false;
  let index = 0,
    rowKey = 0,
    columnKey = 0,
    totalCols = 6,
    totalRows = 5,
    row = 0,
    col = 0;

  function dataFill() {
    if (capsKey) {
      capsArray.forEach((char, index) => {
        let row = Math.floor(index / totalCols);
        let col = index % totalCols;
        const gridKeyId = `char${row}${col}`;
        let gridId = document.getElementById(gridKeyId);
        gridId.innerText = char;
      });
    } else {
      smallAlphabets.forEach((char, index) => {
        row = Math.floor(index / totalCols);
        col = index % totalCols;
        const gridKeyId = `char${row}${col}`;
        let gridId = document.getElementById(gridKeyId);
        gridId.innerText = char;
      });
    }
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

    operators.forEach((operators, index) => {
      const gridKey = document.createElement("span");
      gridKey.textContent = operators;
      gridKey.id = "op" + index;
      gridKey.classList.add("key", "operator");
      keyBoardGrid.appendChild(gridKey);
    });
  }
  keyBoardContainer.appendChild(keyBoardGrid);

  // ***Use event delegation (Single Event Listener)
  keyBoardGrid.addEventListener("click", (e) => {
    const id = e.target.id;
    rowKey = Number(id[4]); // Convert to number
    columnKey = Number(id[5]);
    console.log("click before pass:", rowKey, columnKey);
    arrowMove(rowKey, columnKey);

    handlingOPerators(e.target.innerText.trim());
  });

  var keydownHandler = (e) => {
    let gridKeys = document.querySelectorAll(".key");
    if (e.code === "ArrowRight") {
      columnKey++;
      if (columnKey >= gridKeys.length) {
        columnKey = 0;
      }
    } else if (e.code === "ArrowLeft") {
      columnKey--;
      if (columnKey < 0) {
        columnKey = gridKeys.length - 1;
      }
    } else if (e.code === "ArrowDown") {
      rowKey++;
      if (rowKey >= totalRows) {
        rowKey = 0;
      }
    } else if (e.code === "ArrowUp") {
      rowKey--;
      if (rowKey < 0) {
        rowKey = totalRows - 1;
      }
    } else if (e.code === "Enter") {
      let gridItem = gridKeys[rowKey * totalCols + columnKey];

      if (gridItem) {
        handlingOPerators(gridItem.innerText);
      }
    }
    arrowMove(rowKey, columnKey);
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
      case "delete":
        input.value = "";
        break;
      case "caps":
        capsKey = !capsKey;
        dataFill();
        break;

      default:
        input.value += inputText;
        break;
    }
  }

  function arrowMove(rowKey, columnKey) {
    // GridKeys
    let gridKeys = document.querySelectorAll(".key");
    index = rowKey * totalCols + columnKey;
    console.log(rowKey, columnKey, index);
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
