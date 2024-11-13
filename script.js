

const dagOverskrift = document.getElementById('dagTekst');

const maaneFaseOverskrift = document.getElementById('maaneFaseOverskrift'); 

const maanefaseBeskrivelse = document.getElementById('maaneFaseBeskrivelse'); 

// Array med dagstitler for månefaserne
const dage = ["Dag 17 af 27", "Dag 21 af 27", "Dag 24 af 27", "Dag 27 af 27", "Dag 3 af 27", "Dag 7 af 27", "Dag 10 af 27", "Dag 14 af 27"]; 

// Array med overskrifter for månefaserne
const maanefaseOverskrifter = ["FULDMÅNE", "AFTAGENDE GIBBOUS", "TREDJE KVARTAL", "AFTAGENDE HALVMÅNE", "NYMÅNE", "VOKSENDE HALVMÅNE", "KVARTMÅNE", "VOKSENDE GIBBOUS"]; 

// Konstanter for beskrivelserne.
const fuldmaaneBeskrivelse = "Fuldmånen kan påvirke vores søvn, da mange sover 20-25 minutter mindre på grund af det øgede lys...";

const aftagendeGibbousBeskrivelse = "Efter fuldmånen begynder månen langsomt at miste sit lys, mens nataktive dyr vågner... ";

const tredjeKvartalBeskrivelse = "Denne fase varer kun én nat, før månen fortsætter til sin sidste fase. Dvs. Månen er synlig på nattehimlen hele morgenen.";

const aftagendeHalvmaaneBeskrivelse = "Månen er synlig på himlen i de tidlige morgentimer, typisk inden solopgang, og gør klar till at begynde en ny cyklus.";

const nymaaneBeskrivelse = "Nymånen ses én gang pr. måned og repræsenterer et øjeblik med nulpunkt og fornyelse, hvor månecyklussen starter forfra.";

const voksendeHalvmaaneBeskrivelse = "Under denne fase er månen i en position, hvor den står lavt på himlen, og den kan ses om aftenen lige efter solnedgang.";

const kvartmaaneBeskrivelse = "Månen er synlig fra eftermiddag til midnat. Her kan den ses tydeligt om eftermiddagen og om aftenen.";

const voksendeGibbousBeskrivelse = "Månen er næsten fuld, og energien intensiveres. Dette er typisk en tid med høj energi og produktivitet.";

// Array med ovenstående beskrivelser
const korteBeskrivelser = [fuldmaaneBeskrivelse, aftagendeGibbousBeskrivelse, tredjeKvartalBeskrivelse, aftagendeHalvmaaneBeskrivelse, nymaaneBeskrivelse, voksendeHalvmaaneBeskrivelse, kvartmaaneBeskrivelse, voksendeGibbousBeskrivelse];

// Stjerneholder er det element, der holder stjernerne
const stjerneBeholder = document.getElementById('stjerner');

// Et for-loop, der laver 200 stjerner, når siden læses
for (let i = 0; i < 200; i++) { 
    const stjerne = document.createElement('div'); // Opretter et nyt div element
    stjerne.className = 'stjerne'; // Tilføjer en klasse til det ovenstående div-element
    stjerne.style.left = Math.random() * 100 + '%'; // Tilføjer en tilfældig position til stjernen, der udregnes i procent
    stjerne.style.top = Math.random() * 100 + '%'; // Tilføjer en tilfældig position til stjernen, der udregnes i procent
    stjerne.style.opacity = Math.random(); // Tilføjer en tilfældig opacity til stjernen
    stjerneBeholder.appendChild(stjerne); // Tilføjer stjernen til stjernebeholderen
}

// Array med billeder af månefaserne
const maaneFaseBilleder = ["images/fuldmaane.webp", "images/aftagendeGibbous.webp", "images/tredjeKvartal.webp", "images/aftagendeHalvmaane.webp", "images/nymaane.webp", "images/voksendeHalvmaane.webp", "images/kvartmaane.webp", "images/voksendeGibbous.webp"];

let nuvaerendeFase = 0; // Denne variabel er en integer, der repræsenterer den aktuelle månefase

const maane = document.getElementById('maane'); 

maane.style.backgroundImage = `url(${maaneFaseBilleder[nuvaerendeFase]})`; // Vælger det billede i arrayet, der svarer til den aktuelle månefase

dagOverskrift.innerHTML = dage[0]; //Når siden loades, starter den på dag et med 
maaneFaseOverskrift.innerHTML = maanefaseOverskrifter[0]; // Når siden loades, starter den med den første månefaseoverskrift
maanefaseBeskrivelse.innerHTML = korteBeskrivelser[0]; // Når siden loades, starter den med den første månefasebeskrivelse

const hvidPrik = document.getElementById('hvidPrik'); 
const antalHvidePrikker = 8;
const radiusX = 500; // Radius i x-aksen (horisontalt) - hvor bred cirklen er
const radiusY = 357.15; // Radius i y-aksen (vertikalt) - hvor høj cirklen er
// Disse to konstanter varierer, da vi ønsker den oval-formede cirkel, der er i midten af siden

function opdaterNaestePrik() {
    const prikker = document.querySelectorAll('.prik'); //
    prikker.forEach(prik => prik.classList.remove('naeste')); // For hver prik, fjerner den klassen 'naeste'. Denne klasse tilføjes i bunden af funktionen opdaterMaestePrik()
    const nuvaerendePrik = document.querySelector('.prik.aktuel'); // Værdien for den nuværende prik sættes til at være den prik med klasserne .prik og .aktuel
    const nuvaerendeIndex = parseInt(nuvaerendePrik.dataset.phase); // Det nuværende index sættes til den værdi nuværendePrik har. Dataset.phase er en tekststreng, der skal konverteres til et heltal via parseInt
    const naesteIndex = (nuvaerendeIndex + 1) % antalHvidePrikker; // Den næste index sættes til den nuværende index + 1, og så modulores med antalHvidePrikker for at sikre, at den ikke går ud over 7
    prikker[naesteIndex].classList.add('naeste'); // Tilføjer klassen 'naeste' til den næste prik
}

// Laver hvide prikker og placerer dem på siden 
for (let i = 0; i < antalHvidePrikker; i++) {
    const prik = document.createElement('div'); // Laver et nyt div-tag
    prik.className = 'prik'; // Giver dit-tagget klassen dot
    const vinkel = (i * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2;// Start from top
    /* 

    2 * π = 360∘ (en hel cirkel)

    / antalHvidePrikker = deler cirklen op i lige store dele - med otte cirkler er det 45∘ mellem hver

    * i = ganger med tælleren (0-7) for at få den specifikke vinkel for hver prik

    - π / 2 = flytter startpunktet til toppen - ellers ville prikken starte på højre side

    Math.Pi / 2 = 90∘

    */
    const x = radiusX * Math.cos(vinkel); // Giver et tal mellem 1 og -1 og ganger tallet med radiusX(350px) for den faktiske pixel-position for prikken og giver den vandrette position for prikken
    const y = radiusY * Math.sin(vinkel); // Giver et tal mellem 1 og -1 og ganger tallet med radiusY(250px) for den faktiske pixel-position for prikken og giver den lodrette position for prikken

    // De tre ovenstående linjer skaber en jævn fordeling af af prikker i en ellipse startende fra toppen og går uret rundt
    prik.style.left = `calc(50% + ${x}px)`; // Afstanden fra venstre side er 50% + xpx
    prik.style.top = `calc(50% + ${y}px)`; // Afstanden fra top er 50% + ypx
    prik.dataset.phase = i; // Tilføjer en data-attribut 'phase' til prikken med værdien i (0-7), som bruges til at holde styr på hvilken fase prikken repræsenterer
    hvidPrik.appendChild(prik); // Tilføjer prikken som et barn-element til hvidPrik-elementet, så den bliver synlig på siden
    }

const prikker = document.querySelectorAll('.prik'); //Alle prikker, der er blevet oprettet i forloopet 'opdaterNaestePrik' tilføjes til en liste med navnet prikker

prikker[0].classList.add('aktuel', 'skjult'); // Det første element i listen prikker får klasserne 'aktuel' og 'skjult'
opdaterNaestePrik(); // Funktionen opdaterNaestePrik kaldes for at få den første prik til at have klassen 'aktuel'

const startVinkel = (0 * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2; // Startvinklen udregnes. Dette gør, at månen placeres i toppen af cirklen

maane.style.left = `calc(50% + ${radiusX * Math.cos(startVinkel)}px)`; // Månens position i x-aksen udregnes. Månen placeres i midten af siden + xpx
maane.style.top = `calc(50% + ${radiusY * Math.sin(startVinkel)}px)`; // Månens position i y-aksen udregnes. Månen placeres i midten af siden + ypx

prikker.forEach(prik => { 
    prik.addEventListener('click', () => { 
        if (prik.classList.contains('naeste')) { // Hvis prikken har klassen 'naeste' sker alt underneden
            const fase = parseInt(prik.dataset.phase); // Phase sættes til den værdi prikken har i dataset.phase
            const tidligereFase = (fase - 1 + antalHvidePrikker) % antalHvidePrikker;

            // Update active dot
            prikker[tidligereFase].classList.remove('aktuel'); // Prikken med den tidligere fase får fjernet klassen 'aktuel'
            prik.classList.add('aktuel'); // Prikken får klassen 'aktuel'. Dette sker for hver prik.    
            prik.classList.remove('naeste'); // Prikken får fjernet klassen 'naeste'. Dette sker for hver prik.
            prikker[tidligereFase].classList.remove('aktuel', 'skjult'); // Prikken med den tidligere fase får fjernet klasserne 'aktuel' og 'skjult'.
            prik.classList.add('aktuel', 'skjult'); // Prikken får klasserne 'aktuel' og 'skjult'. Dette sker for hver prik.

            nuvaerendeFase = fase; // Den aktuelle fase sættes til fase
            maane.style.backgroundImage = `url(${maaneFaseBilleder[nuvaerendeFase]})`;

            dagOverskrift.innerHTML = dage[nuvaerendeFase]; // Dagens overskrift sættes til den dag, der svarer til den aktuelle fase. Dette vælges med index i arrayet dage
            maaneFaseOverskrift.innerHTML = maanefaseOverskrifter[nuvaerendeFase]; // Månefaseoverskriften sættes til den månefaseoverskrift, der svarer til den aktuelle fase. Dette vælges med index i arrayet maanefaseOverskrifter
            maanefaseBeskrivelse.innerHTML = korteBeskrivelser[nuvaerendeFase]; // Månefasebeskrivelsen sættes til den månefasebeskrivelse, der svarer til den aktuelle fase. Dette vælges med index i arrayet korteBeskrivelser

            // Animerer månens position
            const angle = (fase * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2; // Vinklen udregnes
            const x = radiusX * Math.cos(angle); // Månens position i x-aksen udregnes  
            const y = radiusY * Math.sin(angle); // Månens position i y-aksen udregnes
            
            maane.style.left = `calc(50% + ${x}px)`; // Månens position i x-aksen sættes til midten af siden + xpx
            maane.style.top = `calc(50% + ${y}px)`; // Månens position i y-aksen sættes til midten af siden + ypx

            // Update next dot
            opdaterNaestePrik(); // Funktionen opdaterNaestePrik kaldes for at få den næste prik til at have klassen 'aktuel'
        }
        });
    });

// --------------- Pop-up ---------------

// Der er oprettet en konstant for hver beskrivelse for herefter at indsætte dem i et array. Dette øger overskueligheden og gør det nemt at tilføje nye beskrivelser i fremtiden.

const fuldmaaneBeskrivelsePopUp = " Månen er fuldt oplyst og lyser natten op som en naturllig lyskilde. Fuldmånen har gennem tiden inspireret myter og legender, og dens kraftige lys påvirker både tidevand og menneskers sind. Det er også her, at mennesket, ifølge nogle kulturer, forvandles til varulv. Når to fuldmåner optræder i én måned, kaldes den anden “Blue Moon” - en begivenhed, der sker cirka hvert 2,5 år.";

const aftagendeGibbousBeskrivelsePopUp = " Efter fuldmånen begynder Månen langsomt at miste sit lys, først fra venstre side. Nogle nataktive dyr som ugler og ræve er særligt aktive i denne fase, da der stadig er godt måneskin, men færre mennesker ude. ";

const tredjeKvartalBeskrivelsePopUp = " Månens venstre side er nu halv oplyst, og den ligner igen en 'halv' cirkel. I denne fase, præcis halvvejs mellem fuldmåne og nymåne, er tidevandet mildt. Månen står op ved midnat og går ned omkring middagstid, hvilket betyder, at den er synlig på nattehimlen indtil morgenmaden. Denne fase sker typisk omkring 22-23 dage efter en ny måne og varer kun én nat, før månen fortsætter til sin sidste fase, hvor kun en smal del er synlig. ";

const aftagendeHalvmaaneBeskrivelsePopUp = " Kun en lille lysstribe er synlig på månen, og den symboliserer det sidste lys inden månen forsvinder til nymåne. Den lille lysstribe kan give natten et svagt mystisk skær og har i nogle kulturer været forbundet med mørke hemmeligheder eller spøgelseshistorier.";

const nymaaneBeskrivelsePopUp = " Månen er skjult, og dens side, der vender mod Jorden, er i skygge. Nymånen markerer en ny begyndelse - en tid for refleksion og nystart. På dette tidspunkt står Månen mellem Jorden og Solen, og i sjældne tilfælde kan der opstå solformørkelse, hvis alt er på linje. Nætterne under nymånen er de mørkeste, hvilket gør himlen perfekt til at betragte stjerner og fjerne planeter. ";

const voksendeHalvmaaneBeskrivelsePopUp = " En smal, oplyst bue dukker op på Månens højre side, og Månen begynder sin rejse mod fuldmåne. Under denne fase er månen i en position, hvor den står lavt på himlen, og den kan ses om aftenen lige efter solnedgang. Det er en ideel fase for astronomiske observationer, da månen ikke er for lysende, hvilket gør det lettere at se stjerner og andre himmellegemer. ";

const kvartmaaneBeskrivelsePopUp = " Månens højre halvdel er nu oplyst, og fra Jorden ligner den en 'halv' cirkel. I denne fase står Månen vinkelret på Solen og Jorden, hvilket skaber mildere tidevand. Månen bevæger sig hurtigt mod fuldmåne, og energien vokser i takt med dens lys.  ";

const voksendeGibbousBeskrivelsePopUp = " Over halvdelen af Månen er nu oplyst, og den nærmer sig din fulde skikkelse. Dette er en ideel tid til at betragte Månens kraterer gennem et teleskop, hvor de står tydeligt i sollyset. I denne fase er forventningen om månen stor, og Månen skinner klart på nattehimlen. ";

// Konstanterne indsættes i arrayet herunder.
const beskrivelserPopUp = [fuldmaaneBeskrivelsePopUp, aftagendeGibbousBeskrivelsePopUp, tredjeKvartalBeskrivelsePopUp, aftagendeHalvmaaneBeskrivelsePopUp, nymaaneBeskrivelsePopUp, voksendeHalvmaaneBeskrivelsePopUp, kvartmaaneBeskrivelsePopUp, voksendeGibbousBeskrivelsePopUp];

// Der er oprettet et objekt, der indeholder titel og beskrivelse for hver fase. Denne titel og beskrivelse er hentet fra arrayerne maanefaseOverskrifter og korteBeskrivelser med nuværendeFase-værdien som index. 
const maaneFaseInformation = {
    0: { 
        title: maanefaseOverskrifter[0],
        description: korteBeskrivelser[0] + beskrivelserPopUp[0]
    },
    1: { 
        title: maanefaseOverskrifter[1],
        description: korteBeskrivelser[1] + beskrivelserPopUp[1]
    },
    2: { 
        title: maanefaseOverskrifter[2],
        description: korteBeskrivelser[2] + beskrivelserPopUp[2]
    },
    3: { 
        title: maanefaseOverskrifter[3],
        description: korteBeskrivelser[3] + beskrivelserPopUp[3]
    },
    4: { 
        title: maanefaseOverskrifter[4],
        description: korteBeskrivelser[4] + beskrivelserPopUp[4]
    },
    5: { 
        title: maanefaseOverskrifter[5],
        description: korteBeskrivelser[5] + beskrivelserPopUp[5]
    },
    6: { 
        title: maanefaseOverskrifter[6],
        description: korteBeskrivelser[6] + beskrivelserPopUp[6]
    },
    7: { 
        title: maanefaseOverskrifter[7],
        description: korteBeskrivelser[7] + beskrivelserPopUp[7]
    }
};

const popup = document.getElementById('popup'); // Henter popup-elementet fra HTML
const lukPopupKnap = document.getElementById('lukPopup'); // Henter lukPopupKnap-elementet fra HTML
const laesMereKnap = document.getElementById('laesMereKnap'); // Henter laesMereKnap-elementet fra HTML
const popupTitel = document.getElementById('popupTitel');
const popupBeskrivelse = document.getElementById('popupTekstbeskrivelse');

// PopupVideo er det element, der holder videoen
const popupVideo = document.querySelector('.popupVideo'); // Henter popupVideo-elementet fra HTML

// Array med videoerne for hver månefase
const maaneFaseVideo = ['videos/fuldmaaneVideo.mp4', 'videos/aftagendeGibbousVideo.mp4', 'videos/tredjeKvartalVideo.mp4', 'videos/aftagendeHalvmaaneVideo.mp4', 'videos/nymaaneVideo.mp4', 'videos/voksendeHalvmaaneVideo.mp4', 'videos/kvartMaaneVideo.mp4', 'videos/voksendeGibbousVideo.mp4'];

function visPopUp(nuvaerendeFase) { // fase er et tal, der repræsenterer den aktuelle månefase
    const faseInformation = maaneFaseInformation[nuvaerendeFase]; // faseInformation er et objekt, der indeholder titel og beskrivelse for den aktuelle månefase
    popupTitel.textContent = faseInformation.title; // sætter teksten i popupTitel til titlen fra faseInformation
    popupBeskrivelse.textContent = faseInformation.description; // sætter teksten i popupBeskrivelse til beskrivelsen fra faseInformation
    popup.style.display = 'block'; // viser popup
    popupVideo.src = maaneFaseVideo[nuvaerendeFase]; // sætter videoen til den video i arrayet, der svarer til den aktuelle månefase i index-værdien
}

lukPopupKnap.addEventListener('click', () => {
    popup.style.display = 'none'; // lukker popup
});

// Lytter efter klik på vinduet og lukker popup'en hvis der klikkes uden for popup'ens indhold
window.addEventListener('click', (event) => { // event er det objekt der indeholder information om klik-begivenheden
    if (event.target === popup) { // tjekker om der blev klikket direkte på popup baggrunden
        popup.style.display = 'none'; // lukker popup
    }
});

laesMereKnap.addEventListener('click', () => {
    visPopUp(nuvaerendeFase); // viser popup med information om den aktuelle månefase
});