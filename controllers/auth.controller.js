const UserModel = require("../models/User.model")
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const crypto = require('crypto');

const emailForgetPassword=require('../mail/email')

exports.register = async (req, res) => {
    try {
        const { email, password, username,role } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: 'Email and password are required' });
        }

        // Check if the user already exists
        let existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: 'User already exists' }); // 409 Conflict
        }

        const salt = await bcrypt.genSalt(12); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            username,
            email,
            role,
            password: hashedPassword,
        });

        const { password: _, ...userWithoutPassword } = newUser.toObject(); // Exclude password from response
        return res.status(201).send({ user: userWithoutPassword });
    } catch (err) {
        // Log and handle errors
        console.error(err);
        return res.status(500).send({ error: 'An error occurred while registering the user' })
    }
};


exports.login=async(req,res)=>{
    try{
        let {email,password}=req.body
        if (email&&password){
            let user =await UserModel.findOne({email : email})
            if(user && await bcrypt.compare(password, user.password)){
                let token=jwt.sign({_id: user._id,role:user.role},process.env.JWT_SECRET)
                res.send({username :user.username,token :token})
            }


            else
                res.status(403).send({message:'Invalide credentails or email invalide'})
        }else
            res.status(403).send({message:'Missing fields'})

    }catch(err){
        console.log(err)
        res.status(444).send(err)

    }
}
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        await user.save();

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Generate reset key using JWT
        const restKey = jwt.sign(
            { _id: user._id, role: 'test' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log("Generated Reset Key:", restKey);

        await emailForgetPassword.sendMailForgetPassword(email, restKey);

        user.restKey = restKey;
        user.save()

        res.status(200).send({ message: "Reset password email sent successfully." });
    } catch (err) {
        console.error("Error in forgotPassword handler:", err);
        res.status(500).send({ message: "An error occurred.", error: err });
    }
};
exports.restorePassword=async(req,res)=>{
     const  {newPassword,restKey}=req.body
    try {
        if (newPassword && restKey){
            let user = await UserModel.findOne({restKey : restKey})
            if(user){
                const salt = await bcrypt.genSalt(12); // Generate a salt
                user.password = await bcrypt.hash(newPassword, salt);
                user.restKey=crypto.randomBytes(32).toString('hex');
                user.save()


                res.status(201).send({ message: "Reset password successfully." });
            }
        }else
            res.status(403).send({message:'Missing fields'})

    }catch(err){
         console.error(err);
         res.status(500).send({ message: "An error occurred.", error: err });

    }

}
exports.userProfile=async (req, res) => {
    let user = await UserModel.findById(req.user_id).select('-password');
    res.status(200).send({userProfile: user});
}

