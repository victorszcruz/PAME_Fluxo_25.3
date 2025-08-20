const prompt = require("prompt-sync")();
const Sistema = require("./Sistema");
const Cliente = require("./Cliente"); // Importa a classe Cliente para verificação

const sistema = new Sistema();

// Cria um funcionário inicial (administrador)
sistema.cadastrarFuncionario("Admin", "12345678901", "admin@email.com", "1234");

// Funções auxiliares
function esperarEnter(){
    prompt("\n Pressione Enter para voltar ao menu...");
}

// Menus para cliente e funcionário
function menuCliente(cliente) {
    let opcao = "";
    while (opcao !== "7") {
        console.log("\n=== MENU CLIENTE ===");
        console.log("1. Ver meus Dados");
        console.log("2. Alterar meus Dados");
        console.log("3. Ver Lista de Quartos");
        console.log("4. Fazer Reserva");
        console.log("5. Cancelar Reserva");
        console.log("6. Ver Minhas Reservas");
        console.log("7. Logout");
        console.log("\n");
        opcao = prompt("Escolha: ");

        switch (opcao) {
            case "1":
                console.log(cliente.meusDados());
                esperarEnter();
                break;
            case "2":
                const dadosParaAlterar = {};
                dadosParaAlterar.novoNome = prompt("Novo nome (deixe em branco para não alterar): ");
                dadosParaAlterar.novoNascimento = prompt("Nova data de nascimento (deixe em branco para não alterar): ");
                dadosParaAlterar.novoCpf = prompt("Novo CPF (deixe em branco para não alterar): ");
                dadosParaAlterar.novoEmail = prompt("Novo email (deixe em branco para não alterar): ");
                dadosParaAlterar.novaSenha = prompt("Nova senha (deixe em branco para não alterar): ");

                if(sistema.alterarDadosUsuarioLogado(dadosParaAlterar)){
                    console.log("\nDados alterados com sucesso!");
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
                const idQuarto = parseInt(prompt("ID do quarto: "));
                const entrada = prompt("Dia entrada(DD): ");
                const saida = prompt("Dia saída (DD): ");
                const reserva = sistema.criarReserva(cliente.id, idQuarto, entrada, saida);
                if (reserva) {
                    console.log("\nReserva criada!");
                }
                esperarEnter();
                break;
            case "5":
                const idResCancel = parseInt(prompt("ID da reserva: "));
                if(sistema.cancelarReserva(idResCancel)) {
                    console.log("\nReserva cancelada!");
                } else {
                    console.log("\nErro ao cancelar reserva. Verifique o ID ou o status.");
                }
                esperarEnter();
                break;
            case "6":
                const minhasReservas = sistema.listarReservasCliente(cliente.id);
                if (minhasReservas.length > 0) {
                    console.log("\n==== MINHAS RESERVAS ===");
                    minhasReservas.forEach(r => console.log(r.verDados()));
                }
                esperarEnter();
                break;
            case "7":
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
    while (opcao !== "11") {
        console.log("\n=== MENU FUNCIONÁRIO ===");
        console.log("1. Ver meus Dados");
        console.log("2. Alterar meus Dados");
        console.log("3. Ver Lista de Reservas");
        console.log("4. Ver Lista de Quartos");
        console.log("5. Ver Lista de Clientes");
        console.log("6. Mudar Status de Reserva");
        console.log("7. Adicionar Quarto");
        console.log("8. Alterar Quarto");
        console.log("9. Excluir Quarto");
        console.log("10. Cadastrar Funcionário");
        console.log("11. Logout");
        console.log("\n");
        opcao = prompt("Escolha: ");

        switch (opcao) {
            case "1":
                console.log(func.meusDados());
                esperarEnter();
                break;
            case "2":
                const dadosParaAlterar = {};
                dadosParaAlterar.novoNome = prompt("Novo nome (deixe em branco para não alterar): ");
                dadosParaAlterar.novoCpf = prompt("Novo CPF (deixe em branco para não alterar): ");
                dadosParaAlterar.novoEmail = prompt("Novo email (deixe em branco para não alterar): ");
                dadosParaAlterar.novaSenha = prompt("Nova senha (deixe em branco para não alterar): ");
                if(sistema.alterarDadosUsuarioLogado(dadosParaAlterar)){
                    console.log("\nDados alterados com sucesso!");
                }
                esperarEnter();
                break;
            case "3":
                const reservas = sistema.listarReservas();
                if (reservas.length > 0) {
                    reservas.forEach(r => console.log(r.verDados()));
                }
                esperarEnter();
                break;
            case "4":
                const quartos = sistema.listarQuartos();
                if (quartos.length > 0) {
                    quartos.forEach(q => console.log(q.verDados()));
                }
                esperarEnter();
                break;
            case "5":
                const clientes = sistema.listarClientes();
                if (clientes.length > 0) {
                    clientes.forEach(c => console.log(c.meusDados()));
                }
                esperarEnter();
                break;
            case "6":
                if (sistema.reservas.length === 0) {
                    console.log("\nNenhuma reserva cadastrada.");
                    esperarEnter();
                    break;
                } 
                const idRes = parseInt(prompt("ID da reserva a ser alterada: "));
                console.log("\nEscolha o novo status da reserva:");
                const statusDisponiveis = require('./Reserva').STATUS;
                statusDisponiveis.forEach((status, index) => {console.log(`${index + 1}. ${status}`);});
                
                let novoStatusEscolhido = "";
                const escolha = parseInt(prompt("Opção: "));
                if (!isNaN(escolha) && escolha > 0 && escolha <= statusDisponiveis.length) {
                    novoStatusEscolhido = statusDisponiveis[escolha - 1];
                    if (sistema.mudarStatusReserva(idRes, novoStatusEscolhido)) {
                        console.log("\nStatus da reserva alterado com sucesso!");
                    }
                } else {
                    console.log("\nOpção inválida.");
                }
                esperarEnter();
                break;
            case "7":
                console.log("\n");
                const nome = prompt("Nome do quarto: ");
                const desc = prompt("Descrição: ");
                const camas = parseInt(prompt("Número de camas: "));
                const preco = parseFloat(prompt("Preço por noite: "));
                const qtd = parseInt(prompt("Quantidade: "));
                if (sistema.adicionarQuarto(nome, desc, camas, preco, qtd)) {
                    console.log("\nQuarto adicionado!");
                }
                esperarEnter();
                break;
            case "8":
                if (sistema.quartos.length === 0) {
                    console.log("\nNenhum quarto cadastrado.");
                    esperarEnter();
                    break;
                }
                const idQuartoAlterar = parseInt(prompt("ID do quarto a ser alterado: "));
                const quartoExiste = sistema.quartos.find(q => q.id === idQuartoAlterar);

                if (!quartoExiste) {
                    console.log("\nQuarto não cadastrado.");
                    esperarEnter();
                    break;
                }

                const novoNomeQuarto = prompt("Novo nome (deixe em branco para não alterar): ");
                const novaDesc = prompt("Nova descrição (deixe em branco para não alterar): ");
                const novasCamasStr = prompt("Novo número de camas (deixe em branco para não alterar): ");
                const novasCamas = novasCamasStr ? parseInt(novasCamasStr) : null;
                const novoPrecoStr = prompt("Novo preço (deixe em branco para não alterar): ");
                const novoPreco = novoPrecoStr ? parseFloat(novoPrecoStr) : null;
                const novaQtdStr = prompt("Nova quantidade (deixe em branco para não alterar): ");
                const novaQtd = novaQtdStr ? parseInt(novaQtdStr) : null;

                if(sistema.alterarDadosQuarto(idQuartoAlterar, novoNomeQuarto, novaDesc, novasCamas, novoPreco, novaQtd)){
                    console.log("\nQuarto alterado com sucesso!");
                }
                esperarEnter();
                break;
            case "9":
                if (sistema.quartos.length === 0) {
                    console.log("\nNenhum quarto cadastrado.");
                    esperarEnter();
                    break;
                }
                const idQuartoExcluir = parseInt(prompt("ID do quarto a ser excluído: "));
                if (sistema.excluirQuarto(idQuartoExcluir)) {
                    console.log("\nQuarto excluído com sucesso!");
                }
                esperarEnter();
                break;
            case "10":
                console.log("\n");
                const nomeFunc = prompt("Nome: ");
                const cpfFunc = prompt("CPF: ");
                const emailFunc = prompt("Email: ");
                const senhaFunc = prompt("Senha: ");
                if (sistema.cadastrarFuncionario(nomeFunc, cpfFunc, emailFunc, senhaFunc)) {
                    console.log("\nFuncionário cadastrado!");
                }
                esperarEnter();
                break;  
            case "11":
                sistema.logout();
                console.log("\nLogout realizado.");
                break;
            default:
                console.log("\nOpção inválida!");
        }
    }
}

// Menu principal
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
                    console.log("\nLogin inválido.");
                }
                break;
            case "2":
                console.log("\n");
                const nome = prompt("Nome: ");
                const cpf = prompt("CPF: ");
                const nasc = prompt("Nascimento: ");
                const emailC = prompt("Email: ");
                const senhaC = prompt("Senha: ");
                if (sistema.cadastrarCliente(nome, cpf, emailC, senhaC, nasc)) {
                    console.log("\nCliente cadastrado!");
                }
                break;
            case "3":
                console.log("\nSaindo do sistema...");
                break;
            default:
                console.log("\nOpção inválida!");
        }
    }
}

menuInicial();
// Menu
// Codigo que sera executado para iniciar o sistema