// ========================
// DADOS
// ========================
const categorias = {
    sub6: [
        { nome: "Henry", img: "imgs/sub6/henry.jpeg" },
		{ nome: "Miguel", img: "imgs/sub6/miguel.jpeg" },
        { nome: "Henry", img: "imgs/sub6/henry.jpeg" },
		{ nome: "Henry", img: "imgs/sub6/henry.jpeg" },
		{ nome: "Henry", img: "imgs/sub6/henry.jpeg" },
		{ nome: "Henry", img: "imgs/sub6/henry.jpeg" },
		{ nome: "Henry", img: "imgs/sub6/henry.jpeg" }
    ],
    sub7: [
        { nome: "Davi", img: "imgs/sub7/davi.jpeg" },
        { nome: "Gabriel", img: "imgs/sub7/gabriel.jpeg" },
		{ nome: "João Otávio", img: "imgs/sub7/joaootavio.jpeg" },
		{ nome: "João Lucas", img: "imgs/sub7/joaolucas.jpeg" },
		{ nome: "Kaleb", img: "imgs/sub7/kaleb.jpeg" },
		{ nome: "Leonardo", img: "imgs/sub7/leonardo.jpeg" },
		{ nome: "Pedro", img: "imgs/sub7/pedro.jpeg" },
		{ nome: "Samuel", img: "imgs/sub7/samuel.jpeg" },
		{ nome: "Manuela", img: "imgs/sub7/manuela.jpeg" },
		{ nome: "Miguel", img: "imgs/sub7/miguel.jpeg" },
    ],
    sub8: [
        { nome: "Davi Drible", img: "img/davi.png" },
        { nome: "Felipe Defesa", img: "img/felipe.png" }
    ] ,
	 sub9: [
        { nome: "Arthur", img: "imgs/sub9/arthur.jpeg" },
		{ nome: "Davi Luno", img: "imgs/sub9/daviluno.jpeg" },
		{ nome: "Elyelson", img: "imgs/sub9/elyelson.jpeg" },
		{ nome: "Leonardo", img: "imgs/sub9/leonardo.jpeg" },
		{ nome: "Luís", img: "imgs/sub9/luis.jpeg" },
		{ nome: "Nícolas", img: "imgs/sub9/nicolas.jpeg" },
		{ nome: "Rafinha", img: "imgs/sub9/rafinha.jpeg" },
		{ nome: "Tayllison", img: "imgs/sub9/Tayllison.jpeg" },
		{ nome: "Théo José", img: "imgs/sub9/theojose.jpeg" },
		{ nome: "Théo Enrico", img: "imgs/sub9/theoenrico.jpeg" }
		
    ] ,
	 sub10: [
        { nome: "Felipe", img: "imgs/sub10/felipe.jpeg" },
		{ nome: "Gabriel", img: "imgs/sub10/gabriel.jpeg" },
		{ nome: "João Miguel", img: "imgs/sub10/joaomiguel.jpeg" },
		{ nome: "João Vitor", img: "imgs/sub10/joaovitor.jpeg" },
		{ nome: "Jonas", img: "imgs/sub10/jonas.jpeg" },
		{ nome: "José", img: "imgs/sub10/jose.jpeg" },
		{ nome: "Mateus", img: "imgs/sub10/mateus.jpeg" },
		{ nome: "Miguel", img: "imgs/sub10/miguel.jpeg" },
		{ nome: "Pietro", img: "imgs/sub10/pietro.jpeg" }
    ] ,
	sub12: [
        { nome: "Bernardo", img: "imgs/sub12/bernardo.jpeg" },
		{ nome: "Kaio", img: "imgs/sub12/kaio.jpeg" },
		{ nome: "Evandro", img: "imgs/sub12/evandro.jpeg" },
		{ nome: "Joaquim", img: "imgs/sub12/joaquim.jpeg" },
		{ nome: "Jhenifer", img: "imgs/sub12/jhenifer.jpeg" },
		{ nome: "Miguel Serrano", img: "imgs/sub12/miguelserrano.png" },
		{ nome: "Pedro Antonio", img: "imgs/sub12/pedroantonio.jpg" },
        { nome: "Pedro Fagner", img: "imgs/sub12/pedrofagner.png" },
		{ nome: "Paulo", img: "imgs/sub12/paulo.jpeg" },
		{ nome: "Pietro", img: "imgs/sub12/pietro.png" }
	]
};

// ========================
// VOTOS (localStorage)
// ========================
let votos = JSON.parse(localStorage.getItem("votos")) || generateVotos();

function generateVotos() {
    return Object.fromEntries(
        Object.keys(categorias).map(cat => [cat, new Array(categorias[cat].length).fill(0)])
    );
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

function gerarPDF() {
    // Seleciona o elemento que você quer imprimir
    const element = document.getElementById('rankingContainer');

    // Configurações do PDF
    const options = {
        margin: [20, 20, 20, 20], // Margens (topo, esq, baixo, dir)
        filename: 'resultado-votacao.pdf', // Nome do arquivo
        image: { type: 'jpeg', quality: 0.98 }, // Qualidade da imagem
        html2canvas: {
            scale: 2, // Aumenta a escala para melhor resolução
            logging: true,
            useCORS: true, // Importante se tiver imagens externas
            backgroundColor: '#0f172a' // Garante que o fundo fique da cor correta
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait' // Pode ser 'landscape' (paisagem) se preferir
        }
    };

    // Gera o PDF
    // Mostra um feedback visual simples no botão (opcional)
    const btn = document.getElementById('gerarPDF');
    const footerPDF = document.getElementById('footerPDF');
    const dataGeracao = document.getElementById('dataGeracao');
    const rankingTitle = document.getElementById('rankingTitle');
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    btn.style.display = 'none';
    footerPDF.style.display = 'block';
    rankingTitle.style.display = 'none';
    dataGeracao.innerText = `${dia}/${mes}/${dataAtual.getFullYear()} às ${String(dataAtual.getHours()).padStart(2, '0')}:${String(dataAtual.getMinutes()).padStart(2, '0')}`;

    element.classList.toggle('theme-light', true);

    html2pdf().set(options).from(element).save().then(() => {
        footerPDF.style.display = 'none';
        btn.style.display = 'initial';
        rankingTitle.style.display = 'block';

        element.classList.toggle('theme-light', false);
    });
}