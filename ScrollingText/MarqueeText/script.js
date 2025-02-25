const stocker = document.querySelector(".stock-ticker ul");
const stockLi = document.querySelectorAll(".stock-ticker ul li");

let liText = "";
let liTimeSet = 0;
stockLi.forEach((li) => {
  // console.log(li.innerText);
  liText += li.innerText;
});
console.log(liText.length);

if (liText.length >= 0 && liText.length < 100) {
  liTimeSet = 12;
} else if (liText.length >= 100 && liText.length < 200) {
  liTimeSet = 20;
} else if (liText.length >= 200 && liText.length <= 400) {
  liTimeSet = 45;
} else {
  liTimeSet = 60;
}

// stocker.style.animationDuration = `${liTimeSet}s`;
stocker.style.animation = `scroll ${liTimeSet}s linear infinite`;
