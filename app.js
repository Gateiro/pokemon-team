// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {

    const API_KEY = {APIKEY}
    const URL_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    // Pega os elementos da página com os quais vamos interagir
    const ligaSelect = document.getElementById('liga-select');
    const pokemonInput = document.getElementById('pokemon-input');
    const gerarTimeBtn = document.getElementById('gerar-time-btn');
    const resultadoContainer = document.getElementById('resultado-container');
    const resultadoDiv = document.getElementById('resultado');

    // Adiciona um "ouvinte" para o evento de clique no botão
    gerarTimeBtn.addEventListener('click', gerarTimeEstrategico);

    // Função principal que orquestra os agentes
    async function gerarTimeEstrategico() {
        console.log("Iniciando o processo de geração de time...");

        // Passo 1: Capturar os dados da interface
        const liga = ligaSelect.value;
        const pokemonBase = pokemonInput.value.trim();
        console.log(`Liga: ${liga}, Pokémon Base: ${pokemonBase}`);
        
        // Exibe uma mensagem de "carregando..." para o usuário
        resultadoContainer.classList.remove('hidden');
        resultadoDiv.innerHTML = "Consultando os melhores estrategistas... Por favor, aguarde.";


        // --- AQUI COMEÇA A ORQUESTRAÇÃO DOS AGENTES ---

        // Passo 2: Chamar o Agente 1 (Pesquisador de Meta em Tempo Real)
        // (Futura implementação: chamar a API do Gemini com um prompt de busca)
        console.log("Passo 2: Chamando Agente 1 para pesquisar o meta...");
        // const metaReport = await agentePesquisador(liga);


        // Passo 3: Chamar o Agente 2 (Estrategista de Equipe)
        // (Futura implementação: chamar a API do Gemini com o relatório do meta)
        console.log("Passo 3: Chamando Agente 2 para montar o time...");
        // const timeSugerido = await agenteEstrategista(metaReport, pokemonBase);


        // Passo 4: Buscar dados na PokéAPI para validar os ataques
        // (Futura implementação: fazer chamadas na pokeapi.co para cada pokémon do timeSugerido)
        console.log("Passo 4: Buscando dados na PokéAPI...");


        // Passo 5: Chamar o Agente 3 (Mestre de Ataques e Táticas)
        // (Futura implementação: chamar a API do Gemini com o time e os dados da PokéAPI)
        console.log("Passo 5: Chamando Agente 3 para detalhar a estratégia...");
        // const resultadoFinal = await agenteTatico(timeSugerido, dadosPokeAPI);
        

        // Passo 6: Exibir o resultado final na tela
        console.log("Passo 6: Exibindo o resultado final.");
        // resultadoDiv.innerHTML = resultadoFinal; 
    }
});

// --- REGISTRO DO SERVICE WORKER ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(err => {
                console.log('Falha ao registrar o Service Worker:', err);
            });
    });
}