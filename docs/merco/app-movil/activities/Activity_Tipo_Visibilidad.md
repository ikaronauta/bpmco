---
title: Activity_Tipo_Visibilidad
slug: /activity-tipo-visibilidad
---
## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Tipo_Visibilidad.java
```

## Tablas

- ```tipo_visibilidad``` - (Pendiente)

## Módulos

- [```Visibilidad```](./../modules/modulo-13.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarDatos()
```

```js title="Método"
manejador.getHandlerTipoVisibilidad().getTiposVisibilidad()
```

```sql title="Query"
SELECT id, texto 
FROM tipo_visibilidad
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
