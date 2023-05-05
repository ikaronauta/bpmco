---
title: Activity_Informe_Espacios
slug: /activity-informe-espacios
---
## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Informe_Espacios.java
```

## Tablas

- ```clasificacion_categoria_registro``` - (Pendiente)
- ```clasificacion_categorias_espacios``` - (Pendiente)
- [```planometriaEspacio```](./../sincronizacion/tablas/planometriaEspacio.md)
- [```registro_categoria_espacios```](./../sincronizacion/tablas/registro_categoria_espacios.md)
- [```registro_espacios```](./../sincronizacion/tablas/registro_espacios.md)

## Modulos

[`Registro Espacios`](../modules/modulo-5.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerRegistroEspacios().getRegistroCliente(clienteMercaderistaActual.getClme_id(), Utilidades.getDate())
```

```sql title="Query"
SELECT rees_codigo, rees_fecha, sessionId, ccat_codigo, rees_coordenada, 
    rees_observaciones, rees_registroCuadricula, rees_enviado
FROM registro_espacios 
WHERE sessionId = ? AND rees_fecha = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(sessionId),fecha})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarInforme(MER_RegistroEspacios item)
```

```js title="Método"
manejador.getHandlerCategoriaEspacios().getNombreCategoriaId(item.getCcat_codigo())
```

```sql title="Query"
SELECT ccat_nombre 
FROM clasificacion_categorias_espacios 
WHERE ccat_codigo = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(id)})
```

### Consulta C

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarInforme(MER_RegistroEspacios item)
```

```js title="Método"
manejador.getHandlerPlanometriaEspacio().getPlanometriaEspaciosPorClienteYCategoria(clienteActual.getCli_id(), String.valueOf(item.getCcat_codigo()))
```

```sql title="Query"
SELECT plaId, cliId, catId, plaPlanometria 
FROM 
WHERE cliId = ? AND catId = ?

Cursor cursor = db.rawQuery(sql, new String[]{cliId, catId})
```

### Consulta D

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarInforme(MER_RegistroEspacios item)
```

```js title="Método"
manejador.getHandlerRegistroMedidaEspacio().getRegistrosCategoria(item.getRees_codigo())
```

```sql title="Query"
SELECT codigo, codigoRegistro, categoriaId, medida, porcentaje
FROM registro_categoria_espacios 
WHERE codigoRegistro = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(codigo)})
```

### Consulta E

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarInforme(MER_RegistroEspacios item)
```

```js title="Condiciones"
if(registros != null)

// highlight-next-line
if (registros.size() > 0)
```

```js title="Método"
manejador.getHandlerCategoriaRegistro().getNombreCategoriaId(reg.get_idCategoria())
```

```sql title="Query"
SELECT ccr_nombre 
FROM clasificacion_categoria_registro 
WHERE ccr_codigo = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(id)})
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 20 de mayo de 2022.</b></i> 
    </small> 
    <small>
        <i> Actualizado por: <b> Julian A. Ortiz.</b></i> 
    </small> 
</div>
