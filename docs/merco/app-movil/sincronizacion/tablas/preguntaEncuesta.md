---
title: preguntaEncuesta
slug: /preguntaencuesta
---

## Endpoint

```js title="Condiciones"
if (modulo.equals("14"))
```

```js title="EndPoint"
Metodo.SINCRONIZARPREGUNTASENCUESTA

SINPREENC
```

## Tablas

## Consultas

### Consulta A 

```sql title="Query"
SELECT pre_id
    , 'a' AS 'sin_tipo'
    , ISNULL(pre_texto, '')
    , ISNULL(pre_peso, 0)
    , ISNULL(pre_orden, 0)
    , ISNULL(pre_ayuda, '')
    , ISNULL(tip_id, '')
    , ISNULL(pre_orientacion, '')
    , ISNULL(pre_tipoCampo, '')
    , CONVERT(NVARCHAR(5), pre_requerida)
    , CONVERT(NVARCHAR(5), pre_anidada)
    , p.enc_id
FROM clmer_enc_pregunta p
    INNER JOIN clmer_enc_encuesta enc ON p.enc_id = enc.enc_id
WHERE pre_estado = 1 AND enc_estado = 1
AND enc.enc_fechaFin >= CONVERT(DATE, GETDATE())
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 23 de mayo de 2022.</b> </i> 
    </small> 
    <small> 
        <i> Actualizado por: <b> Julian A. ortiz.</b> </i> 
    </small> 
</div>
