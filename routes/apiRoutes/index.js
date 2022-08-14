const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const notes = require("../../db/db.json");
router.get("/notes", (req, res) => {
  res.json(notes);
});
router.post("/notes", (req, res) => {
  if (req.body.title && req.body.text) {
    const notesArr = notes;
    req.body.id = uuid.v4();
    notesArr.push(req.body);
    fs.writeFileSync(
      path.join(__dirname + "../../../db/db.json"),
      JSON.stringify(notesArr),
      (err) => {
        if (err) throw err;
      }
    );
    res.json(req.body);
  } else {
    res.send("note needs title and text!");
  }
});
router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const notesArr = notes;
  for (let i = 0; i < notesArr.length; i++) {
    if (notesArr[i].id === id) {
      notesArr.splice(i, 1);
      break;
    }
  }
  fs.writeFileSync(
    path.join(__dirname + "../../../db/db.json"),
    JSON.stringify(notesArr),
    (err) => {
      if (err) throw err;
    }
  );
  res.send("note deleted");
});
module.exports = router;
