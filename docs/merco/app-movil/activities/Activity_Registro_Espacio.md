---
title: Activity_Registro_Espacio
slug: /activity-registro-espacio
---
## Descripción

## Ruta

```js
Project\merco\app\src\main\java\com\bpmco\appmerco\Activity_Registro_Espacio.java
```

## Tablas

- ```clasificacion_categoria_registro``` - (Pendiente)
- [```cliente```](./../sincronizacion/tablas/cliente.md)
- ```configuracion``` - (Pendiente)
- ```motivo_espacio```
- [```opcion_espacio```](./../sincronizacion/tablas/opcion_espacio.md)
- ```registro_categoria_espacios``` - (Pendiente)
- [```registro_espacios```](./../sincronizacion/tablas/registro_espacios.md)
- [```registro_opciones_espacios```](./../sincronizacion/tablas/registro_opciones_espacios.md)

## Modulos

[`Registro Espacios`](../modules/modulo-5.md)

## Consultas

### Consulta A

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerCliente().getClientePorId(clienteActual.getCli_id())
```

```sql title="Query"
SELECT cli_id, cli_ptoventa, cli_codigoSap, cli_socioComercial, cli_ciudad, cli_categorias,
    cli_enviado, mer_documento, cli_contador, cli_coordenada, cli_rutaImagen, cli_codigoEAN, cli_fotoFachada,
    cli_direccion, cli_canal, cli_modulos, cli_codigoPadre, reg_id, cli_formato, cli_presupuesto, cli_subCanal,
    cli_frecuenciaVisita, cli_categorizacionGarganta, cli_categorizacionProbiotico, cli_categorizacionPonderada
FROM cliente WHERE cli_id = ? LIMIT 1

Cursor cursor = db.rawQuery(selectQuery, new String[]{id})
```

### Consulta B

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerMotivoEspacio().getMotivos()
```

```sql title="Query"
SELECT me_id, me_motivo, me_requiereObservacion, me_tipo 
FROM motivo_espacio
```

### Consulta C

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerOpcionesEspacio().getOpciones()
```

```sql title="Query"
SELECT DISTINCT opc_codigo, opc_texto, opc_espacio
FROM opcion_espacio
```

### Consulta D

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerCategoriaRegistro().getCategorias(Integer.parseInt(clienteActual.getCli_id()), categoria.getCcat_codigo())
```

```sql title="Query"
SELECT DISTINCT ccr_codigo, ccr_nombre, ccr_color, cli_id, ccat_codigo, ccr_orden, ccr_imagen, ccr_id
FROM clasificacion_categoria_registro 
WHERE cli_id = ? AND ccat_codigo = ? 
ORDER BY ccr_orden, ccr_nombre

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(clienteId), String.valueOf(categoriaId)})               
```

### Consulta E

:::tip TIPO
**_Select_**
:::

```js title="Método desde donde se invoca"
protected void onCreate(Bundle savedInstanceState)
```

```js title="Método"
manejador.getHandlerRegistroEspacios().getRegistroCategoria(clienteMercaderistaActual.getClme_id()
```

```sql title="Query"
SELECT rees_codigo, rees_fecha, sessionId, ccat_codigo, rees_coordenada, 
    rees_observaciones, rees_registroCuadricula
FROM registro_espacios 
WHERE sessionId = ? AND ccat_codigo = ? AND rees_fecha = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(sessionId),String.valueOf(categoriaId),fecha})                          
```

### Consulta F

:::tip TIPO
**Update**
:::

```js title="Método desde donde se invoca"
private boolean modificarRegistroOpciones()
```

```js title="Método"
manejador.getHandlerRegistroOpcionesEspacios().updateRegistroOpcionEspacio(registroOpcion)
```

```sql title="Query"
db.update
    (
        registro_opciones_espacios, 
        values, " sessionId  = ? AND categoriaId = ? AND opcionId = ? AND fecha = ?",
        new String[]
            {
                String.valueOf(registroOpcion.getSessionId()), 
                String.valueOf(registroOpcion.getCcat_codigo()), 
                String.valueOf(registroOpcion.getOpc_codigo()), 
                registroOpcion.getRoe_fecha()
            }
    )                         
```

### Consulta G

:::tip TIPO
***Update***
:::

```js title="Método desde donde se invoca"
private boolean modificarRegistro()
```

```js title="Método"
manejador.getHandlerRegistroEspacios().updateRegistroEspacio(registro)
```

```sql title="Query"
db.update
    (
        registro_espacios, 
        values, " sessionId  = ? AND ccat_codigo = ? AND rees_fecha = ?",
        new String[]
            {
                String.valueOf(registro.getSessionId()), 
                String.valueOf(registro.getCcat_codigo()), 
                registro.getRees_fecha()
            }
    )                       
```

### Consulta H

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private boolean almacenarRegistroOpciones()
```

```js title="Condiciones"
if (checkBox != null)

// highlight-next-line
else (!mPrefs.getString("usuario", "").equals(""))
```

```js title="Método"
manejador.getHandlerConfiguracion().getDocumentoMercaderista()
```

```sql title="Query"
SELECT conf_usuario 
FROM configuracion 
WHERE conf_usuario <> ''                      
```

### Consulta I

```js title="Método desde donde se invoca"
private boolean almacenarRegistroOpciones()
```

```js title="Condiciones"
if (checkBox != null)
```

```js title="Método"
manejador.getHandlerRegistroOpcionesEspacios().addRegistroOpcionEspacio(registroOpcion)
```

### Consulta J

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private boolean almacenarRegistro()
```

```js title="Condiciones"
else (!mPrefs.getString("usuario", "").equals(""))
        registro.setConf_usuario(mPrefs.getString("usuario", ""))
```

```js title="Método"
manejador.getHandlerConfiguracion().getDocumentoMercaderista())
```

```sql title="Query"
SELECT conf_usuario 
FROM configuracion 
WHERE conf_usuario <> ''                 
```

### Consulta K


```js title="Método desde donde se invoca"
private boolean almacenarRegistro()
```

```js title="Método"
manejador.getHandlerRegistroEspacios().addRegistroEspacio(registro)
```

### Consulta L

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarObjetoRegistro(MER_RegistroEspacios item)
```

```js title="Condiciones"
if (item != null)
```

```js title="Método"
manejador.getHandlerRegistroMedidaEspacio().getRegistrosCategoria(codigo)
```

```sql title="Query"
SELECT codigo, codigoRegistro, categoriaId, medida, porcentaje
FROM registro_categoria_espacios 
WHERE codigoRegistro = ?   

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(codigo)})
```

### Consulta M

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void cargarObjetoRegistro(MER_RegistroEspacios item)
```

```js title="Condiciones"
else (item != null)
```

```js title="Método"
manejador.getHandlerRegistroMedidaEspacio().getRegistrosCategoria(0)
```

```sql title="Query"
SELECT codigo, codigoRegistro, categoriaId, medida, porcentaje
FROM registro_categoria_espacios 
WHERE codigoRegistro = ?

Cursor cursor = db.rawQuery(selectQuery, new String[]{String.valueOf(codigo)})
```

### Consulta N

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private void addOpciones(MER_OpcionesEspacios item, String modo)
```


```js title="Método"
anejador.getHandlerRegistroOpcionesEspacios().getRegistrosOpcionCategoria(clienteMercaderistaActual.getClme_id(),categoria.getCcat_codigo(), Utilidades.getDate())
```

```sql title="Query"
SELECT fecha, sessionId, categoriaId, opcionId, checked
FROM registro_opciones_espacios 
WHERE sessionId = ? AND categoriaId = ? AND fecha = ?

Cursor cursor = db.rawQuery
    (
        selectQuery, new String[]
            {
                String.valueOf(sessionId), 
                String.valueOf(categoriaId), 
                fecha
            }
    )
```

### Consulta O

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private boolean almacenarMedidaEspacio(long id)
```

```js title="Condiciones"
if (mPrefs.getString("empresa", "").equals("LUK") && !cpvCliente.getCli_canal().equals("14"))

if (!txtCategoriaRegistro.getText().toString().equals("") || categoria.getCcr_texto().equals("OTRAS MARCAS"))

// highlight-next-line
else (!mPrefs.getString("usuario", "").equals(""))
```

```js title="Método"
manejador.getHandlerConfiguracion().getDocumentoMercaderista()
```

```sql title="Query"
SELECT conf_usuario 
FROM configuracion 
WHERE conf_usuario <> ''
```

### Consulta P

:::tip TIPO
***Select***
:::

```js title="Método desde donde se invoca"
private boolean almacenarMedidaEspacio(long id)
```

```js title="Condiciones"
else (mPrefs.getString("empresa", "").equals("LUK") && !cpvCliente.getCli_canal().equals("14"))

if (!txtCategoriaRegistro.getText().toString().equals(""))

// highlight-next-line
else (!mPrefs.getString("usuario", "").equals(""))
```

```js title="Método"
manejador.getHandlerConfiguracion().getDocumentoMercaderista()
```

```sql title="Query"
SELECT conf_usuario 
FROM configuracion 
WHERE conf_usuario <> ''
```

### Consulta Q

```js title="Método desde donde se invoca"
private boolean almacenarMedidaEspacio(long id)
```

```js title="Método"
manejador.getHandlerRegistroMedidaEspacio().addRegistrosMedida(registros)
```

```js title="Query"
if(registroMedida.size() > 0)
    {
        for(MER_RegistroMedidaEspacio regMed : registroMedida)
        {
            addRegistroMedida(regMed);
        }
    }
```

### Consulta R

:::tip TIPO
***Update***
:::

```js title="Método desde donde se invoca"
private boolean modificarMedidaEspacio()
```

```js title="Condiciones"
if (!txtCategoriaRegistro.getText().toString().equals("") 
    || categoria.getCcr_texto().equals("OTRAS MARCAS"))
```

```js title="Método"
manejador.getHandlerRegistroMedidaEspacio().updateRegistrosMedida(medida, porcentaje, id, categoria.getCcr_codigo())
```

```sql title="Query"
db.update
    (
        registro_categoria_espacios, 
        values, " codigoRegistro  = ? AND categoriaId = ?",
        new String[]
            {
                String.valueOf(id), 
                String.valueOf(codigo)
            }
    )
```

## Ultima actualización

<div class='ultima-actualizacion'> 
    <small> 
        <i> Ultima actualizacion: <b> 20 de mayo de 2022.</b> </i> 
    </small> 
    <small> 
        <i> Actualizado por: <b> Julian A. Ortiz.</b> </i> 
    </small>
</div>
