const prompt = require("prompt-sync")();
const Sistema = require("./Sistema");

const sistema = new Sistema();

// Cria um funcionário inicial (administrador)
sistema.cadastrarFuncionario("Admin", "0", "admin", "1234");

// Funções auxiliares
function esperarEnter(){
    prompt("\n Pressione Enter para voltar ao menu...");
}

// Menus para cliente e funcionário
function menuCliente(cliente) {
    let opcao = "";
    while (opcao !== "6") {
        console.log("\n=== MENU CLIENTE ===");
        console.log("1. Ver meus Dados");
        console.log("2. Ver Lista de Quartos");
        console.log("3. Fazer Reserva");
        console.log("4. Cancelar Reserva");
        console.log("5. Ver Minhas Reservas");
        console.log("6. Logout");
        console.log("\n");
        opcao = prompt("Escolha: ");

        switch (opcao) {
            case "1":
                console.log(cliente.meusDados());
                esperarEnter();
                break;
            case "2":
                const quartos = sistema.listarQuartos();
                if (quartos.length > 0) {
                    quartos.forEach(q => console.log(q.verDados()));
            }
                esperarEnter();
                break;
            case "3":
                const idQuarto = parseInt(prompt("ID do quarto: "));
                const entrada = prompt("Data entrada: ");
                const saida = prompt("Data saída: ");
                const reserva = sistema.criarReserva(cliente.id, idQuarto, entrada, saida);
                console.log(reserva ? "Reserva criada!" : "Erro ao criar reserva.");
                break;
            case "4":
                const idResCancel = parseInt(prompt("ID da reserva: "));
                console.log(sistema.cancelarReserva(idResCancel) ? "Reserva cancelada!" : "Erro.");
                break;
            case "5":
                const minhasReservas = sistema.listarReservasCliente(cliente.id);
                if (minhasReservas.length > 0) {
                    console.log("\n==== MINHAS RESERVAS ===");
                    minhasReservas.forEach(r => console.log(r.verDados()));
                }
                esperarEnter();
                break;
            case "6":
                sistema.logout();
                console.log("\n Logout realizado.");
                break;
            default:
                console.log("\n Opção inválida!");
        }
    }
}

function menuFuncionario(func) {
    let opcao = "";
    while (opcao !== "8") {
        console.log("\n=== MENU FUNCIONÁRIO ===");
        console.log("1. Ver meus Dados");
        console.log("2. Ver Lista de Reservas");
        console.log("3. Ver Lista de Quartos");
        console.log("4. Ver Lista de Clientes");
        console.log("5. Mudar Status de Reserva");
        console.log("6. Adicionar Quarto");
        console.log("7. Cadastrar Funcionário");
        console.log("8. Logout");
        console.log("\n");
        opcao = prompt("Escolha: ");

        switch (opcao) {
            case "1":
                console.log(func.meusDados());
                esperarEnter();
                break;
            case "2":
                const reservas = sistema.listarReservas();
                if (reservas.length > 0) {
                    reservas.forEach(r => console.log(r.verDados()));
                }
                esperarEnter();
                break;
            case "3":
                const quartos = sistema.listarQuartos();
                if (quartos.length > 0) {
                    quartos.forEach(q => console.log(q.verDados()));
    }
                esperarEnter();
                break;
            case "4":
                const clientes = sistema.listarClientes();
                if (clientes.length > 0) {
                    clientes.forEach(c => console.log(c.meusDados()));
                }
                esperarEnter();
                break;
            case "5":
                if (sistema.reservas.length === 0) {
                    console.log("Nenhuma reserva cadastrada.");
                    esperarEnter();
                    break;
                } 
                else {
                    const idRes = parseInt(prompt("ID da reserva a ser alterada: "));
                    const validadorReserva = sistema.reservas.find(r => r.id === idRes);
                    if (!validadorReserva) {
                        console.log("Reserva não encontrada.");
                        esperarEnter();
                        break;
                    }
                    console.log("\nEscolha o novo status da reserva:");
                const statusDisponiveis = require('./Reserva').STATUS;
                statusDisponiveis.forEach((status, index) => {console.log(`${index + 1}. ${status}`);});
                
                let novoStatusEscolhido = "";
                while (true) {
                    const escolha = parseInt(prompt("Opção: "));
                    if (!isNaN(escolha) && escolha > 0 && escolha <= statusDisponiveis.length) {
                        novoStatusEscolhido = statusDisponiveis[escolha - 1];
                    break;
                    }
                    console.log("Opção inválida. Tente novamente.");
                }
    
    
                if (sistema.mudarStatusReserva(idRes, novoStatusEscolhido)) {
                console.log("Status da reserva alterado com sucesso!");
                } 
                else {
                    console.log("Não foi possível alterar o status da reserva.");
                }    
                esperarEnter();
                break;
                }
            case "6":
                console.log("\n");
                const nome = prompt("Nome do quarto: ");
                const desc = prompt("Descrição: ");
                const camas = parseInt(prompt("Número de camas: "));
                const preco = parseFloat(prompt("Preço por noite: "));
                const qtd = parseInt(prompt("Quantidade: "));
                sistema.adicionarQuarto(nome, desc, camas, preco, qtd);
                console.log("\n");
                console.log("Quarto adicionado!");
                break;
            
            case "7":
                console.log("\n");
                const nomeFunc = prompt("Nome: ");
                const cpfFunc = prompt("CPF: ");
                const emailFunc = prompt("Email: ");
                const senhaFunc = prompt("Senha: ");
                sistema.cadastrarFuncionario(nomeFunc, cpfFunc, emailFunc, senhaFunc);
                console.log("\n");
                console.log("Funcionário cadastrado!");
                break;  
                    
            case "8":
                sistema.logout();
                console.log("\n");
                console.log("Logout realizado.");
                break;
            
            default:
                console.log("\n");
                console.log("Opção inválida!");
        }
    }
}

// Menu principal
// Inicia o sistema e exibe o menu inicial
function menuInicial() {
    let opcao = "";
    while (opcao !== "3") {
        console.log("\n=== HOTEL F-LUXO ===");
        console.log("1. Fazer Login");
        console.log("2. Fazer Cadastro");
        console.log("3. Sair");
        console.log("\n");
        opcao = prompt("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                console.log("\n");
                const email = prompt("Email: ");
                const senha = prompt("Senha: ");
                if (sistema.login(email, senha)) {
                    const usuario = sistema.usuarioLogado;
                    if (usuario instanceof require("./Funcionario")) {
                        menuFuncionario(usuario);
                    } else {
                        menuCliente(usuario);
                    }
                } else {
                    console.log("Login inválido.");
                }
                break;
            case "2":
                console.log("\n");
                const nome = prompt("Nome: ");
                const cpf = prompt("CPF: ");
                const nasc = prompt("Nascimento: ");
                const emailC = prompt("Email: ");
                const senhaC = prompt("Senha: ");
                sistema.cadastrarCliente(nome, cpf, emailC, senhaC, nasc);
                console.log("Cliente cadastrado!");
                break;
            case "3":
                console.log("\n");
                console.log("Saindo do sistema...");
                break;
            default:
                console.log("\n");
                console.log("Opção inválida!");
        }
    }
}

menuInicial();

// Menu
// Codigo que sera executado para iniciar o sistema