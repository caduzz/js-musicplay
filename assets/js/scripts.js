let musicas = [{
    nomeMusica: 'Mustang Preto',
    nomeArtista: 'TETO - 30PRAUM',
    imgCapa: 'teto-mustang-preto.webp',
    imgBg: 'teto-mustang-preto.webp',
    src: 'mustang-preto_teto.mp3',
    favorito: true,
    color: '#1f2126'
}, {
    nomeMusica: 'Bolsa Da Fendi',
    nomeArtista: 'TETO, ft Poze Do Rodo',
    imgCapa: 'bolsa-da-fendo-teto-pz.jpg',
    imgBg: 'bolsa-da-fendo-teto-pz.jpg',
    src: 'bolsa-da-fende.mp3',
    favorito: false,
    color: '#473f28'
}, {
    nomeMusica: 'Aduio Teste',
    nomeArtista: 'Whatsapp',
    imgCapa: 'bolsa-da-fendo-teto-pz.jpg',
    imgBg: 'bg-padrao-1.jpg',
    src: 'audio-teste.mp3',
    favorito: false,
    color: '#284737'
}];

//Dados musica
const controler = document.querySelectorAll('.player-controler'),
    music = document.getElementById('audio-play'),
    favIcon = document.getElementById('fav-icon'),
    imgCapa = document.getElementById('imgCapa'),
    imgBg = document.getElementById('imgBg'),
    musicName = document.getElementById('musicName'),
    musicArtista = document.getElementById('musicArtista');

// Functions progress
const barraProgress = document.getElementById('barraProgress'),
    pointProgress = document.getElementById('point-progress'),
    progressTime = document.getElementById('startTime'),
    finalTime = document.getElementById('finalTime'),
    barProgress = document.getElementById('timeBar');

// controler musica
const btnPlay = document.getElementById('play'),
    btnNext = document.getElementById('next'),
    btnPrev = document.getElementById('prev');

//Volume imports
const sliderVolume = document.getElementById('soundSize'),
    btnVolume = document.getElementById('btnVolume');


var index = 0;
loadMusic(index);

btnNext.onclick = () => {
    loadMusic(1);
}

btnPrev.onclick = () => {
    loadMusic(0);
}

var colorSetada = '#1f2126';

function loadMusic(value) {
    var index = value;
    music.setAttribute('src', 'assets/sounds/' + musicas[index].src);
    music.onloadeddata = () => {
        colorSetada = musicas[index].color;
        for (i = 0; i < controler.length; i++) {
            controler[i].style.backgroundColor = colorSetada;
        }

        musicName.innerHTML = musicas[index].nomeMusica;
        musicArtista.innerHTML = musicas[index].nomeArtista;
        imgCapa.setAttribute('src', 'assets/img/' + musicas[index].imgCapa);
        imgBg.setAttribute('src', 'assets/img/' + musicas[index].imgBg);
        btnPlay.setAttribute('name', 'play-circle');
        barProgress.style.width = `0%`;
        music.currentTime = 0;

        setDuration();

        if (musicas[index].favorito) {
            favIcon.innerHTML = '<box-icon name="heart" type="solid" color="#fff"></box-icon>';
        } else {
            favIcon.innerHTML = '<box-icon name="heart" color="#fff"></box-icon>';
        }
    }
}


//Volume Configs
music.volume = sliderVolume.value / 100;
sliderVolume.oninput = (event) => {
    music.volume = event.target.value / 100;
};

btnVolume.onclick = (event) => {
    if (music.muted) {
        event.target.setAttribute('name', 'volume-low');
        music.muted = false;
    } else {
        event.target.setAttribute('name', 'volume-mute');
        music.muted = true;
    }
}

//Timer progress 
var isMove = false;
barraProgress.onmousedown = () => {
    isMove = true;
    progressBar()
}
onmousemove = () => {
    if (isMove) {
        progressBar()
    }
};
onmouseup = () => {
    isMove = false;
    pointProgress.style.backgroundColor = '#fff';
    pointProgress.style.border = 'none';
    pointProgress.style.transform = 'scale(1)';
}

function progressBar() {
    var tamanhoDiminuir = Math.floor((window.innerWidth - barraProgress.clientWidth)) / 2;
    var x = Math.floor(window.event.clientX - tamanhoDiminuir);
    var valorPorcentage = Math.floor((x / barraProgress.clientWidth) * 100);
    var timer = Math.floor((music.duration / 100) * valorPorcentage);

    if (x >= 0 && valorPorcentage < 101) {
        barProgress.style.width = `${valorPorcentage}%`;
        progressTime.textContent = gerarTime(timer);
        music.currentTime = timer;
    }
    pointProgress.style.transform = `scale(1.2)`;
    pointProgress.style.backgroundColor = colorSetada;
    pointProgress.style.border = '2px solid #fff';
}

function musicPlay() {
    if (music.paused) {
        music.play();
        btnPlay.setAttribute('name', 'stop-circle');
    } else {
        music.pause();
        btnPlay.setAttribute('name', 'play-circle');
    }
}

//Play e pouse music
btnPlay.onclick = () => {
    musicPlay()
};

//Transforma os segundo em minutos
const gerarTime = (secunds) => {
    let campoMinuto = Math.floor(secunds / 60);
    let campoSegundos = Math.floor(secunds % 60);

    if (campoSegundos < 10) {
        campoSegundos = '0' + Math.floor(secunds % 60);
    }

    return `${campoMinuto}:${campoSegundos}`;
}

//Mostrar a duração da musica
let setDuration = () => {
    finalTime.innerHTML = gerarTime(Math.floor(music.duration));
}

setDuration()

//Mostrar o tempo que ta a musica
music.ontimeupdate = () => {
    if (isMove) {
        return
    }
    var musicDuration = (music.currentTime / music.duration) * 100;
    var secunds = music.currentTime;

    barProgress.style.width = `${musicDuration}%`;
    progressTime.textContent = gerarTime(secunds);
    setDuration()
}