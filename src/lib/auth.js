import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let client;
if (process.env.NODE_ENV === "development") {
     if (!global._mongoClient) {
          global._mongoClient = new MongoClient(process.env.MONGODB_URI || process.env.BETTER_AUTH_URI);
     }
     client = global._mongoClient;
} else {
     client = new MongoClient(process.env.MONGODB_URI || process.env.BETTER_AUTH_URI);
}

const db = client.db();

export const auth = betterAuth({
     baseURL: process.env.BETTER_AUTH_URL,
     secret: process.env.BETTER_AUTH_SECRET,

     emailAndPassword: {
          enabled: true,
     },
     socialProviders: {
          google: {
               clientId: process.env.GOOGLE_CLIENT_ID,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
     },
     database: mongodbAdapter(db, {
          // Optional: if you don't provide a client, database transactions won't be enabled.
          client: client
     }),
     user: {
          additionalFields: {
               isPremium: {
                    type: "boolean",
                    defaultValue: false,
               },
               role: {
                    type: "string",
                    defaultValue: "user",
               }
          }
     },
});