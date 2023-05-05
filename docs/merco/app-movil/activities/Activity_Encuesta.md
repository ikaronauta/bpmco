---
title: Activity_Encuesta
slug: /activity-encuesta
---
## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Encuesta.java
```

## Tablas

- [```preguntaEncuesta```](./../sincronizacion/tablas/preguntaEncuesta.md)
- ```respuestaEncuesta``` - (Pendiente)
- ```tipoRespuesta``` - (Pendiente)

## Módulos

- [```Encuestas```](../modules/modulo-14.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarPreguntaEncuesta()
```

```js title="Método"
manejador.getHandlerPreguntaEncuesta().getListaPreguntas(String.valueOf(encuestaActual.getEnc_id())); //inicializarPreguntaEncuestas()
```

```sql title="Query"
SELECT pre_id, pre_texto, pre_peso, pre_orden, pre_ayuda, tip_id,
    pre_orientacion, pre_tipoCampo, pre_requerida, pre_anidada, enc_id
FROM preguntaEncuesta 
WHERE enc_id = ? ORDER BY pre_orden ASC

Cursor cursor = db.rawQuery(sql, new String[]{encuestaId})
```

### Consulta B

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarPreguntaEncuesta()
```

```js title="Condiciones"
if (listaPreguntaEncuestas.size() > 0)
```

```js title="Método"
manejador.getHandlerRespuestaEncuesta().getListaRespuestas(String.valueOf(preguntaEncuesta.getPre_id()))
```

```sql title="Query"
SELECT res_id, res_texto, res_peso, res_orden, res_requieredescripcion, 
    res_requiereFoto, res_desactivarRespuestas, pre_id, 
    res_preguntaAnidadaId 
FROM respuestaEncuesta 
WHERE pre_id = ?
ORDER BY res_orden ASC

Cursor cursor = db.rawQuery(sql, new String[]{pre_id})
```

### Consulta C

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarPreguntaEncuesta()
```

```js title="Condiciones"
if (listaPreguntaEncuestas.size() > 0)
```

```js title="Método"
manejador.getHandlerTipoRespuesta().getListaTipos(preguntaEncuesta.getTip_id())
```

```sql title="Query"
SELECT tip_id, tip_tipo 
FROM tipoRespuesta 
WHERE tip_id IN (" + lista + ")

Cursor cursor = db.rawQuery(sql, null)
```

### Consulta D

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private boolean alertaFinalizacion(String textoTitulo, String textoSalida, final String tipo)
```

```js title="Condiciones"
else (tipo.equals("0"))

// highlight-next-line
else (faltaDatos)
```

```js title="Método"
manejador.getHandlerRegistroEncuesta().addRegistros(listaRegistros)
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 22 de mayo de 2022.</b> </i> 
    </small> 
    <small> 
        <i> Actualizado por: <b> Julian A. Ortiz.</b> </i> 
    </small> 
</div>
