---
sidebar_position: 5
title: Proceso SAP
slug: /proceso-sap
---

## Descripción del Proceso

Este proceso mantiene el inventario de Leche actualizado en SAP y crea las cuentas por pagar para los productores, se generan procesos por cada proveedor al que acopiaron leche en la [ruta](./informacion-general-proveeduria-de-leche.md#rutas).

_Diagrama de proceso SAP_
![Diagrama de Proceso SAP](/assets/proveeduria/proceso-sap.png "Diagrama de Proceso SAP")

:::danger Importante
Todas estas actividades son registradas por el sistema de manera automática.  

Solo se debe tener intervención de un usuario si se genera algún tipo de error al momento de llevar los datos a SAP.
:::

***

### Orden de Compra

Cada mes la empresa crea una orden de compra para cada [finca](./informacion-general-proveeduria-de-leche.md#fincas)) con su número de SAP como proveedor de forma manual por medio de SAP, basados en los datos históricos del mes al que se va a generar la orden de compra, por ejemplo, si se va a crear la orden de compra para el mes de marzo de 2022 se basan en el registro del mes de marzo del año anterior, de esta manera generan la orden de compra según la cantidad de leche que produjo esta [finca](./informacion-general-proveeduria-de-leche.md#fincas)) en el año anterior.  

El sistema cuenta con un módulo para sincronizar los pedidos de Leche, como se muestra en la siguiente imagen.

*Formulario Sincronizar Pedidos de Leche*
![Formulario sincronizar pedidos de leche](./sincronizar-pedidos-de-leche.PNG "sincronizar pedidos de leche")

:::info
La tarea de manera automática busca la orden de comprar según la [finca](./informacion-general-proveeduria-de-leche.md#fincas)).
:::

*Formulario Orden de Compra*
![Formulario Orden de Compra](./formulario-orden-de-compra.png "Sincronizar Orden de Compra")

#### Información Técnica Orden de Compra Leche

Esta actividad busca la orden de compra en la base de datos para un proveedor específico. Las órdenes de compra se crean manualmente en SAP por mes, el personal de proveeduría lo sincroniza y quedan disponibles para el proceso. Esta actividad se genera automáticamente y sólo queda abierta si el sistema no encuentra una orden de compra sincronizada.  86 es el código del proceso.

*Detalles Orden de Compra*
![Detalles Orden de Compra](/assets/proveeduria/orden-compra-detalles.png "Detalles Orden de Compra")

El Id del formulario de esta actividad es el **88** y la plantilla es **p81_f8**

Se utiliza el formulario de tablas y componentes del **DHTMLX**

***

### Entrada de Leche

Con el numero de la orden de compra obtenido en la tarea anterior se genera esta tarea la cual compara la cantidad esperada de leche que iba a entrar acuerdo la orden de compra con la cantidad real que ingreso acuerdo la *Lectura Flujómetro* y se hace la actualización de los valores del inventario en ***SAP***.

:::info
Esta tarea se hace por ***Tanque*** a diferencia de la tarea anterior que se hace por ***[Finca](./informacion-general-proveeduria-de-leche.md)***.
:::

Cuando finalizan todas las entradas de leche de una [ruta](./informacion-general-proveeduria-de-leche.md#rutas), se efectúa la salida por merma, con la cantidad de litros que se calcularon entre lo acopiado y lo registrado por el flujómetro, así en SAP queda el inventario real de leche.

:::info
El registro se hace de manera automática en SAP con la cantidad total de litros recogidos en la [Finca](./informacion-general-proveeduria-de-leche.md#fincas)).
:::

*Formulario Entrada de Leche*
![Formulario Entrada de Leche](./formulario-entrada-de-leche.png "Formulario Entrada de Leche")

#### Información Técnica Entrada de Leche

Esta actividad se encarga de generar las entradas automáticamente en SAP por cada tanque de leche; si existe algún error, la actividad quedará abierta. **86** es el código del proceso.

*Generación Entrada de Leche*
![Generación Entrada de Leche](/assets/proveeduria/generacion-entrada-leche.png "Generación Entrada de Leche")

El Id del formulario de esta actividad es el **92** y la plantilla es **p81_f10**

Se utiliza el formulario de tablas y componentes del **DHTMLX**

***

### Verificación de Facturas

El sistema lleva la información a SAP de los incentivos para cada [finca](./informacion-general-proveeduria-de-leche.md#fincas)) basados en los resultados de las ***[Pruebas Físico Químicas](./ejecucion-de-ruta.md)*** y ***[Prueba de Microbiología](./ejecucion-de-ruta.md)*** que determinan el nivel de calidad de la leche y se generan unos documentos de contabilización.

*Formulario Verificación de Facturas*
![Formulario Verificación de Facturas](./formulario-verificacion-de-facturas.png "Formulario Verificación de Facturas")

Esta actividad se encarga de generar las verificaciones de facturas automáticamente en SAP por el total de leche y también genera un documento por los incentivos ganados. Si existe algún error, la actividad queda abierta. **86** es el código del proceso.

El formulario muestra el cálculo de los incentivos, el valor total a cancelar. Se puede visualizar también el documento de verificación de factura por el valor de los litros de leche y otro documento por el valor de los incentivos como también los documentos de pago.

Estos documentos dejan en SAP la cuenta pendiente por pagar para los productores de leche, la cual se paga cada quincena.

Con esto, el proceso de acopio de leche queda cubierto desde la planificación de la leche, hasta su pago, pero todavía se tienen otros procedimientos y métodos que complementan este robusto proyecto.

***

## Update

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 27 de Diciembre de 2022.</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Santiago Correa R</b>
    </i>
  </small>
</div>