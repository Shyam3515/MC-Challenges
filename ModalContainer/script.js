const button = document.querySelector(".modalButton");
const container = document.querySelector(".modalContainer");
button.addEventListener("click", () => {
  toggleModal(true);
});

function toggleModal(toggle) {
  console.log(toggle);
  container.style.display = toggle ? "flex" : "none";
}

container.addEventListener("click", (event) => {
  if (event.target.className === "modalContainer") toggleModal(false);
});
