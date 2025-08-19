const Usuario = require('./Usuario');

class Cliente extends Usuario {
	constructor(id, nome, cpf, email, senha, nascimento) {
		super(id, nome, cpf, email, senha);
		this.nascimento = nascimento;
        this.reservas = []; // Lista de reservas que o cliente fez
	}

	meusDados() {
		return `\n |ID: ${this.id}| \n |Nome: ${this.nome}| \n |Nascimento: ${this.nascimento}| \n |CPF: ${this.cpf}| \n |Email: ${this.email}| \n`;
	}
}

module.exports = Cliente;

// Classe Cliente
// Extende a classe Usuario e adiciona o atributo nascimento e reservas