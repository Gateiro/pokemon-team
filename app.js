// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {

    //Verifica se à um SW ativo
    if(typeof navigator.serviceWorker !== 'undefined'){
        navigator.serviceWorker.register('pwabuilder-sw.js')
    }
    //Configurando notificações
    if('setAppBadge' in navigator){
        navigator.setAppBadge(1);
    }
    //Solicita ao usuário permissão para enviar notificações.
    Notification.requestPermission();

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
        const pokemonBase = pokemonInput.value.trim() || "Nenhum";
        console.log(`Liga: ${liga}, Pokémon Base: ${pokemonBase}`);
        
        // Exibe uma mensagem de "carregando..." para o usuário
        resultadoContainer.classList.remove('hidden');
        resultadoDiv.innerHTML = "Consultando os melhores estrategistas... Por favor, aguarde.";


        //ORGANIZAÇÃO DOS AGENTES

        try{
            // Passo 2: Chamar o Agente 1 (Pesquisador de Meta em Tempo Real)
            console.log("Chamando Agente 1...");
            const metaReport = await agentePesquisador(liga);
            console.log("---Relatório do Agente 1 Recebido ---");
            console.log(metaReport);

            resultadoDiv.innerHTML = "Relatório recebido!"

            // Passo 3: Chamar o Agente 2 (Estrategista de Equipe)
            console.log("Passo 3: Chamando Agente 2...");
            const timeSugerido = await agenteEstrategista(metaReport, pokemonBase);
            console.log("--- Time Sugerido pelo Agente 2 ---");
            console.log(timeSugerido);


        } catch (error) {
            console.error("Ocorreu um erro na orquestração:", error);
            resultadoDiv.innerHTML = `Houve um erro ao consultar a IA. Verifique a sua chave.`
        }

    }


    // ------ Definição dos Agentes -------

    //Agente 1: Pesquisador
    async function agentePesquisador(nomeDaLiga) {
        const prompt = `
        Você é um "Mestre de Batalha", um especialista mundial em Pokémon GO Battle League (GBL).
        Sua tarefa é realizar uma busca na internet para encontrar os Pokémon mais fortes e mais usados na ${nomeDaLiga} em setembro de 2025.
        Concentre sua busca em fontes confiáveis como "PvPoke", "GamePress" e "The Silph Road".
        Resuma suas descobertas em um relatório objetivo e conciso. 
        `;

        //Habilitando a busca Web
        const requestBody = {
            contents: [{ parts: [{ text: prompt }] }],
            tools: [{"google_search_retrieval": {} }]
        };

        const response = await fetch(URL_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) throw new Error(`Erro na API (Agente 1): ${response.statusText}`);
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    //Agente 2: Estrategista de Equipe



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