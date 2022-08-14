const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();
router.get("/notes", (req, res) => {
  const notes = require("../../db/db.json");
  res.json(notes);
});
router.post("/notes", (req, res) => {
  const notesArr = require("../../db/db.json");
  req.body.id = uuid.v4();
  console.log(req.body);
  notesArr.push(req.body);
  fs.writeFileSync(
    path.join(__dirname + "../../../db/db.json"),
    JSON.stringify(notesArr),
    (err) => {
      if (err) throw err;
    }
  );
  res.json(req.body);
});
module.exports = router;
