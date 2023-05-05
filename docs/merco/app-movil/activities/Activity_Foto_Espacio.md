---
title: Activity_Foto_Espacio
slug: /activity-foto-espacio
---

## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Foto_Espacio.java
```

## Tablas

- ```configuracion``` - (Pendiente)
- ```fotoespacio``` - (Pendiente)

## Módulos

- [```Registro Espacios```](./../modules/modulo-5.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void mostrarFotos()
```

```js title="Método"
manejador.getHandlerFotoEspacio().getFotos(clienteMercaderistaActual.getClme_id(), categoriaEspacioActual.getCcat_codigo())
```

```sql title="Query"
SELECT  id,fecha,sessionid, comentario, categoria,
    coordenadas, foto, enviado, intentos 
FROM fotoespacio 
WHERE sessionid = ? AND categoria = ?
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onActivityResult(int requestCode, int resultCode, Intent data)
```

```js title="Condiciones"
else (!mPrefs.getString("usuario", "").equals(""))
```

```js title="Método"
manejador.getHandlerConfiguracion().getDocumentoMercaderista()
```

```sql title="Query"
SELECT conf_usuario 
FROM configuracion 
WHERE conf_usuario <> ''
```

### Consulta C

:::tip TIPO
***Insert***
:::

```js title="Método desde donde se invoca"
protected void onActivityResult(int requestCode, int resultCode, Intent data)
```

```js title="Método"
manejador.getHandlerFotoEspacio().addFoto(foto)
```

```sql title="Query"
db.insert
    (
        fotoespacio, 
        null, 
        values
    )
```

### Consulta D

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onActivityResult(int requestCode, int resultCode, Intent data)
```

```js title="Condiciones"
if (requestCode == CAMERA)

if (resultCode == RESULT_OK)

// highlight-next-line
else (!mPrefs.getString("usuario", "").equals(""))
```

```js title="Método"
manejador.getHandlerConfiguracion().getDocumentoMercaderista()
```

```sql title="Query"
SELECT conf_usuario 
FROM configuracion 
WHERE conf_usuario <> ''
```

### Consulta E

:::tip TIPO
***Insert***
:::

```js title="Método desde donde se invoca"
protected void onActivityResult(int requestCode, int resultCode, Intent data)
```

```js title="Condiciones"
if (requestCode == CAMERA)

// highlight-next-line
if (resultCode == RESULT_OK)
```

```js title="Método"
manejador.getHandlerFotoEspacio().addFoto(foto)
```

```sql title="Query"
db.insert
    (
        fotoespacio, 
        null, 
        values
    )
```

### Consulta F

:::tip TIPO
***Delete***
:::

```js title="Método desde donde se invoca"
public void onClick(View view)
```

```js title="Condiciones"
if (view == fab_eliminar)

if (contador > 0)

// highlight-next-line
if (ft.is_seleccionado())
```

```js title="Método"
manejador.getHandlerFotoEspacio().deleteFoto(ft)
```

```sql title="Query"
db.delete
    (
        fotoespacio, " id = ?", 
        new String[]
            {
                Long.toString(foto.get_id())
            }
    )
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
