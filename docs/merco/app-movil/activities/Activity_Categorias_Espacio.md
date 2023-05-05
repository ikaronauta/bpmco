---
title: Activity_Categorias_Espacio
slug: /activity-categorias-espacio
---
## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Categorias_Espacio.java
```

## Tablas

- ```clasificacion_categoria_registro``` - (Pendiente)
- ```clasificacion_categorias_espacios``` - (Pendiente)

## Módulos

- [```Registro Espacios```](./../modules/modulo-5.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarDatos()
```

```js title="Método"
manejador.getHandlerCategoriaEspacios().getCategorias(clienteActual.getCli_id())
```

```sql title="Query"
SELECT DISTINCT ccat_color, ccat_nombre, ccat_codigo, ccat_requiereOpc, ccat_planometria
FROM clasificacion_categorias_espacios 
WHERE ccat_codigo IN 
    (
        SELECT DISTINCT ccat_codigo 
        FROM clasificacion_categoria_registro 
        WHERE cli_id = ?
    ) 
    ORDER BY ccat_nombre"
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
