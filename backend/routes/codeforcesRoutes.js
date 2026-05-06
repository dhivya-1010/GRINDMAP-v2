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

      const infoRes =
        await fetch(

          `https://codeforces.com/api/user.info?handles=${username}`
        );

      const infoData =
        await infoRes.json();

      const user =
        infoData.result[0];

      const subRes =
        await fetch(

          `https://codeforces.com/api/user.status?handle=${username}`
        );

      const subData =
        await subRes.json();

      const solvedSet =
        new Set();

      subData.result.forEach(
        (sub) => {

          if (
            sub.verdict ===
            "OK"
          ) {

            solvedSet.add(

              `${sub.problem.contestId}-${sub.problem.index}`
            );
          }
        }
      );

      res.json({

        rating:
          user.rating || 0,

        solved:
          solvedSet.size || 0,

        todaySubmissions:
          subData.result.length,
      });
    }

    catch (err) {

      res.status(500).json({

        error:
          "Codeforces fetch failed",
      });
    }
  }
);

module.exports =
  router;