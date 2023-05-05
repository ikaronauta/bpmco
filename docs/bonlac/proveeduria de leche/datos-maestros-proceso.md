---
sidebar_position: 6
title: Datos Maestros para el Proceso
slug: /datos-maestros-proceso
---

## Descripción

:::caution
Para que el proceso y la aplicación funcione de manera correcta, se necesitan varios datos maestros. Las **_[fincas](./informacion-general-proveeduria-de-leche.md#fincas)_** para este caso son el principal maestro.
:::

_Menu Proveeduría de Leche_

![Menu Proveeduría de Leche](/assets/proveeduria/menu-proveeduria-leche.png "Menu Proveeduría de Leche")

Como generalidad de estos datos maestros (Cabezal, **[Cisterna](./informacion-general-proveeduria-de-leche.md#cisternas)**, Colaborador y **[Finca](./informacion-general-proveeduria-de-leche.md#fincas)**) tienen tablas por cada uno, pero la información se almacena en un XML con una estructura similar a los formularios de procesos, con la diferencia que todo está en un solo campo:

_Datos Maestros Proveeduría de Leche_

![Datos Maestros Proveeduría de Leche](/assets/proveeduria/datos-maestros.png "Datos Maestros Proveeduría de Leche")

Toda esta lógica está en el archivo ajax_p80.cs

### Gestionar Fincas :tent:

Aquí se gestionan los temas relacionados con la finca. Es una ficha técnica completa, con datos indicados por **[galeras](./informacion-general-proveeduria-de-leche.md#fincas)**. Se debe tener en cuenta que una **[finca](./informacion-general-proveeduria-de-leche.md#fincas)** solo puede ser creada si ya está registrada en SAP, pues el código SAP es necesario. 

Varias cosas se deben tener en cuenta con este formulario de **[fincas](./informacion-general-proveeduria-de-leche.md#fincas)**. La sección de los correos tiene una columna de tipo, esto se usa para las notificaciones que se generan en el proceso, los resultados de calidad, los correos de pago entre otros.

_Formulario de Fincas_
![Formulario de Fincas](/assets/proveeduria/datos-generales-finca.png "Formulario de Fincas")

Cuando se registran los tanques por galera, se indica la unidad de medida. Existen 3 tipos: libras, litros y kilos.

_Registro Tanques por galera_
![Registro Tanques por galera](/assets/proveeduria/tanques-por-galera.png "Registro Tanques por galera")

Esto es muy importante, ya que la aplicación tiene una fórmula de conversión para convertir todo a litros; adicional, cada tanque tiene una tabla que indica la cantidad de litros según la medida. Eso se puede ver al final del formulario en tipo detalle:

_Opción Verificar Tablas Tanques_

![Opción Verificar Tablas Tanques](/assets/proveeduria/verificar-tablas-tanques.png "Opción Verificar Tablas Tanques")

Estos datos se consultan directamente de la tabla **Pl_finca_reglas_tanques**

_Tabla Tanques en Fincas_

![Tabla Tanques en Fincas](/assets/proveeduria/tabla-finca-reglas-tanques.png "Tabla Tanques en Fincas")

La carga de estos datos se realiza a través de una pantalla que se habilitó para esto, cargando un excel en la siguiente **[URL](http://bonlac.bpmco.co/pruebas/cargar_tablas_lecheros.aspx)**.

_Tabla Tanques Lecheros_

![Tabla Tanques Lecheros](/assets/proveeduria/tablas-tanques-lecheros.png "Tabla Tanques Lecheros")

La georreferenciación se captura desde la aplicación en el módulo de inspección de fincas.

_Georreferenciación - Opción Inspección de Fincas_

![Georreferenciacion opción inspeccion de fincas](/assets/proveeduria/georreferenciacion.png "Georreferenciación - Opción Inspección de Fincas")

Las evaluaciones de las fincas se pueden consultar al final del formulario en tipo detalle:

_Opción Consultar Evaluaciones_

![Opcion Consultar Evaluaciones](/assets/proveeduria/opcion-consultar-evaluaciones.png "Opción Consultar Evaluaciones")

_Listado Consultar Evaluaciones_

![Listado Consultar Evaluaciones](/assets/proveeduria/listado-evaluaciones-fincas.png "Listado Consultar Evaluaciones")

En esta pantalla se puede consultar todas las inspecciones registradas desde la aplicación, también el registro fotográfico.  

Cuando una inspección es registrada, se programa en Hangfire una tarea para enviar un correo con el detalle de la inspección en formato PDF, esto se realiza en el **ajax_p80.cs** en el método **enviarCorreoEvaluacionFinca**.

_Método enviarCorreoEvaluacionFinca_

![Metodo enviarCorreoEvaluacionFinca](/assets/proveeduria/metodo-enviar-correo-evaluacion-finca.png "Método enviarCorreoEvaluacionFinca")

### Gestionar Cabezal

Gestionar Cabezal: Aquí se gestionan los carros que transportan las cisternas. Se utiliza para control de las licencias y otros trámites. Esta información sirve para llevar la estadística de los vehículos usados a la hora de realizar el acopio, cuando se va a iniciar ruta desde la aplicación y se indica el cabezal. 

### Gestionar Cisterna :articulated_lorry:

Gestionar Cisterna: Aquí se gestionan las cisternas, se agregan fotos y se usa para control de las licencias y otros trámites. Esta información es clave en la actividad de planeación semanal, ya que allí se definen las cisternas que se van a usar para cada ruta, cuando se va a iniciar ruta desde la aplicación, se pide confirmación de cisterna y se pueden modificar.

### Gestionar Colaborador :construction_worker:

Aquí se gestionan los usuarios que interactúan con la aplicación y el proceso, los conductores tanto internos como externos y los administrativos.  Se pueden agregan fotos y otros datos relacionados con permisos de operación y licencias. Esta información es clave en la actividad de planeación semanal, ya que allí se definen los conductores que se van a usar para cada ruta.  Cuando se crea un colaborador, inmediatamente queda registrado como usuario de la aplicación. 

### Gestionar Usuarios APP :no_good:

Aquí se gestionan los usuarios que van a tener acceso a la aplicación, se pueden habilitar o inhabilitar fácilmente, y se definen los roles que van a tener, ya que la aplicación presenta funcionalidades diferentes basadas en los roles. 

_Gestión Usuarios App_

![Gestión Usuarios App](/assets/proveeduria/gestion-usuarios-app.png "Gestión Usuarios App")

### Venta de Insumos :baby_bottle:

Este módulo finalmente nunca fue utilizado por el cliente. No se brindó por su parte la fuerza necesaria para realizarlo. La idea en su momento era manejar algunos productos que ellos venden a los productores y se ofrecería crédito por estos.

### Gestionar Cuestionario Finca :clipboard:

Este módulo tiene como finalidad administrar el cuestionario de inspecciones que se realiza desde la aplicación. En la sección de fincas se trató este tema.  Este formulario alimenta las tablas de configuración de las evaluaciones (pl_cuestionario, Pl_Ev_opc_respuestas) que posteriormente se sincronizarán desde la aplicación, para que se puedan llenar esas inspecciones.

_Cuestionario Evaluación Fincas_

![Cuestionario Evaluación Fincas](/assets/proveeduria/cuestionario-evaluacion-fincas.png "Cuestionario Evaluación Fincas")

:::info
Las evaluaciones deben tener una ponderación máxima de 100 puntos, ya que esto define la calificación de la finca a la hora de la inspección. 
:::

Hay otra sección que tiene unas preguntas generales sin ponderación que siempre se deben llenar.

_Preguntas Generales Sin Ponderación_

![Preguntas Generales Sin Ponderación](/assets/proveeduria/preguntas-generales-sin-ponderacion.png "Preguntas Generales Sin Ponderación")

Un punto muy importante en estas preguntas generales y es la relacionada al Recuento de Células Somáticas (CCS), que captura un valor importante para uno de los bonos de incentivos que tienen los productores cada quincena. Este valor cuando se registra, pasa a la tabla pl_celulas_somaticas; a su vez, esta tabla se tiene un administrador, ya que este valor es necesario para el pago de cada quincena. El contacto establecido para como administrador es **Milagros Moreno** __[(milagrosmoreno@bonlac.com.pa)](mailto:milagrosmoreno@bonlac.com.pa)__, el cual puede ser accedido desde la pestaña de agente.

_Pestaña Agente_

![Pestaña Agente](/assets/proveeduria/pestana-agente-1.png "Pestaña Agente")

_Pestaña Administrador de Células Somáticas_

![Pestana Administrador de Células Somáticas](/assets/proveeduria/pestana-agente-2.png "Pestaña Administrador de Células Somáticas")

:::info
En resumen, el valor de CCS por quincena para el pago del bono siempre se toma de la tabla pl_celulas_somaticas, pero esta tabla es alimentada desde la inspección que se realiza desde la app o ya por parte del administrador. 
:::

Existe un método en HangFire que se encarga de insertar el valor desde las inspecciones, está en el **ajax_p81**

_Función insertarIsnpeccionCelulasSomaticas_

![Función insertarIsnpeccionCelulasSomaticas](/assets/proveeduria/funcion-insertar-celulas-somaticas.png "Función insertarIsnpeccionCelulasSomaticas")

También existe otro método en Hangfire que se encarga de enviar un resumen de las inspecciones de la semana, el cual se encuentra en el **ajax_p80**

_Función enviarCorreoInspeccionSemanalHf_

![Función enviarCorreoInspeccionSemanalHf](/assets/proveeduria/funcion-enviar-correo-inspeccion-semanal.png "Función enviarCorreoInspeccionSemanalHf")

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 11 de Enero de 2023</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Santiago Correa R / Cristian Cantillo</b>
    </i>
  </small>
</div>