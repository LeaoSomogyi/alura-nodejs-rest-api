const Atendimento = require('../models/atendimento');

module.exports = app => {
    app.get('/atendimentos', (_, res) => {
        Atendimento.lista()
            .then((resultados) => res.json(resultados))
            .catch((erros) => res.status(400).json(erros));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id)
            .then((atendimento) => res.json(atendimento))
            .catch((erros) => res.status(400).json(erros));
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento)
            .then((cadastrado) => res.status(201).json(cadastrado))
            .catch((erros) => res.status(400).json(erros));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores)
            .then((alterado) => res.json(alterado))
            .catch((erros) => res.status(400).json(erros));
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.deleta(id)
            .then((deletado) => res.json(deletado))
            .catch((erros) => res.status(400).json(erros));
    });
}