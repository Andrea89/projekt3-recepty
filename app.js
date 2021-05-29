/*
Co je za úkol v tomto projektu:

ok1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

ok2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

ok5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/




//1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".

recepty.forEach(nactiRecepty);
function nactiRecepty(receptik){
    //obal receptu
    let recept = document.createElement('div');
    recept.className = 'recept';

    //obrazek receptu
    let obrazekReceptu = document.createElement('img');
    obrazekReceptu.className = 'recept-obrazek';
    obrazekReceptu.src = receptik.img;
    obrazekReceptu.alt = receptik.nadpis;

    //nazev receptu
    let nazevReceptu = document.createElement('div');
    nazevReceptu.className = 'recept-info';
    nazevReceptu.innerHTML = receptik.nadpis;

    recept.appendChild(obrazekReceptu);
    recept.appendChild(nazevReceptu);

    let recepty = document.querySelector('.recepty');
    recepty.appendChild(recept);


    recept.onclick = klikNaRecept;
};

//ukládání posledního receptu nefunguje :-(
//nactiUlozenyRecept();
let ulozeneRecepty = [];

//5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
function klikNaRecept(event) {
    let zakliknutyRecept = event.target;
    console.log("Kliknul jsi na " + zakliknutyRecept.innerText);
    
    //porovnávání zakliknutého receptu s polem recepty a hledání indexu, na který jsem klikla
    let i;
    let index;
    let delkaPole = recepty.length;    
    for (i=0; i < delkaPole; i++) {

        if (zakliknutyRecept.innerText === recepty[i].nadpis){
            console.log("našel jsem shodu" + recepty[i].nadpis);
            index = i;
            
        }else{
                
            console.log("zvyšuji index na " + i);
        };
    };
        
    console.log("výsledny index je "+ index + "a to je recept " + recepty[index].nadpis);

    //vygenerování receptu do pravého sloupce stránky
    let receptNazev = document.getElementById("recept-nazev");
    receptNazev.innerHTML = zakliknutyRecept.innerText;
    
    let kategorieReceptu = document.getElementById("recept-kategorie");
    kategorieReceptu.innerHTML = recepty[index].kategorie;

    let hodnoceniReceptu = document.getElementById("recept-hodnoceni");
    hodnoceniReceptu.innerHTML = recepty[index].hodnoceni;

    let popisReceptu = document.getElementById("recept-popis");
    popisReceptu.innerHTML = recepty[index].popis;

    let obrazekReceptu = document.getElementById("recept-foto");
    obrazekReceptu.src = recepty[index].img;
    console.log("Kliknul jsi na obrazek " + obrazekReceptu);

    //ulozeneRecepty.push(recepty[index]);
    //ulozRecept(ulozeneRecepty);
    
}


//ukládání receptů nefunguje
function ulozRecept(ulozeneRecepty) {
    let hodnota = JSON.stringify(ulozeneRecepty);
    localStorage.setItem('ulozenyRecept', hodnota); 
}

function nactiUlozenyRecept() {
    let hodnota = localStorage.getItem('ulozenyRecept');
    if (hodnota === null || hodnota === undefined) {
		ulozeneRecepty = [];
	} else {
		ulozeneRecepty = JSON.parse(hodnota);
	}
    klikNaRecept(ulozeneRecepty);
}


let poleHledanychReptu = [];
//2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
function hledej() {
    console.log("Hledej");
    let input = document.getElementById("hledat").value;
    console.log("Chceš najít: " + input);  

    //mazáni levého sloupce receptů
    if (poleHledanychReptu.length>0) {
        let i;
        for (i = 0; i < poleHledanychReptu.length; i++) {
            let odebraniObjektu = document.querySelector('.recept');
            odebraniObjektu.parentNode.removeChild(odebraniObjektu);
        }
        poleHledanychReptu.splice(0,poleHledanychReptu.length)
    }else{
        let i;
        for (i = 0; i < recepty.length; i++) {
        let odebraniObjektu = document.querySelector('.recept');
        odebraniObjektu.parentNode.removeChild(odebraniObjektu);
        }
    }
    
    let index = recepty.map(function(nazev) { return nazev.nadpis; }).indexOf(input);
    if (index !== -1) {
        console.log("Recept existuje");
        poleHledanychReptu.push(recepty[index]);
        console.log(poleHledanychReptu);
        
    }else{
        console.log("Recept není.");
    }
   
    poleHledanychReptu.forEach(nactiRecepty);
};


//také zatím nefunkční
//4) Doplň řazení receptů podle hodnocení.
recepty.sort(function(a,b) {
    return a.hodnoceni - b.hodnoceni;
});





