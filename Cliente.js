const Usuario = require('./Usuario');

class Cliente extends Usuario {
	constructor(id, nome, cpf, email, senha, nascimento) {
		super(id, nome, cpf, email, senha);
		this.nascimento = nascimento;
        
	}

	meusDados() {
		return `\n |ID: ${this.id}| \n |Nome: ${this.nome}| \n |Nascimento: ${this.nascimento}| \n |CPF: ${this.cpf}| \n |Email: ${this.email}| \n`;
	}

    // Inclui o método alterarDados para atualizar o nascimento
    alterarDados(novoNome, novoCpf, novoEmail, novaSenha, novoNascimento) {
        super.alterarDados(novoNome, novoCpf, novoEmail, novaSenha); // Chama o método original em Usuario
        if (novoNascimento) {
            this.nascimento = novoNascimento;
        }
    }
}

module.exports = Cliente;

// Classe Cliente
// Extende a classe Usuario e adiciona o atributo nascimento e reservas