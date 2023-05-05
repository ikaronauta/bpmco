---
title: Activity_Codificacion
slug: /activity-codificacion
---

## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Codificacion.java
```

## Tablas

- ```codificacion``` - (Pendiente)
- [```producto```](./../sincronizacion/tablas/producto.md)

## Módulos

- [```Codificación```](./../modules/modulo-16.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarDatos()
```

```js title="Método"
manejador.getHandlerCodificacion().getDatoscodificacionPorCliente(clienteActual.getCli_id())
```

```sql title="Query"
SELECT cod_id, cli_id, pro_codigo, cod_codificacion, cod_riesgo, cod_color
FROM codificacion WHERE cli_id = ?
ORDER BY cod_color ASC

Cursor cursor = db.rawQuery(selectQuery, new String[]{cliente})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void addCodificacion(MER_Codificacion item)
```

```js title="Método"
manejador.getHandlerProducto().getProductoPorId(item.getPro_codigo())
```

```sql title="Query"
SELECT pro_producto, pro_codigo, cat_id, precioMin, precioMax, codigoEAN, 
    codigoPLU, precioSugerido, graId, pro_subCanal
FROM producto 
WHERE pro_codigo = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{codigo})
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 24 de mayo de 2022.</b> </i>
    </small> 
    <small> 
        <i> Actualizado por: <b> Julian A. Ortiz.</b> </i> 
    </small> 
</div>
