document.addEventListener("DOMContentLoaded", function () {
  const sw = document.querySelector(".scorewrapper");

  const webSocket = new WebSocket("ws://localhost:3000/score");

  webSocket.onopen = function (event) {
    webSocket.send(0);
  };

  webSocket.onmessage = function (event) {
    console.log(event.data);
    let score = document.createElement("div");
    score.textContent = event.data;
    sw.append(score);
  };
});
