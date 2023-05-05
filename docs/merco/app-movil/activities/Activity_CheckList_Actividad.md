---
title: Activity_CheckList_Actividad
slug: /activity-checklist-actividad
---
## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_CheckList_Actividad.java
```

## Tablas

- ```lista_chequeo``` - (Pendiente)
- ```registroCheckList``` - (Pendiente)


## Módulos

- [```Actividades```](../modules/modulo-40.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarLista(String tipoActividad)
```

```js title="Método"
manejador.getHandlerListaChequeo().getListaChequeoByTipo(tipoActividad)
```

```sql title="Query"
SELECT ch_codigo, ch_texto, ch_tipo 
FROM %s 
WHERE ch_tipo = ?, lista_chequeo

Cursor cursor = db.rawQuery(selectQuery, new String[]{tipoActividad})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void addItemLista(Lista_Chequeo item)
```

```js title="Método"
manejador.getHandlerRegistroCheckList().getRegistro(actividad.getActCliente(), mPrefs.getString("usuario", ""), actividad.getActNumeroActividad(), String.valueOf(item.getChId()))
```

```sql title="Query"
SELECT regId, confUsuario, cliente, itemId, actNumeroActividad, regFecha, regHora 
FROM registroCheckList
WHERE cliente = ? 
    AND confUsuario = ? 
    AND actNumeroActividad = ? 
    AND itemId = ?

Cursor cursor = db.rawQuery
    (
        sql, new String[]
            {
                clienteId, usuario, numeroActividad, itemId
            }
    ) 
```

### Consulta C

:::tip TIPO
***Insert***
:::

```js title="Método desde donde se invoca"
private boolean almacenarRegistroOpciones()
```

```js title="Método"
manejador.getHandlerRegistroCheckList().addRegistroCheckList(registro);
```

```sql title="Query"
db.insert(registroCheckList, null, values)
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
