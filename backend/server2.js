import dotenv from "dotenv"; dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import { Strategy as SamlStrategy } from "@node-saml/passport-saml";
import axios from "axios";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { setupSessions } from "./utils/sessions.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import Log from "./models/Log.js";


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];
;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CERT_DIR = process.env.CERT_DIR || path.join(__dirname, "certs");

console.log("Using certificate directory:", CERT_DIR);

const app = express();
await setupSessions(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));


//Build URL variables bc we are good devs
const BASE_URL = process.env.BASE_URL || "https://ecetracks.byu.edu";
const CALLBACK_PATH = process.env.CALLBACK_PATH || "/api/auth/login/callback";
const LOGOUT_CALLBACK_PATH = process.env.LOGOUT_CALLBACK_PATH || "/api/auth/logout/callback";

//Read certs and keys in as vars bc we are still good devs

// Load certs/keys securely from env
const idpCert = fs.readFileSync(process.env.SAML_IDP_CERT, "utf8");
const spKey = fs.readFileSync(process.env.SAML_SP_KEY, "utf8");
const spCert = fs.existsSync(path.join(CERT_DIR, "SAML_sign_leaf.crt"))
  ? fs.readFileSync(path.join(CERT_DIR, "SAML_sign_leaf.crt"), "utf8") // optional but useful for metadata
  : null;

const samlStrategy = new SamlStrategy(
  {
    entryPoint: process.env.SAML_ENTRY_POINT,        // IdP login URL
    issuer: process.env.SAML_ISSUER,                 // Your SP entity ID
    callbackUrl: process.env.SAML_CALLBACK_URL,      // Where IdP posts back to
    cert: idpCert,                                   // IdP cert (validate assertions)
    privateKey: spKey,                               // Your SP private key (signing/decryption)

    logoutUrl: process.env.SAML_LOGOUT_URL,          // IdP logout endpoint
    logoutCallbackUrl: process.env.SAML_LOGOUT_CALLBACK_URL, // Your logout callback

    // 🔒 Security preferences
    signatureAlgorithm: "sha256",
    digestAlgorithm: "sha256",
    wantAssertionsSigned: true,          // Usually required
    wantAuthnResponseSigned: true,       // Safer than false (verify full response)
    validateInResponseTo: "always",      // Prevent replay attacks
    disableRequestedAuthnContext: false,
    identifierFormat: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
    authnContext: [
      "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
    ],
  },
  (profile, done) => {
    // User info from IdP
    return done(null, {
      id: profile.nameID,
      nameIDFormat: profile.nameIDFormat,
      attributes: profile, // full SAML attributes
    });
  }
);

passport.use(samlStrategy);

// Serialize user to session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login"); // send user to login page
}

// SAML login route (redirects user to IdP)
app.get(
  "/login",
  passport.authenticate("saml", { failureRedirect: "/", failureMessage: true })
);

// SAML callback route (IdP posts here)
app.post(
  "/login/callback",
  passport.authenticate("saml", { failureRedirect: "/", failureMessage: true }),
  (req, res) => {
    // Successful login
    res.redirect("/dashboard"); // Or wherever you want
  }
);

// SAML logout (SP-initiated)
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});



app.get('/api/leaderboard', ensureAuth, async (req, res) => {
  const { period } = req.query;
  const startDate = new Date();
  if (period === 'week') startDate.setDate(startDate.getDate() - 7);
  else if (period === 'month') startDate.setMonth(startDate.getMonth() - 1);
  else startDate.setFullYear(startDate.getFullYear() - 1);

  const leaderboard = await Log.aggregate([
    { $match: { date: { $gte: startDate } } }, // <-- Fix here
    {
      $group: {
        _id: '$userId',
        totalHours: { $sum: '$hours' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        username: '$user.username',
        totalHours: 1,
      },
    },
    { $sort: { totalHours: -1 } },
  ]);

  res.json(leaderboard);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

const PORT = process.env.PORT;
const IP = process.env.IP;
app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
