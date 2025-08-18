class Quarto {
    constructor(nome, descricao, camas, preco, quantidade) {
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
