let money = 60000; // Dinheiro inicial
let iron = 0;
let factories = {
    type1: 0,
    type2: 0,
    type3: 0
};

// Informações dos tipos de fábricas
const factoryTypes = {
    1: { cost: 500, ironPerSecond: 5, className: 'type1' },
    2: { cost: 1000, ironPerSecond: 15, className: 'type2' },
    3: { cost: 1750, ironPerSecond: 25, className: 'type3' }
};

let factoryInterval;
const moneyElement = document.getElementById('money');
const ironElement = document.getElementById('iron');
const sellIronBtn = document.getElementById('sellIronBtn');
const gameArea = document.getElementById('gameArea');
const factoryPopup = document.getElementById('factoryPopup');
const factoryNameInput = document.getElementById('factoryName');
const confirmBuildBtn = document.getElementById('confirmBuildBtn');

// Função para atualizar a interface com os valores de dinheiro e ferro
function updateGameInfo() {
    moneyElement.innerText = money;
    ironElement.innerText = iron;
}

// Função para adicionar ferro
function produceIron() {
    // Calcula o total de ferro produzido com base nas fábricas de cada tipo
    iron += (factories.type1 * factoryTypes[1].ironPerSecond) +
            (factories.type2 * factoryTypes[2].ironPerSecond) +
            (factories.type3 * factoryTypes[3].ironPerSecond);
    updateGameInfo();
}

// Função para construir uma fábrica no local clicado (com variação aleatória)
function buildFactory(x, y, factoryType, factoryName) {
    const selectedFactory = factoryTypes[factoryType];

    if (money >= selectedFactory.cost) {
        money -= selectedFactory.cost;
        
        // Atualiza o número de fábricas do tipo escolhido
        factories[`type${factoryType}`]++;

        // Adiciona uma variação aleatória na posição
        const randomOffsetX = Math.floor(Math.random() * 60) - 30; // Variação de -30 a 30 pixels
        const randomOffsetY = Math.floor(Math.random() * 60) - 30; // Variação de -30 a 30 pixels

        // Criar e posicionar a fábrica
        const factory = document.createElement('div');
        factory.classList.add('factory', selectedFactory.className);
        factory.innerText = factoryName || `Fábrica ${Object.values(factories).reduce((acc, val) => acc + val)}`; // Nome da fábrica

        // Aplica a variação aleatória de posição
        factory.style.left = `${x - 30 + randomOffsetX}px`; // Centraliza e aplica a variação
        factory.style.top = `${y - 30 + randomOffsetY}px`;  // Centraliza e aplica a variação

        gameArea.appendChild(factory);
        updateGameInfo();
        hidePopup(); // Esconde o popup após a seleção
    } else {
        alert('Dinheiro insuficiente para construir esta fábrica!');
    }
}

// JavaScript para o funcionamento do botão de fechar
document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('factoryPopup').style.display = 'none';  // Fecha o popup
});

// Função para vender o ferro
function sellIron() {
    if (iron > 0) {
        money += iron;
        iron = 0;
        updateGameInfo();
    } else {
        alert('Você não tem ferro para vender!');
    }
}

// Inicia o ciclo de produção de ferro a cada segundo
function startProduction() {
    factoryInterval = setInterval(produceIron, 1000);
}

// Função para exibir o popup
function showPopup(x, y) {
    factoryPopup.style.display = 'block';
    factoryPopup.style.left = `${x + 20}px`; // Posiciona o popup ao lado do clique
    factoryPopup.style.top = `${y + 20}px`; // E abaixo do clique
}

// Função para esconder o popup
function hidePopup() {
    factoryPopup.style.display = 'none';
}

// Espera o carregamento completo da página antes de adicionar os event listeners
window.addEventListener('DOMContentLoaded', () => {
    startProduction();

    // Ouvindo o clique na área do jogo
    gameArea.addEventListener('click', (e) => {
        const rect = gameArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Exibe o popup para o jogador escolher a fábrica
        showPopup(x, y);
    });

    // Adiciona ouvintes de eventos aos botões do popup
    const factoryBtns = document.querySelectorAll('.factory-btn');
    factoryBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const factoryType = e.target.getAttribute('data-type');
            const factoryName = factoryNameInput.value.trim();

            if (!factoryName) {
                alert("Por favor, insira um nome para a fábrica!");
                return;
            }

            // Constrói a fábrica no local selecionado
            buildFactory(e.clientX, e.clientY, factoryType, factoryName);
        });
    });

    // Confirmar construção
    confirmBuildBtn.addEventListener('click', () => {
        const factoryType = document.querySelector('.factory-btn.selected')?.getAttribute('data-type');
        const factoryName = factoryNameInput.value.trim();

        if (!factoryType) {
            alert("Selecione um tipo de fábrica!");
            return;
        }

        if (!factoryName) {
            alert("Por favor, insira um nome para a fábrica!");
            return;
        }

        // Chama a função de construção
        buildFactory(parseInt(factoryType), factoryName);
    });

    sellIronBtn.addEventListener('click', sellIron);
    updateGameInfo();
});
