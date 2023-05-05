---
title: productoscliente
slug: /tabla-productoscliente
---


## Endpoint

```js title="Condiciones"
if (modulo.equals("2") 
    || modulo.equals("17") 
    || modulo.equals("3") 
    || modulo.equals("6") 
    || modulo.equals("8") 
    || modulo.equals("9") 
    || modulo.equals("4") 
    || modulo.equals("10") 
    || modulo.equals("15") 
    || modulo.equals("38") 
    || modulo.equals("44"))

// highlight-next-line
if (!isSincronizando2)
```

```js title="EndPoint"
Metodo.SINCRONIZARPRODUCTOSCLIENTE

SINPROCLI
```

## Tablas

- ```clmer_clienteProducto```
- ```clmer_cliente```
- ```clmer_sincronizacion```
- ```clmer_sincronizacionMercaderistaTabla```
- ```clmer_clienteMercaderista```

## Consultas

### Consulta A

```js title="Condiciones"
if (sync.Equals(S))
```

```sql title="Query"
select DISTINCT cp.procli_id sin_id, 'a' sin_tipo, cp.pro_codigo, 
    cp.cli_codSAP cli_codSAP, cp.procli_valor 
FROM clmer_clienteProducto cp WHERE cp.cli_codSAP IN (
SELECT cl.cli_codSAP FROM clmer_clienteMercaderista cm 
    JOIN clmer_cliente cl ON cm.clmer_clienteid = cl.cli_Id
    JOIN clmer_sincronizacion sinc ON CONVERT(INT,sinc.sin_id) = cm.clme_id 
        AND sinc.sin_tabla = 'clmer_clienteMercaderista'
    JOIN clmer_sincronizacionMercaderistaTabla smt 
        ON smt.clmer_mercaderista = cm.clmer_mercaderista 
        AND clmer_tabla = 'clientemercaderista'
WHERE cm.clmer_mercaderista = @mercaderista AND sinc.sin_fecha >= smt.clmer_fecha)
```

### Consulta B

```js title="Condiciones"
if (jerarquia.Equals("M") 
    || jerarquia.Equals("A") 
        || jerarquia.Equals("E"))
```

```sql title="Query"
SELECT DISTINCT cp.procli_id sin_id, 'a' sin_tipo, cp.pro_codigo, 
    cp.cli_codSAP cli_codSAP, cp.procli_valor, 
    ISNULL(cp.pro_codigoPLU, '') pro_codigoPLU
FROM clmer_clienteProducto cp WHERE cp.cli_codSAP IN 
(
    SELECT DISTINCT LTRIM(RTRIM(cm.clmer_clienteSAP)) 
    FROM clmer_clienteMercaderista cm
        INNER JOIN clmer_cliente cl ON cm.clmer_clienteid = cl.cli_Id
    WHERE cm.clmer_mercaderista = @mercaderista 
        AND cm.clmer_dia >= GETDATE() - 60
)
```

### Consulta C

```js title="Condiciones"
else if (jerarquia.Equals("S"))
```

```sql title="Query"
SELECT DISTINCT cp.procli_id sin_id, 'a' sin_tipo, cp.pro_codigo, 
    cp.cli_codSAP cli_codSAP, cp.procli_valor, 
    ISNULL(cp.pro_codigoPLU, '') pro_codigoPLU
FROM clmer_clienteProducto cp WHERE cp.cli_codSAP IN 
(
    SELECT DISTINCT LTRIM(RTRIM(cm.clmer_clienteSAP)) 
    FROM clmer_clienteMercaderista cm
        INNER JOIN clmer_cliente cl 
        ON cm.clmer_clienteid = cl.cli_Id
    WHERE cm.clmer_mercaderista = @mercaderista 
    AND cm.clmer_dia >= GETDATE() - 60
) 
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