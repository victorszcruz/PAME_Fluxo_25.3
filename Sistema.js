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
    
    // Cadastro do cliente
    // Realizado no menu inicial
    cadastrarCliente(nome, cpf, email, senha, nascimento) {
        const emailPadrao = String(email).trim().toLowerCase();
        const cliente = new Cliente(this.gerarId("cliente"), nome, cpf, emailPadrao, senha, nascimento);
        
        this.clientes.push(cliente);
        
        return cliente;
    }

    // Cadastro do funcionário
    // Realizado no menu de funcionários
    cadastrarFuncionario(nome, cpf, email, senha) {
        const emailPadrao = String(email).trim().toLowerCase();
        const funcionario = new Funcionario(this.gerarId("funcionario"), nome, cpf, emailPadrao, senha);
        
        this.funcionarios.push(funcionario);
        
        return funcionario;
    }

    // Cadastro do quarto
    // Realizado no menu de funcionários
    adicionarQuarto(nome, descricao, camas, preco, quantidade) {
        const quarto = new Quarto(nome, descricao, camas, preco, quantidade);
        
        quarto.id = this.gerarId("quarto");
        this.quartos.push(quarto);
        
        return quarto;
    }

    // Login e Logout
    login(email, senha) {
        const emailPadrao = String(email).trim().toLowerCase(); // Padroniza o email para letras minúsculas
        const usuario = [...this.clientes, ...this.funcionarios].find(
            u => u.email === emailPadrao && u.senha === senha); 
            // Cria uma array de usuarios (clientes + funcionários)
            // Verifica se o email e senha correspondem a algum usuário cadastrado
        
        if (usuario) {
            this.usuarioLogado = usuario;
            return true;
        }
        
        return false;
    }

    logout() {
        this.usuarioLogado = null; // Limpa o usuário logado
    }

    // Métodos para as reservas
    // Criar reserva
    criarReserva(idCliente, idQuarto, dataEntrada, dataSaida) {
        const quarto = this.quartos.find(q => q.id === idQuarto);
        
        if (!quarto || quarto.quantidade <= 0){ // Verifica se o quarto existe e se há disponibilidade 
            return null;
        }
        
        const reserva = new Reserva(
            this.gerarId("reserva"),
            idCliente,
            idQuarto,
            dataEntrada,
            dataSaida,
            "pendente"
        );
        
        this.reservas.push(reserva); 
        quarto.quantidade -= 1; // Diminui quartos disponíveis
        return reserva;
    }

    // Cancelar reserva
    cancelarReserva(idReserva) {
        const reserva = this.reservas.find(r => r.id === idReserva);
        if (reserva && reserva.status !== "cancelada") { // Verifica se a reserva existe e se foi cancelada
            reserva.status = "cancelada";

            const quarto = this.quartos.find(q => q.id === reserva.idQuarto);
            if (quarto) quarto.quantidade += 1; // Devolve quarto em uso

            return true;
        }
        
        return false;
    }

    // Mudar status da reserva
    // Realizada no menu de funcionários
    mudarStatusReserva(idReserva, novoStatus) {
        if (!Reserva.STATUS.includes(novoStatus)) { // Garante que o status será válido
            console.log("Esse status não é válido.");
            return false;
        }
        const reserva = this.reservas.find(r => r.id === idReserva);
        if (reserva) {
            const statusAntigo = reserva.status; // Armazena o status da reserva antes da mudança

        if (statusAntigo === novoStatus) {
            return true;
        }

        // Lógica para gerenciamento da disponibilidade dos quartos
        const statusQuartoLivre = ["realizada","cancelada"];
        const quarto = this.quartos.find(q => q.id === reserva.idQuarto);
        if (quarto) {
            const eraInativo = statusQuartoLivre.includes(statusAntigo);
            const agoraInativo = statusQuartoLivre.includes(novoStatus);
            
            if (eraInativo && !agoraInativo) { // Pelos status, verifica que o quarto estará ativo
                if (quarto.quantidade > 0) { // Verifica se há quartos disponíveis para descrementar
                    quarto.quantidade -= 1;
                } 
                else {
                    console.log("Não há mais quartos disponíveis.");
                    return false;
                }
            }
            else if (!eraInativo && agoraInativo) { // Pelos status, verifica que o quarto estará inativo
                quarto.quantidade += 1;
            }
        }
        
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
        
        return this.quartos;
    }

    listarClientes() {
        if (this.clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
            return [];
        }
        
        return this.clientes;
    }
    
    listarReservas() {
        if (this.reservas.length === 0) {
            console.log("Nenhuma reserva cadastrada.");
            return [];
        }
        
        return this.reservas;
    }

    listarReservasCliente(idCliente) {
        const reservasCliente = this.reservas.filter(r => r.idCliente === idCliente); // Filtro
        
        if (reservasCliente.length === 0) {
            console.log("Você não possui nenhuma reserva cadastrada.");
        }
        
        return reservasCliente;
    }

}

module.exports = Sistema;

// Classe Sistema
// Gerencia os métodos que serão utilizados no menu