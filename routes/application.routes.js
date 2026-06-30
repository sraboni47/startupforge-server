import express from "express";
import { ObjectId } from "mongodb";
import { client } from "../config/db.js";

const router = express.Router();

const applicationCollection = client
  .db("startupforgeDB")
  .collection("applications");

// GET All Applications
router.get("/", async (req, res) => {
  try {
    const result = await applicationCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to fetch applications",
    });
  }
});

// POST Application
router.post("/", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const result = await applicationCollection.insertOne(req.body);

    console.log("INSERT RESULT:", result);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to submit application",
    });
  }
});

// DELETE Application
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await applicationCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to delete application",
    });
  }
});

export default router;