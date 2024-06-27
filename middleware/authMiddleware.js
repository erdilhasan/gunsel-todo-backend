import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
}

export { verifyToken };
