const repositorio = require('../repositorios/pets');
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos');

class Pet {
    adiciona(pet) {
        return new Promise((resolve, reject) => {
            uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
                if (erro) {
                    reject(erro);
                } else {
                    const novoPet = { nome: pet.nome, imagem: novoCaminho };
                    repositorio.adiciona(novoPet)
                        .then((petAdicionado) => {
                            const id = petAdicionado.insertId;
                            resolve({ ...pet, id });
                        })
                        .catch((erros) => reject(erros));
                }
            });
        });
    }
}

module.exports = new Pet();