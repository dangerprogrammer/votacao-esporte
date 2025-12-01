// ====== DADOS ======

const alunos = {
    sub6: [
        { nome: "Pedro Veloz", imgSrc: "", votos: 0 },
        { nome: "Lucas Goleador", imgSrc: "", votos: 0 }
    ],
    sub7: [
        { nome: "Gabriel Ágil", imgSrc: "", votos: 0 },
        { nome: "Matheus Forte", imgSrc: "", votos: 0 }
    ],
    sub8: [
        { nome: "Davi Drible", imgSrc: "", votos: 0 },
        { nome: "Felipe Defesa", imgSrc: "", votos: 0 }
    ]
};

let categoriaAtual = "sub6";

const cardsContainer = document.getElementById("cardsContainer");
const rankingContainer = document.getElementById("rankingContainer");

// ====== TROCAR ENTRE PÁGINAS ======

function mostrarPagina(pagina) {
    document.getElementById("paginaVotar").classList.add("escondido");
    document.getElementById("paginaContagem").classList.add("escondido");

    document.getElementById("btnVotar").classList.remove("ativo");
    document.getElementById("btnContagem").classList.remove("ativo");

    if (pagina === "votar") {
        document.getElementById("paginaVotar").classList.remove("escondido");
        document.getElementById("btnVotar").classList.add("ativo");
        carregarCategoria(categoriaAtual);
    } else {
        document.getElementById("paginaContagem").classList.remove("escondido");
        document.getElementById("btnContagem").classList.add("ativo");
        mostrarRanking();
    }
}

// ====== CARREGAR CATEGORIA ======

function selecionarCategoria(btn) {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    categoriaAtual = btn.dataset.cat;
    carregarCategoria(categoriaAtual);
}

function carregarCategoria(cat) {
    cardsContainer.innerHTML = "";

    alunos[cat].forEach((aluno, index) => {

        cardsContainer.innerHTML += `
            <div class="card">
                <div class="foto-wrapper">
                    <img src="${aluno.imgSrc}">
                </div>

                <div class="nome">${aluno.nome}</div>
                <div class="categoria-label">${cat.toUpperCase()}</div>

                <button class="votar-btn" onclick="votar('${cat}', ${index})">Votar</button>
            </div>
        `;
    });
}

carregarCategoria("sub6");

// =========================
// CARREGAR VOTOS DO localStorage
// =========================
function carregarVotos() {
    const salvo = localStorage.getItem("votosCategorias");
    if (!salvo) return {}; // primeira vez
    return JSON.parse(salvo);
}

// =========================
// SALVAR VOTOS NO localStorage
// =========================
function salvarVotos(data) {
    localStorage.setItem("votosCategorias", JSON.stringify(data));
}

// =========================
// ESTRUTURA INICIAL (caso não exista)
// =========================
let votosCategorias = carregarVotos();

if (!votosCategorias || Object.keys(votosCategorias).length === 0) {
    votosCategorias = {
        "sub6": { candidatos: [
            { nome: "Pedro Veloz", votos: 0 },
            { nome: "Lucas Goleador", votos: 0 }
        ]},
        "sub7": { candidatos: [
            { nome: "Gabriel Ágil", votos: 0 },
            { nome: "Matheus Forte", votos: 0 }
        ]},
        "sub8": { candidatos: [
            { nome: "Davi Drible", votos: 0 },
            { nome: "Felipe Defesa", votos: 0 }
        ]}
    };

    salvarVotos(votosCategorias);
}

// =========================
// FUNÇÃO DE VOTAR
// =========================
function votar(categoria, indexJogador) {
    votosCategorias[categoria].candidatos[indexJogador].votos++;

    salvarVotos(votosCategorias);

    alert("Voto computado!");
    mostrarRanking(); // se quiser atualizar imediatamente
}

// =========================
// MOSTRAR RESULTADOS
// =========================
function mostrarRanking() {
    const div = document.getElementById("rankingContainer");
    div.innerHTML = "";

    for (const categoria in votosCategorias) {
        const grupo = votosCategorias[categoria].candidatos;

        // ordem decrescente por votos
        const ordenado = [...grupo].sort((a, b) => b.votos - a.votos);

        const total = grupo.reduce((acc, c) => acc + c.votos, 0);

        let bloco = `
            <div class="rank-group">
                <h2>${categoria} (${total} Votos)</h2>
        `;

        ordenado.forEach((c, idx) => {
            let pct = total === 0 ? 0 : (c.votos / total) * 100;
            let pctWidth = pct === 0 ? 0.6 : pct; // barra mínima

            bloco += `
                <div class="rank-item">
                    <div class="rank-num">${idx + 1}</div>

                    <div>
                        <div>${c.nome}</div>
                        <div class="rank-bar">
                            <div class="rank-bar-fill" style="width:${pctWidth}%"></div>
                        </div>
                    </div>

                    <div class="rank-val">${c.votos} (${pct.toFixed(1)}%)</div>
                </div>
            `;
        });

        bloco += `</div>`;
        div.innerHTML += bloco;
    }
}
