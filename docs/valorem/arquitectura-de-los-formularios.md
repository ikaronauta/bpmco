---
sidebar_position: 3
title: Arquitectura de los formularios
slug: /arquitectura-de-los-formularios 
---
### Arquitectura de los Formularios

El esquema de los formularios y la forma en que se interactúa con ellos, tiene varias premisas generales, estas son: 

* Opciones de Crear, modificar, extender, Bloquear / Desbloquear 
* Poder solicitar de forma individual o masiva 
* Carga de listados de tablas de referencia 
* El formulario puede ser reabierto para aplicar correcciones

:::note
Teniendo esto en mente, el 80% de los datos se guarda en Grid, ya sea individual o masivo. 
:::

:::info
Para no mantener 2 formularios distintos, uno de forma individual y uno de forma masiva, se tomó la decisión de mantener una misma lógica de validación y grabado, es por esto que los datos se guardan en grids; y tanto para el formulario individual como para el masivo se aplica la misma validación y grabado. 
:::

El formulario inicial de cualquier maestro contempla todos los campos posibles para ser llenados. Para algunos maestros, estos datos se llenan en etapas diferentes del proceso, por esto se aplica una lógica que oculta o muestra secciones completas dependiendo de la sociedad.

Las opciones de crear, modificar, extender, bloquear o desbloquear están presentes en casi todos los formularios, se guardan en el radio R2.

Cada opción tiene sus propias características, pero su comportamiento es común en los formularios. 

<details>
    <summary>Crear</summary>
    <div>
        <p>Esta opción se usa para crear un dato maestro nuevo desde cero, esta es la opción más amplia, ya que se deben ingresar todos los datos necesarios para su correcta creación en SAP</p>
    </div>
</details>

<details>
    <summary>Modificar</summary>
Esta opción se usa para realizar algún cambio sobre un maestro ya creado. Al no tener una integración con SAP para cargar los datos, el formulario solicita el código SAP del maestro requerido y el resto de campos son opcionales.  Se debe tener en cuenta que, para las modificaciones, no todos los campos están disponibles y por esta razón, existe una configuración para definir los campos habilitados y requeridos
</details>

<details>
    <summary>Extender</summary>
        <p>Esta opción se usa para habilitar un maestro en otra sociedad, organización u otro grupo de datos. Para el caso, es como permitir a un maestro A que está creado en el grupo de datos X habilitarlo para el grupo de datos Y.</p>
        <p>El grupo de datos a extender se define por maestro dado que, según sus características, las opciones de extensión pueden variar.  Se debe considerar que para las extensiones, no todos los campos están disponibles y consecuentemente, no exista una configuración para definir los campos habilitados y requeridos.</p>
</details>
<details>
    <summary>Bloqueo / Desbloqueo</summary>
        <p>Los maestros en SAP no tienen la opción de ser eliminados por lo que el paso a seguir es bloquearlos. Para esto se usa esta opción la cual varía de entre maestros, ya que se puede bloquear a ciertos niveles o totalmente.</p>
        <p>El formulario para bloqueo es más simple y con campos diferentes a las opciones anteriores, además no todos los maestros cuentan con esta opción</p>
</details>
<details>
    <summary>Individual o Masivo</summary>
        <div>
            La opción de individual o Masivo está presente en casi todos los formularios y se guarda en el radio R1.
        </div>
        <details>
            <summary>
                Individual
            </summary>
            <div>
                El formulario se presenta completo para poder completarlo de una manera sencilla. Cuando se envía a guardar, los datos pasan a la grid:
            </div>
        </details>
        <details>
            <summary>
                Masivo
            </summary>
            <div>
                <p>El formulario presenta unos pasos para realizar la carga de los datos mediante una plantilla de Excel. Todos los maestros tienen su propia plantilla base, inclusive para algunos difiere entre crear, modificar, extender y bloquear. Una vez cargada la información, los datos se presentan en forma de tabla y para completarlos se debe hacer clic sobre cada fila:</p>
                <p>Al hacer clic en cada fila, el formulario se presenta en una ventana modal y una vez se guardan los datos, estos pasan a la fila que corresponde.</p>
            </div>
        </details>
</details>