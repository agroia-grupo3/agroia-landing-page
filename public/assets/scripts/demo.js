// AgroIA - Demo interactiva del Landing Page (Sprint 2).
// JavaScript basico: todo ocurre en memoria; al recargar la pagina se borra el estado.
// El analisis de la imagen, las coordenadas, el envio de alertas y el chat son SIMULADOS.

var SEVERIDAD = {
  3: { nombre: "Crítica", icono: "▲", clase: "sev-3" },
  2: { nombre: "Moderada", icono: "◆", clase: "sev-2" },
  1: { nombre: "Leve", icono: "●", clase: "sev-1" },
  0: { nombre: "Saludable", icono: "✔", clase: "sev-0" }
};

var MUESTRAS = [
  { id: 1, nombre: "Moniliasis", img: "assets/images/moniliasis.jpg", cultivo: "cacao", plaga: "Moniliasis", conf: 92, sev: 3, calidad: "ok", fx: "", caja: { x: 8, y: 14, w: 80, h: 70 } },
  { id: 2, nombre: "Mazorca negra", img: "assets/images/mazorca-negra.jpg", cultivo: "cacao", plaga: "Mazorca negra", conf: 84, sev: 2, calidad: "ok", fx: "", caja: { x: 14, y: 18, w: 66, h: 62 } },
  { id: 3, nombre: "Roya del café", img: "assets/images/roya.jpg", cultivo: "cafe", plaga: "Roya del café", conf: 78, sev: 1, calidad: "ok", fx: "", caja: { x: 20, y: 20, w: 58, h: 60 } },
  { id: 4, nombre: "Foto movida", img: "assets/images/hero.jpg", cultivo: "cacao", plaga: "Moniliasis", conf: 0, sev: 0, calidad: "blur", fx: "fx-blur", caja: null },
  { id: 5, nombre: "Foto en sombra", img: "assets/images/roya.jpg", cultivo: "cafe", plaga: "Roya del café", conf: 0, sev: 0, calidad: "dark", fx: "fx-dark", caja: null },
  { id: 6, nombre: "Hoja dudosa", img: "assets/images/mazorca-negra.jpg", cultivo: "cacao", plaga: "Mazorca negra", conf: 46, sev: 1, calidad: "ok", fx: "fx-gray", caja: { x: 25, y: 25, w: 50, h: 50 } }
];

var TRATAMIENTO = {
  "Moniliasis": {
    recomendacion: "Retira y entierra las mazorcas con polvo blanco antes de que esporulen y aplica un fungicida a base de cobre si el técnico lo confirma.",
    mip: "Con pocas mazorcas afectadas basta con retirarlas cada semana, podar para que circule el aire y mantener limpio el cultivo.",
    pasos: ["Revisa la parcela y marca las mazorcas con polvo blanco o manchas.", "Córtalas con tijera limpia y entiérralas lejos del cultivo.", "Poda ramas bajas para que entre aire y luz.", "Si el técnico lo confirma, prepara y aplica el fungicida a base de cobre.", "Registra la acción en AgroIA y vuelve a revisar en 7 días."]
  },
  "Mazorca negra": {
    recomendacion: "Retira las mazorcas con manchas oscuras, mejora el drenaje y aplica fungicida a base de cobre en la zona afectada si el técnico lo confirma.",
    mip: "En casos leves retira las mazorcas, mejora la ventilación y evita el exceso de sombra y de humedad.",
    pasos: ["Identifica las mazorcas con manchas oscuras que avanzan.", "Retíralas y entiérralas o sácalas del lote.", "Despeja el suelo y mejora el drenaje cerca del tronco.", "Si el técnico lo confirma, aplica el fungicida a base de cobre.", "Registra la acción y repite la inspección en 7 días."]
  },
  "Roya del café": {
    recomendacion: "Retira las hojas muy afectadas, regula la sombra y planifica una aplicación de fungicida a base de cobre antes de la época de lluvias.",
    mip: "Con pocas hojas afectadas conviene regular la sombra, nutrir la planta y vigilar cada semana antes de aplicar productos.",
    pasos: ["Revisa el envés de las hojas con polvo anaranjado.", "Retira las hojas muy afectadas y deséchalas fuera del lote.", "Regula la sombra para bajar la humedad.", "Si el técnico lo confirma, aplica el fungicida a base de cobre.", "Registra la acción y vuelve a revisar en 7 días."]
  }
};

var DOSIS = [
  "Producto: fungicida a base de cobre autorizado para tu cultivo. Sigue la dosis de la etiqueta.",
  "Valor de ejemplo de la demostración: 2 g de producto por litro de agua. Confírmalo con tu técnico.",
  "Equipo de protección: guantes, mascarilla, lentes y ropa de manga larga.",
  "Aplica en las horas frescas del día y sin viento."
];

var ADVERTENCIAS = [
  "No apliques si va a llover en las próximas horas.",
  "No comas ni bebas durante la aplicación y lávate las manos al terminar.",
  "Guarda el producto fuera del alcance de niños y lejos de fuentes de agua."
];

var SOCIOS = [
  { nombre: "Socio 001 · Ledoy", cultivo: "cacao", campana: "2026", plaga: "Moniliasis", casos: 6, sev: 3, parcelas: ["Parcela A · 4 ha · cacao", "Parcela B · 2 ha · cacao"] },
  { nombre: "Socio 002 · Ledoy", cultivo: "cacao", campana: "2026", plaga: "Mazorca negra", casos: 3, sev: 2, parcelas: ["Parcela A · 3 ha · cacao"] },
  { nombre: "Socio 003 · Mariscal Cáceres", cultivo: "cafe", campana: "2026", plaga: "Roya del café", casos: 4, sev: 2, parcelas: ["Parcela A · 5 ha · café"] },
  { nombre: "Socio 004 · Mariscal Cáceres", cultivo: "cafe", campana: "2025", plaga: "Roya del café", casos: 2, sev: 1, parcelas: ["Parcela A · 2 ha · café", "Parcela B · 1 ha · café"] },
  { nombre: "Socio 005 · Ledoy", cultivo: "cacao", campana: "2025", plaga: "Moniliasis", casos: 5, sev: 3, parcelas: ["Parcela A · 6 ha · cacao"] },
  { nombre: "Socio 006 · Ledoy", cultivo: "cacao", campana: "2026", plaga: "Mazorca negra", casos: 1, sev: 1, parcelas: ["Parcela A · 2 ha · cacao"] },
  { nombre: "Socio 007 · Mariscal Cáceres", cultivo: "cafe", campana: "2026", plaga: "Roya del café", casos: 7, sev: 3, parcelas: ["Parcela A · 3 ha · café", "Parcela B · 3 ha · café"] },
  { nombre: "Socio 008 · Ledoy", cultivo: "cacao", campana: "2025", plaga: "Moniliasis", casos: 0, sev: 0, parcelas: ["Parcela A · 2 ha · cacao"] }
];

var estado = {
  cultivo: "cacao", camara: false, muestra: null, archivoUrl: null, resultado: null, guardado: false,
  online: false, gps: true, historial: [], alertas: [], umbralSev: 2, umbralConf: 60, seq: 0,
  selHist: null, selAlerta: null, tratId: null, chatPend: [], chatAbierto: false
};

function $(id) { return document.getElementById(id); }
function dia(offset) { var d = new Date(); d.setDate(d.getDate() + offset); return d; }
function fmt(d) { return d.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" }); }
function nombreCultivo(c) { return c === "cafe" ? "Café" : "Cacao"; }
function chipSev(sev) { var s = SEVERIDAD[sev]; return '<span class="severity ' + s.clase + '">' + s.icono + " " + s.nombre + "</span>"; }

var toastTimer = null;
function aviso(texto) {
  var t = $("toast");
  t.textContent = texto;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
}

// ---------- datos de ejemplo precargados (seguimiento de la parcela 1) ----------
function cargarEjemplos() {
  var base = [
    { dias: -14, plaga: "Moniliasis", cultivo: "cacao", sev: 1, conf: 82, x: 30, y: 38, img: "assets/images/moniliasis.jpg", parcela: "Parcela 1 · Lote 2" },
    { dias: -7, plaga: "Moniliasis", cultivo: "cacao", sev: 2, conf: 86, x: 34, y: 42, img: "assets/images/moniliasis.jpg", parcela: "Parcela 1 · Lote 2" },
    { dias: -3, plaga: "Roya del café", cultivo: "cafe", sev: 2, conf: 79, x: 72, y: 64, img: "assets/images/roya.jpg", parcela: "Parcela 3 · Lote 4" }
  ];
  for (var i = 0; i < base.length; i++) {
    var b = base[i];
    var insp = {
      id: ++estado.seq, fecha: dia(b.dias), cultivo: b.cultivo, plaga: b.plaga, conf: b.conf, sev: b.sev,
      parcela: b.parcela, x: b.x, y: b.y, img: b.img, fx: "", notas: "Inspección de ejemplo.", acciones: [],
      sync: "sync", campana: "2026", ejemplo: true
    };
    estado.historial.push(insp);
    if (insp.sev >= 2) { crearAlerta(insp, true); }
  }
}

// ---------- pestañas ----------
function activarPestañas() {
  var tabs = document.querySelectorAll(".tab");
  function mostrar(tab) {
    for (var i = 0; i < tabs.length; i++) {
      var activo = tabs[i] === tab;
      tabs[i].setAttribute("aria-selected", activo ? "true" : "false");
      tabs[i].tabIndex = activo ? 0 : -1;
      $(tabs[i].getAttribute("aria-controls")).hidden = !activo;
    }
    tab.focus();
    refrescar();
  }
  for (var i = 0; i < tabs.length; i++) {
    (function (indice) {
      tabs[indice].addEventListener("click", function () { mostrar(tabs[indice]); });
      tabs[indice].addEventListener("keydown", function (e) {
        var n = -1;
        if (e.key === "ArrowRight") { n = (indice + 1) % tabs.length; }
        if (e.key === "ArrowLeft") { n = (indice - 1 + tabs.length) % tabs.length; }
        if (n >= 0) { e.preventDefault(); mostrar(tabs[n]); }
      });
    })(i);
  }
  window.irAPestaña = function (id) { mostrar($(id)); };
}

function refrescar() {
  pintarHistorial();
  pintarDetalle();
  pintarAlertas();
  pintarMapa();
  pintarDetalleAlerta();
  pintarSelectorTratamiento();
  pintarTratamiento();
  pintarCooperativa();
  pintarCola();
}

// ---------- conexion (US17, US21, US42) ----------
function pintarCola() {
  var pend = 0;
  for (var i = 0; i < estado.alertas.length; i++) { if (estado.alertas[i].envio === "En cola") { pend++; } }
  $("txt-cola").textContent = pend === 0 ? "Sin envíos pendientes." : pend + (pend === 1 ? " alerta en cola, se enviará al volver la señal." : " alertas en cola, se enviarán al volver la señal.");
}

function activarConexion() {
  $("btn-conexion").addEventListener("click", function () {
    estado.online = !estado.online;
    this.setAttribute("aria-checked", estado.online ? "true" : "false");
    $("txt-conexion").textContent = estado.online ? "Con conexión" : "Sin conexión";
    if (estado.online) {
      var enviadas = 0;
      for (var i = 0; i < estado.alertas.length; i++) {
        if (estado.alertas[i].envio === "En cola") { estado.alertas[i].envio = "Enviada"; enviadas++; }
      }
      if (enviadas > 0) { aviso("Volvió la señal: se enviaron " + enviadas + " alerta(s) a tu cooperativa y a tu técnico."); }
      else { aviso("Volvió la señal."); }
      vaciarChat();
    } else {
      aviso("Sin conexión: AgroIA sigue funcionando en el celular.");
    }
    refrescar();
  });
}

// ---------- 1. DIAGNOSTICO ----------
function setPaso(n) {
  var chips = document.querySelectorAll(".step-chip");
  for (var i = 0; i < chips.length; i++) {
    var p = Number(chips[i].getAttribute("data-step"));
    chips[i].classList.toggle("is-current", p === n);
    chips[i].classList.toggle("is-done", p < n);
  }
}

function pintarMuestras() {
  var cont = $("muestras");
  cont.innerHTML = "";
  for (var i = 0; i < MUESTRAS.length; i++) {
    var m = MUESTRAS[i];
    var b = document.createElement("button");
    b.type = "button";
    b.className = "sample";
    b.setAttribute("aria-pressed", "false");
    b.setAttribute("data-id", m.id);
    b.innerHTML = '<img class="' + m.fx + '" src="' + m.img + '" alt="">' + m.id + " " + m.nombre;
    b.addEventListener("click", function () {
      if (!estado.camara) {
        $("msg-foto").textContent = "Primero permite la cámara, o sube una foto de tu equipo.";
        return;
      }
      elegirMuestra(Number(this.getAttribute("data-id")));
    });
    cont.appendChild(b);
  }
}

function marcarGuia(enc, enf, luz) {
  var items = document.querySelectorAll("#guia-foto li");
  var valores = { encuadre: enc, enfoque: enf, luz: luz };
  for (var i = 0; i < items.length; i++) {
    var k = items[i].getAttribute("data-guide");
    items[i].className = valores[k] === null ? "" : (valores[k] ? "ok" : "bad");
  }
}

function mostrarFoto(src, fx, alt) {
  var img = $("visor-img");
  img.src = src;
  img.alt = alt;
  img.className = fx || "";
  img.hidden = false;
  $("visor-vacio").hidden = true;
  $("bbox").hidden = true;
  $("resultado").hidden = true;
  estado.resultado = null;
  estado.guardado = false;
}

function elegirMuestra(id) {
  var m = null;
  for (var i = 0; i < MUESTRAS.length; i++) { if (MUESTRAS[i].id === id) { m = MUESTRAS[i]; } }
  estado.muestra = m;
  estado.archivoUrl = null;
  var botones = document.querySelectorAll(".sample");
  for (var j = 0; j < botones.length; j++) { botones[j].setAttribute("aria-pressed", Number(botones[j].getAttribute("data-id")) === id ? "true" : "false"); }
  mostrarFoto(m.img, m.fx, "Foto de muestra: " + m.nombre);
  evaluarCalidad(m.calidad);
}

function evaluarCalidad(calidad) {
  var msg = $("msg-foto");
  var analizar = $("btn-analizar");
  $("btn-repetir").hidden = true;
  if (calidad === "blur") {
    marcarGuia(true, false, true);
    msg.textContent = "La foto salió movida. Sostén el celular con las dos manos, toca la pantalla para enfocar y repite la foto.";
    analizar.disabled = true; $("btn-repetir").hidden = false; return;
  }
  if (calidad === "dark") {
    marcarGuia(true, true, false);
    msg.textContent = "Hay muy poca luz. Colócate donde dé la luz del día, sin sombra sobre la hoja, y repite la foto.";
    analizar.disabled = true; $("btn-repetir").hidden = false; return;
  }
  marcarGuia(true, true, true);
  msg.textContent = "";
  analizar.disabled = false;
  setPaso(3);
}

function repetirFoto() {
  estado.muestra = null; estado.archivoUrl = null; estado.resultado = null;
  $("visor-img").hidden = true; $("visor-vacio").hidden = false; $("bbox").hidden = true; $("resultado").hidden = true;
  $("btn-analizar").disabled = true; $("btn-repetir").hidden = true; $("msg-foto").textContent = "";
  marcarGuia(null, null, null);
  var botones = document.querySelectorAll(".sample");
  for (var j = 0; j < botones.length; j++) { botones[j].setAttribute("aria-pressed", "false"); }
  $("archivo-foto").value = "";
  setPaso(3);
}

function activarFoto() {
  $("archivo-foto").addEventListener("change", function () {
    var f = this.files[0];
    if (!f) { return; }
    if (f.type.indexOf("image/") !== 0) { $("msg-foto").textContent = "El archivo no es una imagen. Elige una foto."; return; }
    estado.archivoUrl = URL.createObjectURL(f);
    // simulacion: el resultado depende del tamano del archivo y del cultivo elegido
    var candidatas = [];
    for (var i = 0; i < MUESTRAS.length; i++) { if (MUESTRAS[i].cultivo === estado.cultivo && MUESTRAS[i].calidad === "ok" && MUESTRAS[i].conf >= 60) { candidatas.push(MUESTRAS[i]); } }
    var base = candidatas[f.size % candidatas.length];
    estado.muestra = { id: 0, nombre: "Foto propia", img: estado.archivoUrl, cultivo: base.cultivo, plaga: base.plaga, conf: 70 + (f.size % 25), sev: base.sev, calidad: "ok", fx: "", caja: base.caja };
    mostrarFoto(estado.archivoUrl, "", "Foto subida por la persona usuaria");
    evaluarCalidad("ok");
  });
  $("btn-repetir").addEventListener("click", repetirFoto);
}

function activarCamara() {
  $("btn-permitir").addEventListener("click", function () {
    estado.camara = true;
    $("msg-camara").textContent = "Cámara habilitada. Ya puedes tomar una foto de muestra.";
    $("msg-foto").textContent = "";
    setPaso(3);
  });
  $("btn-denegar").addEventListener("click", function () {
    estado.camara = false;
    $("msg-camara").textContent = "Sin permiso de cámara. Aún puedes subir una foto de tu galería.";
    setPaso(2);
  });
  var radios = document.querySelectorAll('input[name="cultivo"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () { estado.cultivo = this.value; setPaso(2); aviso("Cultivo: " + nombreCultivo(estado.cultivo)); });
  }
}

function analizar() {
  var m = estado.muestra;
  if (!m) { return; }
  if (m.cultivo !== estado.cultivo) {
    $("msg-foto").textContent = "Esta foto parece de " + nombreCultivo(m.cultivo).toLowerCase() + " pero elegiste " + nombreCultivo(estado.cultivo).toLowerCase() + ". Cambia el cultivo o toma otra foto.";
    return;
  }
  $("msg-foto").textContent = "";
  $("btn-analizar").disabled = true;
  $("progreso").hidden = false;
  setPaso(4);
  var avance = 0;
  var reloj = setInterval(function () {
    avance += 12;
    $("progreso-barra").style.width = Math.min(avance, 100) + "%";
    $("progreso-txt").textContent = "Analizando en el celular… " + Math.min(avance, 100) + " %";
    if (avance >= 100) {
      clearInterval(reloj);
      $("progreso").hidden = true;
      $("progreso-barra").style.width = "0";
      mostrarResultado(m);
    }
  }, 150);
}

function textoGPS() {
  var chk = $("chk-gps").checked;
  $("res-gps").textContent = chk ? "Ubicación de ejemplo asociada al diagnóstico (-6.5100, -76.3700)." : "Sin GPS: el diagnóstico se guardará sin coordenadas. Puedes continuar con tu trabajo.";
}

function mostrarResultado(m) {
  var inconcluso = m.conf < 60;
  estado.resultado = m;
  estado.guardado = false;
  $("resultado").hidden = false;
  $("btn-analizar").disabled = false;
  $("msg-guardado").textContent = "";
  setPaso(5);

  if (inconcluso) {
    $("sev-chip").className = "severity sev-x";
    $("sev-chip").textContent = "? Resultado inconcluso";
    $("res-plaga").textContent = "No se puede confirmar la plaga";
    $("res-detalle").textContent = "La confianza es baja. Repite la foto con mejor luz o consulta a tu técnico de campo antes de actuar.";
    $("bbox").hidden = true;
  } else {
    var s = SEVERIDAD[m.sev];
    $("sev-chip").className = "severity " + s.clase;
    $("sev-chip").textContent = s.icono + " Severidad " + s.nombre.toLowerCase();
    $("res-plaga").textContent = m.plaga;
    $("res-detalle").textContent = m.sev === 3 ? "Atiende hoy. Está avanzando y puede contagiar a otras plantas." : (m.sev === 2 ? "Atiende esta semana. Revisa las plantas cercanas." : "Vigila cada semana. Aplica manejo integrado.");
    var c = m.caja;
    var bb = $("bbox");
    bb.style.left = c.x + "%"; bb.style.top = c.y + "%"; bb.style.width = c.w + "%"; bb.style.height = c.h + "%";
    $("bbox-label").textContent = m.plaga + " · " + m.conf + " %";
    bb.hidden = false;
  }
  $("meter-fill").style.width = m.conf + "%";
  $("meter").setAttribute("aria-label", "Confianza del análisis: " + m.conf + " por ciento");
  $("res-confianza").textContent = "Confianza: " + m.conf + " %" + (inconcluso ? " (menor al 60 %: resultado inconcluso)." : (m.conf >= 85 ? " (alta)." : " (media)."));
  textoGPS();
  $("btn-guardar").textContent = "Guardar en el historial";
  $("btn-ver-tratamiento").disabled = inconcluso;
  $("resultado").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function guardarDiagnostico() {
  var m = estado.resultado;
  if (!m) { return; }
  if (estado.guardado) { $("msg-guardado").textContent = "Este diagnóstico ya está en el historial."; return; }
  var conGps = $("chk-gps").checked;
  var inconcluso = m.conf < 60;
  var insp = {
    id: ++estado.seq, fecha: new Date(), cultivo: m.cultivo, plaga: inconcluso ? "Inconcluso" : m.plaga, conf: m.conf,
    sev: inconcluso ? -1 : m.sev, parcela: $("sel-parcela").value,
    x: conGps ? 10 + Math.round(Math.random() * 80) : null, y: conGps ? 12 + Math.round(Math.random() * 74) : null,
    img: m.img, fx: m.fx, notas: "", acciones: [], sync: estado.online ? "sync" : "pend", campana: "2026", ejemplo: false
  };
  estado.historial.push(insp);
  estado.guardado = true;
  estado.tratId = inconcluso ? estado.tratId : insp.id;
  var texto = "Guardado en el historial del celular" + (estado.online ? " y sincronizado." : " (pendiente de sincronizar).");
  if (!inconcluso && insp.sev >= estado.umbralSev && insp.conf >= estado.umbralConf) {
    var a = crearAlerta(insp, false);
    texto += a.envio === "Enviada" ? " Se avisó a tu cooperativa y a tu técnico." : " La alerta quedó en cola hasta que haya señal.";
  }
  $("msg-guardado").textContent = texto;
  aviso("Diagnóstico guardado");
  refrescar();
}

// ---------- 2. HISTORIAL ----------
function filtrarHistorial() {
  var p = $("f-parcela").value, c = $("f-cultivo").value, pl = $("f-plaga").value, o = $("f-orden").value;
  var lista = [];
  for (var i = 0; i < estado.historial.length; i++) {
    var h = estado.historial[i];
    if ((p && h.parcela !== p) || (c && h.cultivo !== c) || (pl && h.plaga !== pl)) { continue; }
    lista.push(h);
  }
  lista.sort(function (a, b) { return o === "asc" ? a.fecha - b.fecha : b.fecha - a.fecha; });
  return lista;
}

function pintarHistorial() {
  var ul = $("lista-historial");
  ul.innerHTML = "";
  var lista = filtrarHistorial();
  $("historial-vacio").hidden = lista.length > 0;
  $("historial-vacio").textContent = estado.historial.length === 0 ? "Aún no hay inspecciones. Haz un diagnóstico y guárdalo." : "Ninguna inspección coincide con los filtros.";
  for (var i = 0; i < lista.length; i++) {
    var h = lista[i];
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    b.className = "record-item";
    b.setAttribute("aria-pressed", estado.selHist === h.id ? "true" : "false");
    b.setAttribute("data-id", h.id);
    var sevTxt = h.sev < 0 ? "Inconcluso" : SEVERIDAD[h.sev].nombre;
    b.innerHTML = '<img class="' + h.fx + '" src="' + h.img + '" alt=""><span class="record-main"><strong>' + h.plaga + " · " + sevTxt + "</strong><span>" + fmt(h.fecha) + " · " + h.parcela + " · " + nombreCultivo(h.cultivo) + "</span></span>" +
      '<span class="badge ' + (h.sync === "sync" ? "badge-sync" : "badge-pend") + '">' + (h.sync === "sync" ? "Sincronizada" : "Pendiente") + "</span>";
    b.addEventListener("click", function () { estado.selHist = Number(this.getAttribute("data-id")); pintarHistorial(); pintarDetalle(); });
    li.appendChild(b);
    ul.appendChild(li);
  }
  var pend = 0;
  for (var k = 0; k < estado.historial.length; k++) { if (estado.historial[k].sync === "pend") { pend++; } }
  $("sync-estado").textContent = pend === 0 ? "Sin expedientes pendientes." : pend + " expediente(s) pendiente(s) de sincronizar.";
}

function buscarInsp(id) {
  for (var i = 0; i < estado.historial.length; i++) { if (estado.historial[i].id === id) { return estado.historial[i]; } }
  return null;
}

function pintarDetalle() {
  var h = buscarInsp(estado.selHist);
  $("detalle-vacio").hidden = !!h;
  $("detalle-contenido").hidden = !h;
  if (!h) { return; }
  var img = $("det-img");
  img.src = h.img; img.className = "det-img " + h.fx; img.alt = "Foto de la inspección del " + fmt(h.fecha);
  var sevTxt = h.sev < 0 ? "Inconcluso" : SEVERIDAD[h.sev].nombre;
  $("det-datos").innerHTML = "<dt>Fecha</dt><dd>" + fmt(h.fecha) + "</dd><dt>Cultivo</dt><dd>" + nombreCultivo(h.cultivo) + "</dd><dt>Plaga</dt><dd>" + h.plaga + "</dd><dt>Severidad</dt><dd>" + sevTxt + "</dd><dt>Confianza</dt><dd>" + h.conf + " %</dd><dt>Parcela</dt><dd>" + h.parcela + "</dd><dt>Ubicación</dt><dd>" + (h.x === null ? "Sin GPS" : "Coordenadas de ejemplo (" + h.x + ", " + h.y + ")") + "</dd>";
  var notas = $("det-notas");
  notas.value = h.notas;
  var editable = h.sync === "pend";
  notas.disabled = !editable;
  $("btn-guardar-nota").disabled = !editable;
  $("det-nota-ayuda").textContent = editable ? "Puedes corregir la nota hasta que la inspección se sincronice." : "Ya se sincronizó: la nota no se puede editar.";
  var ul = $("det-acciones");
  ul.innerHTML = "";
  if (h.acciones.length === 0) { ul.innerHTML = "<li>Aún no registraste acciones.</li>"; }
  for (var i = 0; i < h.acciones.length; i++) {
    var li = document.createElement("li");
    li.textContent = fmt(h.acciones[i].fecha) + " · " + h.acciones[i].estado + ": " + h.acciones[i].texto;
    ul.appendChild(li);
  }
}

function activarHistorial() {
  var ids = ["f-parcela", "f-cultivo", "f-plaga", "f-orden"];
  for (var i = 0; i < ids.length; i++) { $(ids[i]).addEventListener("change", pintarHistorial); }
  $("btn-guardar-nota").addEventListener("click", function () {
    var h = buscarInsp(estado.selHist);
    if (h && h.sync === "pend") { h.notas = $("det-notas").value.trim(); aviso("Nota guardada"); }
  });
  $("btn-registrar-accion").addEventListener("click", function () {
    var h = buscarInsp(estado.selHist);
    var campo = $("accion-texto");
    var cont = campo.parentNode;
    if (campo.value.trim().length < 3) { cont.classList.add("invalid"); $("accion-error").textContent = "Describe la acción en pocas palabras."; return; }
    cont.classList.remove("invalid");
    h.acciones.push({ fecha: new Date(), estado: "Realizado", texto: campo.value.trim() });
    campo.value = "";
    aviso("Acción registrada en la inspección");
    pintarDetalle();
  });
  $("btn-sincronizar").addEventListener("click", function () {
    if (!estado.online) { $("sync-estado").textContent = "Sin conexión: los expedientes se sincronizarán cuando recuperes la señal."; aviso("Aún no hay señal"); return; }
    var n = 0;
    for (var i = 0; i < estado.historial.length; i++) { if (estado.historial[i].sync === "pend") { estado.historial[i].sync = "sync"; n++; } }
    aviso(n === 0 ? "No había nada pendiente" : n + " expediente(s) sincronizado(s) con la cooperativa");
    refrescar();
  });
}

// ---------- 3. ALERTAS Y MAPA ----------
function crearAlerta(insp, ejemplo) {
  var a = { id: estado.alertas.length + 1, inspId: insp.id, fecha: insp.fecha, envio: (estado.online || ejemplo) ? "Enviada" : "En cola", reinspeccion: null };
  estado.alertas.push(a);
  return a;
}

function alertasOrdenadas() {
  var copia = estado.alertas.slice();
  var modo = $("alertas-orden").value;
  copia.sort(function (a, b) {
    var ia = buscarInsp(a.inspId), ib = buscarInsp(b.inspId);
    if (modo === "fecha") { return ib.fecha - ia.fecha; }
    if (ib.sev !== ia.sev) { return ib.sev - ia.sev; }
    return ib.conf - ia.conf;
  });
  return copia;
}

function pintarAlertas() {
  var ul = $("lista-alertas");
  ul.innerHTML = "";
  var lista = alertasOrdenadas();
  $("alertas-vacio").hidden = lista.length > 0;
  for (var i = 0; i < lista.length; i++) {
    var a = lista[i], h = buscarInsp(a.inspId);
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    b.className = "record-item";
    b.setAttribute("aria-pressed", estado.selAlerta === a.id ? "true" : "false");
    b.setAttribute("data-id", a.id);
    b.innerHTML = '<span class="severity ' + SEVERIDAD[h.sev].clase + '">' + SEVERIDAD[h.sev].icono + " " + SEVERIDAD[h.sev].nombre + '</span><span class="record-main"><strong>' + h.plaga + "</strong><span>" + fmt(a.fecha) + " · " + h.parcela + "</span></span>" +
      '<span class="badge ' + (a.envio === "Enviada" ? "badge-sync" : "badge-pend") + '">' + a.envio + "</span>";
    b.addEventListener("click", function () { estado.selAlerta = Number(this.getAttribute("data-id")); pintarAlertas(); pintarDetalleAlerta(); pintarMapa(); });
    li.appendChild(b);
    ul.appendChild(li);
  }
}

function buscarAlerta(id) {
  for (var i = 0; i < estado.alertas.length; i++) { if (estado.alertas[i].id === id) { return estado.alertas[i]; } }
  return null;
}

var ACCION_CORTA = { 3: "Atender hoy y avisar al técnico.", 2: "Atender esta semana y reinspeccionar.", 1: "Vigilar y aplicar manejo integrado." };

function pintarDetalleAlerta() {
  var a = buscarAlerta(estado.selAlerta);
  $("alerta-vacia").hidden = !!a;
  $("alerta-datos").hidden = !a;
  $("alerta-acciones").hidden = !a;
  if (!a) { return; }
  var h = buscarInsp(a.inspId);
  $("alerta-datos").innerHTML = "<dt>Plaga</dt><dd>" + h.plaga + "</dd><dt>Severidad</dt><dd>" + chipSev(h.sev) + "</dd><dt>Confianza</dt><dd>" + h.conf + " %</dd><dt>Ubicación</dt><dd>" + (h.x === null ? "Sin GPS" : "En el mapa (" + h.x + ", " + h.y + ")") + "</dd><dt>Acción</dt><dd>" + ACCION_CORTA[h.sev] + "</dd><dt>Estado de envío</dt><dd>" + a.envio + "</dd><dt>Reinspección</dt><dd>" + (a.reinspeccion ? fmt(a.reinspeccion) : "Sin programar") + "</dd>";

  // evolucion (US26): inspecciones de la misma parcela y plaga
  var serie = [];
  for (var i = 0; i < estado.historial.length; i++) { var x = estado.historial[i]; if (x.parcela === h.parcela && x.plaga === h.plaga) { serie.push(x); } }
  serie.sort(function (p, q) { return p.fecha - q.fecha; });
  var ev = $("evolucion");
  ev.innerHTML = "";
  for (var j = 0; j < serie.length; j++) {
    var barra = document.createElement("div");
    barra.className = "evo-bar " + "sev-" + serie[j].sev;
    barra.style.height = (28 + serie[j].sev * 22) + "px";
    barra.textContent = fmt(serie[j].fecha).slice(0, 5);
    ev.appendChild(barra);
  }
  var txt = "Solo hay una inspección: se necesitan dos para ver la evolución.";
  if (serie.length >= 2) {
    var u = serie[serie.length - 1].sev, p2 = serie[serie.length - 2].sev;
    txt = u > p2 ? "El problema avanza: la severidad subió respecto a la inspección anterior." : (u === p2 ? "El problema se estabiliza: la severidad no cambió." : "El problema retrocede: la severidad bajó.");
  }
  $("evolucion-txt").textContent = txt;
}

function pintarMapa() {
  var mapa = $("mapa");
  mapa.innerHTML = "";
  var modo = document.querySelector('input[name="mapa-modo"]:checked').value;
  for (var i = 0; i < estado.historial.length; i++) {
    var h = estado.historial[i];
    if (h.x === null || h.sev < 0) { continue; }
    if (modo === "calor") {
      var d = document.createElement("div");
      d.className = "heat";
      var tam = 70 + h.sev * 40;
      var color = h.sev >= 3 ? "198, 40, 40" : (h.sev === 2 ? "230, 120, 20" : "250, 200, 40");
      d.style.cssText = "left:" + h.x + "%;top:" + h.y + "%;width:" + tam + "px;height:" + tam + "px;background:radial-gradient(circle, rgba(" + color + ",0.75) 0%, rgba(" + color + ",0) 70%);";
      mapa.appendChild(d);
    } else {
      var p = document.createElement("button");
      p.type = "button";
      p.className = "pin " + SEVERIDAD[h.sev].clase;
      p.style.left = h.x + "%"; p.style.top = h.y + "%";
      p.textContent = SEVERIDAD[h.sev].icono;
      p.setAttribute("aria-label", "Foco de " + h.plaga + ", severidad " + SEVERIDAD[h.sev].nombre.toLowerCase());
      var al = null;
      for (var k = 0; k < estado.alertas.length; k++) { if (estado.alertas[k].inspId === h.id) { al = estado.alertas[k]; } }
      p.setAttribute("aria-pressed", al && estado.selAlerta === al.id ? "true" : "false");
      p.setAttribute("data-insp", h.id);
      p.addEventListener("click", function () {
        var id = Number(this.getAttribute("data-insp"));
        for (var q = 0; q < estado.alertas.length; q++) {
          if (estado.alertas[q].inspId === id) { estado.selAlerta = estado.alertas[q].id; pintarAlertas(); pintarDetalleAlerta(); pintarMapa(); return; }
        }
        aviso("Este foco no tiene alerta: no superó el umbral.");
      });
      mapa.appendChild(p);
    }
  }
  $("mapa-leyenda").textContent = modo === "calor" ? "El mapa de calor marca las zonas con más casos y mayor severidad." : "Cada pin es una inspección con coordenadas. Pulsa un pin para ver su alerta.";
}

function activarAlertas() {
  var sev = $("umbral-sev"), conf = $("umbral-conf");
  function guardarUmbral() {
    estado.umbralSev = Number(sev.value);
    estado.umbralConf = Number(conf.value);
    $("umbral-conf-val").textContent = conf.value;
    $("msg-umbral").textContent = "Umbral guardado: se avisa desde severidad " + SEVERIDAD[estado.umbralSev].nombre.toLowerCase() + " con confianza de " + conf.value + " % o más.";
  }
  sev.addEventListener("change", guardarUmbral);
  conf.addEventListener("input", guardarUmbral);
  $("alertas-orden").addEventListener("change", pintarAlertas);
  var modos = document.querySelectorAll('input[name="mapa-modo"]');
  for (var i = 0; i < modos.length; i++) { modos[i].addEventListener("change", pintarMapa); }
  $("reinspeccion-fecha").min = dia(0).toISOString().slice(0, 10);
  $("btn-programar").addEventListener("click", function () {
    var a = buscarAlerta(estado.selAlerta);
    var campo = $("reinspeccion-fecha");
    var cont = campo.parentNode;
    var hoy = dia(0).toISOString().slice(0, 10);
    if (!campo.value) { cont.classList.add("invalid"); $("reinspeccion-error").textContent = "Elige una fecha para la reinspección."; return; }
    if (campo.value < hoy) { cont.classList.add("invalid"); $("reinspeccion-error").textContent = "La fecha no puede ser anterior a hoy."; return; }
    cont.classList.remove("invalid");
    var partes = campo.value.split("-");
    a.reinspeccion = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    $("msg-reinspeccion").textContent = "Reinspección programada para el " + fmt(a.reinspeccion) + ". Quedó en tu agenda.";
    pintarDetalleAlerta();
  });
}

// ---------- 4. TRATAMIENTO ----------
function pintarSelectorTratamiento() {
  var sel = $("trat-inspeccion");
  var previo = estado.tratId;
  sel.innerHTML = "";
  var cuenta = 0;
  for (var i = 0; i < estado.historial.length; i++) {
    var h = estado.historial[i];
    if (h.sev < 0 || !TRATAMIENTO[h.plaga]) { continue; }
    var o = document.createElement("option");
    o.value = h.id;
    o.textContent = h.plaga + " · " + SEVERIDAD[h.sev].nombre + " · " + fmt(h.fecha) + " · " + h.parcela;
    sel.appendChild(o);
    cuenta++;
  }
  $("trat-vacio").hidden = cuenta > 0;
  if (cuenta > 0) {
    if (!previo || !buscarInsp(previo) || buscarInsp(previo).sev < 0) { previo = Number(sel.options[sel.options.length - 1].value); }
    sel.value = previo;
    estado.tratId = previo;
  }
}

function pintarTratamiento() {
  var h = buscarInsp(estado.tratId);
  $("trat-contenido").hidden = !h;
  $("trat-registro").hidden = !h;
  if (!h) { return; }
  var t = TRATAMIENTO[h.plaga];
  $("trat-sev").className = "severity " + SEVERIDAD[h.sev].clase;
  $("trat-sev").textContent = SEVERIDAD[h.sev].icono + " Severidad " + SEVERIDAD[h.sev].nombre.toLowerCase();
  $("trat-plaga").textContent = h.plaga + " · " + nombreCultivo(h.cultivo);
  $("trat-prioridad").textContent = h.sev === 3 ? "Prioridad alta: actúa hoy y avisa a tu técnico." : (h.sev === 2 ? "Prioridad media: actúa esta semana." : "Prioridad baja: vigila y aplica manejo integrado.");
  $("trat-recomendacion").textContent = t.recomendacion;
  var mip = $("trat-mip");
  mip.hidden = h.sev !== 1;
  mip.innerHTML = "<strong>Manejo integrado para casos leves.</strong> " + t.mip + " Así reduces el uso innecesario de agroquímicos.";
  var pasos = $("trat-pasos"); pasos.innerHTML = "";
  for (var i = 0; i < t.pasos.length; i++) { var li = document.createElement("li"); li.textContent = t.pasos[i]; pasos.appendChild(li); }
  var d = $("trat-dosis"); d.innerHTML = "";
  for (var j = 0; j < DOSIS.length; j++) { var l2 = document.createElement("li"); l2.textContent = DOSIS[j]; d.appendChild(l2); }
  var adv = $("trat-advertencias"); adv.innerHTML = "";
  for (var k = 0; k < ADVERTENCIAS.length; k++) { var l3 = document.createElement("li"); l3.textContent = ADVERTENCIAS[k]; adv.appendChild(l3); }
  var est = $("trat-estados"); est.innerHTML = "";
  var tratamientos = [];
  for (var m = 0; m < h.acciones.length; m++) { if (h.acciones[m].origen === "tratamiento") { tratamientos.push(h.acciones[m]); } }
  if (tratamientos.length === 0) { est.innerHTML = "<li>Aún no registraste el tratamiento.</li>"; }
  for (var n = 0; n < tratamientos.length; n++) { var l4 = document.createElement("li"); l4.textContent = fmt(tratamientos[n].fecha) + " · " + tratamientos[n].estado + ": " + tratamientos[n].texto; est.appendChild(l4); }
  var btn = $("btn-apoyo");
  btn.className = h.sev === 3 ? "btn btn-small" : "btn btn-outline btn-small";
  $("trat-apoyo-ayuda").textContent = h.sev === 3 ? "El caso es crítico: te recomendamos pedir apoyo técnico antes de aplicar." : "Si no estás seguro, pide orientación antes de aplicar.";
}

function registrarTratamiento(pendiente) {
  var h = buscarInsp(estado.tratId);
  var campo = $("trat-accion");
  var cont = campo.parentNode;
  if (!pendiente && campo.value.trim().length < 3) { cont.classList.add("invalid"); $("trat-accion-error").textContent = "Cuenta qué hiciste para dejar evidencia."; return; }
  cont.classList.remove("invalid");
  var texto = campo.value.trim() || "Tratamiento recomendado por AgroIA";
  h.acciones.push({ fecha: new Date(), estado: pendiente ? "Pendiente" : "Realizado", texto: texto, origen: "tratamiento" });
  campo.value = "";
  $("trat-msg").textContent = pendiente ? "Marcado como pendiente. Te recordaremos mañana en tu agenda." : "Acción registrada con fecha de hoy.";
  pintarTratamiento();
}

// chat simulado en memoria (US36)
function agregarMensaje(quien, texto) {
  var log = $("chat-log");
  var d = document.createElement("div");
  d.className = "msg " + (quien === "yo" ? "msg-me" : "msg-them");
  var hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
  d.innerHTML = "";
  d.appendChild(document.createTextNode(texto));
  var s = document.createElement("small");
  s.textContent = (quien === "yo" ? "Tú" : "Técnico de campo") + " · " + hora;
  d.appendChild(s);
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}

function respuestaTecnico(texto) {
  var t = texto.toLowerCase();
  if (/cobre|fungicida|dosis|aplic/.test(t)) { return "Antes de aplicar, confirma la dosis en la etiqueta y usa guantes y mascarilla. ¿Puedes enviarme otra foto de la zona afectada?"; }
  if (/hoy|urgente|cr[ií]tic|grave/.test(t)) { return "Entendido, lo veo como prioridad. Voy a coordinar una visita a tu parcela."; }
  return "Recibido. Revisaré tu diagnóstico y te escribo en unos minutos.";
}

function enviarAlTecnico(texto) {
  setTimeout(function () { agregarMensaje("tecnico", respuestaTecnico(texto)); }, 1100);
}

function vaciarChat() {
  if (estado.chatPend.length === 0) { return; }
  var pend = estado.chatPend.slice();
  estado.chatPend = [];
  for (var i = 0; i < pend.length; i++) { enviarAlTecnico(pend[i]); }
}

function activarTratamiento() {
  $("trat-inspeccion").addEventListener("change", function () { estado.tratId = Number(this.value); $("trat-msg").textContent = ""; pintarTratamiento(); });
  $("btn-trat-guardar").addEventListener("click", function () { registrarTratamiento(false); });
  $("btn-trat-pendiente").addEventListener("click", function () { registrarTratamiento(true); });
  $("btn-apoyo").addEventListener("click", function () {
    $("chat").hidden = false;
    if (!estado.chatAbierto) {
      estado.chatAbierto = true;
      agregarMensaje("tecnico", "Hola, soy el técnico de campo de tu cooperativa. Cuéntame qué ves en la parcela.");
    }
    $("chat-texto").focus();
  });
  $("chat-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var campo = $("chat-texto");
    var texto = campo.value.trim();
    if (!texto) { return; }
    agregarMensaje("yo", texto);
    campo.value = "";
    if (estado.online) { enviarAlTecnico(texto); }
    else { estado.chatPend.push(texto); aviso("Sin conexión: el mensaje se enviará cuando recuperes la señal."); }
  });
}

// ---------- 5. COOPERATIVA ----------
function sociosFiltrados() {
  var c = $("r-campana").value, cu = $("r-cultivo").value, p = $("r-plaga").value;
  var lista = [];
  for (var i = 0; i < SOCIOS.length; i++) {
    var s = SOCIOS[i];
    if ((c && s.campana !== c) || (cu && s.cultivo !== cu) || (p && s.plaga !== p)) { continue; }
    lista.push(s);
  }
  return lista;
}

function pintarCooperativa() {
  var lista = sociosFiltrados();
  var parcelas = 0, criticos = 0, casos = 0;
  for (var i = 0; i < SOCIOS.length; i++) { parcelas += SOCIOS[i].parcelas.length; if (SOCIOS[i].sev === 3) { criticos++; } casos += SOCIOS[i].casos; }
  var alertasActivas = estado.alertas.length;
  $("kpis").innerHTML = '<div class="kpi"><strong>' + SOCIOS.length + "</strong>Socios activos</div>" +
    '<div class="kpi"><strong>' + parcelas + "</strong>Parcelas monitoreadas</div>" +
    '<div class="kpi"><strong>' + alertasActivas + "</strong>Alertas recibidas en la demo</div>" +
    '<div class="kpi"><strong>' + criticos + "</strong>Socios con casos críticos</div>";
  var tbody = document.querySelector("#tabla-socios tbody");
  tbody.innerHTML = "";
  for (var j = 0; j < lista.length; j++) {
    var s = lista[j];
    var tr = document.createElement("tr");
    var sev = SEVERIDAD[s.sev];
    tr.innerHTML = '<td><button type="button" class="link-btn" data-socio="' + SOCIOS.indexOf(s) + '">' + s.nombre + "</button></td><td>" + nombreCultivo(s.cultivo) + "</td><td>" + s.campana + "</td><td>" + (s.casos === 0 ? "Ninguna" : s.plaga) + "</td><td>" + s.casos + '</td><td><span class="severity ' + sev.clase + '">' + sev.icono + " " + sev.nombre + "</span></td>";
    tbody.appendChild(tr);
  }
  if (lista.length === 0) { tbody.innerHTML = '<tr><td colspan="6">Ningún socio coincide con los filtros.</td></tr>'; }
  var botones = tbody.querySelectorAll(".link-btn");
  for (var k = 0; k < botones.length; k++) {
    botones[k].addEventListener("click", function () { verSocio(SOCIOS[Number(this.getAttribute("data-socio"))]); });
  }
}

function verSocio(s) {
  $("socio-detalle").hidden = false;
  $("socio-nombre").textContent = s.nombre;
  $("socio-resumen").textContent = nombreCultivo(s.cultivo) + " · campaña " + s.campana + " · " + s.casos + " caso(s) de " + (s.casos === 0 ? "ninguna plaga" : s.plaga.toLowerCase()) + ".";
  var ul = $("socio-parcelas"); ul.innerHTML = "";
  for (var i = 0; i < s.parcelas.length; i++) { var li = document.createElement("li"); li.textContent = s.parcelas[i]; ul.appendChild(li); }
  $("socio-detalle").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function exportarReporte() {
  var lista = sociosFiltrados();
  var filas = ["Socio,Cultivo,Campaña,Plaga,Casos,Severidad"];
  for (var i = 0; i < lista.length; i++) {
    var s = lista[i];
    filas.push('"' + s.nombre + '",' + nombreCultivo(s.cultivo) + "," + s.campana + "," + s.plaga + "," + s.casos + "," + SEVERIDAD[s.sev].nombre);
  }
  var blob = new Blob(["﻿" + filas.join("\n")], { type: "text/csv;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url; a.download = "reporte-agroia.csv";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  $("msg-exportar").textContent = "Reporte exportado: " + lista.length + " fila(s).";
}

function activarCooperativa() {
  var ids = ["r-campana", "r-cultivo", "r-plaga"];
  for (var i = 0; i < ids.length; i++) { $(ids[i]).addEventListener("change", function () { $("msg-exportar").textContent = ""; pintarCooperativa(); }); }
  $("btn-exportar").addEventListener("click", exportarReporte);
}

// ---------- arranque ----------
document.addEventListener("DOMContentLoaded", function () {
  cargarEjemplos();
  pintarMuestras();
  activarPestañas();
  activarConexion();
  activarCamara();
  activarFoto();
  activarHistorial();
  activarAlertas();
  activarTratamiento();
  activarCooperativa();
  $("btn-analizar").addEventListener("click", analizar);
  $("btn-guardar").addEventListener("click", guardarDiagnostico);
  $("chk-gps").addEventListener("change", textoGPS);
  // lectura en voz alta del resultado (accesibilidad para personas con poca lectoescritura)
  $("btn-escuchar").addEventListener("click", function () {
    if (!("speechSynthesis" in window)) { aviso("Tu navegador no puede leer en voz alta."); return; }
    var voz = new SpeechSynthesisUtterance($("res-plaga").textContent + ". " + $("res-detalle").textContent + " " + $("res-confianza").textContent);
    voz.lang = "es-PE";
    voz.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(voz);
  });
  $("btn-ver-tratamiento").addEventListener("click", function () {
    var m = estado.resultado;
    if (!m || m.conf < 60) { return; }
    if (!estado.guardado) { guardarDiagnostico(); }
    window.irAPestaña("tab-tratamiento");
  });
  refrescar();
});
