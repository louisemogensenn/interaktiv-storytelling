
// Informationsindhold til de forskellige månefaser

const dagOverskrift = document.getElementById('day-text'); // Tager fat i tagget, der angiver dagen

const moonPhaseHeading = document.getElementById('moonPhaseHeading'); // Tager fat i tagget med overskriften (Fuld måne eksempelvis)

const maanefaseBeskrivelse = document.getElementById('description'); // Tager fat i det tag, hvori beskrivelsen af månenfasen skal ligge

// Array med dag

const dage = ["Dag 17 af 27", "Dag 21 af 27", "Dag 24 af 27", "Dag 27 af 27", "Dag 3 af 27", "Dag 7 af 27", "Dag 10 af 27", "Dag 14 af 27"]; // Består af strings 

// Overskrift

const maanefase = ["FULDMÅNE", "AFTAGENDE GIBBOUS", "TREDJE KVARTAL", "AFTAGENDE HALVMÅNE", "NYMÅNE", "VOKSENDE HALVMÅNE", "KVARTMÅNE", "VOKSENDE GIBBOUS"]; // Består af strings

//Beskrivelser i konstanter

const fuldmaaneBeskrivelse = "Fuldmånen kan påvirke vores søvn, da mange sover 20-25 minutter mindre på grund af det øgede lys...";

const aftagendeGibbousBeskrivelse = "Efter fuldmånen begynder månen langsomt at miste sit lys, mens nataktive dyr vågner... ";

const tredjeKvartalBeskrivelse = "Denne fase varer kun én nat, før månen fortsætter til sin sidste fase. Dvs. Månen er synlig på nattehimlen hele morgenen.";

const aftagendeHalvmaaneBeskrivelse = "Månen er synlig på himlen i de tidlige morgentimer, typisk inden solopgang, og gør klar till at begynde en ny cyklus.";

const nymaaneBeskrivelse = "Nymånen ses én gang pr. måned og repræsenterer et øjeblik med nulpunkt og fornyelse, hvor månecyklussen starter forfra.";

const voksendeHalvmaaneBeskrivelse = "Under denne fase er månen i en position, hvor den står lavt på himlen, og den kan ses om aftenen lige efter solnedgang.";

const kvartmaaneBeskrivelse = "Månen er synlig fra eftermiddag til midnat. Her kan den ses tydeligt om eftermiddagen og om aftenen.";

const voksendeGibbousBeskrivelse = "Månen er næsten fuld, og energien intensiveres. Dette er typisk en tid med høj energi og produktivitet.";

// Array med beskrivelser - arrayet består af ovenstående konstanter og skal gøre det muligt at skifte mellem beskrivelserne gennem arrayet. Dette øger vores læsbarhed

const beskrivelser = [fuldmaaneBeskrivelse, aftagendeGibbousBeskrivelse, tredjeKvartalBeskrivelse, aftagendeHalvmaaneBeskrivelse, nymaaneBeskrivelse, voksendeHalvmaaneBeskrivelse, kvartmaaneBeskrivelse, voksendeGibbousBeskrivelse];

// Array-opsætninger er lavet sådan, at hver index-værdi hænger sammen (værdierne i index[i] stemmer overens)

// Create stars
const starsContainer = document.getElementById('stjerner');
for (let i = 0; i < 200; i++) { // Laver 200 stjerner
    const star = document.createElement('div'); // Lavet et HTML-tag div og gemmer dette tag i konstanten star (der laves ete nyt div-element 200 gange)
    star.className = 'star'; // Elementet tildeles klassen star
    star.style.left = Math.random() * 100 + '%'; // Tilfældige positioner med Math.random hvor værdien angives i procent
    star.style.top = Math.random() * 100 + '%'; // Tilfældige positioner med Math.random hvor værdien angives i procent
    star.style.opacity = Math.random(); // Værdien er tilfældig 
    starsContainer.appendChild(star); // Tilføjer stjernen til som det sidste element i listen starsContainer
}

// Array med billeder af månefaserne
const moonPhases = ["images/fuldmaane.webp", "images/aftagendeGibbous.webp", "images/tredjeKvartal.webp", "images/aftagendeHalvmaane.webp", "images/nymaane.webp", "images/voksendeHalvmaane.webp", "images/kvartmaane.webp", "images/voksendeGibbous.webp"];

let currentPhase = 0; // Starter i fuldmåne  - se ovenstående array
const moon = document.getElementById('moon'); //tager fat i elementet med id'et moon
moon.style.backgroundImage = `url(${moonPhases[currentPhase]})`; //baggrundsbilledet bliver til det billede i arrayet, der er i currentIndex

// Sikrer, at der er indhold på siden ved start - dette indhold passer til der, hvor månen er placeret
dagOverskrift.innerHTML = dage[0];
moonPhaseHeading.innerHTML = maanefase[0];
maanefaseBeskrivelse.innerHTML = beskrivelser[0];

// Create white dots
const hvidPrik = document.getElementById('hvidPrik'); // Henter om gemmer HTML-tagget med id'et hvidPrik
const numberOfDots = 8; // Vi ønkser otte hvide prikker
const radiusX = 500; // Horizontal radius - bestemmer hvor langt ud månen må flytte sig fra centrum (jorden) horisontalt
const radiusY = 357.15; // Vertical radius - bestemmer hvor langt op og ned månen må flytte sig fra centrum (jorden) vertikalt
// Det er de to ovenstående værdier der skaber den ovale form vi ønsker, hvor bredden er 700 px og højden er 500px

function updateNextDot() {
    const dots = document.querySelectorAll('.dot'); // Den gemmer alle elementer med klassen dot i konstanten - elementerne med klassen dot bliver lavet i for-loopet under funktionen.
    dots.forEach(dot => dot.classList.remove('next'));
    const currentDot = document.querySelector('.dot.active');
    const currentIndex = parseInt(currentDot.dataset.phase);
    const nextIndex = (currentIndex + 1) % numberOfDots;
    dots[nextIndex].classList.add('next');
}

for (let i = 0; i < numberOfDots; i++) {
    const dot = document.createElement('div'); // Laver et nyt div-tag
    dot.className = 'dot'; // Giver dit-tagget klassen dot
    const angle = (i * 2 * Math.PI) / numberOfDots - Math.PI / 2; // Start from top
    /* 
    2 * π = 360∘ (en hel cirkel)
    / numberOfDots = deler cirklen op i lige store dele - med otte cirkler er det 45∘ mellem hver
    * i = ganger med tælleren (0-7) for at få den specifikke vinkel for hver prik
    - π / 2 = flytter startpunktet til toppen - ellers ville prikken starte på højre side
    */
    const x = radiusX * Math.cos(angle); // Giver et tal mellem 1 og -1 og ganger tallet med radiusX(350px) for den faktiske pixel-position for prikken og giver den vandrette position for prikken
    const y = radiusY * Math.sin(angle); // Giver et tal mellem 1 og -1 og ganger tallet med radiusY(250px) for den faktiske pixel-position for prikken og giver den lodrette position for prikken

    // De tre ovenstående linjer skaber en jævn fordeling af af prikker i en ellipse startende fra toppen og går uret rundt
    dot.style.left = `calc(50% + ${x}px)`; // Afstanden fra venstre side er 50% + xpx
    dot.style.top = `calc(50% + ${y}px)`; // Afstanden fra top er 50% + ypx
    dot.dataset.phase = i; // Hvad gør dette?
    hvidPrik.appendChild(dot); // Hvad gør dette?
    }

// Initialize the active dot and moon position
const dots = document.querySelectorAll('.dot');
dots[0].classList.add('active', 'hidden'); // Start at Full Moon position
updateNextDot(); // Kalder på funktionen, der initialiserer næste prik

// Position moon at starting position
const startAngle = (0 * 2 * Math.PI) / numberOfDots - Math.PI / 2; // 0 for at starte ved prik 0 (toppen)

moon.style.left = `calc(50% + ${radiusX * Math.cos(startAngle)}px)`;
moon.style.top = `calc(50% + ${radiusY * Math.sin(startAngle)}px)`;

// Add click handlers
dots.forEach(dot => {
    dot.addEventListener('click', function() {
    if (this.classList.contains('next')) {
        const phase = parseInt(this.dataset.phase);
        const prevPhase = (phase - 1 + numberOfDots) % numberOfDots;

        // Update active dot
        dots[prevPhase].classList.remove('active');
        this.classList.add('active');
        this.classList.remove('next');

        // Fjern 'active' og 'hidden' klasser fra forrige prik
        dots[prevPhase].classList.remove('active', 'hidden');

        // Tilføj 'active' og 'hidden' klasser til nuværende prik
        this.classList.add('active', 'hidden');

        // Update moon phase
        currentPhase = phase;
        moon.style.backgroundImage = `url(${moonPhases[currentPhase]})`;

        // Update day and moon phase heading and description
        dagOverskrift.innerHTML = dage[currentPhase]; // Ændrer dagen
        moonPhaseHeading.innerHTML = maanefase[currentPhase]; // Ændrer overskiften
        maanefaseBeskrivelse.innerHTML = beskrivelser[currentPhase]; // Ændrer beskrivelsen

        // Animate moon position
        const angle = (phase * 2 * Math.PI) / numberOfDots - Math.PI / 2;
        const x = radiusX * Math.cos(angle);
        const y = radiusY * Math.sin(angle);
        moon.style.left = `calc(50% + ${x}px)`;
        moon.style.top = `calc(50% + ${y}px)`;

        // Update next dot
        updateNextDot();
    }
    });
});

// Add click handler for read more button
document.getElementById('read-more').addEventListener('click', () => {

// Add your read more functionality here
alert('Read more clicked');
});
