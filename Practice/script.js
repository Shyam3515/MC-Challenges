let tabsData = [
  { id: "tab1", name: "Tab 1", content: "This is a tab1 content..." },
  { id: "tab2", name: "Tab 2", content: "This is a tab2 content..." },
  { id: "tab3", name: "Tab 3", content: "This is a tab3 content..." },
];

document.addEventListener("DOMContentLoaded", () => {
  let tabActive = tabsData[0].id;

  function renderTabs() {
    let container = document.querySelector(".tabContainer");
    let tabs = document.querySelector(".tabs");
    let tabContentContainer = document.querySelector(".tabContent");

    tabsData.forEach((tab) => {
      let tabButton = document.createElement("button");
      tabButton.className = "tabLinks";
      tabButton.innerText = tab.name;
      tabButton.setAttribute("data-tab", tab.id);
      tabs.appendChild(tabButton);

      //tab
      let tabCont = document.createElement("div");
      tabCont.innerHTML = `<h3>${tab.name}</h3>${tab.content}`;
      tabCont.id = tab.id;
      tabCont.className = "tabContents";
      tabContentContainer.appendChild(tabCont);

      container.appendChild(tabs);
      container.appendChild(tabContentContainer);
    });

    tabs.addEventListener("click", (event) => {
      if (event.target.matches(".tabLinks")) {
        let tabId = event.target.getAttribute("data-tab");

        if (tabId !== tabActive) {
          openTab(tabId);
          tabActive = tabId;
        }
      }
    });
  }
  // openTab
  function openTab(tabId) {
    const tabLinks = document.querySelectorAll(".tabLinks");
    const tabContents = document.querySelectorAll(".tabContents");

    tabLinks.forEach((tab) => tab.classList.remove("active"));
    tabContents.forEach((tab) => tab.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    document.querySelector(`button[data-tab=${tabId}`).classList.add("active");
  }

  renderTabs();

  //   for start
  document.getElementById(tabActive).classList.add("active");
  document
    .querySelector(`button[data-tab=${tabActive}]`)
    .classList.add("active");
});
