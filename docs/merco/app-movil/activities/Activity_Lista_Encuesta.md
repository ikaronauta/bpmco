---
title: Activity_Lista_Encuesta
slug: /activity-lista-encuesta
---

## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Lista_Encuesta.java
```

## Tablas

- [```cliente```](./../sincronizacion/tablas/cliente.md)
- ```encuesta```- (Pendiente)
- [```registroEncuesta```](./../sincronizacion/tablas/registroEncuesta.md)

## Módulos

- [```Encuestas```](../modules/modulo-14.md)

## Consultas

### Consulta A

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarEncuestas()
```

```js title="Método"
manejador.getHandlerEncuesta().getListaEncuestaVigencia(Utilidades.getFechaActualNumero(), clienteActual.getCli_id(), mPrefs.getString("usuario", ""))
```

```sql title="Query"
SELECT id, nombre, descripcion, tipo, fechaInicio, fechaFin, 
    cantidadRegistrosPermitidos,
MAX(IFNULL(reg.reg_registro, 0))
FROM
    (
        SELECT enc.enc_id id, enc.enc_nombre nombre, enc.enc_descripcion descripcion, 
        enc.enc_tipo tipo, enc.enc_fechaInicio fechaInicio, enc.enc_fechaFin fechaFin,
        enc.enc_cantidadRegistrosPermitidos cantidadRegistrosPermitidos
        FROM encuesta enc
        WHERE SUBSTR(enc_fechaFin,7,4) 
            || SUBSTR(enc_fechaFin,4,2) 
            || SUBSTR(enc_fechaFin,1,2) >= ?
            AND SUBSTR(enc_fechaInicio,7,4) 
                || SUBSTR(enc_fechaInicio,4,2) 
                || SUBSTR(enc_fechaInicio,1,2) <= ?
            AND enc.enc_tipo = '0' 
            AND enc.enc_esInfaltable = 0
        GROUP BY enc.enc_id, enc.enc_nombre, enc.enc_descripcion, 
        enc.enc_tipo, enc.enc_fechaInicio, enc.enc_fechaFin,
        enc.enc_cantidadRegistrosPermitidos
        UNION ALL
        SELECT enc.enc_id id, enc.enc_nombre nombre, enc.enc_descripcion descripcion, 
            enc.enc_tipo tipo, enc.enc_fechaInicio fechaInicio, 
            enc.enc_fechaFin fechaFin, enc.enc_cantidadRegistrosPermitidos 
            cantidadRegistrosPermitidos
        FROM encuesta enc 
            INNER JOIN cliente cl ON 
                (
                    (',' || enc.enc_encargado || ',') 
                    LIKE '%,' || cl.cli_canal || ',%' OR enc.enc_encargado = '*'
                )
        WHERE SUBSTR(enc_fechaFin,7,4) 
            || SUBSTR(enc_fechaFin,4,2) 
            || SUBSTR(enc_fechaFin,1,2) >= ?
        AND SUBSTR(enc_fechaInicio,7,4) 
            || SUBSTR(enc_fechaInicio,4,2) 
            || SUBSTR(enc_fechaInicio,1,2) <= ?
        AND enc.enc_tipo = '1' AND cl.cli_id = ? AND enc.enc_esInfaltable = 0
        GROUP BY enc.enc_id, enc.enc_nombre, enc.enc_descripcion, enc.enc_tipo, 
        enc.enc_fechaInicio, enc.enc_fechaFin, enc.enc_cantidadRegistrosPermitidos
        UNION ALL
        SELECT enc.enc_id id, enc.enc_nombre nombre, enc.enc_descripcion descripcion, 
        enc.enc_tipo tipo, enc.enc_fechaInicio fechaInicio, enc.enc_fechaFin fechaFin,
        enc.enc_cantidadRegistrosPermitidos cantidadRegistrosPermitidos
        FROM encuesta enc
            INNER JOIN cliente cl ON ((',' 
            || enc.enc_encargado 
            || ',') LIKE '%,' 
            || cl.cli_id 
            || ',%' OR enc.enc_encargado = '*')
        WHERE SUBSTR(enc_fechaFin,7,4) 
            || SUBSTR(enc_fechaFin,4,2) 
            || SUBSTR(enc_fechaFin,1,2) >= ?
        AND SUBSTR(enc_fechaInicio,7,4) 
            || SUBSTR(enc_fechaInicio,4,2) 
            || SUBSTR(enc_fechaInicio,1,2) <= ?
        AND enc.enc_tipo = '2' AND cl.cli_id = ? AND enc.enc_esInfaltable = 0
        GROUP BY enc.enc_id, enc.enc_nombre, enc.enc_descripcion, enc.enc_tipo, 
        enc.enc_fechaInicio, enc.enc_fechaFin, enc.enc_cantidadRegistrosPermitidos
        UNION ALL
        SELECT enc.enc_id id, enc.enc_nombre nombre, enc.enc_descripcion descripcion, 
        enc.enc_tipo tipo, enc.enc_fechaInicio fechaInicio, enc.enc_fechaFin fechaFin,
        enc.enc_cantidadRegistrosPermitidos cantidadRegistrosPermitidos
        FROM encuesta enc
            INNER JOIN configuracion conf ON ((',' 
                || enc.enc_encargado || ',') LIKE '%,' 
                || conf.conf_usuario || ',%' OR enc.enc_encargado = '*')
        WHERE SUBSTR(enc_fechaFin,7,4) 
            || SUBSTR(enc_fechaFin,4,2) 
            || SUBSTR(enc_fechaFin,1,2) >= ?
            AND SUBSTR(enc_fechaInicio,7,4) 
                || SUBSTR(enc_fechaInicio,4,2) 
                || SUBSTR(enc_fechaInicio,1,2) <= ?
            AND enc.enc_tipo = '3' 
            AND conf.conf_usuario = ? 
            AND enc.enc_esInfaltable = 0
        GROUP BY enc.enc_id, enc.enc_nombre, enc.enc_descripcion, enc.enc_tipo, 
        enc.enc_fechaInicio, enc.enc_fechaFin, enc.enc_cantidadRegistrosPermitidos
    ) 
    as enc
    LEFT JOIN registroEncuesta reg ON enc.id = reg.enc_id
    GROUP BY id, nombre, descripcion, tipo, fechaInicio, fechaFin, 
        cantidadRegistrosPermitidos
    HAVING enc.cantidadRegistrosPermitidos >= MAX(IFNULL(reg.reg_registro, 0))
```

## Ultima actualizacion

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 23 de mayo de 2022.</b> </i> 
    </small> 
    <small> 
        <i> Actualizado por: <b> Julian A. Ortiz.</b> </i> 
    </small> 
</div>
