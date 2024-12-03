const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const dbOptions = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ro0TpassWord7071!",
  database: "user_management",
});
const MySQLStore = require("express-mysql-session")(session);
const sessionStore = new MySQLStore({}, dbOptions);
sessionStore.on("error", (error) => {
  console.error("Session store error:", error);
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "cbxdU40jhU",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//post requests
app.post("/initial", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ status: "failed" });
  }

  try {
    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    const result = await new Promise((resolve, reject) => {
      dbOptions.query(query, [email, password], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });

    req.session.userId = result.insertId;
    req.session.email = email;

    res
      .status(201)
      .send({ status: "success", message: "User information updated" });
  } catch (err) {
    console.error("Error inserting user info:", err);
    return res.status(500).send({ status: "failed", message: "Server error" });
  }
});

app.post("/second-form", async (req, res) => {
  if (!req.session.userId) {
    return res
      .status(400)
      .send({ status: "failed", message: "User not logged in" });
  }

  const { aboutMe, address, birthday } = req.body;

  const queries = [];
  const values = [];

  if (aboutMe) {
    queries.push("about_me = ?");
    values.push(aboutMe);
  }

  if (address) {
    queries.push(
      "street_address = ?, city_address = ?, state_address = ?, zip_code_address = ?"
    );
    values.push(
      address.streetAddress,
      address.cityAddress,
      address.stateAddress,
      address.zipCodeAddress
    );
  }

  if (birthday) {
    queries.push("birthday = ?");
    values.push(birthday);
  }

  if (queries.length === 0) {
    return res
      .status(400)
      .send({ status: "failed", message: "No data provided" });
  }

  const query = `UPDATE users SET ${queries.join(", ")} WHERE id = ?`;
  values.push(req.session.userId);

  try {
    const result = await new Promise((resolve, reject) => {
      dbOptions.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });

    if (result.affectedRows > 0) {
      //checks whether the query successfully updated at least one row in the database.
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          return res
            .status(500)
            .send({ status: "failed", message: "Server error" });
        }
        res
          .status(200)
          .send({ status: "success", message: "User information updated" });
      });
    } else {
      return res.status(400).send({
        status: "failed",
        message: "No changes were made to user information",
      });
    }
  } catch (err) {
    console.error("Error inserting user info:", err);
    return res.status(500).send({ status: "failed", message: "Server error" });
  }
});

app.post("/third-form", async (req, res) => {
  if (!req.session.userId) {
    return res.status(400).send({
      status: "failed",
      message: "User not logged in.",
    });
  }

  const { aboutMe, address, birthday } = req.body;

  const queries = [];
  const values = [];

  if (aboutMe) {
    queries.push("about_me = ?");
    values.push(aboutMe);
  }

  if (address) {
    queries.push(
      "street_address = ?, city_address = ?, state_address = ?, zip_code_address = ?"
    );
    values.push(
      address.streetAddress,
      address.cityAddress,
      address.stateAddress,
      address.zipCodeAddress
    );
  }

  if (birthday) {
    queries.push("birthday = ?");
    values.push(birthday);
  }

  if (queries.length === 0) {
    return res
      .status(400)
      .send({ status: "failed", message: "No data provided" });
  }

  const query = `UPDATE users SET ${queries.join(", ")} WHERE id = ?`;
  values.push(req.session.userId);

  try {
    const result = await new Promise((resolve, reject) => {
      dbOptions.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating user info:", err);
          return res.status(500).send({
            status: "failed",
            message: "Server error occurred.",
          });
        }

        if (result.affectedRows > 0) {
          return res.status(200).send({
            status: "success",
            message: "User information updated successfully.",
          });
        } else {
          return res.status(400).send({
            status: "failed",
            message: "No updates made. User not found or data unchanged.",
          });
        }
      });
    });
  } catch (err) {
    console.error("Error updating user info:", err);
    return res.status(500).send({ status: "failed", message: "Server error" });
  }
});

//get requests
app.get("/user-data", async (req, res) => {
  const query = "SELECT * FROM users ORDER BY id DESC";

  try {
    const result = await new Promise((resolve, reject) => {
      dbOptions.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });

    if (result.length > 0) {
      res.status(200).send({ status: "success", userData: result });
    } else {
      res.status(404).send({
        status: "failed",
        message: "No user data found",
      });
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).send({ status: "failed", message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
