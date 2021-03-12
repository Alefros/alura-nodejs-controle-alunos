const database = require('../models')

class NivelController {

    static async pegaTodosNiveis(req, res){

        try {
            const todosNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = NivelController