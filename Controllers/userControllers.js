//bring in prisma and cookie

const prisma = require('../prisma/index')

const cookieToken = require('../utils/cookieToken')

//user signup
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        // Check if any of the fields are missing

        if (!name || !email || !password) {
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
            }
        })

        //send user a token 
        cookieToken(user, res)
    } catch (error) {
        throw new Error(error)
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
        if (user.password != password) {
            const message = "Password Not Matched"
            return res.send({ acknowledged: false, message })
        }

        //user is there and validation
        cookieToken(user, res)

    } catch (error) {
        throw new Error(error)
    }
}

//logout user
exports.logout = async (req, res, nect) => {
    try {
        res.clearCookie('token')
        res.json({
            success: true
        })
    } catch (error) {
        throw new Error(error)
    }
}