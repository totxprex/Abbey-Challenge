const popup = function (message) {
  document.querySelector("body").insertAdjacentHTML(
    "beforebegin",
    `<div style="z-index: 3000" class="pop-up-cont" style="font-size:small;">
  <div class="pop-up-notification" style="font-size:small;">
  <img class="" title="Notifications" src="/notification.png" alt="Etap Notification">
  <p style="color:black; font-family: 'Poppins', sans-serif;font-size:small;">${message}</p>
  </div>
  </div>
  `
  );
  setTimeout(function () {
    document.querySelector(".pop-up-cont").remove();
  }, 5000);
};

export { popup };
