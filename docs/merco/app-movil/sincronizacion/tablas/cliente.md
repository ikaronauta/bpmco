---
title: cliente
slug: /tabla-cliente
---


## Endpoint 1

```js title="Condiciones"
if (!mPrefs.getString("jerarquia", "").equals("P"))
```

```js title="EndPoint"
Metodo.SINCRONIZARCLIENTES

SINCLI
```

### Tablas

-  ```clmer_cliente```
-  ```clmer_clienteZona```
-  ```clmer_mercaderista```
-  ```clmer_clienteMercaderista```
-  ```clmer_fotoCliente```
-  ```clmer_cliente```
-  ```clmer_clienteZona```
-  ```clmer_mercaderista```
-  ```clmer_fotoCliente```

### Consulta A 

```js title="Condiciones"
if (jerarquia.Equals("S"))
```

```sql title="Query"
SELECT DISTINCT cl.cli_id 'sin_id','a' operacion, cl.cli_ptoventa,
    LTRIM(RTRIM(cl.cli_codSAP)) cli_codSAP, cl.cli_nombre, cl.cli_ciudad, 
    ISNULL(cm.clmer_mercaderista, me.mer_cedula), '''155'', ''156'', ''157'', 
        ''158'', ''159'', ''160'', ''161'', ''162'', ''163'', ''164'', ''165'', 
        ''166'', ''167'', ''168'', ''169'', ''170'', ''171'', ''172'', ''173'', 
        ''174'', ''175'', ''176'', ''177'', ''178'', ''179'', ''180'', ''181'', 
        ''182'', ''183'', ''184'', ''185'', ''186'', ''187'', ''188'', ''189'', 
        ''190'', ''191'', ''192'', ''193'', ''194'', ''195'', ''196'', ''197'', 
        ''198'', ''199'', ''200'', ''201'', ''202'', ''203'', ''204'', ''205'', 
        ''206'', ''207'', ''208'', ''209'', ''210'', ''211'', ''212'', ''213'', 
        ''214'', ''215''', cl.cli_coordenadas, cli_codigoEAN, 
CASE WHEN fc.fot_foto 
IS NULL THEN '0' ELSE '1' END, cli_direccion, cli_canal, ISNULL(cl.cli_modulos, ''), 
    ISNULL(cl.cli_codigoPadre, ''), cl.regId, cl.cli_formato, '', cl.cli_subCanal, 
    ISNULL(cl.cli_frecuenciaVisita, ''), 
    ISNULL(cl.cli_categorizacionGarganta, ''), 
    ISNULL(cl.cli_categorizacionProbioticos, ''), 
    ISNULL(cl.cli_categorizacionPoderada, '')
FROM clmer_cliente cl
    INNER JOIN clmer_clienteZona cz ON cl.cli_id = cz.cli_id
    INNER JOIN clmer_mercaderista me ON cz.zona = me.mer_zona
    LEFT JOIN clmer_clienteMercaderista cm ON cl.cli_id = cm.clmer_clienteId 
    AND cm.clmer_mercaderista = me.mer_cedula
    LEFT JOIN clmer_fotoCliente fc ON cl.cli_id = fc.cli_id
WHERE (me.mer_jefeDoc = @cedula OR me.mer_cedula= @cedula) AND cl.cli_valido = '1'
```

### Consulta B

```js title="Condiciones"
else if (jerarquia.Equals("E"))
```

```sql title="Query"
SELECT DISTINCT cl.cli_id 'sin_id','a' operacion, cl.cli_ptoventa,
    LTRIM(RTRIM(cl.cli_codSAP)) cli_codSAP, cl.cli_nombre, cl.cli_ciudad, '', '', 
        cl.cli_coordenadas, cli_codigoEAN, 
CASE WHEN fc.fot_foto IS NULL THEN '0' ELSE '1' END, cli_direccion, 
    REPLACE(REPLACE(REPLACE(cli_canal,'1','5'),'2','6'),'3','4'), 
    ISNULL(cl.cli_modulos, ''), 
    ISNULL(cl.cli_codigoPadre, ''), cl.regId, cl.cli_formato, '', cl.cli_subCanal, 
    ISNULL(cl.cli_frecuenciaVisita, ''), 
    ISNULL(cl.cli_categorizacionGarganta, ''), 
    ISNULL(cl.cli_categorizacionProbioticos, ''), 
    ISNULL(cl.cli_categorizacionPoderada, '')
FROM clmer_cliente cl
    INNER JOIN clmer_clienteZona cz ON cl.cli_id = cz.cli_id
    INNER JOIN clmer_mercaderista me ON cz.zona = me.mer_zona
    LEFT JOIN clmer_fotoCliente fc ON cl.cli_id = fc.cli_id
WHERE me.mer_cedula = @cedula AND cl.cli_valido = '1'  
```

### Consulta C

```js title="Condiciones"
else (jerarquia.Equals("E"))
```

```sql title="Query"
SELECT DISTINCT cl.cli_id 'sin_id','a' operacion, cl.cli_ptoventa,
    LTRIM(RTRIM(cl.cli_codSAP)) cli_codSAP, cl.cli_nombre, cl.cli_ciudad, 
    ISNULL(cm.clmer_mercaderista, me.mer_cedula), '''155'', ''156'', ''157'', 
        ''158'', ''159'', ''160'', ''161'', ''162'', ''163'', ''164'', ''165'', 
        ''166'', ''167'', ''168'', ''169'', ''170'', ''171'', ''172'', ''173'', 
        ''174'', ''175'', ''176'', ''177'', ''178'', ''179'', ''180'', ''181'', 
        ''182'', ''183'', ''184'', ''185'', ''186'', ''187'', ''188'', ''189'', 
        ''190'', ''191'', ''192'', ''193'', ''194'', ''195'', ''196'', ''197'', 
        ''198'', ''199'', ''200'', ''201'', ''202'', ''203'', ''204'', ''205'', 
        ''206'', ''207'', ''208'', ''209'', ''210'', ''211'', ''212'', ''213'', 
        ''214'', ''215''', cl.cli_coordenadas, cli_codigoEAN, 
CASE WHEN fc.fot_foto IS NULL THEN '0' ELSE '1' END, cli_direccion, cli_canal, 
    ISNULL(cl.cli_modulos, ''), ISNULL(cl.cli_codigoPadre, ''), cl.regId, 
        cl.cli_formato, '', cl.cli_subCanal, 
    ISNULL(cl.cli_frecuenciaVisita, ''), 
    ISNULL(cl.cli_categorizacionGarganta, ''), 
    ISNULL(cl.cli_categorizacionProbioticos, ''), 
    ISNULL(cl.cli_categorizacionPoderada, '')
FROM clmer_cliente cl
    INNER JOIN clmer_clienteZona cz ON cl.cli_id = cz.cli_id
    INNER JOIN clmer_mercaderista me ON cz.zona = me.mer_zona
    LEFT JOIN clmer_clienteMercaderista cm ON cl.cli_id = cm.clmer_clienteId 
        AND cm.clmer_mercaderista = me.mer_cedula
    LEFT JOIN clmer_fotoCliente fc ON cl.cli_id = fc.cli_id
WHERE me.mer_cedula = @cedula AND cl.cli_valido = '1' AND @cedula != '2222'
UNION
SELECT DISTINCT cl.cli_id 'sin_id','a' operacion, cl.cli_ptoventa,
    LTRIM(RTRIM(cl.cli_codSAP)) cli_codSAP, cl.cli_nombre, cl.cli_ciudad, 
    CASE WHEN @cedula = '2222' THEN '' 
    ELSE ISNULL(cm.clmer_mercaderista, me.mer_cedula) END, '''155'', ''156'', 
        ''157'', ''158'', ''159'', ''160'', ''161'', ''162'', ''163'', ''164'', 
        ''165'', ''166'', ''167'', ''168'', ''169'', ''170'', ''171'', ''172'', 
        ''173'', ''174'', ''175'', ''176'', ''177'', ''178'', ''179'', ''180'', 
        ''181'', ''182'', ''183'', ''184'', ''185'', ''186'', ''187'', ''188'', 
        ''189'', ''190'', ''191'', ''192'', ''193'', ''194'', ''195'', ''196'', 
        ''197'', ''198'', ''199'', ''200'', ''201'', ''202'', ''203'', ''204'', 
        ''205'', ''206'', ''207'', ''208'', ''209'', ''210'', ''211'', ''212'', 
        ''213'', ''214'', ''215''', cl.cli_coordenadas, cli_codigoEAN, 
    CASE WHEN fc.fot_foto IS NULL THEN '0' ELSE '1' END, cli_direccion, cli_canal, 
        ISNULL(cl.cli_modulos, ''), ISNULL(cl.cli_codigoPadre, ''), cl.regId, 
            cl.cli_formato, '', cl.cli_subCanal, 
        ISNULL(cl.cli_frecuenciaVisita, ''), 
        ISNULL(cl.cli_categorizacionGarganta, ''), 
        ISNULL(cl.cli_categorizacionProbioticos, ''), 
        ISNULL(cl.cli_categorizacionPoderada, '')
FROM clmer_cliente cl
    INNER JOIN clmer_clienteZona cz ON cl.cli_id = cz.cli_id
    INNER JOIN clmer_mercaderista me ON cz.zona = me.mer_zona
    INNER JOIN clmer_Regional reg ON cl.cli_regional = reg.regId
    LEFT JOIN clmer_clienteMercaderista cm ON cl.cli_id = cm.clmer_clienteId 
        AND cm.clmer_mercaderista = me.mer_cedula
    LEFT JOIN clmer_fotoCliente fc ON cl.cli_id = fc.cli_id
WHERE cl.cli_valido = '1' 
    AND cl.cli_canal = CASE WHEN @cedula = '2222' THEN 3 ELSE cl.cli_canal END
    AND reg.regId = CASE WHEN @cedula = '2222' THEN 3 ELSE reg.regId END
    AND me.mer_cedula = CASE WHEN @cedula = '2222' THEN me.mer_cedula 
    ELSE @cedula END
```

***

## Endpoint 2

```js title="Condiciones"
if (!mPrefs.getString("jerarquia", "").equals("P"))
```

```js title="EndPoint"
Metodo.SINCRONIZARCLIENTES

SINCLIACT
```

### Tablas

- ```clmer_actividadCliente```  
- ```clmer_cliente ``` 
- ```clmer_kamCliente```  

### Consulta A

```sql title="Query"
SELECT DISTINCT c.cli_id, 'a', c.cli_codSAP, c.cli_nombre, c.cli_ptoventa, 
    c.cli_canal, c.cli_regional, c.cli_direccion
    FROM clmer_actividadCliente ac
        INNER JOIN clmer_cliente c ON ac.cliId = c.cli_id
        INNER JOIN clmer_kamCliente kc ON c.cli_jerarquia = kc.cli_jerarquia
            AND kc.regId = c.cli_regional
WHERE kc.mer_cedula = @cedula AND kc.kamEstado = 1 AND c.cli_valido = 1 
    AND CONVERT(DATE, GETDATE()) BETWEEN ac.actFechaInicio AND ac.actFechaFin
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