---
title: Activity_Categorias_Visibilidad
slug: /activity-categorias-visibilidad
---
## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Categorias_Visibilidad.java
```

## Tablas

- [```categoria_producto```](./../sincronizacion/tablas/categoria_producto.md)
- [```cliente```](./../sincronizacion/tablas/cliente.md)
- [```objetivosVisibilidad```](./../sincronizacion/tablas/objetivosVisibilidad.md)
- [```registroVisibilidad```](./../sincronizacion/tablas/registroVisibilidad.md)

## Módulos

- [```Visibilidad```](./../modules/modulo-13.md)

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
FROM cliente 
WHERE cli_id = ? LIMIT 1

Cursor cursor = db.rawQuery(selectQuery, new String[]{id})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarDatosVisibilidad()
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("Visibilidad"))
```

```js title="Método"
manejador.getHandlerObjetivoVisibilidad().getCategoriasVisibilidad(Utilidades.getDate(), tipoVis, clienteActual.getCli_id())
```

```sql title="Query"
SELECT cat.ccat_codigo, cat.ccla_txt, cat.ccla_color, cat.orden
FROM objetivosVisibilidad obj
    INNER JOIN categoria_producto cat ON obj.categoria = cat.ccat_codigo
WHERE tipo = ? 
    AND (clienteId = ? OR clienteId = ?) 
    AND fechaInicio = substr(?, 4, 2) 
    AND fechaFin = substr(?, 7, 4)
    AND (codigoPadre = '' OR codigoPadre IS NULL)
GROUP BY cat.ccat_codigo, cat.ccla_txt, cat.ccla_color, cat.orden
ORDER BY cat.ccla_txt ASC

Cursor cursor = db.rawQuery(sql, new String[]{tipo, clienteId, "0", fecha, fecha})
```

### Consulta C

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarDatosGestion()
```

```js title="Método"
manejador.getHandlerObjetivoVisibilidad().getCategoriasGestionVisibilidad(Utilidades.getDate())
```

```sql title="Query"
SELECT cat.ccat_codigo, cat.ccla_txt, cat.ccla_color, cat.orden
FROM objetivosVisibilidad obj
    INNER JOIN categoria_producto cat ON obj.categoria = cat.ccat_codigo
WHERE tipo = 'GESTIÓN' 
    AND clienteId = '0' 
    AND fechaInicio = substr(?, 4, 2) 
    AND fechaFin = substr(?, 7, 4)
    GROUP BY cat.ccat_codigo, cat.ccla_txt, cat.ccla_color, cat.orden
    ORDER BY cat.ccla_txt ASC

Cursor cursor = db.rawQuery(sql, new String[]{fecha, fecha});
```

### Consulta D

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarDatosPago()
```

```js title="Método"
manejador.getHandlerObjetivoVisibilidad().getCategoriasPagoVisibilidad(clienteActual.getCli_id(), Utilidades.getDate())
```

```sql title="Query"
SELECT cat.ccat_codigo, cat.ccla_txt, cat.ccla_color, cat.orden
FROM objetivosVisibilidad obj
    INNER JOIN categoria_producto cat ON obj.categoria = cat.ccat_codigo
WHERE tipo = 'PAGO' 
    AND (clienteId = ? OR clienteId = ?) 
    AND fechaInicio = substr(?, 4, 2) 
    AND fechaFin = substr(?, 7, 4)
    GROUP BY cat.ccat_codigo, cat.ccla_txt, cat.ccla_color, cat.orden
    ORDER BY cat.ccla_txt ASC

Cursor cursor = db.rawQuery(sql, new String[]{cli_id, "0", fecha, fecha})
```

### Consulta E

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private boolean existeVisibilidadCategoriaCliente(int cpr_codigo)
```

```js title="Condiciones"
if (mPrefs.getString("tareaActual", "").equals("Visibilidad"))
```

```js title="Método"
manejador.getHandlerObjetivoVisibilidad().getObjetivos(clienteActual.getCli_id(), Utilidades.getDate(), String.valueOf(cpr_codigo), tipoVis)
```

```sql title="Query"
SELECT id, fechaInicio, FechaFin, clienteId, mercaderista, categoria,
    linea, tipo, actividad, muebleExhibicion, conceptoExhibicion, 
    tipoExhibicion, codigoPadre
FROM objetivosVisibilidad
WHERE tipo = ? 
    AND (clienteId = ? OR clienteId = ?) 
    AND fechaInicio = substr(?, 4, 2) 
    AND fechaFin = substr(?, 7, 4)
    AND categoria = ? 
    AND (codigoPadre = '' OR codigoPadre IS NULL)

Cursor cursor = db.rawQuery(selectQuery, new String[]{tipo, cli_id, "0", fecha, fecha, categoria})
```

### Consulta F

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private boolean existeVisibilidadCategoriaCliente(int cpr_codigo)
```

```js title="Condiciones"
if (objetivos.size() > 0)
```

```js title="Método"
manejador.getHandlerRegistroVisibilidad().getExisteRegistroVisibilidad(String.valueOf(objetivo.getId()), mPrefs.getString("usuario", ""))
```

```sql title="Query"
SELECT id, foto, comentario, clienteId 
FROM registroVisibilidad
WHERE id_obj = ? AND mercaderista = ?

Cursor cursor = db.rawQuery(sql, new String[]{objetivoId, usuario})
```

### Consulta G

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onActivityResult(int requestCode, int resultCode, Intent data)
```

```js title="Condiciones"
if (requestCode == AGREGAR)

// highlight-next-line 
if (resultCode == RESULT_OK)
```

```js title="Método"
manejador.getHandlerCategoriaProducto().getCategoriaChequeoPrecioPorId(objetivo.getCategoria())
```

```sql title="Query"
SELECT  * FROM categoria_producto 
WHERE ccat_codigo = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(codigo)})
```

### Consulta H

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onActivityResult(int requestCode, int resultCode, Intent data)
```

```js title="Condiciones"
if (requestCode == AGREGAR)

if (resultCode == RESULT_OK)

// highlight-next-line 
if (objCliente.getCli_canal().equals("1") && tipoVis.equals("PAGO"))
```

```js title="Método"
manejador.getHandlerRegistroVisibilidad().getExisteRegistroVisibilidadConCumplimiento(String.valueOf(objetivo.getId()), mPrefs.getString("usuario", ""))
```

```sql title="Query"
SELECT id, foto, comentario, clienteId, cumpleNegociacion, motivoNoCumplimiento
FROM registroVisibilidad
WHERE id_obj = ? AND mercaderista = ? AND cumpleNegociacion = ?

Cursor cursor = db.rawQuery(sql, new String[]{objetivoId, usuario, "SI"})
```

### Consulta I

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onActivityResult(int requestCode, int resultCode, Intent data)
```

```js title="Condiciones"
if (requestCode == AGREGAR)

if (resultCode == RESULT_OK)

// highlight-next-line 
else (objCliente.getCli_canal().equals("1") && tipoVis.equals("PAGO"))
```

```js title="Método"
manejador.getHandlerRegistroVisibilidad().getExisteRegistroVisibilidad(String.valueOf(objetivo.getId()), mPrefs.getString("usuario", ""))
```

```sql title="Query"
SELECT id, foto, comentario, clienteId 
FROM registroVisibilidad
WHERE id_obj = ? AND mercaderista = ?

Cursor cursor = db.rawQuery(sql, new String[]{objetivoId, usuario})
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 23 de mayo de 2022.</b> </i> 
    </small> 
    <small> 
        <i> Actualizado por: <b> Julian A. Ortiz.</b> </i> 
    </small> 
</div>
