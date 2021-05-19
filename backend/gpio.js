const Gpio = require("onoff").Gpio;
const button = new Gpio(4, "in", "both");

button.watch((err, value) => {
  console.log(value);
});
