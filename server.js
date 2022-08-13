const htmlRoutes = require("./routes/htmlRoutes");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", htmlRoutes);
app.listen(PORT, () => {
  console.log(`server live on ${PORT}`);
});
