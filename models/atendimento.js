const moment = require('moment');
const axios = require('axios');
const repositorio = require('../repositorios/atendimentos');

class Atendimento {
    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) => {
            return moment(data).isSameOrAfter(dataCriacao);
        };

        this.clienteEhValido = ({ tamanho }) => tamanho >= 5;

        this.valida = parametros =>
            this.validacoes.filter((campo) => {
                const { nome } = campo;
                const parametro = parametros[nome];
                const valido = campo.valido(parametro);

                return !valido;
            });

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        };

        const erros = this.valida(parametros);
        const existemErros = erros.length;

        if (existemErros) {
            return new Promise((_, reject) => reject(erros));
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            return repositorio.adiciona(atendimentoDatado).then((resultados) => {
                const id = resultados.insertId;
                return { ...atendimento, id };
            });
        }
    }

    lista() {
        return repositorio.lista();
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            repositorio.buscaPorId(id)
                .then(async (atendimentos) => {
                    const atendimento = atendimentos[0];
                    const cpf = atendimento.cliente;
                    const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                    atendimento.cliente = data;

                    resolve(atendimento);
                })
                .catch((erros) => reject(erros));
        });
    }

    altera(id, valores) {
        if (valores.data)
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:MM:SS');

        return repositorio.altera(id, valores);
    }

    deleta(id) {
        return repositorio.deleta(id);
    }
}

module.exports = new Atendimento;