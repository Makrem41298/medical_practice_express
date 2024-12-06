const jwt=require('jsonwebtoken');
exports.verifyToken=(req, res, next)=>{
    const  token=req.header['authorization']||req.body.token || req.headers['acces']

    try {
    if(!token) {
        return res.status(401).send({error: "Token missing"});
    }else{
        const  decoed=jwt.verify(token, process.env.JWT_SECRET);

            req.user=decoed.userId;
            return next();
    }
        }catch(err){
            return res.status(401).send({error:err});
        }

}
