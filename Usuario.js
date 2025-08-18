class Usuario {
    constructor(id, nome, cpf, email, senha){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }

    meusDados(){
        return `\n |ID: ${this.id}| \n |Nome: ${this.nome}| \n |CPF: ${this.cpf}| \n |Email: ${this.email}| \n`
    }

}

module.exports = Usuario;