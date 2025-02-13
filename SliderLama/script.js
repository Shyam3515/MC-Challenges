let next = document.querySelector(".nxt");
let prev = document.querySelector(".prev");
let slider = document.querySelector(".slider");
let images = document.querySelectorAll(".slider img");
let bottom = document.querySelector(".bottom");

let slideNum = 1;
let length = images.length;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//*** nextslide ***
function nextSlide() {
  slider.style.transform = `translateX(-${slideNum * 550}px)`;
  slideNum++;
}

const getFirstSlide = () => {
  slider.style.transform = `translateX(0px)`;
  slideNum = 1;
};

next.addEventListener("click", (e) => {
  slideNum < length ? nextSlide() : getFirstSlide();
  changeColor();
});

//*** prevslide ***
function prevSlide() {
  slider.style.transform = `translateX(-${(slideNum - 2) * 550}px)`;
  slideNum--;
}

const getLastSlide = () => {
  slider.style.transform = `translateX(-${(length - 1) * 550}px)`; // 550px is the width of the image
  slideNum = length;
};

prev.addEventListener("click", () => {
  slideNum > 1 ? prevSlide() : getLastSlide();
  changeColor();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const resetBg = () => {
  buttons.forEach((button) => {
    button.style.backgroundColor = "transparent";
  });
};

//resetting the colors to all pointers after adding the color to pointer in given function
const changeColor = () => {
  resetBg();
  buttons[slideNum - 1].style.backgroundColor = "white";
};

//creating buttons with JS
for (let i = 0; i < length; i++) {
  let div = document.createElement("div");
  div.className = "button";
  bottom.appendChild(div);
}

//adding color to the first pointer
const buttons = document.querySelectorAll(".button");
buttons[0].style.backgroundColor = "white";

//pointer functionality
buttons.forEach((button, idx) => {
  button.addEventListener("click", () => {
    slider.style.transform = `translateX(-${idx * 550}px)`;
    slideNum = idx + 1;
    resetBg();
    button.style.backgroundColor = "white";
  });
});
