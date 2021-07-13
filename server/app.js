const dotenv = require("dotenv");
const dotenvConfig = dotenv.config();
const express = require("express");

//const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logger("dev"));

//app.use(express.static("public"));

app.use(
  cors({
    origin: "*",
  })
);
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const donationTypeRoutes = require("./routes/donationTypeRoutes");
const donatureRoutes = require("./routes/donatureRoutes");
const openDonation = require("./routes/openDonationRoutes");

app.use("/api/weShare", userRoutes, categoryRoutes, donationTypeRoutes, donatureRoutes, openDonation);

app.get("/", (req, res) => {
  res.send({
    status_code: 200,
    status_message: "Success",
    message: "Welcome to weShare API",
  });
});

app.all("*", (req, res) =>
  res.status(404).json({
    statusText: "Not Found",
    message: "Route doesn't exist, please check youre Route again.",
  })
);

app.listen(process.env.PORT || 8080, () => {
  console.log(`SERVER IS RUNNING ON PORT 8080 || ENV PORT : ${process.env.PORT}`);
});
