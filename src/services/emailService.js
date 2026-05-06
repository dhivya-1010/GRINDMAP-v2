import emailjs from "@emailjs/browser";

export const sendStreakMail =
  async (
    name,
    email,
    streak
  ) => {

    try {

      await emailjs.send(

        "service_wmwt7pc",

        "template_ursnkvq",

        {
          name,
          to_email: email,
          streak,
        },

        "owE0qy74umj99i024"
      );

      console.log(
        "Email sent successfully"
      );

    }

    catch (err) {

      console.error(
        "Email error:",
        err
      );

    }
};