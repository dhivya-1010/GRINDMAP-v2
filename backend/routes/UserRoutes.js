const express =
  require("express");

const router =
  express.Router();

const User =
  require("../models/User");

// ================= SAVE USER =================

router.post(
  "/save",

  async (req, res) => {

    try {

      const {

        github,

        leetcode,

        codeforces,
      } = req.body;

      const newUser =
        await User.create({

          github,

          leetcode,

          codeforces,

          streak: 1,
        });

      res.json({

        success: true,

        user: newUser,
      });
    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          "Failed to save user",
      });
    }
  }
);

module.exports =
  router;