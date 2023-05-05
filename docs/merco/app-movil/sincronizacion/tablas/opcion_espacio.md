---
title: opcion_espacio
slug: /opcion-espacio
---
## Endpoint

```js title="EndPoint"
Metodo.SINCRONIZAROPCIONESESPACIOS

SIOEO
```

## Tablas

- ```clmer_OpcionesEspacio```
- ```clmer_sincronizacion```
- ```clmer_sincronizacionMercaderistaTabla```

## Consultas
    
### Consulta A

```sql title="Query"
SELECT clmer_sync 
FROM clmer_sincronizacionMercaderistaTabla 
WHERE clmer_tabla = 'OpcionesEspacio' 
    AND clmer_mercaderista = @mercaderista
```

### Consulta B

```js title="Condiciones"
if (S.Equals(sync))
```

```sql title="Query"
select opc_codigo 'sin_id','a' as 'sin_tipo', opc_txt texto, opc_esp opcion
FROM clmer_OpcionesEspacio pc 
    JOIN clmer_sincronizacion sinc 
        ON CONVERT(INT,sinc.sin_id) = pc.opc_codigo 
        AND sinc.sin_tabla = 'OpcionesEspacio'	
    JOIN clmer_sincronizacionMercaderistaTabla smt 
        ON smt.clmer_tabla = 'OpcionesEspacio' 
        AND clmer_mercaderista = @mercaderista
WHERE sinc.sin_fecha >= smt.clmer_fecha
```

### Consulta C

```js title="Condiciones"
else (S.Equals(sync))
```

```sql title="Query"
SELECT opc_codigo 'sin_id','a' as 'sin_tipo', opc_txt texto, opc_esp opcion
FROM clmer_OpcionesEspacio
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
