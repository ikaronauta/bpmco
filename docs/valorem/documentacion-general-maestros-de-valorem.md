---
sidebar_position: 1
title: Documentación General Maestros de Valorem
slug: /documentacion-general-maestros-de-valorem
---
### Documentación General Maestros de Valorem

La esencia general de la mayoría de procesos de valorem, es capturar la información necesaria para que los datos de maestros queden registrados en SAP. 

Se puede entender como maestros a esos datos necesarios para que las operaciones y transacciones en SAP (compras, ventas, insumos, recursos humanos entre otros) funcionen de manera correcta. 

Valorem administra muchos de esos maestros a través del sistema de procesos, al estar enmarcado en unas generalidades. El 90% de los procesos tienen una base establecida y funcionan de la misma forma. 

Todos los procesos de Valorem son multi empresa, esto significa que muchas compañías pueden solicitar maestros y tienen particularidades según su actividad económica.  Dentro de esas empresas hay unas divisiones por sociedades, por lo que tenemos como una asociación general por empresa (el número inicial) y unas sociedades con un código único:

_Tablas Proceso de Valorem_

![Tablas Proceso de Valorem](/assets/valorem/tablas-proceso-valorem.png "Tablas Proceso de Valorem")

Teniendo eso presente, las sociedades tienen algunas lógicas particulares, campos que aplican, que no aplican, entre otras cosas, estas condiciones se dan en los 4 principales maestros: **Acreedores, Deudores, Materiales y Activos Fijos**.

El flujo de casi todos los procesos tiene un esquema general:

_Diagrama BPMN Datos Maestros de Valorem_

![Diagrama BPMN Datos Maestros de Valorem](/assets/valorem/diagrama-datos-maestros.png "Diagrama BPMN Datos Maestros de Valorem")

Primero se realiza la solicitud del maestro, luego en algunos casos (Reglas por Sociedad) se dispara una actividad de visto bueno. Si todo está correcto pasa a la revisión del equipo de datos maestros. Luego de estos hacer su revisión, se realiza la creación en SAP y esta puede ser automática (para algunos procesos) o manual (mediante una plantilla de Excel).

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 27 de Enero de 2023</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Santiago Correa R / Cristian Cantillo</b>
    </i>
  </small>
</div>