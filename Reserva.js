class Reserva {
    constructor(id, idCliente, idQuarto, dataEntrada, dataSaida, status = "pendente") {
        this.id = id;
        this.idCliente = idCliente;
        this.idQuarto = idQuarto;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        this.status = status;
    }

    verDados() {
        return `\n Reserva ${this.id} | Cliente: ${this.idCliente} | Quarto: ${this.idQuarto} | ${this.dataEntrada} a ${this.dataSaida} | Status: ${this.status}`;
    }
}

module.exports = Reserva;
