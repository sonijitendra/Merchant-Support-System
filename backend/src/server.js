const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const connectDatabase = require("./config/db");

const port = process.env.PORT || 5000;

const startServer = () => {
  connectDatabase()
    .then((connectedToMongo) => {
      if (!connectedToMongo) {
        console.log("Running with in-memory ticket storage.");
      }
    })
    .catch((error) => {
      console.error("MongoDB connection error.", error);
    });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
};

startServer();
