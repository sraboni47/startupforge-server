const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { client } = require("../config/db");

const auth = betterAuth({
  database: mongodbAdapter(client.db("startupforgeDB")),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

 trustedOrigins: [
  "http://localhost:3000",
 
],



  secret: process.env.BETTER_AUTH_SECRET,
});

module.exports = auth;