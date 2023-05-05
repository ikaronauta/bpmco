---
sidebar_position: 2
title: Tablas de Referencia
slug: /tablas-de-referencia
---
### Tablas de Referencia

En cada proceso se pueden requerir algunos datos que están creados en SAP. Esta información tiene unas codificaciones que deben llegar al momento de crear el maestro, a estos listados les llamamos tablas de referencia. Al verificar los datos usados en los procesos, nos dimos cuenta que podíamos hacer un esquema general para cargar estas tablas, así todas, independiente de que información tendrían, podrían contar con la misma estructura, por eso definimos tener un campo con el **código** y otro campo con el **texto**, un campo para hacer algún tipo de filtro, a este lo llamamos **código padre**, el cuál va a contener algún código de otro listado y adicional un campo llamado **orden**, que se usa para dar prioridad a algún valor dentro del listado. 

Teniendo esto claro, para cada proceso se crearon las tablas con la misma estructura y se cargaron los datos, se definió la nomenclatura del nombre de la tabla así: **frm_vlm_mae_NombreTabla**.

_Tablas de Referencia_

![Tablas de Referencia](/assets/valorem/frm_vlm_mae_NombreTabla.png "Tablas de Referencia")

Para este ejemplo tenemos la tabla de Almacenes, se tiene el código, el nombre y el código padre es el código de la tabla de centros logísticos **frm_vlm_mae_centro_logistico**, con esto se pueden establecer filtros en los formularios y presentar la información más depurada.

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 27 de Enero de 2023</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Santiago Correa R / Cristian Cantillo</b>
    </i>
  </small>
</div>