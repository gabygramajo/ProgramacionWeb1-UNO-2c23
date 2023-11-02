const btnNivelFacil = document.getElementById("facil");
const btnNivelMedio = document.getElementById("medio");
const btnNivelDificil = document.getElementById("dificil");
const nickName = document.getElementById("nickname");
const btnIngresarNickname = document.getElementById("ingresarNickname");
imgBandera = document.getElementById("imgBandera");


const banderas = {
  nivelFacil : {
    bandera1: {
      src: "./images/uruguay.svg",
      descripcion: "Bandera de celeste y blanca",
      nombre: "uruguay",
      opciones: ["Argentina", "Honduras", "Escocia", "Uruguay"] 
    },
    bandera2: {
      src: "./images/canada.svg",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera3: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera4: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera5: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
  },
  nivelMedio : {
    bandera1: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera2: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera3: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera4: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera5: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
  },
  nivelDificil : {
    bandera1: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera2: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera3: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera4: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
    bandera5: {
      src: "./images/",
      descripcion: "",
      nombre: "",
      opciones: [] 
    },
  }
}

const jugadores = [];

const crearJugador = (nickname) => {
  const jugador = {
    nombre : nickname,
    puntaje: 0 
  }
  jugadores.push(jugador);
}

function actualizarBandera() {
  imgBandera = banderas.nivelFacil.bandera2.src
}


function validarJugadorExistente(nuevoNickname) {

  const nicknameExiste = jugadores.some((e) => e.nombre == nuevoNickname);

  return nicknameExiste;
}

function desactivarCampoObligatorio() {
  nickName.classList.remove("obligatorio");
}

function validarJugador(jugadorNickName) {

  const longitudValida = jugadorNickName.length >= 4 && jugadorNickName.length <= 8;

  if(longitudValida && !validarJugadorExistente(jugadorNickName) ) {
    alert("jugadorNickName agregado")
    crearJugador(jugadorNickName);

    if(nickName.classList.contains("obligatorio")) 
      desactivarCampoObligatorio();

  } else 
      alert("Nickname no válido o ya existente")
  
}

function desactivarPeventDefault(event) {
  event.preventDefault();
}

function ingresarNuevoJugador(e) {
  desactivarPeventDefault(e);

  validarJugador(nickName.value.trim());
}

function activarNivelDeJuego(e) {

  const pantalla = document.getElementById("pantalla")
  const ventanaModal = document.getElementById("ventana-modal")

  if(pantalla.classList.contains("desactivar")) {
    pantalla.classList.remove("desactivar");  
    ventanaModal.classList.add("desactivar");
  } else {
    pantalla.classList.add("desactivar");
    ventanaModal.classList.remove("desactivar");
  }
}

function comenzarJuego(e) {
  if(nickName.classList.contains("obligatorio"))
    alert("Debes Ingersar tu nickname y luego alegir el nivel")
  else
    activarNivelDeJuego(e);
}

// eventos

btnNivelFacil.addEventListener("click", comenzarJuego);
btnNivelMedio.addEventListener("click", comenzarJuego);
btnNivelDificil.addEventListener("click", comenzarJuego);
btnIngresarNickname.addEventListener("click", ingresarNuevoJugador);