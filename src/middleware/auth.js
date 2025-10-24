const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    // Các route không cần token
    const whiteLists = [
        "/login",
        "/register",
        "/send-otp",
        "/verify-otp",
    ];

    const isWhiteListed = whiteLists.some((path) =>
      req.originalUrl.startsWith("/api" + path)
    );

    if (isWhiteListed) return next();

    // Lấy token từ header hoặc cookie
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = tokenFromHeader || req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Token chưa được cung cấp" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin người dùng để dùng tiếp
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token hết hạn hoặc không hợp lệ" });
    }
};

module.exports = auth;
