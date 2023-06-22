const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World! NCN");
});
app.get("/name", (req, res) => {
  res.send("I`m Nguyen Cao Nguyen ");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
