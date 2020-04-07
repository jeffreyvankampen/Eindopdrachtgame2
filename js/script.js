/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

//Ik begin alle variabelen aan te maken in een opslag
var recticle = document.getElementById('recticle');
var doelwit = document.getElementById('doelwit');
var schietKnop = document.getElementById('schietKnop');
var scoreDisplay = document.getElementById("score");
var name = document.getElementById("form");
var feedback = document.getElementById("feedback");

//Dit is de helft van het doelwit dat gelijk staat aan het doelwit bereik. De bullseye in het midden daarvan is een klein deel van het doelwit bereik 
//De breedte is de hele diameter van het doelwit, en het bereik heb staat op de helft 
var doelwitBereik = doelwit.width / 2;
var bullseyeBereik = doelwitBereik / 100 * 50; //Hiermee kan ik het bereik van de hitbox bullseye veranderen

//Door de X en Y kan ik het midden berekenen
var doelwitX = doelwit.offsetLeft + doelwitBereik; //Volgens mozilla kon ik offset het best gebruiken om de positie vanaf links te positioneren
var doelwitY = doelwit.offsetTop + doelwitBereik;
var score = 0; //Hier leg ik de score in vast dat begint bij nul vanaf een HTML element
var playing = true; //Boolean om te kijken of de speler in leven is

//Met de X en Y kan ik de positie van de recticle berekenen
var recticleX;
var recticleY;
var refresh = document.getElementById("refresh");
var hearts = [document.getElementById("heart1"), document.getElementById("heart2"), document.getElementById("heart3")]; //Hier maak ik een variabele met arrays voor de heartcontainers die in de display staan
var lives = 3; //Het aantal levens is 3

refresh.addEventListener("click", function () { //Met location reload kan ik door een click op het icoon de pagina herladen
    location.reload();
});

schietKnop.addEventListener("click", schiet);

function schiet() {
    if (playing) { //Gebeurt alleen als de var playing true is
        recticleX = recticle.offsetLeft + (recticle.width / 2); //Hier kan ik de positie van de recticle in het midden vinden met een X en Y as
        recticleY = recticle.offsetTop + (recticle.height / 2);

        if (recticleX >= doelwitX - bullseyeBereik && //Hitbox voor de bullseye volgens 4 verticles 
            recticleX <= doelwitX + bullseyeBereik && //Logical operator && (and) om de objecten aan de rest te valideren
            recticleY >= doelwitY - bullseyeBereik && //Groter of kleiner dan gelijk maken aan het doelwit
            recticleY <= doelwitY + bullseyeBereik) {

            if (lives < 3) { //Als de bullseye raakt, voeg leven toe (in vergelijking tot 3 maximale)
                hearts[lives].classList.toggle("hidden");
                lives++;
            }
        }

        if (recticleX >= doelwitX - doelwitBereik && //Hitbox voor het hele doelwit volgens 4 verticles
            recticleX <= doelwitX + doelwitBereik && //Logical operator && (and) om de objecten aan de rest te valideren  
            recticleY >= doelwitY - doelwitBereik && //Groter of kleiner dan gelijk maken aan het doelwit
            recticleY <= doelwitY + doelwitBereik) {
            score += 100; //Als het doelwit raakt, voeg +100 toe aan score en wijzig de HTML DOM
            scoreDisplay.innerHTML = score;
        } else { //Als hij niets raakt, verlies een leven
            lives--;
            hearts[lives].classList.toggle("hidden"); //Hier toggle ik de class door hem aan te spreken en éen leven te wijzigen
            if (lives === 0) { //Kijk hoeveel levens er zijn en dat het spel klaar is
                playing = false;
                feedback.innerHTML = "Game over"; //Verandert de inner html content van het element
                recticle.classList.toggle("hidden"); //Hier toggle ik de class hidden en de recticle uit te zetten als het spel inactief is
            }
        }
    }
}

name.addEventListener("submit", function () { //Dit is een eventlistener om het formulier in de HTML te kunnen submitten
    name.setAttribute("type", "text"); //Met de functie zet ik een attribuut (eigenschappen) voor de name namelijk het formulier
});


//Bronvermeldingen
//https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
//https://codepen.io/mallburn/pen/kumDK
//https://codepen.io/trolling19/pen/ygmMXW James over input van eventlisteners
//https://www.freepik.com/premium-vector/castle-building-fairytale-mountainous-landscape_5597774.htm#page=1&query=castle&position=29 Freepik premium voor de background
//https://fontawesome.com/icons/heart voor het icoon
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop Mozilla over offset gebruik
//https://www.youtube.com/watch?v=s9wW2PpJsmQ van Programming with Mosh over Loops
//https://blog.usejournal.com/mastering-javascripts-and-logical-operators-fd619b905c8f Nicolas Marcora over Boolean operator
//https://www.w3schools.com/jsref/prop_html_innerhtml.asp w3schools over innerhtml 
//https://alligator.io/js/classlist/ alligator over classlist add remove or toggle

//Loop vorige code
//   for (i = 0; i < 3; i++) { //Met loop i (index) gelijk aan 0 voert hij i uit zolang het groter is
//     if (i < lives) {
//      hearts[i].style.display = "block"; //Wanneer dit gebeurt staat een hart in display
//      } else {
//      hearts[i].style.display = "none"; //Hier wordt het hart inactief, dus verdwijnt het hart uit de display 
//          }
//        }
//    }
//}
