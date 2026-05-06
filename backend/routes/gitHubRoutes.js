const express =
  require("express");

const router =
  express.Router();

router.get(
  "/:username",

  async (req, res) => {

    try {

      const username =
        req.params.username;

      const response =
        await fetch(
          `https://api.github.com/users/${username}`
        );

      const data =
        await response.json();

      res.json({

        publicRepos:
          data.public_repos || 0,

        followers:
          data.followers || 0,
      });
    }

    catch (err) {

      res.status(500).json({

        error:
          "GitHub fetch failed",
      });
    }
  }
);

module.exports =
  router;