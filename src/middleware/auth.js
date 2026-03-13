const admin = require("../config/firebaseAdmin");

const auth = (requiredRole = null) => {
    return async (req, res, next) => {
        // ✅ Các route không cần đăng nhập
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

        try {
            // 🔑 Lấy Firebase ID Token
            const authHeader = req.headers.authorization;
            const token = authHeader?.startsWith("Bearer ")
              ? authHeader.split("Bearer ")[1]
              : null;

            if (!token) {
                return res.status(401).json({ message: "Missing Firebase token" });
            }

            // 🔐 Verify token bằng Firebase Admin
            const decodedToken = await admin.auth().verifyIdToken(token);

            /*
              decodedToken sẽ có:
              - uid
              - email
              - role (custom claims)
            */
            req.user = decodedToken;

            // 🧠 Check role nếu cần
            if (requiredRole && decodedToken.role !== requiredRole) {
                return res.status(403).json({
                    message: "Forbidden - insufficient permission",
                });
            }

            next();
        } catch (err) {
            console.error("Auth error:", err);
            return res.status(401).json({
                message: "Invalid or expired Firebase token",
            });
        }
    };
};

module.exports = auth;
