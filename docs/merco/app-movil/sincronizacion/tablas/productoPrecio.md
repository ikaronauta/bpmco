---
title: productoPrecio
slug: /tabla-productoPrecio
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
Metodo.SINCRONIZARPRODUCTOPRECIO

SINPROPRE
```

## Tablas

- ```clmer_productoPrecio```

## Consultas

### Consulta A

```sql title="Query"
SELECT prpId, 'a', proCodigo, ISNULL(prpPrecio, 0), 
    ISNULL(prpEstrategia, ''), 
    ISNULL(prpPrecioMin, 0), 
    ISNULL(prpPrecioMax, 0), 
    ISNULL(prpPrecioSug, 0), 
    ISNULL(prpCanal, ''), 
    ISNULL(prpSubCanal, '')
FROM clmer_productoPrecio
WHERE prpEstado = 1 
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