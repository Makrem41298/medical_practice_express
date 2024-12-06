const UserModel = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({ error: 'Email and password are required' });
        }

        // Check if the user already exists
        let existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: 'User already exists' }); // 409 Conflict
        }

        // Hash the password
        const salt = await bcrypt.genSalt(12); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

        // Create the new user
        const newUser = await UserModel.create({
            username, // Include other fields from the request body
            email,
            password: hashedPassword,
        });

        // Send the response (excluding sensitive data)
        const { password: _, ...userWithoutPassword } = newUser.toObject(); // Exclude password from response
        return res.status(201).send({ user: userWithoutPassword });
    } catch (err) {
        // Log and handle errors
        console.error(err);
        return res.status(500).send({ error: 'An error occurred while registering the user' });
    }
};


exports.login=async(req,res)=>{
    try{
        let {email,password}=req.body
        if (email&&password){
            let user =await UserModel.findOne({email : email})
            if(user && await bcrypt.compare(password, user.password)){
                let token=jwt.sign({_id: user._id,role:'test'},process.env.JWT_SECRET)
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


