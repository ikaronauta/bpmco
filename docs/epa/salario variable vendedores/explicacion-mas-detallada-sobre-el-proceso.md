---
sidebar_position: 3
title: Explicación Más Detallada Sobre El Proceso
slug: /explicacion-mas-detallada-sobre-el-proceso
---

## General

### Ventas

Las ventas se procesan con el método `e_EPA.ajax_p600.copyVentasSAP` tomando las ventas de la tabla `S924` para el periodo anterior y las organizaciones de ventas parametrizadas en `SalarioVariable/VendedorOrgVentas` en el archivo de configuración.

De la tabla `S924` se toman los campos:

- `NETWR` Valor de la venta
- `VKORG` organización de ventas
- `VTWEG` canal de ventas
- `VKGRP` zona de ventas
- `PROVG` grupo de materiales
- `SPBUP` periodo YYYYMM

:::tip
El periodo anterior se calcula restando 5 días al día actual, por lo que este método debe ser invocado entre los primeros 5 días de cada mes para que tome las ventas del mes anterior.
Estas ventas se insertan en la tabla `frm_epa_sv_S924` y se invoca el procedimiento almacenado (SP) [`pro_frm_epa_sv_procesarVentasSAP`](./anexos#pro_frm_epa_sv_procesarVentasSAP) para el período anterior.
En el SP se realiza el siguiente proceso:
:::

1. Se limpia los datos de la venta

2. Se eliminan las ventas de la tabla `frm_epa_sv_ventasRes` para el periodo anterior.

3. Se insertan los nuevos datos en la tabla `frm_epa_sv_ventasRes` sumando la venta agrupando por organización de ventas, grupo de materiales y zona de ventas.

4. Se eliminan las ventas de la tabla `frm_epa_sv_ventasFamiliaRes` para el periodo anterior.

5. Puesto que la comisión no sólo tiene en cuenta la venta total por zona sino también por familias de productos, también se insertan los nuevos datos en la tabla `frm_epa_sv_ventasFamiliaRes` sumando la venta agrupando por organización de ventas, grupo de materiales, zona de ventas y por familia de producto.

   Para determinar la familia del producto se enlaza contra las tablas `frm_epa_sv_FamiliaGrupoMateriales` y `frm_epa_sv_FamiliaGrupoMateriales`.

   - En `frm_epa_sv_familiaProductos` se describe la familia, si está activa (estado) y que canales se deben tener en cuenta (canales separados por coma o vacío para tenerlos todos en cuenta).
   - En `frm_epa_sv_FamiliaGrupoMateriales` se registran los grupos de materiales que componen la familia.

6. Al final se trunca la tabla `frm_epa_sv_S924`.

### Devoluciones

Las devoluciones se procesan con el método `e_EPA.ajax_p600.copyDevolucionesSAP` tomando las devoluciones de la tabla `ZVVBRP` para el periodo anterior y las organizaciones de ventas parametrizadas en SalarioVariable/VendedorOrgVentas en el archivo de configuración.

Adicionalmente se filtran las devoluciones con `SHKZG = 'X' AND VKAUS <> ''`

De la tabla `ZVVBRP` se toman los campos:

- `NETWR` Valor de la devolución
- `VKORG_AUFT` organización de ventas
- `VKGRP` zona de ventas
- `KUNAG` código SAP del cliente
- `PROVG` grupo de materiales
- `ERDAT` fecha YYYYMMDD
- `VKAUS` Motivo de devolución

:::tip
El periodo anterior se calcula restando 5 días al día actual, por lo que este método debe ser invocado entre los primeros 5 días de cada mes para que tome las ventas del mes anterior.

`ajax_plantillas.ajaxMethodStr('e_EPA.ajax_p600.copyVentasyDevolucionesSAP2', ["'0900','1500','0850'", "2022", "08"]);`
:::

Estas ventas se insertan en la tabla `frm_epa_sv_dev_ZVEN` y se invoca el SP [`pro_frm_epa_sv_dev_procesarDevolucionSAP`](./anexos#pro_frm_epa_sv_dev_procesardevolucionsap) para el período anterior.

En el SP se realiza el siguiente proceso:

1. Se limpia los datos de la devolución.
2. Se eliminan las devoluciones de la tabla `frm_epa_sv_dev_devolucionRes` para el periodo anterior.
3. Se insertan los nuevos datos en la tabla `frm_epa_sv_dev_devolucionRes` sumando la devolución agrupando por canal, grupo de materiales y zona de ventas y filtrando sólo las causales de devolución incluidas en la tabla `frm_epa_sv_dev_causas`.
   El canal se toma de enlazar con la tabla `frm_epa_sv_zona` por la zona de ventas.
4. Se eliminan las devoluciones de la tabla `frm_epa_sv_me_dev_devolucionClienteRes` para el periodo anterior.
5. Puesto que las devoluciones también se tienen en cuenta en el proceso de Salario Variable para Mercaderistas, también se insertan los nuevos datos en la tabla `frm_epa_sv_me_dev_devolucionClienteRes` sumando la devolución agrupando por cliente.
6. Al final se trunca la tabla `frm_epa_sv_dev_ZVEN`.

## Cálculo de la comisión por zona

El cálculo de la comisión por zona se realiza en el SP [`pro_frm_epa_sv_recalcularCumplimientoComisionMacrozona`](./anexos#pro_frm_epa_sv_recalcularCumplimientoComisionMacrozona) en conjunto con el cálculo de la comisión para las macrozonas.

En este procedimiento primero se determinan las macrozonas y los períodos que no han sido liquidados cada una.

Los períodos no liquidados son los que tienen datos de ventas `frm_epa_sv_ventasRes` para las zonas `frm_epa_sv_macrozona_zona` y macrozonas `frm_epa_sv_macrozona` activas `estado = 1` pero no tienen una liquidación de comisión `frm_epa_sv_comision` aprobada `nomina IS NOT NULL`.

Posteriormente se hace un ciclo por cada tupla MACROZONA, AÑO, MES para ejecutando los siguientes procesos:

### Cálculo del cumplimiento

En el SP [`pro_frm_epa_sv_calcularCumplimientoZonas`](./anexos#pro_frm_epa_sv_calcularCumplimientoZonas) se calcula el porcentaje de cumplimiento (ventas sobre presupuesto) de cada una de las zonas, familias de productos y por cada uno de los perfiles que componen la zona.

Se crea un registro en la tabla `frm_epa_sv_comision` por cada zona de ventas, familia de producto, año y mes, y se calculan los campos de ventas, presupuesto, cumplimiento, cumplimiento sin penalización (por devoluciones), perfil del empleado (vendedor, ayudante, etc) y tabla que le aplicará para calcular la comisión.

El id de usuario se deja en NULO pues este lo asignará el jefe de ventas al iniciar el proceso de aprobación.

El campo comisión se deja NULO para indicar que la comisión está siendo calculada y no ha sido aprobada.

**Tablas asociadas**

- En la tabla `frm_epa_sv_comision` se insertan los registros que contendrán al final de la ejecución de cada paso la comisión por año, mes, perfil, zona y familia.
- Las ventas se toman de la tabla `frm_epa_sv_ventasFamiliaRes`.
- El presupuesto de la tabla `frm_epa_sv_presupuesto`.
- Las zonas incluidas en una macrozona de la tabla `frm_epa_sv_macrozona_zona`.
- Los perfiles que se liquidan por zona y la tabla de liquidación con que se calcula la comisión están en la tabla `frm_epa_sv_zonaParam`.
- Los perfiles y las tablas de liquidación se explican ampliamente en el cálculo de la comisión.

### Cálculo de la devolución

En el SP [`pro_frm_epa_sv_dv_calcularDevolucionZonas`](./anexos#pro_frm_epa_sv_dv_calcularDevolucionZonas) se determina la devolución, el porcentaje de devolución con respecto a las ventas y la penalidad que conlleva dicho porcentaje de devolución.

La penalización por devolución solo aplica para Vendedores, para ningún otro perfil por zona.

Este cálculo primero limpia los cálculos previos que se hayan hecho con respecto a la devolución en la tabla `frm_epa_sv_comision`, poniendo en nulo los campos de devolución, porcentaje de devolución, penalización por devolución y asignando al campo cumplimiento el valor del cumplimiento son penalización.

Posteriormente, actualiza en la tabla `frm_epa_sv_comision` el valor de las devoluciones y el porcentaje de devolución a partir de la tabla `frm_epa_sv_dev_devolucionRes` y del campo ventas calculado en el procedimiento de Cálculo del cumplimiento.

Finalmente, se asigna la penalización por la penalidad de acuerdo al porcentaje de devolución y el canal de la venta.

**Tablas asociadas**

- En la tabla `frm_epa_sv_comision` quedan calculados los datos de la devolución (devolucion, devolucionPorc, devolucionPenal)
- En la tabla `frm_epa_sv_dev_devolucionRes` están las devoluciones por zona.
- Las zonas incluídas en una macrozona de la tabla `frm_epa_sv_macrozona_zona`.
- En la tabla `frm_epa_sv_FamiliaGrupoMateriales` se definen los grupos de comisión que pertenecen a cada familia y si estos (gruDevolucionActivo) se tienen en cuenta en la devolución.
- En la tabla `frm_epa_sv_familiaProductos` se indica si la familia está activa (estado) y si se tiene en cuenta para devolución (devolucion).
- En la tabla `frm_epa_sv_dev_devolucionTabla` se define el canal para el cual aplica la penalización de la devolución.
- En la tabla `frm_epa_sv_dev_devolucionParam` se define la penalidad de acuerdo al porcentaje de devolución con respecto a la venta.

### Cálculo de la comisión

El cálculo de la comisión se realiza en el SP [`pro_frm_epa_sv_calcularComisionZonas`](./anexos.md#pro_frm_epa_sv_calcularComisionZonas).

Primero limpia la comisión si hubiese una calculada (comision) y posteriormente calcula la comisión de acuerdo a la tabla de comisión por cumplimiento por familia `frm_epa_sv_comisionParam` para cada zona, familia de producto y perfil de empleado.

Posteriormente inserta un registro que representa el resumen de la comisión de todas las familias para la zona y perfil (dejando en nulo el campo famProd), sumando las ventas, presupuesto y devoluciones, calculando el cumplimiento total por zona (ventas por zona sobre presupuesto por zona).

En este registro se calcula la comisión final que es la comisión sin penalización menos el porcentaje de descuento máximo entre los que se calcularon en el Cálculo de la devolución.

Finalmente, si la comisión es CERO se tiene una comisión por venta que se registra en la familia de productos TOTAL `id igual a 7`, la venta mínima está definida en la tabla de comisión por venta `frm_epa_sv_comisionTabla` y el valor de la comisión debe estar en la tabla de rangos de la comisión por venta `frm_epa_sv_comisionParam` con el rango mínimo igual a -1 y máximo igual a -1.

**Tablas asociadas**

- `frm_epa_sv_comision` Queda el registro final de la comisión, un registro por cada zona, familia de productos, perfil de empleado y un registro en que se totaliza la comisión, la penalización por devoluciones y si no se obtuvo comisión por el cumplimiento normal, la comisión por venta mínima.
- Las zonas incluidas en una macrozona de la tabla `frm_epa_sv_macrozona_zona`.
- `frm_epa_sv_zonaParam` Se definen por zona los perfiles que aplican para dicha zona y con qué tabla de comisión se debe hacer realizar el cálculo.
- `frm_epa_sv_perfiles` La descripción de cada perfil que puede ser liquidado en el proceso, por ejemplo, VENDEDOR, AYUDANTE, JEFE DE VENTAS o DIRECTOR DE VENTAS.
- `frm_epa_sv_comisionTabla` la definición de la tabla de comisión que se registran para cada zona en la tabla `frm_epa_sv_zonaParam`.
- `frm_epa_sv_comisionParam` los valores de comisión por rango de cumplimiento en ventas para cada tabla de comisión.

## Cálculo de la comisión por MacroZona

El cálculo de la comisión por macrozona se realiza en el SP [`pro_frm_epa_sv_recalcularCumplimientoComisionMacrozona`](./anexos#pro_frm_epa_sv_recalcularCumplimientoComisionMacrozona) en conjunto con el cálculo de la comisión para las zonas.

En este procedimiento primero se determinan las macrozonas y los períodos que no han sido liquidados cada una, se determinan de igual manera que para el cálculo de la comisión de las zonas.

Posteriormente se hace un ciclo por cada tupla MACROZONA, AÑO, MES para ejecutando los siguientes procesos:

### Cálculo del cumplimiento

En el SP [`pro_frm_epa_sv_calcularCumplimientoMacrozona`](./anexos#pro_frm_epa_sv_calcularCumplimientoMacrozona) se calcula el porcentaje de cumplimiento (ventas sobre presupuesto) de la macrozona por familias de productos.

La tabla de comisión así como el perfil se toman de la definición de la macrozona `frm_epa_sv_macrozona`, las ventas y el presupuesto se toman de cada zona que compone la macrozona `frm_epa_sv_macrozona_zona` en las tablas respectivas (`frm_epa_sv_ventasFamiliaRes` y `frm_epa_sv_presupuesto`).

El campo de zona se deja en NULO para indicar que es el registro de la comisión para Macrozona.

El campo comisión se deja NULO para indicar que la comisión está siendo calculada y no ha sido aprobada.

**Tablas asociadas**

- En la tabla `frm_epa_sv_comision` se insertan los registros que contendrán al final de la ejecución de cada paso la comisión por año, mes, perfil, macrozona y familia.
- Las ventas se toman de la tabla `frm_epa_sv_ventasFamiliaRes`.
- El presupuesto de la tabla `frm_epa_sv_presupuesto`.
- Las zonas incluidas en una macrozona de la tabla `frm_epa_sv_macrozona_zona`.
- El perfil que se liquida para la macrozona y la tabla de liquidación con que se calcula la comisión están en la tabla `frm_epa_sv_macrozon`.
- Los perfiles y las tablas de liquidación se explican ampliamente en el cálculo de la comisión.

### Cálculo de la devolución

En el SP [`pro_frm_epa_sv_dv_calcularDevolucionMacrozona`](./anexos#pro_frm_epa_sv_dv_calcularDevolucionMacrozona) se determina la devolución, el porcentaje de devolución con respecto a las ventas y la penalidad que conlleva dicho porcentaje de devolución.

La penalización por devolución aplica para cualquier perfil definido en la macrozona.

Este cálculo primero limpia los cálculos previos que se hayan hecho con respecto a la devolución en la tabla `frm_epa_sv_comision`, poniendo en nulo los campos de devolución, porcentaje de devolución, penalización por devolución y asignando al campo cumplimiento el valor del cumplimiento son penalización.

Posteriormente, actualiza en la tabla `frm_epa_sv_comision` el valor de las devoluciones y el porcentaje de devolución a partir de la tabla `frm_epa_sv_dev_devolucionRes`, las zonas asociadas a la macrozona `frm_epa_sv_macrozona_zona` y del campo ventas calculado en el procedimiento de Cálculo del cumplimiento.

Finalmente, se asigna la penalización por la penalidad de acuerdo al porcentaje de devolución y el canal de la venta.

**Tablas asociadas**

- En la tabla `frm_epa_sv_comision` quedan calculados los datos de la devolución (devolucion, devolucionPorc, devolucionPenal)
- En la tabla `frm_epa_sv_dev_devolucionRes` están las devoluciones por zona.
- Las zonas incluidas en una macrozona de la tabla `frm_epa_sv_macrozona_zona`.
- En la tabla `frm_epa_sv_FamiliaGrupoMateriales` se definen los grupos de comisión que pertenecen a cada familia y si estos (gruDevolucionActivo) se tienen en cuenta en la devolución.
- En la tabla `frm_epa_sv_familiaProductos` fp se indica si la familia está activa (estado) y si se tiene en cuenta para devolución (devolucion).
- En la tabla `frm_epa_sv_dev_devolucionTabla` se define el canal para el cual aplica la penalización de la devolución.
- En la tabla `frm_epa_sv_dev_devolucionParam` se define la penalidad de acuerdo al porcentaje de devolución con respecto a la venta.

### Cálculo de la comisión

El cálculo de la comisión se realiza en el SP [`pro_frm_epa_sv_calcularComisionMacrozona`](./anexos#pro_frm_epa_sv_calcularComisionMacrozona).

Primero limpia la comisión si hubiese una calculada (campo comision) y posteriormente calcula la comisión de acuerdo a la tabla de comisión por cumplimiento por familia `frm_epa_sv_comisionParam` para la macrozona `zona es igual a NULO`.

Posteriormente inserta un registro que representa el resumen de la comisión de todas las familias para la zona y perfil (dejando en nulo el campo famProd), sumando las ventas, presupuesto y devoluciones, calculando el cumplimiento total para la macrozona (ventas totales de la macrozona sobre presupuesto total de la macrozona) de acuerdo a las ventas y presupuesto de las zonas asociadas a la macrozona calculadas en Cálculo del cumplimiento.

En este registro se calcula la comisión final que es la comisión sin penalización menos el porcentaje de descuento máximo entre los que se calcularon en el Cálculo de la devolución.

**Tablas asociadas**

- `frm_epa_sv_comision` Quedan los registros finales de la comisión, un registro por cada familia de productos, un registro en que se totaliza la comisión y la penalización por devoluciones.
- Las zonas incluídas en una macrozona de la tabla `frm_epa_sv_macrozona_zona`.
- `frm_epa_sv_comisionTabla` la definición de la tabla de comisión que se registran para cada zona en la tabla `frm_epa_sv_zonaParam`.
- `frm_epa_sv_comisionParam` los valores de comisión por rango de cumplimiento en ventas para cada tabla de comisión.

## Update

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 02 de agosto de 2022.</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Juan C. González.</b>
    </i>
  </small>
</div>
