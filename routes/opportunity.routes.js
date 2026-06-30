import express from "express";
import { ObjectId } from "mongodb";
import { client } from "../config/db.js";

const router = express.Router();

const opportunityCollection = client
  .db("startupforgeDB")
  .collection("opportunities");

// GET All Opportunities
router.get("/", async (req, res) => {
  try {
    const opportunities = await opportunityCollection.find().toArray();
    res.send(opportunities);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to fetch opportunities",
    });
  }
});

// Get opportunities by founder email
router.get("/founder/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const opportunities = await opportunityCollection
      .find({
        founderEmail: email,
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.send(opportunities);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to fetch opportunities",
    });
  }
});

// GET Single Opportunity
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const opportunity = await opportunityCollection.findOne({
      _id: new ObjectId(id),
    });

    res.send(opportunity);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to fetch opportunity",
    });
  }
});

// POST Opportunity
router.post("/", async (req, res) => {
  try {
    const result = await opportunityCollection.insertOne(req.body);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to add opportunity",
    });
  }
});

// UPDATE Opportunity
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await opportunityCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedData,
      }
    );

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to update opportunity",
    });
  }
});

// DELETE Opportunity
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await opportunityCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to delete opportunity",
    });
  }
});

export default router;