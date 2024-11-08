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

// Laver stjernerne på baggrunden
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

// Laver hvide prikker
const hvidPrik = document.getElementById('hvidPrik'); // Henter om gemmer HTML-tagget med id'et hvidPrik
const antalHvidePrikker = 8; // Vi ønkser otte hvide prikker
const radiusX = 500; // Horizontal radius - bestemmer hvor langt ud månen må flytte sig fra centrum (jorden) horisontalt
const radiusY = 357.15; // Vertical radius - bestemmer hvor langt op og ned månen må flytte sig fra centrum (jorden) vertikalt
// Det er de to ovenstående værdier der skaber den ovale form vi ønsker, hvor bredden er 700 px og højden er 500px

// Nedstående er udarbejdet med udgangspunkt i Nodelist
function opdaterNaestePrik() {
    const prikker = document.querySelectorAll('.prik'); // Den gemmer alle elementer med klassen dot i konstanten - elementerne med klassen dot bliver lavet i for-loopet under funktionen.
    prikker.forEach(prik => prik.classList.remove('naeste')); // Fjerner 'next' fra alle prikker
    const nuvaerendePrik = document.querySelector('.prik.active'); // Finder den prik, der har 'active' klassen
    const nuvaerendeIndex = parseInt(nuvaerendePrik.dataset.phase); // Finder indexet for den prik, der har 'active' klassen
    const naesteIndex = (nuvaerendeIndex + 1) % antalHvidePrikker; // Finder næste index ved at lægge 1 til det nuværende index og bruge modulo operatoren (%) til at sikre at vi starter forfra når vi når til sidste index
    prikker[naesteIndex].classList.add('naeste'); // Tilføjer 'next' til den næste prik
}

// Laver hvide prikker og placerer dem på siden 
for (let i = 0; i < antalHvidePrikker; i++) {
    const prik = document.createElement('div'); // Laver et nyt div-tag
    prik.className = 'prik'; // Giver dit-tagget klassen dot
    const angle = (i * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2; // Start from top
    /* 
    2 * π = 360∘ (en hel cirkel)
    / antalHvidePrikker = deler cirklen op i lige store dele - med otte cirkler er det 45∘ mellem hver
    * i = ganger med tælleren (0-7) for at få den specifikke vinkel for hver prik
    - π / 2 = flytter startpunktet til toppen - ellers ville prikken starte på højre side
    Math.Pi / 2 = 90∘
    */
    const x = radiusX * Math.cos(angle); // Giver et tal mellem 1 og -1 og ganger tallet med radiusX(350px) for den faktiske pixel-position for prikken og giver den vandrette position for prikken
    const y = radiusY * Math.sin(angle); // Giver et tal mellem 1 og -1 og ganger tallet med radiusY(250px) for den faktiske pixel-position for prikken og giver den lodrette position for prikken

    // De tre ovenstående linjer skaber en jævn fordeling af af prikker i en ellipse startende fra toppen og går uret rundt
    prik.style.left = `calc(50% + ${x}px)`; // Afstanden fra venstre side er 50% + xpx
    prik.style.top = `calc(50% + ${y}px)`; // Afstanden fra top er 50% + ypx
    prik.dataset.phase = i; // Tilføjer en data-attribut 'phase' til prikken med værdien i (0-7), som bruges til at holde styr på hvilken fase prikken repræsenterer
    hvidPrik.appendChild(prik); // Tilføjer prikken som et barn-element til hvidPrik-elementet, så den bliver synlig på siden
    }

// Initialize the active dot and moon position
const prikker = document.querySelectorAll('.prik');
prikker[0].classList.add('active', 'hidden'); // Start at Full Moon position - .hidden gør, at prikken ikke er synlig & .active gør, at prikken er synlig
opdaterNaestePrik(); // Kalder på funktionen, der initialiserer næste prik

// Position moon at starting position
const startAngle = (0 * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2; // 0 for at starte ved prik 0 (toppen)

// Sætter månens startposition ved at beregne x og y koordinater baseret på startAngle
// Bruger calc() til at placere månen 50% fra venstre/top plus den beregnede position
// radiusX/Y * Math.cos/sin giver koordinaterne på ellipsebanen
maane.style.left = `calc(50% + ${radiusX * Math.cos(startAngle)}px)`; // Beregner x-koordinat
maane.style.top = `calc(50% + ${radiusY * Math.sin(startAngle)}px)`; // Beregner y-koordinat

// Add click handlers
prikker.forEach(prik => {
    prik.addEventListener('click', function() {
    if (this.classList.contains('naeste')) {
        const phase = parseInt(this.dataset.phase);
        const prevPhase = (phase - 1 + antalHvidePrikker) % antalHvidePrikker;

        // Update active dot
        prikker[prevPhase].classList.remove('active');
        this.classList.add('active');
        this.classList.remove('naeste');

        // Fjern 'active' og 'hidden' klasser fra forrige prik
        prikker[prevPhase].classList.remove('active', 'hidden');

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
        opdaterNaestePrik();
    }
    });
});

// --------------- Pop-up ---------------

const fuldmaaneBeskrivelsePopUp = "Månen er nu fuldt oplyst og lyser natten op som en naturllig lyskilde. Fuldmånen har gennem tiden inspireret myter og legender, og dens kraftige lys påvirker både tidevand og menneskers sind. Det er også her, at mennesket, ifølge nogle kulturer, forvandles til varulv. Når to fuldmåner optræder i én måned, kaldes den anden “Blue Moon” - en begivenhed, der sker cirka hvert 2,5 år.";

const aftagendeGibbousBeskrivelsePopUp = "Efter fuldmånen begynder Månen langsomt at miste sit lys, først fra venstre side. Nogle nataktive dyr som ugler og ræve er særligt aktive i denne fase, da der stadig er godt måneskin, men færre mennesker ude. ";

const tredjeKvartalBeskrivelsePopUp = "Månens venstre side er nu halv oplyst, og den ligner igen en 'halv' cirkel. I denne fase, præcis halvvejs mellem fuldmåne og nymåne, er tidevandet mildt. Månen står op ved midnat og går ned omkring middagstid, hvilket betyder, at den er synlig på nattehimlen indtil morgenmaden. Denne fase sker typisk omkring 22-23 dage efter en ny måne og varer kun én nat, før månen fortsætter til sin sidste fase, hvor kun en smal del er synlig. ";

const aftagendeHalvmaaneBeskrivelsePopUp = "Kun en lille lysstribe er synlig på månen, og den symboliserer det sidste lys inden månen forsvinder til nymåne. Den lille lysstribe kan give natten et svagt mystisk skær og har i nogle kulturer været forbundet med mørke hemmeligheder eller spøgelseshistorier.";

const nymaaneBeskrivelsePopUp = "Månen er skjult, og dens side, der vender mod Jorden, er i skygge. Nymånen markerer en ny begyndelse - en tid for refleksion og nystart. På dette tidspunkt står Månen mellem Jorden og Solen, og i sjældne tilfælde kan der opstå solformørkelse, hvis alt er på linje. Nætterne under nymånen er de mørkeste, hvilket gør himlen perfekt til at betragte stjerner og fjerne planeter. ";

const voksendeHalvmaaneBeskrivelsePopUp = "En smal, oplyst bue dukker op på Månens højre side, og Månen begynder sin rejse mod fuldmåne. Under denne fase er månen i en position, hvor den står lavt på himlen, og den kan ses om aftenen lige efter solnedgang. Det er en ideel fase for astronomiske observationer, da månen ikke er for lysende, hvilket gør det lettere at se stjerner og andre himmellegemer. ";

const kvartmaaneBeskrivelsePopUp = "Månens højre halvdel er nu oplyst, og fra Jorden ligner den en 'halv' cirkel. I denne fase står Månen vinkelret på Solen og Jorden, hvilket skaber mildere tidevand. Månen bevæger sig hurtigt mod fuldmåne, og energien vokser i takt med dens lys.  ";

const voksendeGibbousBeskrivelsePopUp = "Over halvdelen af Månen er nu oplyst, og den nærmer sig din fulde skikkelse. Dette er en ideel tid til at betragte Månens kraterer gennem et teleskop, hvor de står tydeligt i sollyset. I denne fase er forventningen om månen stor, og Månen skinner klart på nattehimlen. ";

// Nedstående array består af alle beskrivelserne i konstanterne ovenfor - de er indsat i array for at øger overskueligheden og kalde på dem på denne måde som er samme metode vi har brugt tidligere
const beskrivelserPopUp = [fuldmaaneBeskrivelsePopUp, aftagendeGibbousBeskrivelsePopUp, tredjeKvartalBeskrivelsePopUp, aftagendeHalvmaaneBeskrivelsePopUp, nymaaneBeskrivelsePopUp, voksendeHalvmaaneBeskrivelsePopUp, kvartmaaneBeskrivelsePopUp, voksendeGibbousBeskrivelsePopUp];

// Opdateret moonPhaseInfo objekt med information for alle 8 faser
const moonPhaseInfo = {
    0: { // Fuldmåne
        title: maanefase[0],
        description: beskrivelserPopUp[0] + fuldmaaneBeskrivelse
    },
    1: { // Aftagende Gibbous
        title: maanefase[1],
        description: beskrivelserPopUp[1] + aftagendeGibbousBeskrivelse
    },
    2: { // Tredje Kvarter
        title: maanefase[2],
        description: beskrivelserPopUp[2] + tredjeKvartalBeskrivelse
    },
    3: { // Aftagende Halvmåne
        title: maanefase[3],
        description: beskrivelserPopUp[3] + aftagendeHalvmaaneBeskrivelse
    },
    4: { // Nymåne
        title: maanefase[4],
        description: beskrivelserPopUp[4] + nymaaneBeskrivelse
    },
    5: { // Voksende Halvmåne
        title: maanefase[5],
        description: beskrivelserPopUp[5] + voksendeHalvmaaneBeskrivelse
    },
    6: { // Første Kvarter
        title: maanefase[6],
            description: 'Halvdelen af månen er nu oplyst, set fra Jorden. ' + kvartmaaneBeskrivelse
    },
    7: { // Voksende Gibbous
        title: maanefase[7],
        description: beskrivelserPopUp[7] + voksendeGibbousBeskrivelse
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
