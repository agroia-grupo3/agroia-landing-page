// AgroIA - Landing page: menu movil y validacion de los formularios.

// ---------- menu y formularios del inicio ----------
document.addEventListener("DOMContentLoaded", function () {
  var boton = document.getElementById("menu-btn");
  var nav = document.getElementById("nav");
  if (boton && nav) {
    boton.addEventListener("click", function () {
      var abierto = nav.classList.toggle("open");
      boton.setAttribute("aria-expanded", abierto);
    });
  }
  // al elegir una opcion del menu en el celular, se cierra
  var enlaces = document.querySelectorAll("#nav a");
  for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener("click", function () {
      nav.classList.remove("open");
      boton.setAttribute("aria-expanded", false);
    });
  }

  // === formularios (Rol 4): activar los formularios aqui ===
});

// === funciones de formularios (Rol 4) ===
