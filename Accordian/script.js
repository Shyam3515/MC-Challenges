let sections = [
  { title: "Section1", content: "Content for section1" },
  { title: "Section2", content: "Content for section2" },
  { title: "Section3", content: "Content for section3" },
];
document.addEventListener("DOMContentLoaded", () => {
  let accordianContainer = document.getElementById("accordian");

  sections.forEach((section, index) => {
    let sectionItem = document.createElement("div");
    sectionItem.className = "sectionItem";

    let sectionHeader = document.createElement("div");
    sectionHeader.className = "sectionHeader";
    sectionHeader.innerText = section.title;

    let sectionContent = document.createElement("div");
    sectionContent.className = "sectionContent";
    sectionContent.innerText = section.content;

    sectionItem.appendChild(sectionHeader);
    sectionItem.appendChild(sectionContent);
    accordianContainer.appendChild(sectionItem);

    if (index === 0) {
      //to make only first one display on load
      sectionItem.classList.add("active");
      sectionContent.style.display = "block";
    }
  });

  accordianContainer.addEventListener("click", (event) => {
    let header = event.target.closest(".sectionHeader");
    console.log(header); //returns clicked sectionHeader...

    if (!header) return;
    let parent = header.parentNode; //gets sectionItem of clicked header;
    let content = parent.querySelector(".sectionContent"); //gets content of parent

    // If active remove all active classes
    const isActive = parent.classList.contains("active");
    document.querySelectorAll(".sectionItem").forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".sectionContent").style.display = "none"; //display none to all contents
    });

    // If not active..
    if (!isActive) {
      parent.classList.add("active");
      content.style.display = "block";
    }
  });
});
