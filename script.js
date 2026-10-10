
// Tableau des questions
let tabquizz = [
    {
        question: "Que signifie HTML ?",
        choix: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyper Transfer Main Language",
            "Home Tool Markup Language"
        ],
        reponse: "HyperText Markup Language"
    },

    {
        question: "Quel langage sert à styliser une page web ?",
        choix: ["Python", "CSS", "C", "SQL"],
        reponse: "CSS"
    },

    {
        question: "Quel langage rend une page web interactive ?",
        choix: ["HTML", "CSS", "JavaScript", "SQL"],
        reponse: "JavaScript"
    },

    {
        question: "Que signifie CSS ?",
        choix: [
            "Computer Style System",
            "Cascading Style Sheets",
            "Creative System Software",
            "Colorful Style Sheets"
        ],
        reponse: "Cascading Style Sheets"
    },

    {
        question: "Quel langage sert aux requêtes de bases de données ?",
        choix: ["SQL", "HTML", "CSS", "Bootstrap"],
        reponse: "SQL"
    },

    {
        question: "Quel langage est utilisé pour développer des logiciels et des systèmes ?",
        choix: ["Bootstrap", "C", "HTML", "CSS"],
        reponse: "C"
    },

    {
        question: "Bootstrap sert principalement à quoi ?",
        choix: [
            "Créer des bases de données",
            "Créer des interfaces web responsives",
            "Remplacer JavaScript",
            "Créer des systèmes d'exploitation"
        ],
        reponse: "Créer des interfaces web responsives"
    },

    {
        question: "Quelle balise HTML permet de créer un lien ?",
        choix: ["<p>", "<img>", "<a>", "<h1>"],
        reponse: "<a>"
    },

    {
        question: "Comment déclarer une variable avec let en JavaScript ?",
        choix: [
            "let age = 20;",
            "variable age = 20;",
            "int age = 20;",
            "var: age = 20;"
        ],
        reponse: "let age = 20;"
    },

    {
        question: "Que signifie CPU ?",
        choix: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        reponse: "Central Processing Unit"
    }
];

function melangerTableau(tab) {
    for (let i = tab.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        // Échanger les éléments
        [tab[i], tab[j]] = [tab[j], tab[i]];
    }

    return tab;
}
melangerTableau(tabquizz)

function melangerchoix(tab) {
    for (let i = tab.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        // Échanger les éléments
        [tab[i], tab[j]] = [tab[j], tab[i]];
    }

    return tab;
}
tabquizz.forEach((e, i) => {
    melangerchoix(e.choix)
})
// Récupération des éléments HTML
const nomJoueur = document.getElementById("nomJoueur");
const scoreJoueur = document.getElementById("scoreJoueur");
const messageReponse = document.getElementById("messageReponse");
const clickgame = document.getElementById("clickgame");
const formulaire = document.getElementById("formulaire");
const carte = document.getElementById("carte");
const resultat = document.getElementById("resultat");

const nom = document.getElementById("nomj");
const contenucarte = document.getElementById("contenucarte");
const messageFinal = document.getElementById("messageFinal");


// Variables du jeu
let score = 0;
let indexQuestion = 0;
let nomActuel = "";


// Bouton Jouer
function gameclick() {
    clickgame.hidden = true;
    formulaire.hidden = false;
}


// Bouton Lancer
function startup() {
    nomActuel = nom.value.trim();

    if (nomActuel === "") {
        alert("Veuillez saisir votre nom !");
        return;
    }

    score = 0;
    indexQuestion = 0;

    nomJoueur.textContent = "Nom : " + nomActuel;
    scoreJoueur.textContent = "Score : " + score;

    formulaire.hidden = true;
    carte.hidden = false;

    afficherCarte();
}
let time = 20;
let temps = null;
demmarrer_compteur = false;
const temps_restant = document.getElementById("temp_restant");
function afficherCarte() {
    const e = tabquizz[indexQuestion];
    contenucarte.innerHTML = `
        <div class="card-header text-center">
            <h5>Question ${indexQuestion + 1}/${tabquizz.length}</h5>
            <p>${e.question}</p>
        </div>

        <div class="card-body">
            ${e.choix.map((reponse, i) => `
                <div class="mb-3">
                    <button
                        class="btn btn-outline-dark bg-light w-100 reponse"
                        onclick="choix(${i})">
                        ${reponse}
                    </button>
                </div>
            `).join("")}
        </div>
    `;
    if (demmarrer_compteur == false) {
        demmarrer_compteur = true
        temps = setInterval(() => {
            time--;
            temps_restant.textContent = "temps restant : " + time + " secondes";
            if (time <= 0) {
                clearInterval(temps)
                return
            }
        }, 1000);
        setTimeout(() => {
            terminerQuiz();
            temps_restant.textContent = "temps restant : " + time + " secondes"
            time = 20
        }, 20000)
    }

}
// Afficher la question actuelle

function choix(indice) {
    const questionActuelle = tabquizz[indexQuestion];

    const reponseChoisie = questionActuelle.choix[indice];
    const bonneReponse = questionActuelle.reponse;

    if (reponseChoisie === bonneReponse) {
        score++;

        messageReponse.textContent = "Bonne réponse ! 🎉";
        messageReponse.className = "text-center fw-bold text-success";

    } else {
        messageReponse.textContent = "Mauvaise réponse ! ❌";
        messageReponse.className = "text-center fw-bold text-danger";
    }

    scoreJoueur.textContent = "Score : " + score + "/10";
    // verification du temps
    indexQuestion++
    if (indexQuestion < tabquizz.length) {
        afficherCarte();
        stop = false;
    } else {
        terminerQuiz();
        stop = true;
    }
}



// Fin du quiz
function terminerQuiz() {
    messageReponse.textContent = "";
    clearInterval(temps)
    time = 20
    carte.hidden = true;
    resultat.hidden = false;

    messageFinal.textContent =
        nomActuel + ", tu as obtenu " + score +
        " bonne(s) réponse(s) sur " + tabquizz.length + ".";
}


// Recommencer le quiz
function recommencer() {
    demmarrer_compteur = false
    resultat.hidden = true;
    clickgame.hidden = false;
    formulaire.hidden = true;
    carte.hidden = true;

    score = 0;
    indexQuestion = 0;

    scoreJoueur.textContent = "Score : 0";
    nomJoueur.textContent = "Nom : Joueur";

    nom.value = "";
    nomActuel = "";
}

