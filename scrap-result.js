// Simulação de arquivos disponíveis
const scrapedFiles = [
    { name: "Arquivo 1", owner: "João", modified: "30/03/2025", size: "320 KB" },
    { name: "Arquivo 2", owner: "Maria", modified: "29/03/2025", size: "150 KB" },
    { name: "Arquivo 3", owner: "Carlos", modified: "28/03/2025", size: "500 KB" }
];

// Função para exibir os arquivos disponíveis
function displayScrapingResults(files) {
    const resultList = document.getElementById("result-list");

    // Limpa a lista antes de adicionar novos itens
    resultList.innerHTML = "";

    // Adiciona cada arquivo à tabela
    files.forEach(file => {
        const row = document.createElement("tr");
        row.setAttribute("draggable", "true"); // Torna o item arrastável
        row.dataset.name = file.name; // Armazena o nome do arquivo
        row.dataset.size = file.size; // Armazena o tamanho do arquivo
        row.innerHTML = `
            <td>${file.name}</td>
            <td>${file.owner}</td>
            <td>${file.modified}</td>
            <td>${file.size}</td>
        `;
        resultList.appendChild(row);
    });

    enableDragAndDrop();
}

// Função para habilitar o Drag and Drop
function enableDragAndDrop() {
    const resultItems = document.querySelectorAll("#result-list tr");
    const extractList = document.getElementById("extract-list");

    resultItems.forEach(item => {
        // Evento de início do arrasto
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify({
                name: item.dataset.name,
                size: item.dataset.size
            }));
            item.classList.add("dragging");
        });

        // Evento de término do arrasto
        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });
    });

    // Permitir drop na lista de extração
    extractList.addEventListener("dragover", (e) => {
        e.preventDefault(); // Necessário para permitir o drop
    });

    extractList.addEventListener("drop", (e) => {
        e.preventDefault();
        const fileData = JSON.parse(e.dataTransfer.getData("text/plain"));

        // Adiciona o arquivo à tabela de extração
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${fileData.name}</td>
            <td>${fileData.size}</td>
        `;
        extractList.appendChild(row);
    });
}

// Chama a função para exibir os resultados simulados
displayScrapingResults(scrapedFiles);