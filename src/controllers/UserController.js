import User from '../models/User.js'
import {hashPassword,verifyPassword} from '../config/password.js'
export const getById = async (req,res)=>{
    try {
        
        const{id} = req.params;
        const user = await User.findByPk(id,{
            attributes:['id','firstname','surname','email']
        })
        if(!user){
            return res.status(404).json({
                message: "Usuário não encontrado :("
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
export const create = async(req, res)=>{
    try {
        const {firstname, surname,email,password,confirmpassword} = req.body
        if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Senha deve ter no mínimo 8 caracteres"
      })
    }

    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "As senhas não coincidem"
      })
    }

    const hashedPassword = await hashPassword(password)
        const user = await User.create({
            firstname,
            surname,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            success:true,
            message:"Usuario criado com sucesso",
            data:{
                firstname:user.firstname,
                surname:user.surname,
                email:user.email
            }
        })
    } catch (error) {
        return res.status(400).json({
            message:`erro ao cadastrar ususario ${error.message}`})
        }
}
export const update = async (req,res)=>{
    const {id} = req.params;
    const {firstname, surname,email} = req.body;
    const user = await User.findByPk(id);

}