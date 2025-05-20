const bi = document.getElementById("imp");
const gi = document.getElementById("gio");
const cn = document.getElementById("con");
bi.addEventListener("click", apriBI);
gi.addEventListener("click", apriGI)

function apriBI(){
    cn.style.display = "flex";
}

function apriGI(){
    cn.style.display = "flex";
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && cn.style.display === 'flex') {
        cn.style.display = 'none';
    }
});