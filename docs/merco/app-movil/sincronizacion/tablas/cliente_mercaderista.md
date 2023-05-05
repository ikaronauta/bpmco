---
title: cliente_mercaderista
slug: /tabla-cliente-mercaderista
---

## Endpoint

```js title="Condiciones"
if (clonarRutero.equals("1"))
```

```js title="EndPoint"
Metodo.SINCRONIZARCLIENTESMERCADERISTA

SICM
```

## Tablas

- ```clmer_clienteMercaderista```
- ```clmer_cliente```  
- ```clmer_sincronizacion```  
- ```clmer_sincronizacionMercaderistaTabla```  

## Consultas

### Consulta A

```js title="Condiciones"
if (sync != null)

// highlight-next-line
if (sync.ToString().Equals(S))
```

```sql title="Query"
SELECT cm.clme_Id sin_id, sinc.sin_tipo ,cm.clmer_clienteId, cm.clmer_clienteSAP 
    clmer_clienteSAP, cm.clmer_mercaderista, 
    CONVERT(NVARCHAR(10), cm.clmer_dia, 103) clmer_dia, cm.clmer_ini,
        cm.clmer_horafin
FROM clmer_clienteMercaderista cm 
    JOIN clmer_sincronizacion sinc ON CONVERT(INT,sinc.sin_id) = cm.clme_id 
        AND sinc.sin_tabla = 'clmer_clienteMercaderista'
    JOIN clmer_sincronizacionMercaderistaTabla smt 
        ON smt.clmer_mercaderista = cm.clmer_mercaderista 
        AND clmer_tabla = 'clientemercaderista'
WHERE cm.clmer_mercaderista = @mercaderista AND sinc.sin_fecha >= clmer_fecha
```

### Consulta B

```js title="Condiciones"
if (sync != null)

// highlight-next-line
else (sync.ToString().Equals(S))
```

```sql title="Query"
SELECT cm.clme_Id sin_id, 'a' sin_tipo,cm.clmer_clienteId, 
    LTRIM(RTRIM(cm.clmer_clienteSAP))clmer_clienteSAP, cm.clmer_mercaderista, 
    CONVERT(NVARCHAR(10), cm.clmer_dia, 103) clmer_dia, 
        cm.clmer_ini,cm.clmer_horafin
FROM clmer_clienteMercaderista cm
    INNER JOIN clmer_cliente cl ON cm.clmer_clienteId = cl.cli_id
WHERE cm.clmer_mercaderista = @mercaderista 
    AND cm.clmer_dia >= DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE()))
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