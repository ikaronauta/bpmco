---
sidebar_position: 5
title: Información Tecnica
slug: /informacion-tecnica-materiales-icasa
---

## Materiales

<details>
  <summary>Process Request</summary>
  <div>
    Este método se encarga de ejecutar todas las acciones posteriores al flujo del proceso.<br/><br/>
    Recibe como parametro:
    <ul>
      <li>
        <b>Hashtable hsData:</b> xxxx
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
