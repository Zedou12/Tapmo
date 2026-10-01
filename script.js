
let score = 0;
let index = 0;
let modeC = 1;                                                  //mode de base = mots
let tab = tabMots;
let listener = false;                                           //pas de listener au début
const divStart = document.getElementById("start");
const divGame = document.getElementById("game");
const divScoreFinal = document.getElementById("scoreFinal");

divStart.style.display = 'block';
divGame.style.display = 'none';
divScoreFinal.style.display = 'none';

//Creaation du bouton JOUER
const btnJouer = document.getElementById("btnJouer");
btnJouer.addEventListener('click', jouer);

//Quand on clique sur le bouton Jouer
function jouer(){       

    // Selection du mode
    let choixBtn = document.querySelectorAll('input[name="choixMode"]');
    choixBtn.forEach(radio => {
        if(radio.checked){
            modeC = radio.value;
        }
        if(modeC == 1){
            tab = tabMots;
        }else{
            tab = tabPhrases;
        }
    });

    //lance le jeu avec la valeur selectionnée (jeu ou phrases)
    lancerJeu(modeC);
    divStart.style.display = 'none';
    divGame.style.display = 'block';
}

//Lance le jeu , parametre = mode choisi
function lancerJeu (mode){
    
    //remise à zéro des differetnts variables et affichages
    score = 0;
    index = 0;
    let prop = " ";
    afficherMode(mode);
    afficherProp();
    afficherScore();
    
    let btnValider = document.getElementById("btnValider");
    // Quand on clique sur le bouton Valider
    btnValider.addEventListener('click', valider);
    //Quand on appuie sur Entree
    const inputJoueur1 = document.getElementById("champJoueur");
    //inputJoueur1.focus();
    
    if(listener === false){                                      //check si un listener est déjà présent
        inputJoueur1.addEventListener("keydown", (event) => {
            if (event.repeat) return;
            if (event.key === "Enter"){
                valider();       
            }
            
        });
    listener = true;                                            // indique qu'un listener est présent si true
    }

}

//validation du mot du joueur - check si la réponse est bonne - incremente et affiche le score
function valider(){

        const inputJoueur = document.getElementById("champJoueur");
        const proposition = document.getElementById("prop").innerText;
        
        if(inputJoueur.value === proposition){           //Si le mot correspond
            console.log("bon");
            score ++;
            inputJoueur.value = '';
            
        }else{                                   //Si le mot ne correspond pas
            console.log("mauvais");
            inputJoueur.value = '';
        }
        
        index++;
        afficherProp();                         //Passage au mot suivant
        afficherScore();                        //mise à jour de l'affichage du score
        inputJoueur.focus();
        checkFin();                             //check si le jeu est fini
}

//Vérifie si le jeu est fini et agit en consequence
function checkFin(){
   
    if(tab[index] === "Stop" ){                 //Si on a atteint la fin du tableau
        
        //affichage de l'ecran de fin
        divGame.style.display = 'none';
        divScoreFinal.style.display = 'block';

        //Affichage du score final
        document.getElementById("nbScoreFinal").innerText = score;
        document.getElementById("totalFinal").innerText = tab.length -1;

        //mise en place du bouton REJOUER -> Retour à l'écran de début
        let btnRejouer = document.getElementById("btnRejouer");
        btnRejouer.addEventListener('click', () => {
            divScoreFinal.style.display = 'none';
            divStart.style.display = 'block';
            score = 0;
            index = 0;
        })
    }
}

// Affiche le mode selectionné (tapez phrase ou mot suivant)
function afficherMode(choix){
   
    if(choix == 1){
    let textAfficheMode = "le mot suivant";
    let afficheMode = document.getElementById("spanMode");
    afficheMode.innerText = textAfficheMode;

    }else{
    let textAfficheMode = "la phra suivante";
    let afficheMode = document.getElementById("spanMode");
    afficheMode.innerText = textAfficheMode;
    }    
}

//Affiche le score en bas de la page
function afficherScore(){
   
    let zoneScore = document.getElementById("points");
    zoneScore.innerText = score;

    let zoneTotal = document.getElementById("total");
    zoneTotal.innerText = tab.length-1;
}

// Affiche le mot  à taper en fonction du mode (phrases ou mots)
// et de où on en est dans le tableau de propositions correspondant
function afficherProp(){
   
    let zoneProp = document.getElementById("prop");
    prop = tab[index]
    zoneProp.innerText = prop;                                        //Affiche le truc                 
}
