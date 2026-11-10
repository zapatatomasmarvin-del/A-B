/**
 * ==========================================================================
 *  TALLER ZZ — INFRAESTRUCTURA VISUAL
 *  Página del mapa A→B: lectura, formulario de seis preguntas y armado
 *  de la acción. Sin archivos: la respuesta viaja por WhatsApp.
 *
 *  El bloque III arma el punto B combinando lo que el prospecto respondió:
 *    la frase de P1 + la prueba de A2 + el activo de P2 + el proyecto de P3
 * ==========================================================================
 */

(() => {
  "use strict";

  const WHATSAPP = "5491158380925";

  const CAMPOS = [
    { id: "a1", etiqueta: "A1 · Cómo te ve el mercado hoy", grupo: "PUNTO A" },
    { id: "a2", etiqueta: "A2 · Qué prueba podés mostrar hoy", grupo: "PUNTO A" },
    { id: "a3", etiqueta: "A3 · Qué te falta para que te contraten", grupo: "PUNTO A" },
    { id: "p1", etiqueta: "P1 · Lo que querés que digan de vos en un año", grupo: "EL PUENTE" },
    { id: "p2", etiqueta: "P2 · El activo que todavía no usás", grupo: "EL PUENTE" },
    { id: "p3", etiqueta: "P3 · El proyecto que podés fotografiar esta semana", grupo: "EL PUENTE" }
  ];

  const ACCIONES = ["Retrato de autoridad", "Plano de contexto", "Detalle de oficio", "Imagen de prueba"];

  const botonCopiar = document.getElementById("copiar");
  const botonWhatsApp = document.getElementById("enviar-wa");
  const avisoCopiado = document.getElementById("copiado");
  const contenedorCierre = botonCopiar.closest(".cierre");

  const respuestas = {};
  let panel = null;

  /* ========================================================================
     1. Panel de respuestas
     ======================================================================== */

  function crearPanel() {
    panel = document.createElement("div");
    panel.className = "panel";
    panel.hidden = true;

    const titulo = document.createElement("p");
    titulo.className = "panel-titulo";
    titulo.textContent = "Tus respuestas";
    panel.appendChild(titulo);

    let grupoActual = null;

    CAMPOS.forEach((campo) => {
      if (campo.grupo !== grupoActual) {
        grupoActual = campo.grupo;
        const encabezado = document.createElement("p");
        encabezado.className = "panel-grupo";
        encabezado.textContent = campo.grupo;
        panel.appendChild(encabezado);
      }

      const fila = document.createElement("label");
      fila.className = "panel-campo";

      const etiqueta = document.createElement("span");
      etiqueta.className = "panel-etiqueta";
      etiqueta.textContent = campo.etiqueta;

      const entrada = document.createElement(campo.id === "p2" ? "select" : "textarea");
      entrada.className = "panel-entrada";
      entrada.rows = campo.id === "p2" ? 1 : 2;

      if (campo.id === "p2") {
        const vacia = document.createElement("option");
        vacia.value = "";
        vacia.textContent = "Elegí el que está en cero…";
        entrada.appendChild(vacia);
        ACCIONES.forEach((accion) => {
          const opcion = document.createElement("option");
          opcion.value = accion;
          opcion.textContent = accion;
          entrada.appendChild(opcion);
        });
      }

      entrada.addEventListener("input", () => {
        respuestas[campo.id] = entrada.value.trim();
        actualizar();
      });

      fila.appendChild(etiqueta);
      fila.appendChild(entrada);
      panel.appendChild(fila);
    });

    const salida = document.createElement("div");
    salida.className = "panel-salida";
    salida.id = "panel-salida";
    panel.appendChild(salida);

    const acciones = document.createElement("div");
    acciones.className = "panel-acciones";

    const copiar = document.createElement("button");
    copiar.className = "boton boton-linea";
    copiar.type = "button";
    copiar.textContent = "Copiar mi respuesta";
    copiar.addEventListener("click", () => copiarRespuesta());

    acciones.appendChild(copiar);
    panel.appendChild(acciones);

    contenedorCierre.insertBefore(panel, contenedorCierre.querySelector(".cierre-acciones"));
    return panel;
  }

  /* ========================================================================
     2. El punto B: la acción que combina las respuestas
     ======================================================================== */

  function textoRespuesta() {
    const linea = (etiqueta, valor) => `${etiqueta}: ${valor || "—"}`;
    return [
      "PUNTO A",
      linea("Cómo me ve el mercado hoy", respuestas.a1),
      linea("Qué prueba puedo mostrar", respuestas.a2),
      linea("Qué me falta para que me contraten", respuestas.a3),
      "",
      "EL PUENTE",
      linea("Lo que quiero que digan de mí en un año", respuestas.p1),
      linea("El activo que no uso", respuestas.p2),
      linea("El proyecto que puedo fotografiar esta semana", respuestas.p3),
      "",
      "MI ACCIÓN",
      `${respuestas.p2 || "[activo]"} de ${respuestas.p3 || "[proyecto]"}, para sostener ${respuestas.p1 || "[frase]"}. Esta semana.`
    ].join("\n");
  }

  function actualizar() {
    // La acción, en vivo
    const salida = document.getElementById("panel-salida");
    if (salida) {
      salida.innerHTML = "";
      const kicker = document.createElement("p");
      kicker.className = "accion-kicker";
      kicker.textContent = "Tu acción";

      const linea = document.createElement("p");
      linea.className = "accion-linea";
      linea.textContent =
        `${respuestas.p2 || "[activo]"} de ${respuestas.p3 || "[proyecto]"}, ` +
        `para sostener ${respuestas.p1 || "[frase]"}. Esta semana.`;

      salida.appendChild(kicker);
      salida.appendChild(linea);
    }

    // El botón de WhatsApp ya lleva las respuestas escritas
    if (botonWhatsApp) {
      botonWhatsApp.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(textoRespuesta())}`;
    }
  }

  function copiarRespuesta() {
    const texto = textoRespuesta();
    const avisar = () => {
      avisoCopiado.hidden = false;
      avisoCopiado.textContent = "Respuesta copiada. Pegala por mensaje privado.";
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(avisar).catch(() => fallback(texto, avisar));
    } else {
      fallback(texto, avisar);
    }
  }

  function fallback(texto, avisar) {
    const area = document.createElement("textarea");
    area.value = texto;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); avisar(); } catch (error) { /* noop */ }
    document.body.removeChild(area);
  }

  /* ========================================================================
     3. Arranque
     ======================================================================== */

  botonCopiar.addEventListener("click", () => {
    if (!panel) crearPanel();
    panel.hidden = !panel.hidden;
    botonCopiar.textContent = panel.hidden ? "Preparar mi respuesta" : "Ocultar el formulario";
    if (!panel.hidden) actualizar();
  });

  actualizar();
})();
