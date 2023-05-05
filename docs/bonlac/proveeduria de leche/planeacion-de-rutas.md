---
sidebar_position: 3
title: Planeación de Rutas
slug: /plenacion-de-rutas
---

## Descripción del Proceso

La esencia de este proceso es tener la estimación de leche que se va a recoger durante todo el mes.

*Planeación de Rutas - Diagrama BPMN*
![Diagrama de Proceso](/assets/proveeduria/planeacion_rutas.png "Diagrama de Proceso")

Este proceso comprende la etapa de planeamiento y se divide en tres partes:

- Plan Mensual.  
- Plan Semanal.
- Plan Diario. 

***

### Plan Mensual :date:

:::info
Esta tarea se inicia de forma manual por el usuario.
:::

La tarea tiene como finalidad hacer el planeamiento operacional para las [rutas](./informacion-general-proveeduria-de-leche.md#rutas) encargadas de recoger la leche en las diferentes [fincas](./informacion-general-proveeduria-de-leche.md#fincas) que proveen a la empresa.

Se registran cuales son las *[rutas](./informacion-general-proveeduria-de-leche.md#rutas)* que se van recorrer cada semana del mes siguiente, las [fincas](./informacion-general-proveeduria-de-leche.md#fincas) que se van a visitar y los litros que se van a recoger en cada una de las *Galeras*.

:::caution Precaución
Esta terea se encuentra activa hasta el último día del mes anterior al mes planeado. Por ejemplo, si se efectúa la planeación del mes de ***Marzo***, esta solo se encuentra disponible hasta el día *28* del mes de ***Febrero***.
:::

:::danger Importante
Esta es una causal de soporte frecuente, ya que el funcionario encargado deja pasar la fecha límite para diligenciar la información y el sistema cierra la tarea.
:::  

*Formulario de Planeación Mensual*
![Formulario Plan Mensual](./plan-mensual.png "Formulario Plan Mensual")

#### Información Técnica Planeación Mensual :floppy_disk:

Este proceso es el punto de partida de toda la ejecución del acopio. Se debe realizar el mes anterior al que se va a planear; por ejemplo, en Noviembre, y el sistema establecerá por defecto el mes de Diciembre. El código del proceso es 81.

La planeación se hace por Rutas.

Esta configuración se puede cambiar, ya que algunas veces la persona encargada del proceso de planeación ha dejado pasar la fecha y puede ingresar el día primero o segundo del mes correspondiente a la planeación. En ese instante, el sistema ha configurado su entorno para la planeación del siguiente mes. Si esto ocurre, se utiliza la llave del .ini “PLANEAR_MES_ACTUAL” y se establece un valor de SI, cuando se necesite planear el mismo mes del acopio. 

El Id del formulario de esta actividad es el **81** y la plantilla es **p81_f1**

Esta planeación utiliza el formulario de tablas y componentes del **DHTMLX**

Cuando la planeación mensual se guarda, en el processRequest se generan automáticamente los procesos de planeación semanal, dividiendo los datos planeados y generando uno por cada semana del mes.

_Función Process Request_

![Función Proccess Request](/assets/proveeduria/funcion-process-request.png)}

***

### Plan Semanal :date:

:::info
Esta tarea se inicia de forma automática por el sistema y se lanza luego de registrar toda la información en la tarea del ***[Plan Mensual](#plan-mensual)***.  

Por ejemplo, para el mes de mayo de 2022 se generan las tareas para las semanas así:
-	**Semana 1:** viernes 6 de mayo al jueves 12 de mayo.
-	**Semana 2:** viernes 13 de mayo al jueves 19 de mayo.
-	**Semana 3:** viernes 20 de mayo al jueves 26 de mayo.
-	**Semana 4:** viernes 27 de mayo al jueves 02 de junio.

:::

Para esta tarea ya se cuenta con la información de las [rutas](./informacion-general-proveeduria-de-leche.md#rutas), así como de cuanta leche se espera recoger ya que se trae de la tarea anterior; pero el funcionario puede hacer los ajustes necesarios dada las circunstancias. El funcionario debe ingresar la información de las ***[Cisternas](./informacion-general-proveeduria-de-leche.md#cisternas)***, ***[Cabezales](./informacion-general-proveeduria-de-leche.md#cabezales)***, y ***[Conductores](./informacion-general-proveeduria-de-leche.md#conductores)***, por último, al momento de guardar la información se disparan las ***Planeaciones Diarias***.

:::caution Precaución
El usuario puede hacer múltiples modificaciones hasta que se cierra la tarea el día jueves a las ***12:00***.
:::

En este formulario se registra la información de manera semanal, por ejemplo, del viernes 13 de marzo de 2022 hasta el jueves 19 de marzo de 2022 y la tarea queda en la bandeja de pendientes de la persona que realizó la [planeación mensual](#plan-mensual).

<!---
*Formulario Plan Semanal*  
![Formulario Plan Semanal](./plan-semanal.png "Formulario Plan Semanal") 
-->

*Formulario Planeación Semanal*

![Planeación Semanal](/assets/proveeduria/planeacion-semanal-img.png "Formulario Plan Semanal")

_Planeación de Recursos_

![Planeación de Recursos](/assets/proveeduria/planeacion-semanal2-img.png)

#### Información Técnica Planeación Semanal :floppy_disk:

Este proceso tiene el consolidado de la leche planeada para la semana. Tiene la posibilidad de realizar la misma gestión de litros que la planeación mensual. Los datos adicionales que se deben ingresar son los recursos, los conductores que realizarán los recorridos y entregarán la leche y las cisternas que se van a usar. 82 es el código del proceso. 

Estas actividades quedan en la bandeja del usuario, indicado en la llave USUPLANEACION. Estas actividades quedan abiertas hasta el jueves a las 4 p.m de la semana anterior a su ejecución. Este tiempo es modificable en días de anticipación con la llave DIAS_GENPDIARIA

_Código Planeación Semanal para cierre de tareas_

![Planeación semanal cierre de tareas](/assets/proveeduria/codigo-planeacion-semanal-img.png)


Cuando se cierra la planeación semanal, inmediatamente se generan las actividades de planeación diaria de la semana siguiente, esto en la bandeja de el mismo usuario de la llave **USUPLANEACION**.  Por ejemplo, para la semana del 14 al 20 de Noviembre de 2022 (lunes a domingo) estará abierta hasta el día Jueves 10 de Noviembre a las 4 p.m. Luego de ese momento, se generarán automáticamente las actividades de planeación diaria para los 7 días siguientes del 14 hasta el 20 de Noviembre.

_Código Planeación Semanal para generación de tareas_
![Planeación semanal - Generacion de tareas](/assets/proveeduria/codigo-opciones-semanal-img.png)

El Id del formulario de esta actividad es el **82** y la plantilla es **p81_f2**

Usa formulario de tablas y componentes del **DHTMLX**

***

### Plan Diario :date:

En este punto se recibe toda la información de las tereas anteriores y se divide en siete tereas, una por cada día de la semana.

:::info
Esta tarea se inicia de forma automática por el sistema y se lanza luego de registrar toda la información en la tarea del ***[Plan Semanal](#plan-semanal)***.  

Por ejemplo, para la **Semana 1** de mayo de 2022 se generar las tareas diarias así:
-	**Día 1:** viernes 6 de mayo.
-	**Día 2:** sábado 7 de mayo.
-	**Día 3:** domingo 8 de mayo.
-	**Día 4:** lunes 9 de mayo.
-	**Día 5:** martes 10 de mayo.
-	**Día 6:** miércoles 11 de mayo.
-	**Día 7:** jueves 12 de mayo.
:::

:::caution Precaución
Esta tarea se encuentra activa hasta las ***23:00*** de cada día.
:::

En este formulario se registra la información de manera diaria, esto quiere decir que es uno de estos por cada día de la semana. Allí se pueden modificar los litros, los encargados y se pueden agregar nuevas [rutas](./informacion-general-proveeduria-de-leche.md#rutas). De igual manera esta tarea queda en la bandeja de pendientes de la persona que realizó la planeación.

:::tip
Luego de cerrarse la tarea, el sistema cuenta con un ***botón*** para abrirla nuevamente en caso de ser requerido.
:::

<!--
*Formulario Plan Diario*  
![Formulario Plan Diario](./plan-diario.png "Formulario Plan Diario")
-->
_Planeación Diaria_

![Planeación Diaria](/assets/proveeduria/planeacion-diaria-img.png)

#### Información Técnica Planeación Diaria :floppy_disk:

Esta actividad tiene el consolidado de leche a recoger, junto con las rutas y los recursos asignados (conductor, cisterna, etc.) segmentados por día. 83 es el código del proceso.

Esta actividad está disponible para realizar cambios hasta el día anterior de su ejecución a las 11 PM. En este ejemplo, la planeación diaria para el Domingo 6 de Noviembre estará disponible hasta el 5 de Noviembre a las 11 PM.

_Planeación Diaria - Código para restricciones_

![Código Restricciones](/assets/proveeduria/codigo-restriccion-diaria-img.png)

Después de cerrarse la actividad, se generarán los procesos de ejecución de ruta, que son los que van a tener toda la operación diaria y finalmente llegarán a SAP. 

El Id del formulario de esta actividad es el **83** y la plantilla es **p81_f3**

Se utiliza el formulario de tablas y componentes del **DHTMLX**

***

## Update

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