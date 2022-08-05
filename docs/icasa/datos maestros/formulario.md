---
sidebar_position: 2
title: Formulario
slug: /formulario
---

Estos formularios se encuentran desarrollados en **_[Framework7](https://framework7.io/)_** y cuentan con una estructura básica que se divide en tres secciones principales.

## Sección 1

Esta sección cuenta con dos opciones **Individual** y **Masivo**, las cuales se presentan a través inputs tipo radio. El funcionamiento interno de cada opción es la misma en los dos casos, la cual consiste en ingresar información y almacenar en una **_Grid_**, la diferencia radica en la forma en que el usuario ingresa la información en el sistema.

_Vista Sección 1_  
![Sección 1](./img/seccion1.PNG "Sección 1")

### Individual

Esta opción se elige cuando se va a ingresar un solo registro y su funcionamiento es a través de un formulario normal con sus campos para ingresar información.

En este caso la información se ingresaría en una sola fila de la **_Grid_**.

### Masivo

En caso de que se deban ingresar varios registros, se cargan los datos a través de una plantilla en Excel, esto con la finalidad de facilitar la carga masiva de información.

Cada registro de la plantilla ingresaría en una fila de la **_Grid_**.

## Sección 2

_Vista Sección 2_  
![Sección 2](./img/seccion2.PNG "Sección 2")

### Crear

Opción para crear **_Proveedores_**, **_Clientes_** y **_Materiales_**.

### Modificar

Opción para modificar **_Proveedores_**, **_Clientes_** y **_Materiales_**.

### Ampliación

Dado a que el cliente maneja internamente varias sociedades, en caso de que ya se encuentre creado para una sociedad un **_Proveedor_**, **_Cliente_** o **_Material_** y se desee asignar uno de estos a otra sociedad diferente, no es necesario volver a crearlo, sino que por medio de esta opción se asigna a la sociedad que lo requiere.

### Bloqueo/Desbloqueo

Opción para bloquear o desbloquear **_Proveedores_**, **_Clientes_** y **_Materiales_** según criterios establecidos por el cliente.

## Sección 3

### Tablas Maestras

Se refiere a todos los procedimientos y lógica interna del sistema para el almacenamiento de la información en la base de datos, así como su consulta o modificación por parte de los usuarios.

## Funcionamiento Interno

### Carga Datos Maestros

Procedimiento llevado a cabo a atreves de un método general en un script llamado `datosMaestros.js` ubicado en la siguiente ruta:

```js title="Ruta datosMaestros.js"
raiz\solicitudes\plantillas\Icasa\js
```

### Lógica Opciones

Procedimiento llevado a cabo a atreves de un método general en un script llamado `datosMaestros.js` ubicado en la siguiente ruta:

```js title="Ruta datosMaestros.js"
raiz\solicitudes\plantillas\Icasa\js
```

### Validación

Procedimiento llevado a cabo a atreves de un método general en un script llamado `htmlGrid.js` ubicado en la siguiente ruta:

```js title="Ruta htmlGrid.js"
Pendiente;
```

### Grabado

Dado que el procedimiento de guardar la información es igual para todos los formularios se hace a atreves de un método general en un script llamado `datosMaestros.js` ubicado en la siguiente ruta:

```js title="Ruta datosMaestros.js"
raiz\solicitudes\plantillas\Icasa\js
```

## Update

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 04 de Agosto de 2022.</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Julian A. Ortiz.</b>
    </i>
  </small>
</div>
