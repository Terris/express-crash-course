const express = require("express");
const members = require("../../models/Members");
const uuid = require("uuid");
const router = express.Router();

// Get Members
router.get("/", (req, res) => res.json(members));

// Get single Member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.find(member => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No member with id of ${req.params.id} was found.` });
  }
});

// Create Member
router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ msg: "Name and Email are required." });
  }
  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: "active"
  };
  members.push(newMember);
  res.json(newMember);
});

// Update member
// Get single Member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        return res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with id of ${req.params.id} was found.` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const memberIndex = members.findIndex(member => member.id === req.params.id);
  if (memberIndex !== -1) {
    members.splice(memberIndex, 1);
    res.json({
      msg: "Member deleted.",
      members
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with id of ${req.params.id} was found.` });
  }
});

module.exports = router;
