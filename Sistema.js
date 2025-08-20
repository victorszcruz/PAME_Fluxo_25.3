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

    // Funções de Validação
    validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    validarCPF(cpf) {
        cpf = String(cpf).replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
        return true;
    }

    // Funções auxiliares
    gerarId(tipo) {
        return this.nextIds[tipo]++;
    }

    // Cadastros
    
    // Cadastro de Cliente e Funcionário
    cadastrarCliente(nome, cpf, email, senha, nascimento) {
        if (!this.validarCPF(cpf)) {
            console.log("\nCPF inválido.");
            return null;
        }
        if (!this.validarEmail(email)) {
            console.log("\nEmail inválido.");
            return null;
        }

        const emailPadrao = String(email).trim().toLowerCase();
        const cliente = new Cliente(this.gerarId("cliente"), nome, cpf, emailPadrao, senha, nascimento);
        
        this.clientes.push(cliente);
        
        return cliente;
    }

    cadastrarFuncionario(nome, cpf, email, senha) {
        if (!this.validarCPF(cpf)) {
            console.log("\nCPF inválido.");
            return null;
        }
        if (!this.validarEmail(email)) {
            console.log("\nEmail inválido.");
            return null;
        }
        const emailPadrao = String(email).trim().toLowerCase();
        const funcionario = new Funcionario(this.gerarId("funcionario"), nome, cpf, emailPadrao, senha);
        
        this.funcionarios.push(funcionario);
        
        return funcionario;
    }

    // Cadastro de Quarto
    adicionarQuarto(nome, descricao, camas, preco, quantidade) {
        if (isNaN(camas) || isNaN(preco) || isNaN(quantidade) || camas <= 0 || preco <= 0 || quantidade < 0) {
            console.log("\nCamas e preço devem ser números maiores que zero. Quantidade deve ser maior ou igual a zero.");
            return null;
        }
        const quarto = new Quarto(nome, descricao, camas, preco, quantidade);
        
        quarto.id = this.gerarId("quarto");
        this.quartos.push(quarto);
        
        return quarto;
    }
    
    // Login e Logout
    login(email, senha) {
        const emailPadrao = String(email).trim().toLowerCase();
        const usuario = [...this.clientes, ...this.funcionarios].find(
            u => u.email === emailPadrao && u.senha === senha);
        
        if (usuario) {
            this.usuarioLogado = usuario;
            return true;
        }
        
        return false;
    }

    logout() {
        this.usuarioLogado = null;
    }

    // Métodos para as reservas
    verificarDisponibilidade(idQuarto, dataEntrada, dataSaida) {
        const quarto = this.quartos.find(q => q.id === idQuarto);
        if (!quarto) {
            console.log("\nQuarto não cadastrado.");
            return false;
        }

        const entrada = new Date(dataEntrada);
        const saida = new Date(dataSaida);

        if (entrada >= saida) {
            console.log("\nA data de saída deve ser maior que a data de entrada.");
            return false;
        }

        const reservasParaQuarto = this.reservas.filter(r => r.idQuarto === idQuarto && r.status !== "cancelada" && r.status !== "realizada");

        let quartosOcupados = 0;
        for (const reserva of reservasParaQuarto) {
            const reservaEntrada = new Date(reserva.dataEntrada);
            const reservaSaida = new Date(reserva.dataSaida);
            if (entrada < reservaSaida && saida > reservaEntrada) {
                quartosOcupados++;
            }
        }

        return quartosOcupados < quarto.quantidade;
    }

    criarReserva(idCliente, idQuarto, dataEntrada, dataSaida) {
        if (!this.verificarDisponibilidade(idQuarto, dataEntrada, dataSaida)) {
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
        return reserva;
    }


    cancelarReserva(idReserva) {
        const reserva = this.reservas.find(r => r.id === idReserva);
        if (reserva && reserva.status !== "cancelada") {
            reserva.status = "cancelada";
            return true;
        }
        
        return false;
    }

    mudarStatusReserva(idReserva, novoStatus) {
        if (this.reservas.length === 0) {
            console.log("\nNenhuma reserva cadastrada.");
            return false;
        }
        if (!Reserva.STATUS.includes(novoStatus)) {
            console.log("\nEsse status não é válido.");
            return false;
        }
        const reserva = this.reservas.find(r => r.id === idReserva);
        if (!reserva) {
            console.log("\nReserva não encontrada.");
            return false;
        }
        reserva.status = novoStatus;
        return true;
    }

    // Alterar e Excluir Dados
    alterarDadosUsuarioLogado(dados) {
        const { novoNome, novoCpf, novoEmail, novaSenha, novoNascimento } = dados;
        if (!this.usuarioLogado) {
            return false;
        }
        if (novoCpf && !this.validarCPF(novoCpf)) {
            console.log("\nCPF inválido. Dados não foram alterados.");
            return false;
        }
        if (novoEmail && !this.validarEmail(novoEmail)) {
            console.log("\nEmail inválido. Dados não foram alterados.");
            return false;
        }

        // Verifica se o usuário é um cliente para alterar o nascimento
        if (this.usuarioLogado instanceof Cliente) {
            this.usuarioLogado.alterarDados(novoNome, novoCpf, novoEmail, novaSenha, novoNascimento);
        } else {
            this.usuarioLogado.alterarDados(novoNome, novoCpf, novoEmail, novaSenha);
        }
        return true;
    }

    alterarDadosQuarto(idQuarto, novoNome, novaDesc, novasCamas, novoPreco, novaQtd) {
        const quarto = this.quartos.find(q => q.id === idQuarto);
        if (quarto) {
            if (novoNome) quarto.nome = novoNome;
            if (novaDesc) quarto.descricao = novaDesc;
            if (novasCamas && (!isNaN(novasCamas) && novasCamas > 0)) quarto.camas = novasCamas;
            if (novoPreco && (!isNaN(novoPreco) && novoPreco > 0)) quarto.preco = novoPreco;
            if (novaQtd && (!isNaN(novaQtd) && novaQtd >= 0)) quarto.quantidade = novaQtd;
            return true;
        }
        return false;
    }

    excluirQuarto(idQuarto) {
        const index = this.quartos.findIndex(q => q.id === idQuarto);
        if (index !== -1) {
            this.quartos.splice(index, 1);
            return true;
        }
        console.log("\nQuarto não encontrado.");
        return false;
    }

    // Funções de listagem
    listarQuartos() {
        if (this.quartos.length === 0) {
            console.log("\nNenhum quarto cadastrado.");
            return [];
        }
        
        return this.quartos;
    }

    listarClientes() {
        if (this.clientes.length === 0) {
            console.log("\nNenhum cliente cadastrado.");
            return [];
        }
        
        return this.clientes;
    }
    
    listarReservas() {
        if (this.reservas.length === 0) {
            console.log("\nNenhuma reserva cadastrada.");
            return [];
        }
        
        return this.reservas;
    }

    listarReservasCliente(idCliente) {
        const reservasCliente = this.reservas.filter(r => r.idCliente === idCliente);
        
        if (reservasCliente.length === 0) {
            console.log("\nVocê não possui nenhuma reserva cadastrada.");
        }
        
        return reservasCliente;
    }

}

module.exports = Sistema;

// Classe Sistema
// Gerencia os métodos que serão utilizados no menu