class Quarto {
    constructor(nome, descricao, camas, preco, quantidade) {
        //ID de quarto será gerado automaticamente dentro do Sistema
        this.nome = nome;
        this.descricao = descricao;
        this.camas = camas;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    verDados() {
        return `\n Quarto: ${this.nome} | ${this.descricao} | Camas: ${this.camas} | Preço: R$${this.preco}/noite | Disponíveis: ${this.quantidade}`;
    }
}

module.exports = Quarto;

// Classe Quarto
// Representa um quarto do hotel e seus atributos
