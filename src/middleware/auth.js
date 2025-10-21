const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
    //không cần gửi kèm accessToken ở headers với login và register
    const whiteLists=["/", "/register", "/login"]
    console.log(req.originalUrl)

    if(whiteLists.find(item=> "/api" + item === req.originalUrl)) {
        next()
    }else{
        if(req.headers&&req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            //verify
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET,);
                console.log("decoded Token:", decoded);
                req.user = decoded;
                next();
            }catch(err){
                return res.status(401).json({
                    message:"Token hết hạn hoặc không hợp lệ",
                });
            }
        }else{
            return res.status(401).json({
                message:"Token chưa được cung cấp",
            });
        }
    }
};

module.exports = auth;
