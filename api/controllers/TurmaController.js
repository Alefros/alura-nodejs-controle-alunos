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

    static async pegaTurmaPorId(req, res){
        const idTurma = req.params.id

        try {
            const turmaConsultada = await database.Turmas.findOne( { where:{ id: Number(idTurma) }})
            res.status(200).json(turmaConsultada)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //create
    static async criaTurma(req, res){
        const novaTurma = req.body

        try {
            const turmaCriada = await database.Turmas.create(novaTurma)
            res.status(200).json(turmaCriada)
        } catch (error) {
            res.status(500).json(error)
        }

    }

    //update
    static async atualizaTurma(req, res){
        const idTurma = req.params.id
        const novosDados = req.body

        try {
            await database.Turmas.update(novosDados, { where:{ id: Number(idTurma) }})
            const turmaAtualizada = await database.Turmas.findOne({ where:{ id: Number(idTurma) }})
            res.status(200).json(turmaAtualizada)
        } catch (error) {
            res.status(500).json(error)
        }

    }

    //delete
    static async apagaTurma(req, res){
        const idTurma = req.params.id

        try {
            await database.Turmas.destroy({ where:{ id: Number(idTurma) }})
            res.status(200).json(`Turma ${idTurma} apagada com sucesso`)
        } catch (error) {
            res.status(500).json(error)
        }

    }

}

module.exports = TurmaController