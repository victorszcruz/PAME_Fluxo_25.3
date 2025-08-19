const Usuario = require('./Usuario');

class Funcionario extends Usuario {
    constructor(id, nome, cpf, email, senha) {
        super(id, nome, cpf, email, senha);
    }
}

module.exports = Funcionario;

// Classe Funcionario
// Extende a classe Usuario e não adiciona novos atributos, mas pode será usado para funcionalidades específicas de funcionários no sistema