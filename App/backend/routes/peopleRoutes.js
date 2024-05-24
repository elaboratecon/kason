const express = require("express");
const router = express.Router();
const {
  getPeople,
  getPersonByID,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/peopleController");

// Unused code from the starter code
// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

router.get("/", getPeople);
router.get("/:id", getPersonByID);
router.post("/", createPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
