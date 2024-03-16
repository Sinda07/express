const express = require("express");
const app = express();
const PORT = 4000;

const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send(
      "The website is only available during working hours (Monday to Friday, 9 AM to 5 PM)."
    );
  }
};

app.use(express.static("public"));

app.get("/", checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/services", checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + "/views/services.html");
});

app.get("/contact", checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
