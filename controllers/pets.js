const Pet = require('../models/pet');

module.exports = app => {
    app.post('/pets', (req, res) => {
        const pet = req.body;
        Pet.adiciona(pet)
            .then((novoPet) => res.json(novoPet))
            .catch((erros) => res.status(400).json(erros));
    });
}