---
sidebar_position: 2
title: Información Tecnica Cs
slug: /informacion-tecnica-cs-materiales-icasa
---

## Process Request

<details>
  <summary>Process Request</summary>
  <div>
    Este método se encarga de ejecutar todas las acciones posteriores al flujo del proceso.<br/><br/>
    Recibe como parametro:
    <ul>
      <li>
        <b>Hashtable hsData:</b> Información del formulario guardada en base de datos.
      </li>
      <li>
        <b>string sol_id:</b> Número de la solicitud.
      </li>
      <li>
        <b>string solAsunto2:</b> Id del asunto de la actividad.
      </li>
      <li>
        <b>string usuCodigo:</b> Código del usuario que genero la solicitud.
      </li>
      <li>
        <b>string procesoId:</b> Id del proceso.
      </li>
      <li>
        <b>string mail_solicitante:</b> Correo electrónico del solicitante.
      </li>
      <li>
        <b>string proType:</b> Cadena de texto que especifica si es “Creación”, “Extensión” ….
      </li>
    </ul>
  </div>

  <br/>

  <div>
    <details>
      <summary>Registrar Solicitud</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarSolicitud)</code>
      </pre>
      <div>
        <details>
          <summary>Si la anterior condición se cumple:</summary>
          <p></p>
          <pre>
            <code>if (Utilidades.getValue(hsData, "80TSUBPROCESOS") == "" && (accion == "CREAR" || accion == "EXTENDER"))</code>
          </pre>
          <div>
            <details>
              <summary>Si la anterior condición se cumple:</summary>
              <pre>
                <code>if(Utilidades.getValue(hsData, "80EXT_STORAGE") != "SI")</code>
              </pre>
              <p>Por último, si se cumple esta condición se lanza el método encargado de generar Subprocesos y se le pasa por parámetro el número de la solicitud, el id del proceso y los datos traídos de la base de datos en el HashTable.</p>
              <pre>
                <code><a href="#generar-subprocesos">generarSubprocesos(sol_id, procesoId, hsData)</a></code>
              </pre>
            </details>
          </div>
        </details>
      </div>
      <div>
        <details>
          <summary>De lo contrario</summary>
            <pre>
              <code>if (<a href="#validar-reapertura-padre">validarReaperturaPadre(hsData, procesoId)</a>)</code>
            </pre>
            <div>
              <details>
                <summary>Si la anterior condición se cumple:</summary>
                <p>Se saca la información del TAG "80TASUIDPADRE" y se guarda en la variable <b>string asuId</b> y si esta variable es diferente a vacío se lanza el método para reabrir la actividad y se le pasa el <b>string asuId</b>, el id del proceso y la información traída de la base de datos.</p>
                <pre>
                  <code><a href="#reabrir-actividad-flujo">reabrirActividadFlujo(asuId, procesoId, hsData)</a></code>
                </pre>
              </details>
            </div>
            <pre>
              <code>if (Utilidades.getValue(hsData, "90TMCOLS") == "" && Utilidades.getValue(hsData, "91TMCOLS") == "")</code>
            </pre>
            <div>
              <details>
                <summary>Si la anterior condición se cumple:</summary>
                <p>Se lanza el método que genera el flujo y se le pasa como parámetro el número de solicitud, el id del proceso, el id del asunto de la actividad y los datos traídos de la base de datos.</p>
                <pre>
                  <code><a href="#generar-flujo">generarFlujo(sol_id, procesoId, asunto2, hsData)</a></code>
                </pre>
              </details>
            </div>
            <pre>
              <code>if (Utilidades.getValue(hsData, "80R2").ToUpper() == "MODIFICAR" && Utilidades.getValue(hsData, "80TMODBASICDATA") == "SI")</code>
            </pre>
            <div>
              <details>
                <summary>Si la anterior condición se cumple:</summary>
                <p>Se lanza el método que genera la tarea de aprobación de vicepresidencia y se le pasa como parámetro el id del proceso y los datos traídos de la base de datos.</p>
                <pre>
                  <code><a href="#generar-aprobación-vicepresidencia">generarAprobacionVicepresidencia(procesoId, hsData)</a></code>
                </pre>
              </details>
            </div>
        </details>
      </div>
    </details>
  </div>

  <div>
    <details>
      <summary>Aprobación Vicepresidencia</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.AprobacionVicepresidencia)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Datos Planificación Base</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarDatosPlanificacionBase)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Datos Impuestos</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarDatosImpuestos)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Planificación Producción</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarPlanificacionProduccion)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Planificación Contabilidad</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarPlanificacionContabilidad)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Planificación Compras</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarPlanificacionCompras)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Datos Calidad</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarDatosCalidad)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Información Costos</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarInformacionCostos)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Información Ventas</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarInformacionVentas)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Registrar Información Almacenamiento</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RegistrarInformacionAlmacenamiento)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Realizar Validacion Técnica</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RealizarValidacionTecnica)</code>
      </pre>
    </details>
  </div>

  <div>
    <details>
      <summary>Revisar Crear SAP</summary>
      <pre>
        <code>if (asunto2 == (int)ASUNTOS.RevisarCrearSAP)</code>
      </pre>
    </details>
  </div>
</details>

---

## Generar Subprocesos

Lógica para generar subprocesos.

---

## Validar Reapertura Padre

Lógica reapertura padre.

---

## Reabrir Actividad Flujo

Lógica para reabrir actividad flujo.

---

## Generar Flujo

Lógica para generar flujo.

---

## Generar Aprobación Vicepresidencia

Lógica para generar aprobación vicepresidencia.

---