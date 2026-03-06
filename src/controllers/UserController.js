import User from '../models/User.js'
import { hashPassword, verifyPassword } from '../config/password.js'
export const getById = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'firstname', 'surname', 'email']
        })
        if (!user) {
            return res.status(404).json({
                message: `User with id ${id}not found`
            })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            message:
                error.message
        })
    }
}
export const create = async (req, res) => {
    try {
        const { firstname, surname, email, password, confirmpassword } = req.body
        if (!password || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            })
        }

        if (password !== confirmpassword) {
            return res.status(400).json({
                message: "Passwords dont match, try again"
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            firstname,
            surname,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                firstname: user.firstname,
                surname: user.surname,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: `erro ao cadastrar ususario ${error.message}`
        })
    }
}
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, surname, email } = req.body
        const [user] = await User.update({ firstname, surname, email },
            {where: {id}}
        );
        if (!user) {
            return res.status(404).json({
                message: `User with id ${id} not found`
            })
        }
        return res.status(204).send();

    } catch (error) {
            return res.status(400).json({
                message: ``,
                error: error.errors
            })
    }
}
export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id: id }
        })
        if (!deleted) {
            return res.status(404).json({
                message: `User with id ${id} not found`
            })
        }

        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error`,
            error: error.message
        })
    }
}