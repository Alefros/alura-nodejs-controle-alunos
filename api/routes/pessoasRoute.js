const { Router } = require('express')
const { route } = require('..')
const PessoaController = require ('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.pegaPessoasAtivas)

router.get('/pessoas/todos', PessoaController.pegaTodasAsPessoas)

router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)

router.post('/pessoas', PessoaController.criaPessoa)

router.put('/pessoas/:id', PessoaController.atualizaPessoa)

router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

router.delete('/pessoas/:id', PessoaController.apagaPessoa)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)

router.post('/pessoas/:id/matricula', PessoaController.criaMatricula)

router.post('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.restauraMatricula)

router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)

router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

module.exports = router