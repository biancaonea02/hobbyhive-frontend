module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "GET") {
    // Handle GET request logic
    const responseData = {
      message: "Hello from Vercel!",
    };
    res.status(200).json(responseData);
  } else {
    res.status(404).send("Not Found");
  }
};
