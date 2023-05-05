---
title: Activity_List_Actividades
slug: /activity-list-actividades
---

## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_List_Actividades.java
```

## Tablas

- ```actividadCliente``` - (Pendiente)
- ```registroActividad``` - (Pendiente)
- ```registroCheckList``` - (Pendiente)

## Módulos

- [```Actividades```](../modules/modulo-40.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarActividades()
```

```js title="Condiciones"
switch (tipoUsuario)

case TipoUsuario.CHECKLIST
```

```js title="Método"
manejador.getHandlerActividadClienteJ().getListaActividadesCheckList("1", Utilidades.getFechaActualNumero())
```

```sql title="Query"
SELECT DISTINCT actNumeroActividad, actNombre, actTipoActividad, actCliente
FROM actividadCliente
WHERE actNovedadCheckList = ?
    AND SUBSTR(actFechaInicio,7,4) 
        || SUBSTR(actFechaInicio,4,2) 
        || SUBSTR(actFechaInicio,1,2) <= '" + fecha + "'
    AND SUBSTR(actFechaFin,7,4) 
        || SUBSTR(actFechaFin,4,2) 
        || SUBSTR(actFechaFin,1,2) >= '" + fecha + "'
ORDER BY actNombre

Cursor cursor = db.rawQuery(sql, new String[]{tipo})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarActividades()
```

```js title="Condiciones"
switch (tipoUsuario)

case TipoUsuario.NOVEDAD
```

```js title="Método"
manejador.getHandlerActividadClienteJ().getListaActividades(clienteId, "2", Utilidades.getFechaActualNumero())
```

```sql title="Query"
SELECT actId, actNumeroActividad, actNombre, actFechaInicio, actFechaFin, 
    actMecanica, actContraprestacion, actTipoActividad, actFechaCausacion, 
    cliId, actCliente, actProductoCategoria
FROM actividadCliente
WHERE cliId = ? 
    AND actNovedadCheckList = ?
    AND SUBSTR(actFechaInicio,7,4) 
        || SUBSTR(actFechaInicio,4,2) 
        || SUBSTR(actFechaInicio,1,2) <= '" + fecha + "'
    AND SUBSTR(actFechaFin,7,4) 
        || SUBSTR(actFechaFin,4,2) 
        || SUBSTR(actFechaFin,1,2) >= '" + fecha + "'
ORDER BY actNombre

Cursor cursor = db.rawQuery(sql, new String[]{clienteId, tipo})
```

### Consulta C

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarActividades()
```

```js title="Condiciones"
switch (tipoUsuario)

default
```

```js title="Método"
manejador.getHandlerActividadClienteJ().getListaActividades(clienteId, Utilidades.getFechaActualNumero())
```

```sql title="Query"
SELECT DISTINCT actId, actNumeroActividad, actNombre, actFechaInicio, 
    actFechaFin, actMecanica, actContraprestacion, actTipoActividad, 
    actFechaCausacion, cliId, actCliente, actProductoCategoria
FROM actividadCliente
WHERE cliId = ?
    AND SUBSTR(actFechaInicio,7,4) 
        || SUBSTR(actFechaInicio,4,2) 
        || SUBSTR(actFechaInicio,1,2) <= '" + fecha + "'
    AND SUBSTR(actFechaFin,7,4) 
        || SUBSTR(actFechaFin,4,2) 
        || SUBSTR(actFechaFin,1,2) >= '" + fecha + "'
ORDER BY actNombre

Cursor cursor = db.rawQuery(sql, new String[]{clienteId})
```

### Consulta D

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void addActividad(ActividadCliente actividad, String clienteId)
```

```js title="Condiciones"
switch (tipoUsuario)

case TipoUsuario.CHECKLIST
```

```js title="Método"
manejador.getHandlerRegistroCheckList().existeRegistro(actividad.getActCliente(), mPrefs.getString("usuario", ""), actividad.getActNumeroActividad())
```

```sql title="Query"
SELECT regId, confUsuario, itemId, actNumeroActividad, regFecha, regHora 
FROM registroCheckList
WHERE cliente = ? AND confUsuario = ? AND actNumeroActividad = ?

Cursor cursor = db.rawQuery(sql, new String[]{cliente, usuario, numeroActividad})
```

### Consulta E

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void addActividad(ActividadCliente actividad, String clienteId)
```

```js title="Condiciones"
switch (tipoUsuario)

case TipoUsuario.NOVEDAD
```

```js title="Método"
manejador.getHandlerRegistroActividadCliente().getExisteRegistroActividadNovedad(String.valueOf(actividad.getActId()).replace("0100", ""), mPrefs.getString("usuario", ""), clienteId)
```

```sql title="Query"
SELECT id, foto, novedades, implementada, clienteId, idServidor, observacion 
FROM registroActividad
WHERE actId = ? 
    AND mercaderista = ? 
    AND clienteId = ? 
    AND observacion <> ''

Cursor cursor = db.rawQuery(sql, new String[]{actId, usuario, clienteId})
```

### Consulta F

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void addActividad(ActividadCliente actividad, String clienteId)
```

```js title="Condiciones"
switch (tipoUsuario)

default
```

```js title="Método"
manejador.getHandlerRegistroActividadCliente().getExisteRegistroActividad(String.valueOf(actividad.getActId()), mPrefs.getString("usuario", ""), clienteId, Utilidades.getDate())
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

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 24 de mayo de 2022.</b> </i> 
    </small> 
    <small> 
        <i> Actualizado por: <b> Julian A. Ortiz.</b> </i>
    </small> 
</div>
