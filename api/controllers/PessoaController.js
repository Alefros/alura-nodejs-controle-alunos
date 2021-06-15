
const database = require('../models')
const Sequelize = require('sequelize')

const Services = require("../services/Services")
const pessoasServices = new Services('Pessoas')


class PessoaController{

    static async pegaTodasAsPessoas(req, res){
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaPessoasAtivas(req, res){
        try {
            const pessoasAtivas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(pessoasAtivas)
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

    //restaurar matricula

    static async restauraMatricula(req, res) {
        const idMatricula = req.params.matriculaId
        const idEstudante = req.params.estudanteId
        
        try {
            await database.Matriculas.restore( { 
                where: { 
                    id: Number(idMatricula),
                    estudante_id: Number(idEstudante)
                }
            })
            return res.status(200).json( { mensagem: `Matricula id ${idMatricula} do estudante ${idEstudante} restaurada com sucesso`})            
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async pegaMatriculas(req, res){
        const idEstudante = req.params.estudanteId
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(idEstudante) } })
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res){
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await database.Matriculas
            .findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            })
            return res.status(200).json(todasAsMatriculas)
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res){
        const { estudanteId } = req.params

        try {
            database.sequelize.transaction(async transacao => {
                await database.Pessoas
                    .update( { ativo: false }, 
                             { where: { id: Number(estudanteId) } }, 
                             { transaction: transacao})
                await database.Matriculas
                    .update( { status: 'cancelado' }, 
                             { where: { estudante_id: Number(estudanteId)}}, 
                             { transaction: transacao})
            })
            return res.status(200).json( { mensagem: `Matrículas dos estudante ${estudanteId} canceladas`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }




}

module.exports = PessoaController