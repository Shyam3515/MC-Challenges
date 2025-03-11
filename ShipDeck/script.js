let deckJSON = {
  deckTools: {
    prevIndex: 0,
    row: 1,
  },
  divs: [
    { id: "div1", title: "Title 1", content: "This is a div 1 content..." },
    { id: "div2", title: "Title 2", content: "This is a div 2 content..." },
    { id: "div3", title: "Title 3", content: "This is a div 3 content..." },
    { id: "div4", title: "Title 4", content: "This is a div 4 content..." },
    { id: "div5", title: "Title 5", content: "This is a div 5 content..." },

    { id: "div6", title: "Title 6", content: "This is a div 6 content..." },
    { id: "div7", title: "Title 7", content: "This is a div 7 content..." },
    { id: "div8", title: "Title 8", content: "This is a div 8 content..." },
    { id: "div9", title: "Title 9", content: "This is a div 9 content..." },
    {
      id: "div10",
      title: "Title 10",
      content: "This is a div 10 content...",
    },
  ],
};

const shipDeck = document.querySelector(".shipDeck");
const display = document.querySelector(".display");

function renderTabs() {
  deckJSON.divs.forEach((div) => {
    const divTag = document.createElement("div");
    divTag.classList.add(div.id, "flex");
    divTag.id = div.id;
    divTag.innerText = div.title;

    shipDeck.appendChild(divTag);
  });
}

renderTabs();

const divTags = document.querySelectorAll(".flex");
divTags[0].classList.add("active");
display.innerText = deckJSON.divs[0].content;

divTags.forEach((div) => {
  div.addEventListener("click", (e) => {
    const clickedId = e.target.id;
    deckJSON.deckTools.row = clickedId.split("div")[1];

    updateDivs(deckJSON.deckTools.row);
  });
});

document.addEventListener("keydown", (e) => {
  e.preventDefault(); // Prevent default behavior (like scrolling)
  if (e.code === "ArrowRight") {
    deckJSON.deckTools.row++;

    if (deckJSON.deckTools.row > deckJSON.divs.length) {
      deckJSON.deckTools.row = 1;
    }
  } else if (e.code === "ArrowLeft") {
    deckJSON.deckTools.row--;

    if (deckJSON.deckTools.row <= 0) {
      deckJSON.deckTools.row = deckJSON.divs.length;
    }
  }

  updateDivs(deckJSON.deckTools.row);
});

function updateDivs(rowId) {
  console.log(rowId);
  if (deckJSON.deckTools.prevIndex) {
    document
      .getElementById(deckJSON.deckTools.prevIndex)
      .classList.remove("active");
  }

  if (divTags[0].classList.contains("active")) {
    document.getElementById("div1").classList.remove("active");
  }
  document.getElementById("div" + rowId).classList.add("active");

  // update
  deckJSON.deckTools.prevIndex = "div" + rowId;
  //innerText
  display.innerText = deckJSON.divs[rowId - 1].content;
}
