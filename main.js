const bi = document.getElementById("imp");
const gi = document.getElementById("gio");
const cn = document.getElementById("con");
const nc = document.getElementById("noc");
const n1 = document.getElementById("noc1");
const n2 = document.getElementById("noc2");
bi.addEventListener("click", apriBI);
gi.addEventListener("click", apriGI)
n1.addEventListener("click", apriPartita);

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
        cn.style.display = 'none';
    } else if (event.key === 'Escape' && nc.style.display === 'flex') { 
        nc.style.display = 'none'; 
    }
});

function apriPartita(){
     window.location.href = "game.html";
}