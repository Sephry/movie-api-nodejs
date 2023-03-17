const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://Sephry:gzPQ2xBi11jqLbYP@sephrymovieapi.bs2vyey.mongodb.net/movie_api"
  );
  mongoose.connection.on("open", () => {
    console.log("MongoDB : Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB : Error", err);
  });

  mongoose.Promise = global.Promise;
};
