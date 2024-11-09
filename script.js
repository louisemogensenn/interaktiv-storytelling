

const dagOverskrift = document.getElementById('dagTekst'); 

const maaneFaseOverskrift = document.getElementById('maaneFaseOverskrift'); 

const maanefaseBeskrivelse = document.getElementById('maaneFaseBeskrivelse'); 


const dage = ["Dag 17 af 27", "Dag 21 af 27", "Dag 24 af 27", "Dag 27 af 27", "Dag 3 af 27", "Dag 7 af 27", "Dag 10 af 27", "Dag 14 af 27"]; 


const maanefaseOverskrifter = ["FULDMÅNE", "AFTAGENDE GIBBOUS", "TREDJE KVARTAL", "AFTAGENDE HALVMÅNE", "NYMÅNE", "VOKSENDE HALVMÅNE", "KVARTMÅNE", "VOKSENDE GIBBOUS"]; 


const fuldmaaneBeskrivelse = "Fuldmånen kan påvirke vores søvn, da mange sover 20-25 minutter mindre på grund af det øgede lys...";

const aftagendeGibbousBeskrivelse = "Efter fuldmånen begynder månen langsomt at miste sit lys, mens nataktive dyr vågner... ";

const tredjeKvartalBeskrivelse = "Denne fase varer kun én nat, før månen fortsætter til sin sidste fase. Dvs. Månen er synlig på nattehimlen hele morgenen.";

const aftagendeHalvmaaneBeskrivelse = "Månen er synlig på himlen i de tidlige morgentimer, typisk inden solopgang, og gør klar till at begynde en ny cyklus.";

const nymaaneBeskrivelse = "Nymånen ses én gang pr. måned og repræsenterer et øjeblik med nulpunkt og fornyelse, hvor månecyklussen starter forfra.";

const voksendeHalvmaaneBeskrivelse = "Under denne fase er månen i en position, hvor den står lavt på himlen, og den kan ses om aftenen lige efter solnedgang.";

const kvartmaaneBeskrivelse = "Månen er synlig fra eftermiddag til midnat. Her kan den ses tydeligt om eftermiddagen og om aftenen.";

const voksendeGibbousBeskrivelse = "Månen er næsten fuld, og energien intensiveres. Dette er typisk en tid med høj energi og produktivitet.";

const korteBeskrivelser = [fuldmaaneBeskrivelse, aftagendeGibbousBeskrivelse, tredjeKvartalBeskrivelse, aftagendeHalvmaaneBeskrivelse, nymaaneBeskrivelse, voksendeHalvmaaneBeskrivelse, kvartmaaneBeskrivelse, voksendeGibbousBeskrivelse];

const stjerneBeholder = document.getElementById('stjerner');
for (let i = 0; i < 200; i++) { 
    const stjerne = document.createElement('div'); 
    stjerne.className = 'stjerne'; 
    stjerne.style.left = Math.random() * 100 + '%'; 
    stjerne.style.top = Math.random() * 100 + '%'; 
    stjerne.style.opacity = Math.random(); 
    stjerneBeholder.appendChild(stjerne); 
}

// Array med billeder af månefaserne
const maaneFaseBilleder = ["images/fuldmaane.webp", "images/aftagendeGibbous.webp", "images/tredjeKvartal.webp", "images/aftagendeHalvmaane.webp", "images/nymaane.webp", "images/voksendeHalvmaane.webp", "images/kvartmaane.webp", "images/voksendeGibbous.webp"];

let nuvaerendeFase = 0; 
const maane = document.getElementById('maane'); 
maane.style.backgroundImage = `url(${maaneFaseBilleder[nuvaerendeFase]})`; 

dagOverskrift.innerHTML = dage[0];
maaneFaseOverskrift.innerHTML = maanefaseOverskrifter[0];
maanefaseBeskrivelse.innerHTML = korteBeskrivelser[0];

// Laver hvide prikker
const hvidPrik = document.getElementById('hvidPrik'); 
const antalHvidePrikker = 8; 
const radiusX = 500; 
const radiusY = 357.15; 

function opdaterNaestePrik() {
    const prikker = document.querySelectorAll('.prik'); 
    prikker.forEach(prik => prik.classList.remove('naeste')); 
    const nuvaerendePrik = document.querySelector('.prik.aktuel'); 
    const nuvaerendeIndex = parseInt(nuvaerendePrik.dataset.phase); 
    const naesteIndex = (nuvaerendeIndex + 1) % antalHvidePrikker; 
    prikker[naesteIndex].classList.add('naeste'); 
}

for (let i = 0; i < antalHvidePrikker; i++) {
    const prik = document.createElement('div');
    prik.className = 'prik'; 
    const vinkel = (i * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2;
    const x = radiusX * Math.cos(vinkel); 
    const y = radiusY * Math.sin(vinkel); 
    prik.style.left = `calc(50% + ${x}px)`; 
    prik.style.top = `calc(50% + ${y}px)`; 
    prik.dataset.phase = i; 
    hvidPrik.appendChild(prik); 
}

const prikker = document.querySelectorAll('.prik');
prikker[0].classList.add('aktuel', 'hidden'); 
opdaterNaestePrik(); 
const startAngle = (0 * 2 * Math.PI) / antalHvidePrikker - Math.PI / 2; 
maane.style.left = `calc(50% + ${radiusX * Math.cos(startAngle)}px)`; 
maane.style.top = `calc(50% + ${radiusY * Math.sin(startAngle)}px)`; 

prikker.forEach(prik => { 
    prik.addEventListener('click', function() { 
    if (this.classList.contains('naeste')) { 
        const phase = parseInt(this.dataset.phase); 
        const prevPhase = (phase - 1 + antalHvidePrikker) % antalHvidePrikker;

        // Update active dot
        prikker[prevPhase].classList.remove('aktuel');
        this.classList.add('aktuel');
        this.classList.remove('naeste');
        prikker[prevPhase].classList.remove('aktuel', 'hidden');
        this.classList.add('aktuel', 'hidden'); 

        nuvaerendeFase = phase;
        maane.style.backgroundImage = `url(${maaneFaseBilleder[nuvaerendeFase]})`;

        dagOverskrift.innerHTML = dage[nuvaerendeFase]; 
        maaneFaseOverskrift.innerHTML = maanefaseOverskrifter[nuvaerendeFase]; 
        maanefaseBeskrivelse.innerHTML = korteBeskrivelser[nuvaerendeFase]; 

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

const fuldmaaneBeskrivelsePopUp = " Månen er fuldt oplyst og lyser natten op som en naturllig lyskilde. Fuldmånen har gennem tiden inspireret myter og legender, og dens kraftige lys påvirker både tidevand og menneskers sind. Det er også her, at mennesket, ifølge nogle kulturer, forvandles til varulv. Når to fuldmåner optræder i én måned, kaldes den anden “Blue Moon” - en begivenhed, der sker cirka hvert 2,5 år.";

const aftagendeGibbousBeskrivelsePopUp = " Efter fuldmånen begynder Månen langsomt at miste sit lys, først fra venstre side. Nogle nataktive dyr som ugler og ræve er særligt aktive i denne fase, da der stadig er godt måneskin, men færre mennesker ude. ";

const tredjeKvartalBeskrivelsePopUp = " Månens venstre side er nu halv oplyst, og den ligner igen en 'halv' cirkel. I denne fase, præcis halvvejs mellem fuldmåne og nymåne, er tidevandet mildt. Månen står op ved midnat og går ned omkring middagstid, hvilket betyder, at den er synlig på nattehimlen indtil morgenmaden. Denne fase sker typisk omkring 22-23 dage efter en ny måne og varer kun én nat, før månen fortsætter til sin sidste fase, hvor kun en smal del er synlig. ";

const aftagendeHalvmaaneBeskrivelsePopUp = " Kun en lille lysstribe er synlig på månen, og den symboliserer det sidste lys inden månen forsvinder til nymåne. Den lille lysstribe kan give natten et svagt mystisk skær og har i nogle kulturer været forbundet med mørke hemmeligheder eller spøgelseshistorier.";

const nymaaneBeskrivelsePopUp = " Månen er skjult, og dens side, der vender mod Jorden, er i skygge. Nymånen markerer en ny begyndelse - en tid for refleksion og nystart. På dette tidspunkt står Månen mellem Jorden og Solen, og i sjældne tilfælde kan der opstå solformørkelse, hvis alt er på linje. Nætterne under nymånen er de mørkeste, hvilket gør himlen perfekt til at betragte stjerner og fjerne planeter. ";

const voksendeHalvmaaneBeskrivelsePopUp = " En smal, oplyst bue dukker op på Månens højre side, og Månen begynder sin rejse mod fuldmåne. Under denne fase er månen i en position, hvor den står lavt på himlen, og den kan ses om aftenen lige efter solnedgang. Det er en ideel fase for astronomiske observationer, da månen ikke er for lysende, hvilket gør det lettere at se stjerner og andre himmellegemer. ";

const kvartmaaneBeskrivelsePopUp = " Månens højre halvdel er nu oplyst, og fra Jorden ligner den en 'halv' cirkel. I denne fase står Månen vinkelret på Solen og Jorden, hvilket skaber mildere tidevand. Månen bevæger sig hurtigt mod fuldmåne, og energien vokser i takt med dens lys.  ";

const voksendeGibbousBeskrivelsePopUp = " Over halvdelen af Månen er nu oplyst, og den nærmer sig din fulde skikkelse. Dette er en ideel tid til at betragte Månens kraterer gennem et teleskop, hvor de står tydeligt i sollyset. I denne fase er forventningen om månen stor, og Månen skinner klart på nattehimlen. ";

const beskrivelserPopUp = [fuldmaaneBeskrivelsePopUp, aftagendeGibbousBeskrivelsePopUp, tredjeKvartalBeskrivelsePopUp, aftagendeHalvmaaneBeskrivelsePopUp, nymaaneBeskrivelsePopUp, voksendeHalvmaaneBeskrivelsePopUp, kvartmaaneBeskrivelsePopUp, voksendeGibbousBeskrivelsePopUp];

const moonPhaseInfo = {
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

const popup = document.getElementById('infoPopup');
const closeBtn = document.querySelector('.close-btn');
const læsMereKnap = document.getElementById('laesMereKnap');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');

function showPopup(phase) {
    const phaseInfo = moonPhaseInfo[phase];
    popupTitle.textContent = phaseInfo.title;
    popupDescription.textContent = phaseInfo.description;
    popup.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

læsMereKnap.addEventListener('click', () => {
    showPopup(nuvaerendeFase);
});
