---
title: Activity_Registro_Espacio_Cuadricula
slug: /activity-registro-espacio-cuadricula
---
## Descripción

## Ruta


```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Registro_Espacio_Cuadricula.java
```

## Tablas

- ```clasificacion_categoria_registro``` - (Pendiente)

## Módulos

- [```Registro Espacios```](./../modules/modulo-5.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerCategoriaRegistro().getCategorias(Integer.parseInt(clienteActual.getCli_id()), categoria.getCcat_codigo())
```

```sql title="Query"
SELECT DISTINCT ccr_codigo, ccr_nombre, ccr_color, cli_id, ccat_codigo, 
    ccr_orden, ccr_imagen, ccr_id
FROM clasificacion_categoria_registro
WHERE cli_id = ? AND ccat_codigo = ? 
ORDER BY ccr_orden, ccr_nombre
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
