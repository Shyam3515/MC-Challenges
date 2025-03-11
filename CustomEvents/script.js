//select an element
const button = document.getElementById("btn");
const button1 = document.getElementById("clickBtn");
const para = document.querySelector(".para");

//create a custom event and passing events down
let customEvents = new CustomEvent("myEvent", {
  detail: {
    msg: "Hello from Custom Event",
    timeStamp: new Date().toLocaleTimeString(),
    name: "John",
  },
});

//listen for the event
button.addEventListener("myEvent", (e) => {
  console.log(
    "Custom Event received by",
    e.detail.name,
    " and clicked at: ",
    e.detail.timeStamp
  );
});

//displatch event
button.dispatchEvent(customEvents);

/********************* 2222222222222222222222222222 **************************** */
/*****Create a custom event on click on an button****** */
const clickEvent = new CustomEvent("clickEvent", {
  detail: {
    clickedAt: new Date().toLocaleTimeString(),
  },
});

//listen For Event
button1.addEventListener("clickEvent", (e) => {
  para.innerText = `Clicked At: ` + e.detail.clickedAt;
});
//dispatch event
button1.addEventListener("click", () => {
  button1.dispatchEvent(clickEvent);
});

/***************************** 333333333333333333333333333333333333 ***************************** */
/************ Listen to global events *************** */
//create Global
const globalCustomEvent = new CustomEvent("globalEvent", {
  detail: {
    globalEve: "Global Event...",
  },
});

//listen for event on global
document.addEventListener("globalEvent", (e) => {
  console.log(e.detail.globalEve);
});

//dispatch Event after 2 seconds
setTimeout(() => {
  document.dispatchEvent(globalCustomEvent);
}, 2000);

/***************************** 44444444444444444444444444444 ***************************** */
/*********** Cancel Events ************* */
const CancelEvent = new CustomEvent("deleteEvent", {
  detail: {
    itemId: 101,
  },
  cancellable: true,
  // cancelable: true means the event can be canceled using e.preventDefault().
});

//listen event
document.addEventListener("deleteEvent", (e) => {
  if (!confirm(`Are you sure you want to delete item ${e.detail.itemId}?`)) {
    e.preventDefault(); // ❌ Cancels the event
    console.log("Delete action canceled!");
  }
});
/**
 * When the event fires, a confirmation popup appears.
 *  If the user clicks "Cancel", e.preventDefault() stops the event from completing.
 */

//dispatch event
if (!document.dispatchEvent(CancelEvent)) {
  console.log("The event was cancelled...");
}
/**
 * => dispatchEvent() fires the event.
   => If e.preventDefault() was called, dispatchEvent() returns false.
   => The condition if (!false) becomes true, and logs "The event was canceled.".
 */
