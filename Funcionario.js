const Usuario = require('./Usuario');

class Funcionario extends Usuario {
    constructor(id, nome, cpf, email, senha) {
        super(id, nome, cpf, email, senha);
    }
}

module.exports = Funcionario;
