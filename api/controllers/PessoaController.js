//const { where } = require('sequelize/types')
const database = require('../models')

class PessoaController{

    static async pegaTodasAsPessoas(req, res){
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res){
        const idPessoa = req.params.id
        
        try {
            const umaPessoa = await database.Pessoas.findOne( {
                where: { 
                    id: Number(idPessoa)
                }
            } )    
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res){
        const novaPessoa = req.body

        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }

    //update
    static async atualizaPessoa(req, res){
        const idPessoa = req.params.id
        const novasInfos = req.body

        try {
            await database.Pessoas.update(novasInfos,  { where: { id: Number(idPessoa) }})
            const pessoaAtualizada = await database.Pessoas.findOne( { where: { id: Number(idPessoa) }})
            return res.status(200).json(pessoaAtualizada)    
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //delete
    static async apagaPessoa(req, res){
        const idPessoa = req.params.id

        try {
            await database.Pessoas.destroy( { where: { id: Number(idPessoa) }})
            return res.status(200).json(`Pessoa id = ${idPessoa} deletada com sucesso`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //restore 
    static async restauraPessoa(req, res){
        const idPessoa = req.params.id

        try {
            await database.Pessoas.restore( { where: { id: Number(idPessoa) }})
            return res.status(200).json( { mensagem: `Pessoa id = ${idPessoa} restaurada com sucesso` })
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }

    static async pegaUmaMatricula(req, res){
        const idEstudante = req.params.estudanteId
        const matriculaId = req.params.matriculaId

        console.log(req.params)
        
        try {
            const umaMatricula = await database.Matriculas.findOne( {
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(idEstudante)
                }
            } )    
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res){
        const idEstudante = req.params.id
        const novaMatricula = { ...req.body, estudante_id: Number(idEstudante) }

        console.log(req.body)
        console.log(novaMatricula)

        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res){
        const idEstudante = req.params.estudanteId
        const idMatricula = req.params.matriculaId
        const novasInfos = req.body

        console.log("Teste")
        console.log(`Estudante = ${idEstudante}`)
        console.log(`Matricula = ${idMatricula}`)
        console.log(novasInfos)

        try {
            /**/   
            await database.Matriculas.update(novasInfos,  { 
                where: { 
                    id: Number(idMatricula),
                    estudante_id: Number(idEstudante)
                }})
            const matriculaAtualizada = await database.Matriculas.findOne( { where: { id: Number(idMatricula) }})
            return res.status(200).json(matriculaAtualizada) 
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req, res){
        //const idEstudante = req.params.estudanteId
        const idMatricula = req.params.matriculaId

        try {
            await database.Matriculas.destroy( { where: { id: Number(idMatricula) }})
            return res.status(200).json(`Matricula id = ${idMatricula} deletada com sucesso`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }



}

module.exports = PessoaController