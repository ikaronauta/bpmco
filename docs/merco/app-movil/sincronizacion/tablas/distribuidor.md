---
title: distribuidor
slug: /distribuidor
---
## Endpoint

```js title="Condiciones"
if (modulo.equals("6"))
```

```js title="Endpoint"
Metodo.SINCRONIZARDISTRIBUIDOR

SID
```

## Tablas

- ```clmer_distribuidor```
- ```clmer_sincronizacion```
- ```clmer_sincronizacionMercaderistaTabla```

## Consultas

### Consulta A 

```sql title="Query"
SELECT clmer_sync 
FROM clmer_sincronizacionMercaderistaTabla 
WHERE clmer_tabla = 'distribuidores' 
    AND clmer_mercaderista = @mercaderista
```

### Consulta B 

```js title="Condiciones"
if (jerarquia.Equals("S"))
```

```sql title="Query"
SELECT dis_id 'sin_id', 'a' sin_tipo,dis_nombre, dis_nit, dis_codigoSAP, 
    dis_canal, dis_poblacion, dis_pago
FROM clmer_distribuidor dis
    JOIN clmer_sincronizacion sinc ON CONVERT(INT,sinc.sin_id) = dis.dis_id 
        AND sinc.sin_tabla = 'clmer_distribuidor'	
    JOIN clmer_sincronizacionMercaderistaTabla smt 
        ON smt.clmer_tabla = 'distribuidores' 
        AND clmer_mercaderista = @mercaderista
WHERE sinc.sin_fecha >= smt.clmer_fecha
```

### Consulta C 

```js title="Condiciones"
else (jerarquia.Equals("S"))
```

```sql title="Query"
SELECT dis_id 'sin_id', 'a' sin_tipo,dis_nombre, dis_nit, dis_codigoSAP, 
    dis_canal, dis_poblacion, dis_pago
FROM clmer_distribuidor
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
