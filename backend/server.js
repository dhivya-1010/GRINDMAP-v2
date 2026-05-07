const express =
  require("express");

const cors =
  require("cors");

const sequelize =
  require("./config/db");

const User =
  require("./models/User");

const githubRoutes =
  require("./routes/githubRoutes");

const leetcodeRoutes =
  require("./routes/leetcodeRoutes");

const codeforcesRoutes =
  require("./routes/codeforcesRoutes");

const userRoutes =
  require("./routes/userRoutes");

require("dotenv")
  .config();

const app =
  express();

// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

// ================= ROUTES =================

app.use(
  "/api/github",
  githubRoutes
);

app.use(
  "/api/leetcode",
  leetcodeRoutes
);

app.use(
  "/api/codeforces",
  codeforcesRoutes
);

app.use(
  "/api/users",
  userRoutes
);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {

  res.send(
    "GrindMap Backend Running 🚀"
  );
});

// ================= DATABASE =================

sequelize
  .sync()

  .then(() => {

    console.log(
      "Database Synced 🚀"
    );
  })

  .catch((err) => {

    console.log(
      "Database Error:",
      err
    );
  });

// ================= SERVER =================

const PORT =
  process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(

    `Server running on ${PORT}`
  );
});