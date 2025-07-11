const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");

const responses = {
  help: `Commandes disponibles :
- "competences" → Mes compétences techniques
- "qualites" → Mes points forts
- "defauts" → Mes petits défauts
- "passions" → Mes passions
- "parcours" → Mon parcours et expériences`,

  competences: `Développement web :
- HTML / CSS (intégration responsive, animations)
- JavaScript (interactions, DOM)
- PHP / MySQL (back-end dynamique, gestion de bases de données)

Design & outils créatifs :
- Figma (UI, UX)
- Photoshop, Illustrator
- Maquettage, wireframing

Langues :
- Français
- Anglais (intermédiaire)
- Espagnol (intermédiaire)`,

  qualites: `Qualités :
- Créative et curieuse : j’aime apprendre, tester et innover.
- Organisée : je structure, je planifie, je priorise.
- Persévérante : je continue même quand c’est difficile.
- Sens du détail : j’aime quand tout est bien pensé et bien fait.`,

  defauts: `Défauts (ou presque) :
- Perfectionniste — parfois trop exigeante.
- Autonome — j'aime creuser seule (mais je sais quand même demander de l'aide).
- Discrète — j’analyse avant d’agir.`,

  parcours: `Parcours :

Études :
- Bac général spécialités Mathématiques et NSI, 2021 - 2024
- BUT MMI (Métiers du Multimédia et de l'Internet), en cours

Expériences :
- Agent d’accueil à la RATP pendant les Jeux Olympiques (relation client, adaptation rapide)
- Projets personnels en intégration web (ex : MayaMaths)
- Travaux créatifs en design et communication (SAE de groupe)

Ce parcours reflète ma polyvalence entre développement web, design et sens de l’organisation.`,

  passions: `Passions :

Voyager :
J’ai visité de nombreux pays à travers le monde. Chaque voyage m’apporte de l’inspiration et élargit ma vision.

Cuisiner :
J’adore expérimenter des recettes, allier rigueur et créativité. C’est un vrai moment de plaisir.

Cinéma / séries :
J’aime explorer différents univers pour m’évader, réfléchir ou simplement me détendre.

Balades :
Observer, marcher, prendre l’air — une manière simple de nourrir ma curiosité et de faire le vide.`
};

// Historique des commandes
let history = [];
let historyIndex = -1;

// Animation ligne par ligne
function printLinesAnimated(lines, delay = 100) {
  let index = 0;

  function printNext() {
    if (index < lines.length) {
      terminal.innerHTML += lines[index] + "\n";
      terminal.scrollTop = terminal.scrollHeight;
      index++;
      setTimeout(printNext, delay);
    } else {
      // Ajoute une ligne vide après la réponse complète
      terminal.innerHTML += "\n";
    }
  }

  printNext();
}


// Boot sequence
function bootSequence() {
  const bootLines = [
    "Initialisation du terminal...",
    "Chargement du profil de Selma...",
    "Prêt.",
    '',
    'Tapez "help" pour voir les commandes disponibles.',
    ''
  ];

  input.disabled = true;
  let lineIndex = 0;

  function typeLine(line) {
    let charIndex = 0;

    function typeChar() {
      if (charIndex < line.length) {
        terminal.innerHTML += line.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 15); // vitesse d’écriture
      } else {
        terminal.innerHTML += "\n";
        terminal.scrollTop = terminal.scrollHeight;
        lineIndex++;
        if (lineIndex < bootLines.length) {
          setTimeout(() => typeLine(bootLines[lineIndex]), 300); // pause entre lignes
        } else {
          input.disabled = false;
          input.focus();
        }
      }
    }

    typeChar();
  }

  typeLine(bootLines[lineIndex]);
}


// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
  bootSequence();
});

input.addEventListener("keydown", (e) => {
  // Navigation dans l'historique
  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
    e.preventDefault();
    return;
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      input.value = "";
      historyIndex = history.length;
    }
    e.preventDefault();
    return;
  }

  // Envoi de la commande
  if (e.key === "Enter") {
    const command = input.value.trim();
    if (command) {
      terminal.innerHTML += `> ${command}\n\n`;
      const response = responses[command] || 'Commande inconnue. Tapez "help" pour voir les commandes.';
      printLinesAnimated(response.split("\n"));
      history.push(command);
      historyIndex = history.length;
    }
    input.value = "";
  }
});
