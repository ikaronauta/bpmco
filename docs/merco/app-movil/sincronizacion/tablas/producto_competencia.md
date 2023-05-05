---
title: producto_competencia
slug: /tabla-producto-competencia
---

## Endpoint

```js title="Condiciones"
if (modulo.equals("4") || modulo.equals("10") || modulo.equals("44"))

// highlight-next-line
if (!isSincronizando3)
```

```js title="EndPoint"
Metodo.SINCRONIZARPRODUCTOSCOMPETENCIA

SIPROCOMPMOD_V2
```

## Tablas

- ```clmer_sincronizacion```  
- ```clmer_sincronizacionmercaderistatabla```  
- ```clmer_regionalciudad```  
- ```clmer_regional```  
- ```clmer_productoCompetencia```

## Consultas

### Consulta A

```js title="Condiciones"
if (sync.Equals(S))      
```

```sql title="Query"
SELECT sin_id, sin_tipo, pro_nombre,pro_categoria,pro_codigopro, mar_id 
FROM clmer_sincronizacion si JOIN clmer_productoCompetencia pc ON pc.pro_codigo = si.sin_id
WHERE si.sin_tabla = 'clmer_productocompetencia' AND si.sin_fecha >= 
(
  SELECT clmer_fecha FROM clmer_sincronizacionmercaderistatabla 
  WHERE clmer_mercaderista = @mercaderista AND clmer_tabla = 'productoscompetencia'
)
AND pro_regional = (
  select reg.regId from clmer_mercaderista me
    JOIN clmer_regionalciudad rc ON mer_ciudad = rc.ciudad
    JOIN clmer_regional reg ON rc.regId = reg.regId
  where me.mer_cedula = @mercaderista 
) AND mar_id IS NOT NULL"
```

### Consulta B

```js title="Condiciones"
else (sync.Equals(S))
```

```sql title="Query"
select pro_codigo, 'a' Tipo,pro_nombre,pro_categoria, pro_codigopro, 
  mar_id, pro_canal 
from clmer_productoCompetencia 
where pro_regional = (
  select reg.regId from clmer_mercaderista me
    JOIN clmer_regionalciudad rc ON mer_ciudad = rc.ciudad
    JOIN clmer_regional reg ON rc.regId = reg.regId
  where me.mer_cedula = @mercaderista 
)
AND ISNULL(pro_cadena, 0) = 0 AND pro_estado = 1 AND mar_id IS NOT NULL 
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