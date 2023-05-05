---
title: Activity_Categoria_Marca
slug: /activity-categoria-marca
---

## Descripcion

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Categoria_Marca.java
```

## Tablas

- [```categoria_producto```](./../sincronizacion/tablas/categoria_producto.md)
- [```cliente```](./../sincronizacion/tablas/cliente.md)
- [```cliente_mercaderista```](./../sincronizacion/tablas/cliente_mercaderista.md)
- [```marca```](./../sincronizacion/tablas/marca.md)
- [```producto```](./../sincronizacion/tablas/producto.md)
- [```producto_competencia```](./../sincronizacion/tablas/producto_competencia.md)
- [```productoscliente```](./../sincronizacion/tablas/productoscliente.md)
- ```productosventa```


## Módulos

[`Registro Espacios`](../modules/modulo-5.md)

## Consultas

### Consulta A

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
private void cargarCategorias()
```

```js title="Condiciones"
if((mPrefs.getString("tareaActual", "").equals("MallaCodificacion")))
```

```js title="Método"
manejador.getHandlerCategoriaProducto().getCategoriasProductosMalla(clienteMercaderistaActual.getClme_id(),String.valueOf(clienteMercaderistaActual.getCli_id()));
```

```sql title="Query"
SELECT DISTINCT cat.ccla_color, cat.orden, cat.ccla_txt, cat.ccat_codigo
FROM cliente_mercaderista v JOIN cliente cl ON cl.cli_id = v.cli_id
    JOIN productoscliente pc on pc.cli_codSAP = cl.cli_codigoSap
    JOIN producto pro on pc.pro_codigo = pro.pro_codigo
    JOIN productosventa pv on pro.pro_codigo = pv.pro_codigo
    JOIN categoria_producto cat ON pro.cat_id = cat.ccat_codigo
WHERE v.clme_id = ? AND pv.cli_id = ?
GROUP BY cat.ccat_codigo ORDER BY cat.orden

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(session), cli_id})
```

### Consulta B

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
private void cargarCategorias()
```

```js title="Condiciones"
else if(mPrefs.getString("tareaActual", "").equals("RegistroAgotados")
    || mPrefs.getString("tareaActual", "").equals("RegistroDiario")
    || (mPrefs.getString("tareaActual", "").equals("RegistroDevolucion"))
    || (mPrefs.getString("tareaActual", "").equals("InventarioTotal"))
    || (mPrefs.getString("tareaActual", "").equals("RegistroInventario"))
    || (mPrefs.getString("tareaActual", "").equals("ProximoVencer"))
    || (mPrefs.getString("tareaActual", "").equals("RegistroCaras")))
```

```js title="Método"
manejador.getHandlerCategoriaProducto().getCategoriasProductos(clienteMercaderistaActual.getClme_id());
```

```sql title="Query"
SELECT DISTINCT cat.ccla_color, cat.orden, cat.ccla_txt, cat.ccat_codigo
FROM cliente_mercaderista v 
    JOIN cliente cl ON cl.cli_id = v.cli_id
    JOIN productoscliente pc on pc.cli_codSAP = cl.cli_codigoSap
    JOIN producto pro on pc.pro_codigo = pro.pro_codigo
    JOIN categoria_producto cat ON pro.cat_id = cat.ccat_codigo
WHERE v.clme_id = ?
GROUP BY cat.ccat_codigo ORDER BY cat.orden

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(session)})
```

### Consulta C

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
private void cargarCategorias()
```

```js title="Condiciones"
else if(mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS")
    || mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS_MARCAS"))
```

```js title="Método"
manejador.getHandlerCategoriaProducto().getCategoriasCompetenciaPorCanal(objetoCliente.getCli_canal(),objetoCliente.getCli_subCanal());
```

```sql title="Query"
SELECT DISTINCT ccat_codigo, ccla_txt, ccla_color,orden
FROM categoria_producto WHERE ccat_codigo IN
    (
        SELECT DISTINCT pr.cat_id
        FROM producto pr
            JOIN producto_competencia proc ON proc.pro_id = pr.pro_codigo
        WHERE proc.pro_canal = ? AND pr.pro_subCanal = ?
    )
    ORDER BY ccla_txt, orden ASC

Cursor cursor = db.rawQuery(selectQuery, new String[]{canal, subCanal})
```

### Consulta D

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(final MER_CategoriaProducto categoria)
```

```js title="Condiciones"
if ((mPrefs.getString("tareaActual", "").equals("MallaCodificacion")))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasRegistroMalla(categoria.getCpr_codigo(),clienteMercaderistaActual.getClme_id(),clienteMercaderistaActual.getCli_id());
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id
FROM cliente_mercaderista v
    JOIN cliente cl ON cl.cli_id = v.cli_id
    JOIN productoscliente pc on pc.cli_codSAP = cl.cli_codigoSap
    JOIN producto pro on pc.pro_codigo = pro.pro_codigo
    JOIN marca m ON m.mar_id = pro.mar_id
WHERE v.clme_id = ? AND m.cat_id = ? AND pro.mar_id IS NOT NULL
ORDER BY m.mar_nombre

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(sessionId), String.valueOf(cat_id)})
```

### Consulta E

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(final MER_CategoriaProducto categoria)
```

```js title="Condiciones"
else if (mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcas2(categoria.getCpr_codigo());
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id
FROM marca m
    JOIN producto p ON m.mar_id = p.mar_id
    JOIN producto_competencia pc ON p.pro_codigo = pc.pro_id
WHERE m.cat_id = ? AND p.mar_id IS NOT NULL

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(cat_id)})
```

### Consulta F

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
private void cargarMarcas(final MER_CategoriaProducto categoria)
```

```js title="Condiciones"
else (mPrefs.getString("tareaActual", "").equals("CHEQUEO_DE_PRECIOS"))
```

```js title="Método"
manejador.getHandlerMarca().getListaMarcasRegistro(categoria.getCpr_codigo(),clienteMercaderistaActual.getClme_id(),"0");
```

```sql title="Query"
SELECT DISTINCT m.mar_id, m.mar_nombre, m.cat_id
FROM cliente_mercaderista v
    JOIN cliente cl ON cl.cli_id = v.cli_id
    JOIN productoscliente pc on pc.cli_codSAP = cl.cli_codigoSap
    JOIN producto pro on pc.pro_codigo = pro.pro_codigo
    JOIN marca m ON m.mar_id = pro.mar_id
WHERE v.clme_id = ? AND m.cat_id = ? AND pro.graId = ? AND pro.mar_id IS NOT NULL
ORDER BY m.mar_nombre

Cursor cursor = db.rawQuery(sql, new String[]{String.valueOf(sessionId), String.valueOf(cat_id), gramajeId})
```

### Consulta G

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
private void cargarProductos(MER_CategoriaProducto categoria, Marca marca)
```

```js title="Método"
manejador.getHandlerProducto().getProductosCategoriaCompetencia(clienteMercaderistaActual.getClme_id(),categoria.getCpr_codigo(),marca.getMar_id(),objetoCliente.getCli_canal());
```

```sql title="Query"
SELECT pro_producto, pro_codigo, cat_id, mar_id, precioMin, precioMax, codigoEAN, codigoPLU, precioSugerido, graId, pro_subCanal
FROM producto WHERE pro_codigo IN
    (
        SELECT DISTINCT pr.pro_codigo
        FROM producto_competencia pcom
            JOIN producto pr ON pr.pro_codigo = pcom.pro_id AND pcom.pro_canal = ?
    )
    AND cat_id = ? AND mar_id = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{canal, String.valueOf(categoria), String.valueOf(marca)})
```

## Ultima actualizacion

<div class='ultima-actualizacion'> 
    <small> 
        <i> 
            Ultima actualizacion: <b> 19 de mayo de 2022.</b> 
        </i> 
    </small> 
    <small> 
        <i> 
        Actualizado por: <b> Julian A. Ortiz.</b> 
        </i> 
    </small> 
</div>
