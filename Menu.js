const prompt = require("prompt-sync")();
const Sistema = require("./Sistema");

const sistema = new Sistema();

// Criando funcionário inicial para teste
sistema.cadastrarFuncionario("Admin", "00011122233", "admin@fluxo.com", "1234");

// Criando alguns quartos iniciais para teste
sistema.adicionarQuarto("Suite Luxo", "Quarto com vista para o mar", 2, 500, 3);
sistema.adicionarQuarto("Econômico", "Quarto simples e confortável", 1, 200, 5);

// Função auxiliar
function esperarEnter(){
    prompt("\n Pressione Enter para voltar ao menu...");
}

// Menu para Cliente e Funcionário
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
                sistema.listarQuartos().forEach(q => console.log(q));
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
                sistema.listarReservasCliente(cliente.id).forEach(r => console.log(r));
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
                sistema.listarReservas().forEach(r => console.log(r));
                esperarEnter();
                break;
            case "3":
                sistema.listarQuartos().forEach(q => console.log(q));
                esperarEnter();
                break;
            case "4":
                sistema.listarClientes().forEach(c => console.log(c));
                esperarEnter();
                break;
            case "5":
                const idRes = parseInt(prompt("ID da reserva: "));
                const status = prompt("Novo status: ");
                console.log(sistema.mudarStatusReserva(idRes, status) ? "Status alterado!" : "Erro.");
                break;
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
