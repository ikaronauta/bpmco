---
title: planometriaEspacio
slug: /planometriaespacio
---
## Endpoint

```js title="EndPoint"
Metodo.SINCRONIZARPLANOMETRIASESPACIOS

SINPLAESP
```

## Tablas

- ```clmer_planometriasEspaciosPDV```

## Consultas

### Consulta A

```sql title="Query"
DECLARE @hoy DATE = CONVERT(DATE, GETDATE())
SELECT plaId, 'a' tipo, cliId, ccat_codigo, plaPlanometria
FROM clmer_planometriasEspaciosPDV
WHERE DATEPART(MONTH, @hoy) = plaMes    
    AND DATEPART(YEAR, @hoy) = plaAnno
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 20 de mayo de 2022.</b> </i> 
    </small> 
    <small> 
        <i> Actualizado por: <b> Julian A. Ortiz.</b> </i> 
    </small> 
</div>
