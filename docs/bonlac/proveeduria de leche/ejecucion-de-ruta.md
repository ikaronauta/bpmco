---
sidebar_position: 4
title: Ejecución de Ruta
slug: /ejecucion-de-ruta
---

## Descripción del Proceso

Este proceso comprende desde que salen los vehículos a efectuar la recolección de la leche sobre las [rutas](./informacion-general-proveeduria-de-leche.md#rutas) planeadas, hasta que regresan a la planta con la lecha y terminando con el lavado de las [cisternas](./informacion-general-proveeduria-de-leche.md#cisternas) y la etapa de evaluación de las muestras de calidad recogidas en todo el proceso.

_Ejecución de Ruta - Diagrama BPMN_
![Ejecución Ruta](/assets/proveeduria/ejecucion_ruta.png "Ejecución Ruta")


### Información técnica Ejecución de Ruta

Este proceso consolida todas las rutas de un día y es el proceso más importante de todos, aquí se genera por cada ruta del día, la segmentación por finca, se asigna el conductor, el cisterna y el cabezal.  Esta actividad es el principal insumo para la aplicación y allí los conductores al ingresar verán cargados en su perfil la ruta del día. A partir de esta información y a medida que van registrando los datos, la grid de detalle por tanque se va completando y el total de litros por finca se va sumando en la tabla consolidada automáticamente.  Esta información es de suma importancia y debe quedar bien registrada, dado que toda la información de entrada y facturación parte de aquí.

El código del proceso es **85** y tiene todo un flujo completo antes de disparar las actividades en SAP.

En la tabla de acopio de leche, donde está el consolidado por fincas, datos como los litros planeados fueron los que se indicaron desde la etapa de planeación y los litros reales son la suma consolidada del producto recolectado de todos los tanques. Para refrescar este valor, cuando se ajustan los litros en la tabla de detalle por tanques, se debe editar el nombre del vendedor o la hora, con esto se invocará una función que recalculará los litros por finca.

_Acopio de Leche por Ruta_
![Acopio de leche por ruta](/assets/proveeduria/acopio-leche-ruta.png)

La tabla de detalle por tanques, cuando se lanza la actividad, está vacía por defecto y desde la aplicación se va alimentando a medida que se van agregando datos. También es posible realizar modificaciones y agregar datos desde el formulario web, en caso que se tenga alguna novedad con la aplicación.

_Detalle por Tanques_
![Detalle por tanques](/assets/proveeduria/detalle-por-tanques.png)

La cantidad de leche solo se suma cuando la leche es apta. La leche no es apta cuando tiene antibiótico, acidez, cuerpos extraños o el transportista la marcó con esta categoría, quedando reportado en una de las columnas de la tabla de detalle por tanques. 

Cuando toda la ruta esté completa, una persona debe verificar que todos los datos están correctos, hacer correcciones si es el caso y después de eso usar la opción “Entregar Leche”. Con este proceso, se hace el cálculo total de leche en la ruta, se cierra la actividad y se habilita la siguiente actividad del proceso para realizar la aprobación de calidad.

El Id del formulario de esta actividad es el **84** y la plantilla es **p81_f4**

Usa formulario de tablas y componentes del **DHTMLX**

***

### Ejecutar Acopio

Inicia con la salida de los vehículos de la planta para ejecutar las [rutas](./informacion-general-proveeduria-de-leche.md#rutas) planeadas, los [conductores](./informacion-general-proveeduria-de-leche.md#conductores) tienen la información de la [ruta](./informacion-general-proveeduria-de-leche.md#rutas) en la ***APP*** con la información de las *[Fincas](./informacion-general-proveeduria-de-leche.md#fincas)*, *Galeras* y *Tanques* donde deben recoger.  

Al momento de llegar a la [finca](./informacion-general-proveeduria-de-leche.md#fincas) primero deben sacar una muestra de leche del tanque e ingresar los datos en la ***APP*** y en caso de encontrar alguna anomalía deben tomar una foto desde la misma aplicación. Para saber la cantidad de leche que se va a recoger en cada tanque, los funcionarios hacen la medición del mismo con una tabla de cubicaje que tiene cada tanque, ingresan los valores en la ***APP*** y esta hace la conversión a litros.  

Luego de haber recogido en todas las [fincas](./informacion-general-proveeduria-de-leche.md#fincas) indicadas, el funcionario procede a finalizar la [ruta](./informacion-general-proveeduria-de-leche.md#rutas) desde la aplicación, lo cual genera una tarea para otro funcionario que se encuentra en la planta para que este haga la revisión de los datos que fueron ingresados en el transcurso de la [ruta](./informacion-general-proveeduria-de-leche.md#rutas), y este puede hacer cualquier ajuste en caso de que sea necesario.

*Formulario Ejecutar Acopio*  
![Formulario Ejecutar Acopio](./formulario-ejecutar-acopio.png "Formulario Ejecutar Conductores")



***

### Aprobación de Calidad

Esta tarea se dispara cuando el funcionario efectuó la revisión de los registros de acopio y aprueba los datos usando el botón **ENTREGAR LECHE** y en ese momento se genera la tarea para un empleado que se encuentra en la planta.  

Los vehículos llegan a la planta y hacen entrega de las muestras que se le hicieron a cada uno de los tanques donde recogieron y se procede a tomar una nueva muestra a cada uno de las *[Cisternas](./informacion-general-proveeduria-de-leche.md#cisternas)*, la información recogida se registra mediante la ***APP***. 

De acuerda a la información obtenida con la prueba, el funcionario determina si aprueba el descargue de la leche y registra en el sistema en que tanque será depositada.

*Formulario Aprobación de Calidad*  
![Formulario Aprobación de Calidad](./formulario-aprobacion-de-calidad.png "Formulario Aprobación de Calidad")

#### Información Técnica Aprobación de Calidad

Esta actividad está disponible desde la aplicación; adicional, se pueden completar los datos desde la web. Se debe gestionar cuando la cisterna llega a planta con la leche recolectada y de esta obtienen una muestra a la cual se aplican pruebas para garantizar la calidad del producto; consecuentemente, esto permite no contaminar la leche ya almacenada en los tanques de la planta. **84** es el código del proceso.

![Aprobación de calidad](/assets/proveeduria/aprobacion-calidad.png)

Una vez se realiza la aprobación de los resultados y se indica la aprobación de la leche para la descarga, se genera la siguiente actividad de descarga de la leche. 

El Id del formulario de esta actividad es el **85** y la plantilla es **p81_f5**

Usa formulario de tablas y componentes del **DHTMLX**

***

### Lectura Flujómetro

Mediante el flujómetro se hace la medición exacta de la cantidad de leche que trae la *[Cisterna](./informacion-general-proveeduria-de-leche.md#cisternas)*. El funcionario encargado de esta tarea debe registrar en el sistema los datos de la cantidad de leche reportado por la [ruta](./informacion-general-proveeduria-de-leche.md#rutas) y la cantidad que registra el flujómetro, la diferencia entre estos dos valores se le denomina ***Merma***, información que se registra en el sistema, si estos valores se encuentran en los rangos establecidos, allí se genera el [proceso SAP](./proceso-sap.md), de lo contrario se dispara la actividad de Aprobación de Merma.    

Los valores registrados por el flujómetro deben ser cargados al sistema mediante una foto por medio de la ***APP***, para que otro funcionario ingrese estos valores vía ***WEB*** de forma manual.

_Formulario Lectura Flujómetro_ 
![Formulario Lectura Flujómetro](./formulario-lectura-flujometro.png "Formulario Lectura Flujómetro")

#### Información Técnica Lectura de Flujómetro

Esta actividad está disponible desde la aplicación para el registro de fotos, también se pueden completar los datos desde la web, se divide en 2 etapas diferentes en el tiempo, la primera parte es el registro fotográfico de la lectura del flujómetro (equipo que mide la cantidad de leche descargada en el tanque) y las fotos de la cisterna luego de ser lavado, esto ocurre en horas de la noche o en la madrugada.  La segunda parte es el registro del valor en litros indicado por el flujómetro, con esto se tiene el cálculo de la merma, la cual es la resta del total de litros registrados contra los litros reales ingresados por el flujómetro. 84 es el código del proceso.

_Fotografías registro flujómetro y lavado cisterna_
![Fotos flujómetro y lavado cisterna](/assets/proveeduria/fotos-flujometro-lavado.png)

Cuando la actividad se registra, siempre se disparan las actividades de Lavado de Cisterna y Pruebas Físico Químicas. 

También se realiza un análisis al tener el registro del valor del flujómetro. Esto es de suma importancia para el flujo del proceso, dado que todas las rutas tienen un % de merma aceptado (ver tabla pl_rutas)

_Registro flujómetro y Porcentaje de Merma Aprobado_
![Registro flujómetro y Porcentaje de Merma Aprobado](/assets/proveeduria/analisis-registro-flujometro.png)

Si el porcentaje de merma está por encima de lo establecido por ruta o es negativa, se genera la actividad de aprobación de merma, para que una persona revisé el motivo de la merma elevada.  Si el porcentaje de merma está entre los rangos establecidos, inmediatamente se disparan los procesos de SAP, se carga el número de orden de compra previamente creado y se generan las entradas por cada tanque por cada finca.

_Aprobación merma_
![Aprobación Merma](/assets/proveeduria/aprobacion-merma.png)

El Id del formulario de esta actividad es el **86** y la plantilla es **p81_f6**

Usa formulario de tablas y componentes del **DHTMLX**

***

### Lavado de Cisterna

Luego de trasladar la leche a los tanques de la planta, la *[Cisterna](./informacion-general-proveeduria-de-leche.md#cisternas)* es lavada y posteriormente pasa una revisión por parte de un funcionario quien determina si puede continuar con una nueva [ruta](./informacion-general-proveeduria-de-leche.md#rutas), en caso contrario se debe repetir el lavado.  

Esta información se registra en el sistema por la **APP** junto con el número del sello que se le coloca a la *[Cisterna](./informacion-general-proveeduria-de-leche.md#cisternas)* y las fotos donde se evidencia el lavado efectuado, este sello sirve para tener el control de la leche y garantizar que la leche de la [cisterna](./informacion-general-proveeduria-de-leche.md#cisternas) no fue alterada.

_Formulario Lavado de Cisterna_ 
![Formulario Lavado de Cisterna](./formulario-lavado-de-cisterna.png "Formulario Lavado de Cisterna")

_Formulario Aprobación Lavado_
![Formulario Aprobación Lavado](./formulario-aprobacion-lavado.png "Formulario Aprobación Lavado")


Esta actividad está disponible desde la aplicación, también se pueden completar los datos desde la web. Es simplemente por estadística y consiste en registrar los datos cuando se lava la cisterna y agregar unas fotos. **84** es el código del proceso.

_Formulario Detalle Lavado de Cisterna_
![Formulario detalle lavado de cisterna](/assets/proveeduria/lavado-cisterna-detalle.png)

El Id del formulario de esta actividad es el **93** y la plantilla es **p81_f9**

Usa formulario de tablas y componentes del **DHTMLX**

***
### Aprobación de Lavado

Esta actividad está disponible desde la aplicación, también se pueden completar los datos desde la web y se genera luego de registrar los datos del lavado y es realizado por simple estadística. Consiste en verificar la calidad del lavado y luego indicar el número del sello puesto sobre la cisterna. Con esto, se lleva un control desde el sistema. **84** es el código del proceso.

_Aprobación del Lavado_

![Aprobación del Lavado](/assets/proveeduria/aprobacion-lavado.png)

El Id del formulario de esta actividad es el **96** y la plantilla es **p81_f13**

Usa formulario de tablas y componentes del **DHTMLX**

***

### Aprobación de Merma

La empresa cuenta con unos rangos establecidos para determinar el valor aceptable de la ***Merma*** que como se explicó anteriormente es la diferencia entre la cantidad de leche en litros reportado por la [ruta](./informacion-general-proveeduria-de-leche.md#rutas) y el valor arrojado por el *Flujómetro*.   

Esta tarea determina si ese valor se encuentra dentro del rango aceptado, o si por el contrario los valores se salen de los límites establecidos. Finalmente, si todo es correcto, se genera el [proceso SAP](./proceso-sap.md). 

:::info
En esta tarea el funcionario puede hacer los ajustes necesarios en caso que la ***Merma*** este fuera de los límites, ya que en ocasiones se debe a que ingresan un valor erróneo. Esto para el funcionario debe revisar la foto del *[Flujómetro](#lectura-flujómetro)*. Ocasionalmente también se pueden ingresar los datos de una *[Finca](./informacion-general-proveeduria-de-leche.md#fincas)* diferente generando inconsistencias.
:::

*Formulario Aprobación de Merma*
![Formulario Aprobación de Merma](./formulario-aprobacion-merma.png "Formulario Aprobación de Merma")

#### Información Técnica Aprobación de Merma

Esta actividad solo se completa desde la web, y se genera luego de registrar el flujómetro cuando la merma supera los rangos establecidos.  Consiste en revisar el motivo por el cuál la merma no es normal pues esto puede ser por múltiples factores (error en un tanque, error al registrar el valor de flujómetro, error en litros, etc). **84** es el código del proceso.

Una vez aprobado se generan los procesos de Orden de compra y Entrada. 

_Aprobación del Lavado_

![Aprobación del Lavado](/assets/proveeduria/registro-aprobacion-merma.png)

El Id del formulario de esta actividad es el **97** y la plantilla es **p81_f15**

Usa formulario de tablas y componentes del **DHTMLX**

***

### Pruebas Fisicoquímicas

Las pruebas recogidas en el transcurso del proceso son llevadas al laboratorio para hacer una evaluación de la calidad de la leche, con el fin de determinar el valor a pagar por la misma, acuerdo unos estándares ya definidos por la empresa. La información obtenida de las pruebas de laboratorio es cargada en el sistema vía ***WEB*** donde se registra por *Tanque*.

*Formulario Pruebas Fisicoquímicas*  
![Formulario Pruebas Fisicoquímicas](./formulario-pruebas-fisico-quimicas.png "Formulario Pruebas Fisicoquímicas")

Esta actividad solo se completa desde la web y se genera luego de registrar el flujómetro. Consiste en registrar los resultados de laboratorio que se tienen por cada tanque para determinar la calidad. De estos valores dependen unos incentivos económicos reflejados en el pago a los productores. **84** es el código del proceso.

_Resultados Pruebas Físico Químicas_
![Resultados Pruebas Físico Químicas](/assets/proveeduria/pruebas-fisico-quimicas-img.png)

Esta actividad tiene unas validaciones y alertas por colores con relación a unos rangos y valores admitidos, esto ayuda que las personas que están llenando tengan más cuidado y no cometan errores de digitación. 

El Id del formulario de esta actividad es el **87** y la plantilla es **p81_f7**

Usa formulario de tablas y componentes del **DHTMLX**

***

### Pruebas Microbiología

:::caution Precaución
Los resultados tardan de 24 a 48 horas.
:::

Se hace en una tarea independiente debido al tiempo en que tardan en salir los resultados. Hasta que no se tenga el resultado no se puede ingresar la información en el sistema para poder disparar la siguiente tarea.

*Formulario Pruebas Microbiología*  
![Formulario Pruebas Microbiológia](./formulario-pruebas-microbiologia.png "Formulario Pruebas Microbiológia")

#### Información Técnica Pruebas Microbiología

Esta actividad solo se completa desde la web, se genera luego de registrar las pruebas físico químicas Consiste en registrar los resultados de laboratorio que se tienen por cada tanque para determinar el valor microbiológico. Estos resultados tardan entre 24 y 48 horas, y este valor es un ítem clave para los incentivos económicos reflejados en el pago a los productores. 84 es el código del proceso.

_Resultados Pruebas Microbiología_
![Resultados Pruebas Microbiología](/assets/proveeduria/pruebas-microbiologia-img.png)

Esta actividad también tiene una alerta por colores también para la microbiología. 

El Id del formulario de esta actividad es el **5057** y la plantilla es **p81_f14**

Usa formulario de tablas y componentes del **DHTMLX**

***

### Aprobación Pruebas de calidad

Esta es una actividad clave, ya que es donde se realizan todos los cálculos de los valores a pagar por la calidad de la leche según el plan de pagos establecido para cada productor y su finalidad es de revisar que todos los valores que se registraron están correctos.

Al activarse esta tarea el funcionario debe revisar la información recibida de las pruebas y determinar si es apto para continuar con el ***[Proceso SAP](./proceso-sap.md)***.

:::info
De acuerdo a la información generada por las pruebas se envía un correo informando el valor a pagar por los litros de leche entregados por *[Finca](./informacion-general-proveeduria-de-leche.md#fincas))*.
:::

_Formulario Aprobación Pruebas de calidad_
![Formulario Aprobación Pruebas de calidad](./formulario-aprobacion-pruebas-de-calidad.png "Formulario Aprobación Pruebas de calidad")

_Resultados Aprobación de calidad_
![Resultados Aprobación de calidad](/assets/proveeduria/aprobacion-calidad.png)

#### Información Técnica Aprobación Pruebas de Calidad

Esta actividad está disponible desde la aplicación; adicionalmente, se pueden completar los datos desde la web. Se debe gestionar cuando la cisterna llega a planta con la leche recolectada y de esta se obtiene una muestra a la cual se aplican pruebas para garantizar la calidad del producto. Consecuentemente, esto no permitirá contaminar la leche ya almacenada en los tanques de la planta. **84** es el código del proceso.

_Aprobación Pruebas de calidad_
![Aprobación Pruebas de calidad](/assets/proveeduria/aprobacion-pruebas-calidad.png)

Al aprobar estos resultados, se generan los procesos automáticos de verificación de facturas en SAP, estas actividades se generan en orden, luego de la entrada ya generada previamente.

_Proceso automáticos de verificación de facturas en SAP_
![Proceso automáticos de verificación de facturas en SAP](/assets/proveeduria/proceso-verificacion-facturas-sap.png)

El método que genera las actividades de verificación de facturas captura el XML de la grid de pruebas, con esto saca las fincas y verifica los planes de pago (ver explicación y video plan pagos) y con esto hace el cálculo de los incentivos y lo que se debe pagar por cada tanque de leche.  Una particularidad en este proceso es que algunas Fincas tienen la distribución de su pago en 2 proveedores porcentualmente, esto se tiene en cuenta al generar las verificaciones ya que se debe dividir el pago porcentualmente entre ambos, esto se puede verificar en la tabla pl_division_pago 

Una vez se generar las actividades de verificación de factura, se crea un job en HangFire por cada actividad, esto con el fin de evitar que el proceso sea muy lento y que las gestiones en SAP entren en conflicto.

_Generación actividades de Verificación de Facturas_
![Generación actividades de Verificación de Facturas](/assets/proveeduria/job-en-hang-fire.png)

El Id del formulario de esta actividad es el 95 y la plantilla es p81_f12 

Usa formulario de tablas y componentes del DHTMLX 

***

## Update

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 26 de Diciembre de 2022</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Santiago Correa R</b>
    </i>
  </small>
</div>