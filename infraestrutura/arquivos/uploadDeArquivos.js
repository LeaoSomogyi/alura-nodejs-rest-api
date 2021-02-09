const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const extensoesValidas = ['jpg', 'png', 'jpeg'];
    const extensao = path.extname(caminho);
    const extensaoInvalida = extensoesValidas.indexOf(extensao.substring(1)) === -1;

    if (extensaoInvalida) {
        const erro = { erro: 'Extensão não permitida!' };
        callbackImagemCriada(erro);
    } else {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${extensao}`;
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho));
    }
}