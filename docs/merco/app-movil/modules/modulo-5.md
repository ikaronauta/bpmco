---
sidebar_position: 2
title: Registro Espacios
slug: /registro_espacios
---

## ID 5

## Descripción

## Preferences

```js
prefsEditor.putString("tareaActual", "RegistroEspacios")
```

## Activities

<details>
<summary>
<div class="title-activitie">

### Activity_Categorias_Espacio
[Ver Activitie](../activities/Activity_Categorias_Espacio.md)
</div>  
</summary>

La **````Activity_Categorias_Espacio````** tiene las siguientes activities:  

<details>
<summary>
<div class="title-activitie">

#### Activity_Registro_Espacio
[Ver Activitie](../activities/Activity_Registro_Espacio.md)
</div>
</summary>

La **```Activity_Registro_Espacio```** tiene la siguiente condición:
```js
else (mPrefs.getString("tareaActual", "").equals("RegistroEspaciosObservacion"))
```

Así mismo tiene las siguientes activities:

<details>
<summary>
<div class="title-activitie">

#### Activity_Foto_Espacio
[Ver Activitie](../activities/Activity_Foto_Espacio.md)
</div>
</summary>

La **```Activity_Foto_Espacio```** tiene la siguiente condición:
```js
if (view == fab_marcarFoto)
```
</details>

<details>
<summary>
<div class="title-activitie">

#### Activity_Registro_Espacio_Cuadricula
[Ver Activitie](../activities/Activity_Registro_Espacio_Cuadricula.md)
</div>
</summary>

La **```Activity_Registro_Espacio_Cuadricula```** tiene las siguientes condiciones:
```js
if (view == imgCuadricula)

if (registroCuadricula.equals(""))
```
</details>

<details>
<summary>
<div class="title-activitie">

#### Activity_Registro_Espacio_Cuadricula
[Ver Activitie](../activities/Activity_Registro_Espacio_Cuadricula.md)
</div>
</summary>

La **```Activity_Registro_Espacio_Cuadricula```** tiene las siguientes condiciones:
```js
if (view == imgCuadricula)

else (registroCuadricula.equals(""))
```
</details>
</details>

<details>
<summary>
<div class="title-activitie">

#### Activity_Informe_Espacios
[Ver Activitie](../activities/Activity_Informe_Espacios.md)
</div>
</summary>
</details>
</details>


## Ultima Actualización

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 2 de junio de 2022.</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Julian A. Ortiz.</b>
    </i>
  </small>
</div>