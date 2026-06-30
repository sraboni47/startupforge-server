const express = require("express");
const { client } = require("../config/db");

const router = express.Router();

const opportunityCollection = client
  .db("startupforgeDB")
  .collection("opportunities");

const opportunities = require("../seed/opportunities");

router.get("/", async (req, res) => {
  try {
    await opportunityCollection.deleteMany({});

    await opportunityCollection.insertMany(opportunities);

    res.send({
      message: "Database Seeded Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;