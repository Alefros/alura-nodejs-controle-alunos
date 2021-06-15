const database = require('../models')

const Services = require('../services/Services')
const niveisServices = new Services('Niveis')

class NivelController {

    static async pegaTodosNiveis(req, res){

        try {
            const todosNiveis = await niveisServices.pegaTodosOsRegistros()
            return res.status(200).json(todosNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmNivel(req, res){

        const idNivel = req.params.id
        try {
            const nivel = await database.Niveis.findOne({ 
                where: { 
                    id: Number(idNivel)
                } 
            })
            res.status(200).json(nivel)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async criaNivel(req, res){
        const novoNivel = req.body

        try {
            const nivelCriado = await database.Niveis.create(novoNivel)
            res.status(200).json(nivelCriado)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //update
    static async atualizaNivel(req, res){
        const idNivel = req.params.id
        const novosDados = req.body

        try {
            await database.Niveis.update(novosDados, { where: { id: Number(idNivel) }})
            const novoNivel = await database.Niveis.findOne({ where: { id: Number(idNivel) }})
            res.status(200).json(novoNivel)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //delete
    static async apagaNivel(req, res){
        const idNivel = req.params.id

        try {
            await database.Niveis.destroy( { where: { id: Number(idNivel) }})
            res.status(200).json(`Nivel id ${idNivel} apagado com sucesso`)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //restore
    static async restauraNivel(req, res) {
        const idNivel = req.params.id;

        try {
            await database.Niveis.restore( { where: { id: Number(idNivel) }})
            res.status(200).json( { mensagem: `Nivel id ${idNivel} restaurado com sucesso` })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = NivelController