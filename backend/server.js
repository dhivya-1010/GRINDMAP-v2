const express =
  require("express");

const cors =
  require("cors");

const githubRoutes =
  require("./routes/githubRoutes");

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