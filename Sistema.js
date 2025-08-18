const Cliente = require('./Cliente');
const Funcionario = require('./Funcionario');
const Quarto = require('./Quarto');
const Reserva = require('./Reserva');

class Sistema {
    constructor() {
        this.clientes = [];
        this.funcionarios = [];
        this.quartos = [];
        this.reservas = [];
        this.usuarioLogado = null;

        this.nextIds = { cliente: 1, funcionario: 1, quarto: 1, reserva: 1 };
    }

    // Funções auxiliares
    // Gerar ID único para cada tipo de usuário
    gerarId(tipo) {
        return this.nextIds[tipo]++;
    }

    // Cadastros
    cadastrarCliente(nome, cpf, email, senha, nascimento) {
        const emailPadrao = String(email).trim().toLowerCase();
        const cliente = new Cliente(this.gerarId("cliente"), nome, cpf, emailPadrao, senha, nascimento);
        this.clientes.push(cliente);
        return cliente;
    }

    cadastrarFuncionario(nome, cpf, email, senha) {
        const emailPadrao = String(email).trim().toLowerCase();
        const funcionario = new Funcionario(this.gerarId("funcionario"), nome, cpf, emailPadrao, senha);
        this.funcionarios.push(funcionario);
        return funcionario;
    }

    adicionarQuarto(nome, descricao, camas, preco, quantidade) {
        const quarto = new Quarto(nome, descricao, camas, preco, quantidade);
        quarto.id = this.gerarId("quarto");
        this.quartos.push(quarto);
        return quarto;
    }

    // Login e Logout
    login(email, senha) {
        const emailPadrao = String(email).trim().toLowerCase();
        const usuario = [...this.clientes, ...this.funcionarios].find(
            u => u.email === emailPadrao && u.senha === senha
        );
        if (usuario) {
            this.usuarioLogado = usuario;
            return true;
        }
        return false;
    }

    logout() {
        this.usuarioLogado = null;
    }

    // Reservas
    criarReserva(idCliente, idQuarto, dataEntrada, dataSaida) {
        const quarto = this.quartos.find(q => q.id === idQuarto);
        if (!quarto || quarto.quantidade <= 0) return null;

        const reserva = new Reserva(
            this.gerarId("reserva"),
            idCliente,
            idQuarto,
            dataEntrada,
            dataSaida,
            "pendente"
        );
        this.reservas.push(reserva);

        // Diminui quartos disponíveis 
        quarto.quantidade -= 1; 
        return reserva;
    }

    cancelarReserva(idReserva) {
        const reserva = this.reservas.find(r => r.id === idReserva);
        if (reserva && reserva.status !== "cancelada") {
            reserva.status = "cancelada";

            // Devolve quarto em uso
            const quarto = this.quartos.find(q => q.id === reserva.idQuarto);
            if (quarto) quarto.quantidade += 1;

            return true;
        }
        return false;
    }

    mudarStatusReserva(idReserva, novoStatus) {
        const reserva = this.reservas.find(r => r.id === idReserva);
        if (reserva) {
            reserva.status = novoStatus;
            return true;
        }
        return false;
    }

    // Funções de listagem
    listarQuartos() {
        if (this.quartos.length === 0) {
            console.log("Nenhum quarto cadastrado.");
            return [];
        }
        
        return this.quartos.map(q => q.verDados());
    }

    listarClientes() {
        if (this.clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
            return [];
        }
        
        return this.clientes.map(c => c.meusDados());
    }
    
    listarReservas() {
        if (this.reservas.length === 0) {
            console.log("Nenhuma reserva cadastrada.");
            return [];
        }
        
        return this.reservas.map(r => r.verDados());
    }

    listarReservasCliente(idCliente) {
        if (this.reservas.length === 0) {
            console.log("Nenhuma reserva cadastrada.");
            return [];
        }
        
        return this.reservas.filter(r => r.idCliente === idCliente).map(r => r.verDados());
    }
}

module.exports = Sistema;
