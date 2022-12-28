---
sidebar_position: 2
title: Información Técnica
slug: /informacion-tecnica
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="base-datos" label="Base de Datos" default>
    <h2>Base de Datos</h2>
    <p>Las tablas y vistas relacionadas con este proyecto empiezan con el nombre de PL_ (Proveeduría de Leche). Por ejemplo, la tabla de <a href="./informacion-general-proveeduria-de-leche.md">fincas</a> se identifica con el título <strong>pl_fincas</strong></p>
  </TabItem>

  <TabItem value="archivo-config-ini" label="Archivo de Configuración">
    <h2>Archivo Configuración .ini</h2>
    <p>Todo lo relacionado con este proyecto está sobre en el grupo “PROVLECHE”</p>

_Archivo Configuración .ini_

![Archivo Configuración .ini](/assets/proveeduria/archivo_ini.png)

Se tienen llaves relacionadas con los asuntos y otras configuraciones del proceso. En los puntos donde estos se utilizan, se brindrá una explicación de cada uno.
  </TabItem>

  <TabItem value="codigo-back-end" label="Código Back-End">
    <h2>Descripción</h2>

Este proyecto usa varios códigos c#, pero el principal es el **ajax_p81.cs** donde está contenido el 90% de la lógica del proceso. 

La lógica para el módulo de inspecciones de [fincas](./informacion-general-proveeduria-de-leche.md#fincas) y algunos temas de los datos maestros ([fincas](./informacion-general-proveeduria-de-leche.md#fincas), [cisternas](./informacion-general-proveeduria-de-leche.md#cisternas), [cabezales](./informacion-general-proveeduria-de-leche.md#cabezales), colaboradores, entre otros) se encuentran en los archivos **ajax_p80.cs** y **ajax_p82.cs**

El código del servicio web que se usa para la aplicación móvil se llama **provLeche.cs**

Recientemente se están migrando los servicios al nuevo SAP de Icasa; por tanto, se creó un archivo para las integraciones llamado **sapProvLeche.cs**
  </TabItem>
</Tabs>

## Update

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 28 de Diciembre de 2022</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Santiago Correa R</b>
    </i>
  </small>
</div>