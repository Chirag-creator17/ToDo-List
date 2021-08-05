const express = require("express");
const app = express();
const date=require(__dirname+'/date.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let items = ["Buying Cookies", "Buying vegetables"];
let workItems = [];

app.get("/", (req, res) => {
    let day=date;
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});
app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});