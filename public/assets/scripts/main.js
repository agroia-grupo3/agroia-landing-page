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

  var form = document.getElementById("form-demo");
  if (form) { activarFormularioDemo(form); }
  var news = document.getElementById("form-news");
  if (news) { activarBoletin(news); }
});

function marcarError(campo, mensaje) {
  var cont = campo.parentNode;
  if (mensaje) {
    cont.classList.add("invalid");
    cont.querySelector(".error-msg").textContent = mensaje;
  } else {
    cont.classList.remove("invalid");
  }
  return !mensaje;
}

function activarFormularioDemo(form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = form.elements["nombre"];
    var coop = form.elements["cooperativa"];
    var correo = form.elements["correo"];
    var tel = form.elements["telefono"];
    var ok = true;
    ok = marcarError(nombre, nombre.value.trim().length < 3 ? "Escribe tu nombre completo." : "") && ok;
    ok = marcarError(coop, coop.value.trim().length < 3 ? "Escribe el nombre de tu cooperativa." : "") && ok;
    ok = marcarError(correo, /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo.value) ? "" : "Escribe un correo válido, por ejemplo nombre@correo.com.") && ok;
    var telOk = tel.value === "" || /^[0-9]{9}$/.test(tel.value);
    ok = marcarError(tel, telOk ? "" : "El teléfono debe tener 9 dígitos.") && ok;
    if (ok) {
      document.getElementById("demo-ok").style.display = "block";
      form.reset();
    }
  });
}

function activarBoletin(form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var correo = form.elements["correo"];
    var ok = marcarError(correo, /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo.value) ? "" : "Escribe un correo válido.");
    if (ok) {
      document.getElementById("news-ok").style.display = "block";
      form.reset();
    }
  });
}
