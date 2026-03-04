import Users from '../models/Users.js'
export const getById = async (req,res)=>{
    try {
        const{id} = req.params;
        const user = await Users.findByPk(id,{
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