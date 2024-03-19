const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://guesmisinda123:Sindafifi123@cluster0.8hyag9a.mongodb.net/person"
    )
    .then(() => console.log("daatabase Connected !!"))
    .catch((err) => console.log(err));
};

module.exports = connect;
