const Usuario = require('./Usuario');

class Cliente extends Usuario {
	constructor(id, nome, cpf, email, senha, nascimento) {
		super(id, nome, cpf, email, senha);
		this.nascimento = nascimento;
        this.reservas = [];
	}

	meusDados() {
		return `\n |ID: ${this.id}| \n |Nome: ${this.nome}| \n |Nascimento: ${this.nascimento}| \n |CPF: ${this.cpf}| \n |Email: ${this.email}| \n`;
	}
}

module.exports = Cliente;
