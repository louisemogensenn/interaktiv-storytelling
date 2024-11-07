// Informationsindhold til de forskellige månefaser

const dagOverskrift = document.getElementById('dagTekst'); // Tager fat i tagget, der angiver dagen

const maaneFaseOverskrift = document.getElementById('maaneFaseOverskrift'); // Tager fat i tagget med overskriften (Fuld måne eksempelvis)

const maanefaseBeskrivelse = document.getElementById('maaneFaseBeskrivelse'); // Tager fat i det tag, hvori beskrivelsen af månenfasen skal ligge

// Array med dag

const dage = ["Dag 17 af 27", "Dag 21 af 27", "Dag 24 af 27", "Dag 27 af 27", "Dag 3 af 27", "Dag 7 af 27", "Dag 10 af 27", "Dag 14 af 27"]; // Består af strings - det er disse strings, der sikftes imellem alt efter hvilken prik man klikker på

// Overskrift - det er disse overskrifter, der skiftes imellem alt efter hvilken prik man klikker på

const maanefase = ["FULDMÅNE", "AFTAGENDE GIBBOUS", "TREDJE KVARTAL", "AFTAGENDE HALVMÅNE", "NYMÅNE", "VOKSENDE HALVMÅNE", "KVARTMÅNE", "VOKSENDE GIBBOUS"]; // Består af strings

//Beskrivelser i konstanter - alle beskrivelserne er i konstanter, da de ikke ændrer sig. Det er disse beskrivelser, der skiftes imellem alt efter hvilken prik man klikker på

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

// Laver stjernerne
const stjerneBeholder = document.getElementById('stjerner');
for (let i = 0; i < 200; i++) { // Laver 200 stjerner
    const stjerne = document.createElement('div'); // Lavet et HTML-tag div og gemmer dette tag i konstanten stjerne (der laves ete nyt div-element 200 gange)
    stjerne.className = 'stjerne'; // Elementet tildeles klassen stjerne
    stjerne.style.left = Math.random() * 100 + '%'; // Tilfældige positioner med Math.random hvor værdien angives i procent
    stjerne.style.top = Math.random() * 100 + '%'; // Tilfældige positioner med Math.random hvor værdien angives i procent
    stjerne.style.opacity = Math.random(); // Værdien er tilfældig 
    stjerneBeholder.appendChild(stjerne); // Tilføjer stjernen til som det sidste element i listen stjerneBeholder
}

// Array med billeder af månefaserne
const maaneFaser = ["images/fuldmaane.webp", "images/aftagendeGibbous.webp", "images/tredjeKvartal.webp", "images/aftagendeHalvmaane.webp", "images/nymaane.webp", "images/voksendeHalvmaane.webp", "images/kvartmaane.webp", "images/voksendeGibbous.webp"];

let nuvaerendeFase = 0; // Starter i fuldmåne  - se ovenstående array
const maane = document.getElementById('maane'); //tager fat i elementet med id'et maane
maane.style.backgroundImage = `url(${maaneFaser[nuvaerendeFase]})`; //baggrundsbilledet bliver til det billede i arrayet, der er i nuvaerendeFase

// Sikrer, at der er indhold på siden ved start - dette indhold passer til der, hvor månen er placeret
dagOverskrift.innerHTML = dage[0];
maaneFaseOverskrift.innerHTML = maanefase[0];
maanefaseBeskrivelse.innerHTML = beskrivelser[0];

// Create white dots
const hvidPrik = document.getElementById('hvidPrik'); // Henter om gemmer HTML-tagget med id'et hvidPrik
const antalHvidePrikker = 8; // Vi ønkser otte hvide prikker
const radiusX = 500; // Horizontal radius - bestemmer hvor langt ud månen må flytte sig fra centrum (jorden) horisontalt
const radiusY = 357.15; // Vertical radius - bestemmer hvor langt op og ned månen må flytte sig fra centrum (jorden) vertikalt
// Det er de to ovenstående værdier der skaber den ovale form vi ønsker, hvor bredden er 700 px og højden er 500px

function updateNextDot() {
    const dots = document.querySelectorAll('.dot'); // Den gemmer alle elementer med klassen dot i konstanten - elementerne med klassen dot bliver lavet i for-loopet under funktionen.
    dots.forEach(dot => dot.classList.remove('next'));
    const currentDot = document.querySelector('.dot.active');
    const currentIndex = parseInt(currentDot.dataset.phase);
    const nextIndex = (currentIndex + 1) % antalHvidePrikker;
    dots[nextIndex].classList.add('next');
}

for (let i = 0; i < antalHvidePrikker; i++) {
    const dot = document.createElement('div'); // Laver et nyt div-tag
    dot.className = 'dot'; // Giver dit-tagget klassen dot
    const angle = (i * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2; // Start from top
    /* 
    2 * π = 360∘ (en hel cirkel)
    / talHvidePrikker = deler cirklen op i lige store dele - med otte cirkler er det 45∘ mellem hver
    * i = ganger med tælleren (0-7) for at få den specifikke vinkel for hver prik
    - π / 2 = flytter startpunktet til toppen - ellers ville prikken starte på højre side
    */
    const x = radiusX * Math.cos(angle); // Giver et tal mellem 1 og -1 og ganger tallet med radiusX(350px) for den faktiske pixel-position for prikken og giver den vandrette position for prikken
    const y = radiusY * Math.sin(angle); // Giver et tal mellem 1 og -1 og ganger tallet med radiusY(250px) for den faktiske pixel-position for prikken og giver den lodrette position for prikken

    // De tre ovenstående linjer skaber en jævn fordeling af af prikker i en ellipse startende fra toppen og går uret rundt
    dot.style.left = `calc(50% + ${x}px)`; // Afstanden fra venstre side er 50% + xpx
    dot.style.top = `calc(50% + ${y}px)`; // Afstanden fra top er 50% + ypx
    dot.dataset.phase = i; // Giver prikken en data-attribut med værdien i
    hvidPrik.appendChild(dot); // Tilføjer prikken til hvidPrik
    }

// Initialize the active dot and moon position
const dots = document.querySelectorAll('.dot');
dots[0].classList.add('active', 'hidden'); // Start at Full Moon position
updateNextDot(); // Kalder på funktionen, der initialiserer næste prik

// Position moon at starting position
const startAngle = (0 * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2; // 0 for at starte ved prik 0 (toppen)

maane.style.left = `calc(50% + ${radiusX * Math.cos(startAngle)}px)`;
maane.style.top = `calc(50% + ${radiusY * Math.sin(startAngle)}px)`;

// Add click handlers
dots.forEach(dot => {
    dot.addEventListener('click', function() {
    if (this.classList.contains('next')) {
        const phase = parseInt(this.dataset.phase);
        const prevPhase = (phase - 1 + antalHvidePrikker) % antalHvidePrikker;

        // Update active dot
        dots[prevPhase].classList.remove('active');
        this.classList.add('active');
        this.classList.remove('next');

        // Fjern 'active' og 'hidden' klasser fra forrige prik
        dots[prevPhase].classList.remove('active', 'hidden');

        // Tilføj 'active' og 'hidden' klasser til nuværende prik
        this.classList.add('active', 'hidden');

        // Update moon phase
        nuvaerendeFase = phase;
        maane.style.backgroundImage = `url(${maaneFaser[nuvaerendeFase]})`;

        // Update day and moon phase heading and description
        dagOverskrift.innerHTML = dage[nuvaerendeFase]; // Ændrer dagen
        maaneFaseOverskrift.innerHTML = maanefase[nuvaerendeFase]; // Ændrer overskiften
        maanefaseBeskrivelse.innerHTML = beskrivelser[nuvaerendeFase]; // Ændrer beskrivelsen

        // Animate moon position
        const angle = (phase * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2;
        const x = radiusX * Math.cos(angle);
        const y = radiusY * Math.sin(angle);
        maane.style.left = `calc(50% + ${x}px)`;
        maane.style.top = `calc(50% + ${y}px)`;

        // Update next dot
        updateNextDot();
    }
    });
});

// Opdateret moonPhaseInfo objekt med information for alle 8 faser
const moonPhaseInfo = {
    0: { // Fuldmåne
        title: 'FULDMÅNE',
        description: 'Ved fuldmåne står Jorden mellem Solen og Månen. Hele Månens overflade, der vender mod Jorden, er oplyst. ' + fuldmaaneBeskrivelse
    },
    1: { // Aftagende Gibbous
        title: 'AFTAGENDE GIBBOUS',
        description: 'I denne fase begynder månens belyste overflade at aftage. ' + aftagendeGibbousBeskrivelse
    },
    2: { // Tredje Kvarter
        title: 'TREDJE KVARTAL',
        description: 'I denne fase er halvdelen af månen oplyst, set fra Jorden. ' + tredjeKvartalBeskrivelse
    },
    3: { // Aftagende Halvmåne
        title: 'AFTAGENDE HALVMÅNE',
        description: 'Månens belyste del fortsætter med at aftage. ' + aftagendeHalvmaaneBeskrivelse
    },
    4: { // Nymåne
        title: 'NYMÅNE',
        description: 'Under nymåne står Månen mellem Jorden og Solen. ' + nymaaneBeskrivelse
    },
    5: { // Voksende Halvmåne
        title: 'VOKSENDE HALVMÅNE',
        description: 'Månens belyste del begynder at vokse. ' + voksendeHalvmaaneBeskrivelse
    },
    6: { // Første Kvarter
        title: 'KVARTMÅNE',
        description: 'Halvdelen af månen er nu oplyst, set fra Jorden. ' + kvartmaaneBeskrivelse
    },
    7: { // Voksende Gibbous
        title: 'VOKSENDE GIBBOUS',
        description: 'Månens belyste del fortsætter med at vokse. ' + voksendeGibbousBeskrivelse
    }
};

// Hent DOM elementer
const popup = document.getElementById('infoPopup');
const closeBtn = document.querySelector('.close-btn');
const læsMereKnap = document.getElementById('laesMereKnap');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');

// Funktion til at vise popup med specifik månefase information
function showPopup(phase) {
    const phaseInfo = moonPhaseInfo[phase];
    popupTitle.textContent = phaseInfo.title;
    popupDescription.textContent = phaseInfo.description;
    popup.style.display = 'block';
}

// Luk popup når man klikker på X
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Luk popup hvis man klikker udenfor popup vinduet
window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

// Opdater læs mere knappens event listener
læsMereKnap.addEventListener('click', () => {
    showPopup(nuvaerendeFase);
});

// Fjern den gamle alert når der klikkes på læs mere knappen
document.getElementById('laesMereKnap').removeEventListener('click', () => {
    alert('Read more clicked');
});
