const progressContainer = document.querySelector(".progressContainer");
const para = document.querySelector(".progress");

const textContent = document.querySelector(".innerText");
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  console.log("ReadyState:", xhr.readyState);

  if (xhr.readyState === 1) {
    // Opened
    para.style.width = `20%`;
    textContent.innerText = "20% - Request Opened";
  } else if (xhr.readyState === 2) {
    // Headers received
    para.style.width = `40%`;
    textContent.innerText = "40% - Request Sent";
  } else if (xhr.readyState === 3) {
    // Loading (Downloading in progress)
    para.style.width = `60%`;
    textContent.innerText = "60% - Loading Data...";
  } else if (xhr.readyState === 4) {
    // Done (Response received)
    if (xhr.status === 200) {
      para.style.width = `100%`;
      textContent.innerText = "100% - Load Complete";
    } else {
      para.style.width = `50%`;
      textContent.innerText = "Error Loading Data";
    }
  }
};

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true); //xhr.open(method, url, async)
xhr.send();
