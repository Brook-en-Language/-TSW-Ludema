const bi = document.getElementById("imp");
const gi = document.getElementById("gio");
const cn = document.getElementById("con");
const c1 = document.getElementById("con1");
const c2 = document.getElementById("con2");
const c3 = document.getElementById("con3");
const nc = document.getElementById("noc");
const n1 = document.getElementById("noc1");
const n2 = document.getElementById("noc2");
const vo = document.getElementById("vol");

const im = new Audio("audio/impegno.mp3");
const di = new Audio("audio/disimpegno.mp3");

bi.addEventListener("click", () => {apriBI();riproduciIM();});
gi.addEventListener("click", () => {apriGI();riproduciIM();});
n1.addEventListener("click", apriPartita);
n2.addEventListener("click", apriPartitaPubblica);
vo.addEventListener("input", modificaVO);
c1.addEventListener("change", modificaC1);
c2.addEventListener("change", modificaC2);

const filtroSalvato = localStorage.getItem("F");
if (filtroSalvato) {
    document.body.classList.add(`filtro-${filtroSalvato}`);
}  

const volumeSalvato = localStorage.getItem("M");
if (volumeSalvato) {
    musica.volume = volumeSalvato;
}  

const effettoSalvato = localStorage.getItem("E");
if (effettoSalvato) {
    if (effettoSalvato === "attiva"){
        im.volume = 1;
        di.volume = 1;
    } else{
        im.volume = 0;
        di.volume = 0;
    }
} 

function modificaVO(){
    musica.volume = vol.value;
    localStorage.setItem("M", vol.value);
}

function modificaC1(){
    if(c1.value === "attiva") {
        im.volume = 1;
        di.volume = 1;
        localStorage.setItem("E", c1.value);
    } else if (c1.value === "disattiva") {
        im.volume = 0;
        di.volume = 0;
        localStorage.setItem("E", c1.value);
    }
}

function modificaC2(){
    document.body.classList.remove(
        'filtro-normale',
        'filtro-protanopia',
        'filtro-deuteranopia',
        'filtro-tritanopia'
    );

    if(c2.value === "normale") {
        document.body.classList.add('filtro-normale');
        localStorage.setItem("F", c2.value);
    } else if (c2.value === "protanopia") {
        document.body.classList.add('filtro-protanopia');
        localStorage.setItem("F", c2.value);
    } else if (c2.value === "deuteranopia"){
        document.body.classList.add('filtro-deuteranopia');
        localStorage.setItem("F", c2.value);
    } else if (c2.value === "tritanopia"){
        document.body.classList.add('filtro-tritanopia');
        localStorage.setItem("F", c2.value);
    }
}

function riproduciIM(){
    im.play();
}

function riproduciDI(){
    di.play();
}

function apriBI(){
    cn.style.display = "flex";
}

function apriGI(){
    nc.style.display = "flex";
    n1.style.display = "flex";
    n2.style.display = "flex";
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && cn.style.display === 'flex') {
        riproduciDI();
        cn.style.display = 'none';
    } else if (event.key === 'Escape' && nc.style.display === 'flex') { 
        riproduciDI();
        nc.style.display = 'none'; 
    }
});

function apriPartita() {
    localStorage.setItem("tipoPartita", "privata");
    window.location.href = "game.html";
}


function apriPartitaPubblica() {
    localStorage.setItem("tipoPartita", "pubblica");
    window.location.href = "game.html";
}