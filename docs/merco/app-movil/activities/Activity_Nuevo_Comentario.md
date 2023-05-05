---
title: Activity_Nuevo_Comentario
slug: /activity-nuevo-comentario
---

## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Nuevo_Comentario.java
```

## Tablas

- ```categoriaActividad``` - (Pendiente)
- ```comentarioActividad``` - (Pendiente)

## Módulos

- [```Actividades```](../modules/modulo-40.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarProductos()
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

Cursor cursor = db.rawQuery
    (
        sql, new String[]
            {
                numeroActividad, fechaInicio, fechaFin, nombreActividad
            }
    )
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
public void onClick(View v)
```

```js title="Condiciones"
if (v == btnRegistrar)

// highlight-next-line
if (msj.equals("Valido"))
```

```js title="Método"
manejador.getHandlerRegistroComentarioActividad().addComentario(comentario)
```

```sql title="Query"
db.insert(comentarioActividad, null, values)
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
