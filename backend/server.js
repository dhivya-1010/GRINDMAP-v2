const express =
  require("express");

const cors =
  require("cors");

const githubRoutes =
  require("./routes/githubRoutes");
const leetcodeRoutes =
  require("./routes/leetcodeRoutes");

const codeforcesRoutes =
  require("./routes/codeforcesRoutes");

require("dotenv")
  .config();

const app =
  express();

app.use(cors());

app.use(express.json());
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

app.get("/", (req, res) => {

  res.send(
    "GrindMap Backend Running 🚀"
  );
});

const PORT =
  process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(

    `Server running on ${PORT}`
  );
});