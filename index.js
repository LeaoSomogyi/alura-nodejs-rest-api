const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');

conexao.connect(error => {
    if (error) {
        console.error(error);
    } else {
        console.log('Conectado no MySQL!');
        Tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log('servidor rodando na porta 3000'));
    }
});