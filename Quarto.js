class Quarto {
    constructor(nome, descricao, camas, preco, quantidade) {
        
        this.id = null; // O ID será atribuído pela classe Sistema
        this.nome = nome;
        this.descricao = descricao;
        this.camas = camas;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    verDados() {
        return `\n ID: ${this.id} | Quarto: ${this.nome} | ${this.descricao} | Camas: ${this.camas} | Preço: R$${this.preco}/noite | Disponíveis: ${this.quantidade}`;
    }
}

module.exports = Quarto;

// Classe Quarto
// Representa um quarto do hotel e seus atributos