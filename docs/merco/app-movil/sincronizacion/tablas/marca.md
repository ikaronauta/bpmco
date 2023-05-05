---
title: marca
slug: /marca
---

## Endpoint 1

```js title="Condiciones"
if (modulo.equals("2") 
    || modulo.equals("17") 
    || modulo.equals("3") || modulo.equals("6") 
    || modulo.equals("8") || modulo.equals("9") 
    || modulo.equals("4") || modulo.equals("10") 
    || modulo.equals("15") || modulo.equals("38") 
    || modulo.equals("44"))

if (!isSincronizando2)
```

```js title="EndPoint"
Metodo.SINCRONIZARMARCAS

SIMAR
```

### Tablas

- ```clmer_marca_chequeoPrecio```

### Consulta A

```sql title="Query"
SELECT mar_id 'sin_id', 'a' AS 'sin_tipo', mar_nombre, cat_id
FROM clmer_marca_chequeoPrecio
```

## Endpoint 2

```js title="Condiciones"
if (modulo.equals("10"))
```

```js title="EndPoint"
Metodo.SINCRONIZARMARCAS

SIMAR
```

### Tablas

- ```clmer_marca_chequeoPrecio```

### Consulta A

```sql title="Query"
SELECT mar_id 'sin_id', 'a' AS 'sin_tipo', mar_nombre, cat_id
FROM clmer_marca_chequeoPrecio
```

## Endpoint 3

```js title="Condiciones"
if (modulo.equals("21") 
    || modulo.equals("22") 
    || modulo.equals("23") 
    || modulo.equals("25") 
    || modulo.equals("26"))

if (!isSincronizando6)
```

```js title="EndPoint"
Metodo.SINCRONIZARMARCASACTIVADORES

SINACTMA
```

### Tablas

- ```clmer_act_marca```

### Consulta A

```sql title="Query"
SELECT mar_id 'sin_id', 'a' AS 'sin_tipo', mar_nombre 
FROM clmer_act_marca
```

## Ultima actualización
<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualización: <b> 19 de mayo de 2022.</b> </i> 
    </small> 
    <small>
        <i> Actualizado por: <b> Julian A. Ortiz.</b> </i> 
    </small> 
</div>