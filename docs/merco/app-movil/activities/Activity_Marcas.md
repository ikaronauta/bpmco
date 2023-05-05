---
title: Activity_Marcas
slug: /activity-marcas
---

## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Marcas.java
```

## Tablas

- [```producto```](./../sincronizacion/tablas/producto.md)
- [```producto_competencia```](./../sincronizacion/tablas/producto_competencia.md)
- [```producto_competenciaMaxMin```](./../sincronizacion/tablas/producto_competenciaMaxMin.md)
- [```productoMaxMin```](./../sincronizacion/tablas/productoMaxMin.md)  
- [```productoPrecio```](./../sincronizacion/tablas/productoPrecio.md)

## Módulos

[```Chequeo de Precios Trazabilidad```](../modules/modulo-44.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(int categoria)
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("CHEQUEO_PRECIOS_MAX/MIN"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasMaxMin(categoria)
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id FROM marca m
  JOIN productoMaxMin p ON m.mar_id = p.mar_id
  JOIN producto_competenciaMaxMin pc ON p.pro_codigo = pc.pro_id
WHERE m.cat_id = ? AND p.mar_id IS NOT NULL

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(cat_id)})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(int categoria)
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("CHEQUEO_PRECIOS_MAX/MIN"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasCompMaxMin(categoria)
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id FROM marca m
  JOIN producto_competenciaMaxMin pc ON m.mar_id = pc.mar_id
WHERE m.cat_id = ? 

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(cat_id)})
```

### Consulta C

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(int categoria)
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS_MARCAS"))

// highlight-next-line
if (mPrefs.getString("empresa", "").equals("EC"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasPorCanal(categoria, objetoCanal.getId(), objetoCliente.getCli_subCanal())
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id FROM marca m
  JOIN producto p ON m.mar_id = p.mar_id
  JOIN producto_competencia pc ON p.pro_codigo = pc.pro_id
WHERE m.cat_id = ? AND pc.pro_canal = ? AND p.pro_subCanal = ? AND p.mar_id IS NOT NULL
ORDER BY m.mar_nombre ASC

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(cat_id), canal, subCanal})
```

### Consulta D

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(int categoria)
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS_MARCAS"))

// highlight-next-line
else (mPrefs.getString("empresa", "").equals("EC"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasPorCanal(categoria, objetoCliente.getCli_canal(), objetoCliente.getCli_subCanal())
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id FROM marca m
  JOIN producto p ON m.mar_id = p.mar_id
  JOIN producto_competencia pc ON p.pro_codigo = pc.pro_id
WHERE m.cat_id = ? AND pc.pro_canal = ? AND p.pro_subCanal = ? AND p.mar_id IS NOT NULL
ORDER BY m.mar_nombre ASC

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(cat_id), canal, subCanal})

```

### Consulta E

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(int categoria)
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS_MARCAS"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasCompPorCanal(categoria, objetoCliente.getCli_canal())
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id FROM marca m
  JOIN producto_competencia pc ON m.mar_id = pc.mar_id
WHERE m.cat_id = ? AND pc.pro_canal = ? ORDER BY m.mar_nombre ASC

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(cat_id), canal})
```

### Consulta F

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(int categoria)
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS_MARCAS_V2")
  || mPrefs.getString("tareaActual", "").equals("Chequeo de Precios Trazabilidad"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasPorCanalYSubCanal(categoria, objetoCliente.getCli_canal(), objetoCliente.getCli_subCanal())
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id FROM marca m
  JOIN producto p ON m.mar_id = p.mar_id
  INNER JOIN productoPrecio pp ON p.pro_codigo = pp.proCodigo
  JOIN producto_competencia pc ON p.pro_codigo = pc.pro_id
WHERE m.cat_id = ? AND pc.pro_canal = ? AND pp.prpSubCanal = ? AND p.mar_id IS NOT NULL
ORDER BY m.mar_nombre ASC

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(cat_id), canal, subCanal})
```

### Consulta G

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(int categoria)
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS_MARCAS_V2")
  || mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS_MARCAS_TRAZABILIDAD"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasCompPorCanal(categoria, objetoCliente.getCli_canal())
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id FROM marca m
  JOIN producto_competencia pc ON m.mar_id = pc.mar_id
WHERE m.cat_id = ? AND pc.pro_canal = ? ORDER BY m.mar_nombre ASC

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(cat_id), canal})
```

## Ultima Actualización

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 18 de mayo de 2022.</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Julian A. Ortiz.</b>
    </i>
  </small>
</div>