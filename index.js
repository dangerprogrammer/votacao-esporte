// ========================
// DADOS
// ========================
const categorias = {
    sub6: [
        { nome: "Pedro Veloz", img: "img/pedro.png" },
        { nome: "Lucas Goleador", img: "img/lucas.png" }
    ],
    sub7: [
        { nome: "Gabriel Ágil", img: "img/gabriel.png" },
        { nome: "Matheus Forte", img: "img/matheus.png" }
    ],
    sub8: [
        { nome: "Davi Drible", img: "img/davi.png" },
        { nome: "Felipe Defesa", img: "img/felipe.png" }
    ]
};

// ========================
// VOTOS (localStorage)
// ========================
let votos = JSON.parse(localStorage.getItem("votos")) || {
    sub6: [0, 0],
    sub7: [0, 0],
    sub8: [0, 0]
};

function salvarVotos() {
    localStorage.setItem("votos", JSON.stringify(votos));
}

// ========================
// PAGINAÇÃO
// ========================
const votacaoContainer = document.getElementById("votacaoContainer");
const rankingContainer = document.getElementById("rankingContainer");
const rankingContent = document.getElementById("rankingContent");

// ========================
// MOSTRAR CATEGORIA
// ========================
document.querySelectorAll(".cat-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        mostrarCandidatos(btn.dataset.cat);
    });

    if (i == 0) btn.click();
});

function mostrarCandidatos(cat) {
    const box = document.getElementById("candidatosContainer");
    box.innerHTML = "";

    categorias[cat].forEach((c, i) => {
        box.innerHTML += `
            <div class="card">
                <div class="circle" style="background-image:url('${c.img}')"></div>
                <h3>${c.nome}</h3>
                <p>${cat.toUpperCase()}</p>
                <button class="vote-btn" onclick="votar('${cat}', ${i})">Votar</button>
            </div>
        `;
    });
}

// ========================
// VOTAR
// ========================
function votar(cat, i) {
    votos[cat][i]++;
    salvarVotos();
    alert("Voto registrado!");
}

// ========================
// RANKING
// ========================
function mostrarRanking() {
    rankingContent.innerHTML = "";

    Object.keys(categorias).forEach(cat => {
        const total = votos[cat].reduce((a, b) => a + b, 0);

        let list = categorias[cat].map((c, i) => ({
            nome: c.nome,
            votos: votos[cat][i],
            pct: total ? ((votos[cat][i] / total) * 100).toFixed(1) : 0
        }));

        list.sort((a, b) => b.votos - a.votos);

        let html = `
            <div class="rank-box">
                <h3>${cat.toUpperCase()} (${total} votos)</h3>
        `;

        list.forEach(item => {
            html += `
                <div class="rank-line">
                    <span>${item.nome}</span>
                    <div class="bar-bg"><div class="bar-fill" style="width:${item.pct}%"></div></div>
                    <span>${item.votos} (${item.pct}%)</span>
                </div>
            `;
        });

        html += `</div>`;
        rankingContent.innerHTML += html;
    });
}

// ========================
// PROTEÇÃO POR SENHA
// ========================
const SENHA = "1234";

// abrir popup
document.getElementById("btnRanking").onclick = () => {
    document.getElementById("senhaOverlay").style.display = "flex";
    document.getElementById("senhaInput").value = "";
};

// confirmar senha
document.getElementById("confirmarSenha").onclick = () => {
    const senha = document.getElementById("senhaInput").value;

    if (senha === SENHA) {
        document.getElementById("senhaOverlay").style.display = "none";
        votacaoContainer.style.display = "none";
        rankingContainer.style.display = "block";
        document.getElementById("btnRanking").classList.add("active");
        document.getElementById("btnVotacao").classList.remove("active");
        mostrarRanking();
    } else {
        alert("Senha incorreta!");
        document.getElementById("senhaOverlay").style.display = "none";
        votacaoContainer.style.display = "block";
        rankingContainer.style.display = "none";
    }
};

// voltar para votação
document.getElementById("btnVotacao").onclick = () => {
    votacaoContainer.style.display = "block";
    rankingContainer.style.display = "none";
    document.getElementById("btnRanking").classList.remove("active");
    document.getElementById("btnVotacao").classList.add("active");
};
