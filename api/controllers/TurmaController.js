const database = require('../models')

class TurmaController{

    static async pegaTodasTurmas(req, res){
        try {
            const todasTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        } 
    }

}

module.exports = TurmaController