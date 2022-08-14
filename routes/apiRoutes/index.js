const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const notes = require("../../db/db.json");
router.get("/notes", (req, res) => {
  res.json(notes);
});
//wrote post and delete functions within the request, if this app were to scale, best practice would be do modulerize these functions
router.post("/notes", (req, res) => {
  //validate req on back gend
  if (req.body.title && req.body.text) {
    const notesArr = notes;
    //using uuid.v4 to create a random uuid
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
  //searches for object with matching id and splices it out
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
