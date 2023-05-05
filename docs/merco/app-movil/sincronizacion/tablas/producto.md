---
title: producto
slug: /tabla-producto
---


## Endpoint

```js title="Condiciones"
if (modulo.equals("2") 
    || modulo.equals("17") 
    || modulo.equals("3") 
    || modulo.equals("4") 
    || modulo.equals("6") 
    || modulo.equals("8") 
    || modulo.equals("9") 
    || modulo.equals("10") 
    || modulo.equals("15") 
    || modulo.equals("38") 
    || modulo.equals("44"))

// highlight-next-line
if (!isSincronizando1)
```

```js title="EndPoint"
Metodo.SINCRONIZARPRODUCTOS

SIPRMOD
```

## Tablas

- ```clmer_producto```  

## Consultas

### Consulta A

```js title="Condiciones"
if (sync.Equals(S))  
```

```sql title="Query"
SELECT DISTINCT CONVERT(nvarchar(50), p.pro_codigo) sin_id, 'a' sin_tipo, 
  p.pro_nombre, p.pro_categoria, p.mar_id 
FROM clmer_producto p
```

### Consulta B

```js title="Condiciones"
if (tipo.Equals("V"))
```

```sql title="Query"
SELECT DISTINCT CONVERT(nvarchar(50), p.pro_codigo) sin_id, 'a' sin_tipo, 
  p.pro_nombre, p.pro_categoria, ISNULL(p.mar_id,0) 
FROM clmer_producto p 
WHERE (pro_nombre LIKE '%LUKI%' OR pro_nombre LIKE '%LUKE%FACIL%')
```

### Consulta C

```js title="Condiciones"
else (tipo.Equals("V"))
```

```sql title="Query"
SELECT DISTINCT CONVERT(nvarchar(50), p.pro_codigo) sin_id, 'a' sin_tipo, 
  p.pro_nombre, p.pro_categoria, 
  ISNULL(p.mar_id,0), pro_precioMin, pro_precioMax, ISNULL(pro_codigoEAN,''), 
  ISNULL(pro_codigoPLU,''), p.pro_precioSug, 0, '' --ISNULL(p.pro_subCanal, '')
FROM clmer_producto p
WHERE p.pro_estado = 1
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