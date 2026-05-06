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

          `https://leetcode-api-faisalshohag.vercel.app/${username}`
        );

      const data =
        await response.json();

      res.json({

        totalSolved:
          data.totalSolved || 0,

        easySolved:
          data.easySolved || 0,

        mediumSolved:
          data.mediumSolved || 0,

        hardSolved:
          data.hardSolved || 0,
      });
    }

    catch (err) {

      res.status(500).json({

        error:
          "LeetCode fetch failed",
      });
    }
  }
);

module.exports =
  router;