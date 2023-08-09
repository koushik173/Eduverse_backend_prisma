//bring in prisma and cookie
// const ObjectId = require('mongodb').ObjectId;
const prisma = require('../prisma/index')

const cookieToken = require('../utils/cookieToken')

//user signup
exports.signup = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { name, email, password, phone, occupation } = req.body
        // Check if any of the fields are missing

        if (!name || !email || !password || !phone || !occupation) {
            const message = "Please provide all fields";
            return res.send({ acknowledged: false, message });
        }

        const alreadyCreated = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (alreadyCreated) {
            const message = "Already Have an account with this email"
            return res.send({ acknowledged: false, message })
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                phone,
                occupation,
                verify: false
            }
        })

        //send user a token 
        cookieToken(user, res)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        //take info from user
        const { email, password } = req.body

        if (!email || !password) {
            const message = "Please provide all fields"
            return res.send({ acknowledged: false, message })
        }

        //find a user based on email
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        //when there is no user
        if (!user) {
            const message = "User Not Found"
            return res.send({ acknowledged: false, message })
        }
        //password mismatch
        else if (user.password != password) {
            const message = "Password Not Matched"
            return res.send({ acknowledged: false, message })
        }
        else if(!user.verify){
            const message = "Please Verify Your Email"
            return res.send({ acknowledged: false, message })
        }
        else{
            cookieToken(user, res)
        }    

    } catch (error) {
        throw new Error(error)
    }
}

//logout user
exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.json({
            success: true
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.userVerify = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.params.id } });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await prisma.userToken.findUnique({ where: { token: req.params.token } });
        if (!token) return res.status(400).send({ message: "Invalid link" });
        // console.log(token);

        await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                verify: true
            },
        });
        await prisma.userToken.update({ 
            where: { 
                token: req.params.token 
            },
            data:{
                token: 'time out'
            }
         });

        // console.log(emailVerify);
        res.status(200).send({ message: "Email verified successfully" });


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}