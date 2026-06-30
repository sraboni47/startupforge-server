const express = require("express");
const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const router = express.Router();

const startupCollection = client.db("startupforgeDB").collection("startups");

// Get all startups
router.get("/", async (req, res) => {
  try {
    const startups = await startupCollection.find().toArray();
    res.send(startups);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to fetch startups",
    });
  }
});

// Get startups by founder email
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const startups = await startupCollection
      .find({
        founderEmail: email,
      })
      .toArray();

    res.send(startups);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to fetch startups",
    });
  }
});

// Create startup
router.post("/", async (req, res) => {
  try {
    const startup = req.body;

    const result = await startupCollection.insertOne(startup);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to create startup",
    });
  }
});

// Update startup
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const startup = req.body;

    const result = await startupCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: startup,
      },
    );

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to update startup",
    });
  }
});

// Delete startup
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await startupCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to delete startup",
    });
  }
});

module.exports = router;
