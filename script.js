//------ fila de espera -------//

let fila = []; // lista de personagens adicionados
let historico = []; // lista de personagens atendidos
const limite = 10;

// adicionar
async function adicionarPersonagem() {

    if (fila.length >= limite) {
        alert("Fila cheia!");
        return;
    }

    let id = Math.floor(Math.random() * 826) + 1; // id aleatorio

    let res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    let personagem = await res.json();

    fila.push(personagem);

    atualizarFila();
}

// atendimento
function atender() {

  if (fila.length === 0) {
    alert("Fila vazia!");
    return;
  }

  let atendimentoDiv = document.getElementById("atendimento");
  atendimentoDiv.innerHTML = "<p class='processando'>Atendendo...</p>";

  // Delay para simular atendimento
  setTimeout(() => {

    // Remove o primeiro da fila (FIFO)
    let p = fila.shift();

    atendimentoDiv.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.image}">
      <p>${p.species}</p>
      <p>${p.status}</p>
    `;

    // Adiciona no histórico
    historico.unshift(p);

    // Atualiza tudo
    atualizarFila();
    atualizarHistorico();

  }, 1500); // 1.5 segundos de delay
}

// atualizar
function atualizarFila() {

  let filaDiv = document.getElementById("fila");
  filaDiv.innerHTML = "";

  fila.forEach(p => {

    let div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${p.image}">
      <p>${p.name}</p>
    `;

    filaDiv.appendChild(div);
  });
}


// ==============================
// ATUALIZAR HISTÓRICO
// ==============================
function atualizarHistorico() {

  let histDiv = document.getElementById("historico");
  histDiv.innerHTML = "";

  historico.slice(0, 5).forEach(p => {

    let div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${p.image}">
      <p>${p.name}</p>
    `;

    histDiv.appendChild(div);
  });
}
