import express from "express";
import { client } from "../config/db.js";
import opportunities from "../seed/opportunities.js";

const router = express.Router();

const opportunityCollection = client
  .db("startupforgeDB")
  .collection("opportunities");

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

export default router;