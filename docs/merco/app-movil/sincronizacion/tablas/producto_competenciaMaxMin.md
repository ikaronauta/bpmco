---
title: producto_competenciaMaxMin
slug: /tabla-producto-competenciaMaxMin
---


## Endpoint

```js title="Condiciones"
if (modulo.equals("12"))
```

```js title="EndPoint"
Metodo.SINCRONIZARPRODUCTOSCOMPETENCIAMAXMIN,

SIPROCOMPMODMM
```

## Tablas

- ```clmer_sincronizacion```  
- ```clmer_productoCompetencia```  
- ```clmer_sincronizacionmercaderistatabla```  
- ```clmer_regionalciudad```  
- ```clmer_regional```

## Consultas

### Consulta A

```js title="Condiciones"
if (sync.Equals(S))
```

```sql title="Query"
SELECT sin_id, sin_tipo, pro_nombre,pro_categoria,pro_codigopro 
FROM clmer_sincronizacion si 
    JOIN clmer_productoCompetencia pc 
    ON pc.pro_codigo = si.sin_id
WHERE si.sin_tabla = 'clmer_productocompetencia' AND si.sin_fecha >= 
(
    SELECT clmer_fecha FROM clmer_sincronizacionmercaderistatabla 
    WHERE clmer_mercaderista = @mercaderista 
        AND clmer_tabla = 'productoscompetencia'
)
AND pro_regional = (
    select reg.regId from clmer_mercaderista me
        JOIN clmer_regionalciudad rc ON mer_ciudad = rc.ciudad
        JOIN clmer_regional reg ON rc.regId = reg.regId
    where me.mer_cedula = @mercaderista 
)
```

### Consulta B

```js title="Condiciones"
if (isClientescadenas(M, jerarquia))
```

```sql title="Query"
select pro_codigo, 'a' Tipo,pro_nombre,pro_categoria, pro_codigopro 
from clmer_productoCompetencia 
where pro_regional = (
    select reg.regId from clmer_mercaderista me
        JOIN clmer_regionalciudad rc ON mer_ciudad = rc.ciudad
        JOIN clmer_regional reg ON rc.regId = reg.regId
    where me.mer_cedula = @mercaderista 
) AND pro_cadena IN (0,1)
```

### Consulta C

```js title="Condiciones"
else (isClientescadenas(M, jerarquia))
```

```sql title="Query"
select pro_codigo, 'a' Tipo,pro_nombre,pro_categoria, pro_codigopro 
from clmer_productoCompetencia 
where pro_regional = (
    select reg.regId from clmer_mercaderista me
        JOIN clmer_regionalciudad rc ON mer_ciudad = rc.ciudad
        JOIN clmer_regional reg ON rc.regId = reg.regId
    where me.mer_cedula = @mercaderista 
)
AND pro_cadena = 0
```

## Ultima Actualización

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 18 de mayo de 2022.</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Julian A. Ortiz.</b>
    </i>
  </small>
</div>