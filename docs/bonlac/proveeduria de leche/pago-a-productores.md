---
sidebar_position: 7
title: Pago a Productores
slug: /pago-a-productores
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

### Pago a productores :moneybag:

El pago a los productores se realiza de manera quincenal, del día 11 al 25 del mes actual y del día 26 al 10 del siguiente mes. Por ejemplo, el pago del mes de Noviembre, la primera quincena sería del 10/11/2022 al 25/11/2022 y la segunda sería del 26/11/2022 hasta el 10/12/2022.

:::danger
El pago depende directamente de las actividades de verificación de facturas, por lo cual es muy importante que todos los procesos y documentos de pago estén generados.
:::

Para realizar el pago, el sistema cuenta con un reporte que genera todas las estadísticas con los valores a pagar y calcula los incentivos quincenales. Estos se generan en SAP y se envían los correos de comprobante a los productores. 

:::tip
Dar click [**aqui**](http://bonlac.bpmco.co/reportes/bonlac/infov_facturas.aspx "Autenticación Proveeduría de Leche") para ver el reporte
:::

_Informe de Pago_

![Informe de Pago](/assets/proveeduria/informe-pagos.png "Informe de Pago")

:::info
Se deben tener en cuenta varias cosas con este reporte: 

- La información se cargará directamente de los datos de las actividades de verificación de facturas 

- Este reporte está directamente ligado con los planes de pago de los proveedores 

- Algunos incentivos se calculan de manera quincenal, por lo que las fechas deben ser en las quincenas mencionadas anteriormente 

- El reporte guarda un histórico de pago que se calcula una vez esté la quincena finalizada y pagada, con esto si se pueden consultar meses completos o filtros de fecha diferentes a quincenales

- El botón recalcular quincena se usa para los datos históricos en caso tal si alguna información no quedó correctamente guardada
:::

Cuando la quincena está completa, el personal de Bonlac se encarga de verificar el reporte, analizar los valores y generar los incentivos quincenales en **SAP**. 

Recientemente, con unos cambios en los planes de pago de algunos productores, los incentivos de Grasa y Otros sólidos que antes se pagaban de manera diaria y por tanque, ahora se pagan de manera quincenal y por promedio. 

Toda la lógica del cálculo del reporte parte desde el método getDatosInfoVFacturas, que se encuentra en archivo **c#** del reporte.

_Función getDatosInfoVFacturas_

![funcion getDatosInfoVFacturas](/assets/proveeduria/getDatosInfoVFacturas.png "Función getDatosInfoVFacturas")

#### Incentivos Quincenales :money_with_wings:

No todas las fincas cuentan todos los incentivos, esto depende del plan de pagos.

:::caution No todas las fincas cuentan todos los incentivos, esto depende del plan de pagos.

<Tabs>
  <TabItem value="productividad" label="Productividad">Este incentivo se basa en el promedio de leche vendida durante la quincena, si está en el umbral según el plan de pagos, gana una bonificación.</TabItem>
  <TabItem value="celulas-somaticas" label="Células Somáticas (CCS)">Este incentivo se basa en el registro de conteo de células somáticas que realizan los inspectores por quincena, desde la aplicación (en la parte de gestión de fincas se habla del tema). Si está en el umbral según el plan de pagos, gana una bonificación.</TabItem>
  <TabItem value="grasa" label="Grasa">Este incentivo toma como promedio las mediciones de grasa durante la quincena. Si está en el umbral según el plan de pagos, gana una bonificación.</TabItem>
  <TabItem value="otros-solidos" label="Otros Sólidos">Este incentivo toma como promedio las mediciones de otros sólidos durante la quincena. Si está en el umbral según el plan de pagos, gana una bonificación.</TabItem>
  <TabItem value="apoyo-temporal" label="Apoyo Temporal">Este no es un incentivo, es una ayuda temporal para algunas fincas. Quien lo tenga, el valor es fijo.</TabItem>
</Tabs>

:::

El sistema calcula los valores de incentivos y muestra una tabla completa, para que sean aprobados y generados los incentivos en **SAP**:

_Tabla Incentivos_

![Tabla Incentivos](/assets/proveeduria/tabla-incentivos.png "Tabla Incentivos")

El código que genera estos incentivos en SAP parte del método **prepararGeneracionDocumentosIncentivo**, que se encuentra en archivo **c#** del reporte.

_Función prepararGeneracionDocumentosIncentivo_

![Funcion prepararGeneracionDocumentosIncentivo](/assets/proveeduria/prepararGeneracionDocumentosIncentivos.png "Función prepararGeneracionDocumentosIncentivo")

Con esta información validada en SAP, estaría completas las cuentas por pagar para los proveedores de Leche. Una persona de tesorería en este caso se encargará generar los pagos. 

Una vez está listo el pago, falta la comunicación del pago a los productores. Para esto se usa la opción Enviar correos de pago:

_Opción Enviar Correos de Pago_

![Opcion Enviar Correos de Pago](/assets/proveeduria/enviar-correos-pagos.png "Opción Enviar Correos de Pago")

![Opcion Enviar Correos de Pago](/assets/proveeduria/enviar-correos-pagos2.png "Opción Enviar Correos de Pago")

Al hacer doble click sobre la columna de comentarios, se abre un modal donde se adjuntan los comprobantes de pago del banco, también se pueden agregar descuentos u otros pagos que no están automatizados y finalmente unos comentarios adicionales si fuera el caso:


_Modal de Pagos_

![Modal de Pagos](/assets/proveeduria/modal-pagos.png "Modal de Pagos")

Luego se captura el detalle del pago y se envía el correo al productor con toda esta información, los documentos adjuntos y el comprobante de pago. 

Toda esta lógica de envío del correo parte del método **enviarCorreoPdfPago**, que se encuentra en archivo **c#** del reporte.

_Método enviarCorreoPdfPago_

![Metodo enviarCorreoPdfPago](/assets/proveeduria/enviarCorreoPdfPago.png "Método enviarCorreoPdfPago")

Con esto queda finalizado el proceso de pago, este proceso se repite cada quincena. 

:::info
Para todo el tema de los planes de pago, ver la información en el siguiente [**video**](http://143.198.186.246/moodle/mod/page/view.php?id=57 "Acceso a Moodle de BPMco")
:::

Las tablas que se usan para los planes de pago son estas:

_Diagrama Plan de Pagos Lecheros_

![Diagrama Plan de Pagos Lecheros](/assets/proveeduria/diagrama-plan-pagos-lecheros.png "Diagrama Plan de Pagos Lecheros")

:::info
Existe un reporte donde se pueden consultar esos planes de pago. Dar click [**aquí**](http://bonlac.bpmco.co/procesos/reportaspx?lkid=342 "Autenticación Proveeduría de Leche") para ver dicho reporte
:::

:::info
El siguiente video es sobre información técnica para el Proyecto Proveeduría de Leche.
:::

<iframe
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/t12OLFwRlgw"
  title="Plan de Pagos Lecheros" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
>
</iframe>

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 16 de Enero de 2023</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Santiago Correa R / Cristian Cantillo</b>
    </i>
  </small>
</div>