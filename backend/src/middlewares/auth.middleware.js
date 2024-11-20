const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(403).send({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ message: "Invalid or expired token:" + error.message });
  }
};

module.exports = verifyToken;
