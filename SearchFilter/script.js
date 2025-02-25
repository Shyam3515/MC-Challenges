let lists = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "papaya",
];
const search = document.getElementById("search");
const list = document.getElementById("list");
const input = document.getElementById("input");
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function render(listArray) {
  list.innerHTML = "";
  console.log("render");
  listArray.forEach((listItem) => {
    const li = document.createElement("li");
    li.textContent = listItem;
    list.appendChild(li);
  });
}
render(lists);

search.addEventListener("click", (e) => {
  const searchInput = input.value.toLowerCase().trim();
  if (searchInput === "") {
    alert("Please enter a value to search");
    return;
  }
  let filtered = lists.filter((listItem) =>
    listItem.toLowerCase().includes(searchInput)
  );
  render(filtered);
});
