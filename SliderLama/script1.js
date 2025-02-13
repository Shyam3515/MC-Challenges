let next = document.querySelector(".nxt");
let prev = document.querySelector(".prev");
let slider = document.querySelector(".slider");
let images = document.querySelectorAll(".slider img");

let slideNum = 1;
let length = images.length;

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
});

//*** prevslide ***
function prevSlide() {
  slider.style.transform = `translateX(-${(slideNum - 2) * 550}px)`;
  slideNum--;
}

const getLastSlide = () => {
  slider.style.transform = `translateX(-${(length - 1) * 550}px)`; // 500px is the width of the image
  slideNum = length;
};

prev.addEventListener("click", () => {
  slideNum > 1 ? prevSlide() : getLastSlide();
});
