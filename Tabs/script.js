let tabsData = [
  { id: "tab1", name: "Tab 1", content: "This is a tab1 content..." },
  { id: "tab2", name: "Tab 2", content: "This is a tab2 content..." },
  { id: "tab3", name: "Tab 3", content: "This is a tab3 content..." },
];

document.addEventListener("DOMContentLoaded", () => {
  let tabActive = tabsData[0].id;

  function renderTabs() {
    let container = document.querySelector(".container");
    let tabs = document.querySelector(".tabs");
    let tabContentContainer = document.querySelector(".tabContent");

    tabsData.forEach((tab) => {
      let tabButton = document.createElement("button");
      tabButton.className = "tablinks";
      tabButton.innerText = tab.name;
      tabButton.setAttribute("data-tab", tab.id);
      tabs.appendChild(tabButton);

      // Tab content
      let tabCont = document.createElement("div");
      tabCont.innerHTML = `<h3>${tab.name}</h3> <p>${tab.content}</p>`;
      tabCont.className = "tabContents";
      tabCont.id = tab.id;
      tabContentContainer.appendChild(tabCont);

      container.appendChild(tabs);
      container.appendChild(tabContentContainer);
    });

    tabs.addEventListener("click", (event) => {
      if (event.target.matches(".tablinks")) {
        console.log(event.target.matches(".tablinks")); //true
        const tabId = event.target.getAttribute("data-tab");

        if (tabId !== tabActive) {
          openTab(tabId);
          tabActive = tabId;
        }
      }
    });
  }

  //we have given same tabId for both tabs and content, with that ID we can make them active if not active
  function openTab(tabId) {
    const tabLinks = document.querySelectorAll(".tablinks");
    const tabContents = document.querySelectorAll(".tabContents");

    tabLinks.forEach((tab) => tab.classList.remove("active"));
    tabContents.forEach((tab) => tab.classList.remove("active"));

    console.log(tabId);
    document.getElementById(tabId).classList.add("active"); //content
    document
      .querySelector(`button[data-tab="${tabId}"]`)
      .classList.add("active");
  }

  renderTabs();

  document.getElementById(tabActive).classList.add("active");
  document
    .querySelector(`button[data-tab="${tabActive}"]`)
    .classList.add("active");
});
