class Reserva {
    static STATUS = ["pendente", "confirmada", "cancelada", "realizada", "adiada"]; // Status possíveis
    
    constructor(id, idCliente, idQuarto, dataEntrada, dataSaida, status = "pendente") {
        this.id = id;
        this.idCliente = idCliente;
        this.idQuarto = idQuarto;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        
        if (!Reserva.STATUS.includes(status)) {
        this.status = status; // Validação do status
        }
        else {
            this.status = "pendente"; // Status padrão
        }
    }
    verDados() {
        return `\n Reserva ${this.id} | Cliente: ${this.idCliente} | Quarto: ${this.idQuarto} | ${this.dataEntrada} a ${this.dataSaida} | Status: ${this.status}`;
    }

}
module.exports = Reserva;

// Classe Reserva
// Representa uma reserva de um quarto no sistema