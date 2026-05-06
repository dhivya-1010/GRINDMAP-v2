export default async function handler(
  req,
  res
) {

  const { username } = req.query;

  try {

    const response =
      await fetch(
        `https://leetcode-api-faisalshohag.vercel.app/${username}`
      );

    const data =
      await response.json();

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      error:
        "Failed to fetch LeetCode data",
    });

  }
}