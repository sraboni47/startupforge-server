import { createRequire } from "module";
const require = createRequire(import.meta.url);


const express = require("express");
const { client } = require("../config/db");

const router = express.Router();

const userCollection = client.db("startupforgeDB").collection("users");

// Get User By Email
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const result = await userCollection.findOne({ email });

    res.send(result || {});
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Failed to fetch user",
    });
  }
});

// Create / Update Profile
router.put("/", async (req, res) => {
  try {
    const user = req.body;

    const filter = {
      email: user.email,
    };

    const updateDoc = {
      $set: {
        name: user.name,
        image: user.image,
        role: user.role,
        skills: user.skills,
        bio: user.bio,
        isBlocked: false,
      },
    };

    const options = {
      upsert: true,
    };

    const result = await userCollection.updateOne(filter, updateDoc, options);

    res.send(result);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Failed to update profile",
    });
  }
});

module.exports = router;
