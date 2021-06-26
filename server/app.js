const dotenv = require("dotenv");
const dotenvConfig = dotenv.config();
const express = require("express");

//const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(logger("dev"));

//app.use(express.static("public"));

app.use(
  cors({
    origin: "*",
  })
);
const donationRoute = require("./routes/openDonationRoutes");
app.use(donationRoute);
const userRoutes = require("./routes/userRoutes");
app.use("/api/weShare", userRoutes);

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
    message: "Route does't exist, please check youre Route again.",
  })
);

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `SERVER IS RUNNING ON PORT 8080 || ENV PORT : ${process.env.PORT}`
  );
});
