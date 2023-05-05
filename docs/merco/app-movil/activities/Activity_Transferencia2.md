---
title: Activity_Transferencia2
slug: /activity-transferencia2
---
## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Transferencia2.java
```

## Tablas

- [```cliente```](./../sincronizacion/tablas/cliente.md)
- [```distribuidor```](./../sincronizacion/tablas/distribuidor.md)
- [```producto```](./../sincronizacion/tablas/producto.md)

## Modulos

- [```Transferencia```](./../modules/modulo-6.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerCliente().getClientePorId(clienteActual.getCli_id())
```

```sql title="Query"
SELECT cli_id, cli_ptoventa, cli_codigoSap, cli_socioComercial, cli_ciudad,
    cli_categorias, cli_enviado, mer_documento, cli_contador, cli_coordenada, 
    cli_rutaImagen, cli_codigoEAN, cli_fotoFachada, cli_direccion, cli_canal, 
    cli_modulos, cli_codigoPadre, reg_id, cli_formato, cli_presupuesto, cli_subCanal,
    cli_frecuenciaVisita, cli_categorizacionGarganta, cli_categorizacionProbiotico, 
    cli_categorizacionPonderada
FROM cliente WHERE cli_id = ? LIMIT 1

Cursor cursor = db.rawQuery(selectQuery, new String[]{id})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerDistribuidores().getDistribuidoresCanal(cliente.getCli_canal())
```

```sql title="Query"
SELECT DISTINCT dis_id, dis_nombre, dis_nit, dis_canal, dis_codigoSap, 
    pob_id, dis_pago
FROM distribuidor WHERE dis_canal = ? ORDER BY dis_nombre ASC

Cursor cursor = db.rawQuery(selectQuery, new String[]{canal})
```

### Consulta C

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarProductosTransferencia()
```

```js title="Método"
manejador.getHandlerProducto().getProductoPorId(pro.getCodigoPro())
```

```sql title="Query"
SELECT pro_producto, pro_codigo, cat_id, precioMin, precioMax, codigoEAN, codigoPLU, precioSugerido, graId, pro_subCanal
FROM producto 
WHERE pro_codigo = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{codigo})
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 20 de mayo de 2022.</b></i> 
    </small>
    <small> 
        <i> Actualizado por: <b> Julian A. Ortiz.</b></i> 
    </small> 
</div>
