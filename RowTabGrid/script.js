document.addEventListener("DOMContentLoaded", () => {
  let rowDataJSON = {
    rows: [
      { id: "tab1", title: "Title 1", content: "This is a tab 1 content..." },
      { id: "tab2", title: "Title 2", content: "This is a tab 2 content..." },
      { id: "tab3", title: "Title 3", content: "This is a tab 3 content..." },
      { id: "tab4", title: "Title 4", content: "This is a tab 4 content..." },
      { id: "tab5", title: "Title 5", content: "This is a tab 5 content..." },

      { id: "tab6", title: "Title 6", content: "This is a tab 6 content..." },
      { id: "tab7", title: "Title 7", content: "This is a tab 7 content..." },
      { id: "tab8", title: "Title 8", content: "This is a tab 8 content..." },
      { id: "tab9", title: "Title 9", content: "This is a tab 9 content..." },
      {
        id: "tab10",
        title: "Title 10",
        content: "This is a tab 10 content...",
      },

      {
        id: "tab11",
        title: "Title 11",
        content: "This is a tab 11 content...",
      },
      {
        id: "tab12",
        title: "Title 12",
        content: "This is a tab 12 content...",
      },
      {
        id: "tab13",
        title: "Title 13",
        content: "This is a tab 13 content...",
      },
      {
        id: "tab14",
        title: "Title 14",
        content: "This is a tab 14 content...",
      },
      {
        id: "tab15",
        title: "Title 15",
        content: "This is a tab 15 content...",
      },

      {
        id: "tab16",
        title: "Title 16",
        content: "This is a tab 16 content...",
      },
      {
        id: "tab17",
        title: "Title 17",
        content: "This is a tab 17 content...",
      },
      {
        id: "tab18",
        title: "Title 18",
        content: "This is a tab 18 content...",
      },
      {
        id: "tab19",
        title: "Title 19",
        content: "This is a tab 19 content...",
      },
      {
        id: "tab20",
        title: "Title 20",
        content: "This is a tab 20 content...",
      },
    ],

    rowTools: {
      row: 0,
      prevIndex: 0,
    },
  };

  const tabContainer = document.querySelector(".tabContainer");
  const gridContainer = document.querySelector(".gridContainer");
  const rightSection = document.querySelector(".rightSection");
  const leftSection = document.querySelector(".leftSection");

  //render and add active
  render();
  tabContainer.appendChild(leftSection);
  const tabs = document.querySelectorAll(".tab");
  tabs[0].classList.add("active");

  function render() {
    rowDataJSON.rows.forEach((row) => {
      const gridItem = document.createElement("span");
      gridItem.innerText = row.title;
      gridItem.id = row.id;
      gridItem.classList.add("tab");

      gridContainer.appendChild(gridItem);
    });

    leftSection.appendChild(gridContainer);
  }

  const rightSectionP = document.querySelector(".rightSection p");
  rightSectionP.innerText = rowDataJSON.rows[0].content;

  //Onclick Update
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      rowDataJSON.rowTools.row = clickedId.split("tab")[1];

      updateActive(rowDataJSON.rowTools.row);
    });
  });

  //Keydown Listeners
  document.addEventListener("keydown", (e) => {
    e.preventDefault(); // Prevent default behavior (like scrolling)
    let scrollContainer = document.querySelector(".gridContainer"); // The parent container that scrolls
    if (!scrollContainer) return; // Prevent errors if the element is missing

    if (e.code === "ArrowUp") {
      rowDataJSON.rowTools.row--;
      scrollContainer.scrollTop -= 60;

      if (rowDataJSON.rowTools.row <= 1) {
        rowDataJSON.rowTools.row = 1;
      }
    } else if (e.code === "ArrowDown") {
      rowDataJSON.rowTools.row++;
      scrollContainer.scrollTop += 60;

      if (rowDataJSON.rowTools.row >= rowDataJSON.rows.length) {
        rowDataJSON.rowTools.row = rowDataJSON.rows.length;
      }
    }

    updateActive(rowDataJSON.rowTools.row);
  });

  function updateActive(clickedId) {
    console.log(clickedId);
    if (rowDataJSON.rowTools.prevIndex) {
      document
        .getElementById("tab" + rowDataJSON.rowTools.prevIndex)
        .classList.remove("active");
    }
    //remove and add class
    if (tabs[0].classList.contains("active")) {
      document.getElementById("tab1").classList.remove("active");
    }
    document.getElementById("tab" + clickedId).classList.add("active");

    //update index
    rowDataJSON.rowTools.prevIndex = clickedId;
    //update innertext
    rightSectionP.innerText = rowDataJSON.rows[clickedId - 1].content;
  }
});
