---
title: Activity_Registro_Actividad
slug: /activity-registro-actividad
---

## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Registro_Actividad.java
```

## Tablas

- ```actividadNovedad``` - (Pendiente)
- ```categoriaActividad``` - (Pendiente)
- ```registroActividad``` - (Pendiente)

## Módulos

- [```Actividades```](../modules/modulo-40.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerActividadNovedad().getListaNovedadesHT(canalAct)
```

```sql title="Query"
SELECT novId, novNovedad 
FROM %s, actividadNovedad 
WHERE novCanal = ?

Cursor cursor = db.rawQuery(sql, new String[]{canal})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerActividadNovedad().getListaNovedadesIdHT(canalAct)
```

```sql title="Query"
SELECT novId, novNovedad 
FROM %s, actividadNovedad 
WHERE novCanal = ?

Cursor cursor = db.rawQuery(sql, new String[]{canal})
```

### Consulta C

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerRegistroActividadCliente().getExisteRegistroActividad(String.valueOf(actividad.getActId()).replace("0100", ""), mPrefs.getString("usuario", ""), clienteId, Utilidades.getDate())
```

```sql title="Query"
SELECT id, foto, novedades, implementada, clienteId, idServidor, observacion, solucionada 
FROM registroActividad
WHERE actId = ? 
    AND clienteId = ? 
    AND (mercaderista = ? OR mercaderista = ?) 
    AND fecha = ?

Cursor cursor = db.rawQuery(sql, new String[]{actId, clienteId, usuario, "", fecha})
```

### Consulta D

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarNovedades(String canal)
```

```js title="Método"
manejador.getHandlerActividadNovedad().getListaNovedades(canal)
```

```sql title="Query"
SELECT novNovedad 
FROM %s, actividadNovedad 
WHERE novCanal = ?

Cursor cursor = db.rawQuery(sql, new String[]{canal})
```

### Consulta E

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarDatosActividad()
```

```js title="Método"
manejador.getHandlerCategoriaActividad().getCategoriasActividad(actividad.getActNumeroActividad(), actividad.getActFechaInicio(), actividad.getActFechaFin(), actividad.getActNombre())
```

```sql title="Query"
SELECT catId, catNombre, catDescuento 
FROM categoriaActividad
WHERE catNumeroActividad = ? 
    AND catFechaInicio = ? 
    AND catFechaFin = ? 
    AND actNombreActividad = ?

Cursor cursor = db.rawQuery(sql, new String[]{numeroActividad, fechaInicio, fechaFin, nombreActividad})
```

### Consulta F

:::tip TIPO
***Insert***
:::

```js title="Método desde donde se invoca"
public void onClick(View v)
```

```js title="Condiciones"
if (v == fab_comentario)

// highlight-next-line
if (guardar)
```

```js title="Método"
manejador.getHandlerRegistroActividadCliente().addRegistroActividad(regActividad)
```

```sql title="Query"
db.insert(registroActividad, null, values)
```

### Consulta G

:::tip TIPO
***Update***
:::

```js title="Método desde donde se invoca"
public void onClick(View v)
```

```js title="Condiciones"
if (v == fab_registrar)

// highlight-next-line
if (tipoUsu.equals(TipoUsuario.NOVEDAD))
```

```js title="Método"
manejador.getHandlerRegistroActividadCliente().updateRegistroActividadNovedad(regActividad)
```

```sql title="Query"
db.update
    (
        registroActividad, 
        values, 
        "idServidor = ?", 
        new String[]{registro.getIdServidor()}
    )
```

### Consulta H

:::tip TIPO
***Delete***
:::

```js title="Método desde donde se invoca"
public void onClick(View v)
```

```js title="Condiciones"
if (v == fab_registrar)

else (tipoUsu.equals(TipoUsuario.NOVEDAD))

// highlight-next-line
if (msj.equals("Valido"))
```

```js title="Método"
manejador.getHandlerRegistroActividadCliente().deleteRegistroActividadById(storage.get("RegistroActividad"))
```

```sql title="Query"
db.delete(registroActividad, "id = ?", new String[]{regId})
```

### Consulta I

:::tip TIPO
***Insert***
:::

```js title="Método desde donde se invoca"
public void onClick(View v)
```

```js title="Condiciones"
if (v == fab_registrar)

else (tipoUsu.equals(TipoUsuario.NOVEDAD))

// highlight-next-line
if (msj.equals("Valido"))
```

```js title="Método"
manejador.getHandlerRegistroActividadCliente().addRegistroActividad(regActividad)
```

```sql title="Query"
db.insert(registroActividad, null, values)
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 24 de mayo de 2022.</b> </i> 
    </small> 
    <small> 
        <i> Actualizado por: <b> Julia A. Ortiz.</b> </i> 
    </small> 
</div>
