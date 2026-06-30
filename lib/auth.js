import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../config/db.js";

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
   "https://startupforge-client-gamma.vercel.app"
    
  ],
// hello
  secret: process.env.BETTER_AUTH_SECRET,
});

export default auth;