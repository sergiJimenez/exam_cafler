# Cafler Documentación

  

Esta documentación esta dividida en dos partes.

En la primera parte encontraremos una guía de como instalar la aplicación en nuestro ordenador y ejecutarla; aunque esto podemos hacerlo de diferentes formas, más adelante lo explicaremos.

Y en la segunda parte encontraremos una descripción para que la persona que la corrija pueda dirigirse a los puntos que más le interese. Aquí encontrará el porqué se ha desarrollado la aplicación como se ha desarrollado.

  


---

# Obtención, instalación, ejecución y tests del proyecto

## Obtención del repositorio

Para poder obtener el proyecto y tenerlo en tu ordenador es muy sencillo. Abres tu aplicación de Terminal de tu ordenador (****no**** Símbolos del sistema), o la terminal de PowerShell, y te posicionas en aquella ruta donde quieras tener el proyecto.

Una vez allí es muy sencillo, copias y pegas la siguiente linea de código que te voy a facilitar.

  

```powershell

git clone https://github.com/sergiJimenez/exam_cafler.git

```

  

Una vez copiada presiona la tecla “Enter”. El repositorio se habrá clonado allí donde has querido tener el proyecto.

Ahora procederemos a abrir dicho proyecto. Para hacer esto podemos hacerlo de dos formas. La primera forma es desde nuestro IDE. Abrimos nuestro IDE y seleccionamos aquel proyecto que queramos tener en pantalla. Aquí seleccionaremos el repositorio recientemente clonado. O podemos hacerlo de otra forma, si tenemos Visual Studio Code instalado, desde la Terminal que teniamos abierta escribimos lo siguiente:

  

```bash

cd exam_cafler

```

  

Una vez dentro escribimos lo siguiente:

  

```bash

code .

```

  

Y, automáticamente, abríra nuestro Visual Studio Code con el proyecto deseado en él.

  

## Instalación de las dependencias del proyecto

  

Para que el proyecto funcione perfectamente tendremos que instalar las dependencias de este.

  

****IMPORTANTE:**** Antes de instalar las dependencias, si el proyecto tuviese un archivo llamado `package-lock.json`, por precaución lo eliminaremos ya que a veces el `.gitignore` lo sube al repositorio aunque este esté declarado dentro de él.

  

Una vez tenido en cuenta el mensaje anterior procederemos a instalar el proyecto. En el mismo Terminal que hemos utilizado para abrir el proyecto desde él, o en uno nuevo que podemos abrir desde nuestro IDE, escribiremos lo siguiente:

  

```bash

npm install

```

  

No debería de haber ningún problema y deberías de poder instalarte dichas dependencias. Si surguiese algún problema no tengas ningún reparo en ponerte con contacto con el dueño de dicho repositorio.

  

## Ejecución del proyecto

  

Una vez llegados a este punto uno puede pensar que la única forma de ver este proyecto ejecutandose es haciendo un `npm run start`, nada más lejos de la realidad. Tienes tres formas de ver este proyecto y voy a explicárte el paso a paso de cada una de ellas.

  

### Visual Studio Code

  

Esta es la manera más clásica de ejecutar el proyecto. Desde el mismo Terminal que hemos utilizado para instalar las dependencias podemos ejecutar dicho proyecto pero aún así tienes diversos comandos para ejecutarlo, exactamente dos.

  

El primer comando sirve principalmente para ejecutar el proyecto por un puerto determinado pero tú, manualmente, tendrás que abrirlo en el navegador. Este comando es:

  

```bash

npm run quick

```

  

El segundo comando te ahorrará trabajo ya que directamente ejecutará el proyecto en tu navegador predeterminado. Dicho comando es:

  

```bash

npm run start

```

  

### Vercel

  

La segunda manera de ejecutar la aplicación no requiere de consola ni similares, simplemente es visitar una página web. En concreto esta: [https://exam-cafler.vercel.app/](https://exam-cafler.vercel.app/).

  

Este enlace te permite ver el despliegue que hay actualmente de la rama `main` del proyecto. Además algo positivo que te brinda Vercel es el cifrado SSL, así que no tienes nada de lo que preocuparte, tus datos están seguros.

  

### Docker

  

Y la última forma, y para mi más interesante, es con Docker. El proyecto entero está dockerizado así que con solo descargarte la imagen desde Docker, y ejecutarla en un contenedor desde tu ordenador, puedes ver el proyecto en ejecución. Aunque es importante decirte que si no tienes instalado el Docker Engine no podrás ejecutar la aplicación con Docker, así que si tienes interés en hacerlo con Docker te motivo a que te lo instales. Igualmente déjame explicarte como puedes ejecutar la aplicación con Docker.

  

Primero de todo abriremos nuestro Terminal preferido. En él escribiremos lo siguiente:

  

```docker

docker pull columbuscode/exam-cafler:latest

```

  

De esta forma nos descargaremos la imagen en nuestro ordenador.

Una vez que esta haya completado la descarga consultaremos que se ha descargado correctamente, así que escribiremos en nuestro Terminal el siguiente comando:

  

```docker

docker images

```

  

Si encontramos una imagen con el nombre de `exam-cafler` significará que se ha instalado correctamente.

Y por último ejecutaremos la imagen en un contenedor. Esto lo haremos escribiendo en nuestro Terminal el siguiente comando:

  

```docker

docker run -p 4201:4200 columbuscode/exam-cafler:latest

```

  

De esta forma ejecutaremos la aplicación por el puerto 4201, para evitar cualquier tipo de error a la hora de solapar aplicaciones abiertas ejecutadas desde IDE’s. Es importante agregar el `:latest` ya que esto nos permite ejecutar la última versión de la imagen.

Una vez terminada la ejecución debemos ver que todo se ha ejecutado correctamente así que vamos a nuestro navegador y escribimos [`localhost:4201`](http://localhost:4201) y ahí veremos nuestra aplicación dockerizada ejecutándose exitosamente.

  

## Tests del proyecto
Ver que los tests funcionan correctamente es muy sencillo pero hay que tener una cosa en cuenta que es que deberemos de disponer de Google Chrome para ver el resultado de los tests ya que está especificado que estos se ejecuten solo si disponemos de Google Chrome. Dicho esto, para ver que los tests corren y se ejecutan exitosamente iremos a la Terminal donde tengamos nuestro proyecto y ejecutaremos el siguiente comando:

  

```bash

npm run test

```

  

Una vez ejecutado se abrirá Google Chrome y nos mostrará como todos los tests se han ejecutado exitosamente.

  

Una vez que hayamos realizado todos estos pasos podremos ver de forma exitosa que el proyecto se ejecuta de varias formas y pasa los tests correctamente.

  

---

  

# Documentación
## La correción de la prueba

  

A continuación encontrarás una extensa lista donde podrás observar qué es lo que la aplicación hace, con la finalidad de facilitarte las funcionalidades de toda la aplicación. Esta sección está dividida en dos partes que son “Esenciales” e “Implementaciones”. En “Esenciales” encontrarás los requisitos que el enunciado exigía; y en “Implementaciones” encontrarás las funcionalidades adicionales que se han implementado en esta aplicación web.

  

### Esenciales

  

La aplicación está hecha en Angular 16. Se ha tomado dicha decisión debido a que en la reunión previa a esta prueba supe que Calfer trabaja con Angular 14 y Angular 16. En la versión 14 es donde está la gran mayoría de la aplicación, y en la versión 16 es donde se está migrando. Así que con la finalidad de hacerlo de la mejor forma posible está hecha con Angular 16, aunque no se ha utilizado en su totalidad todas las nuevas funcionalidades que este aportaba.

  

En la página principal, (`/home`), hay una tabla donde se encuentrán los pedidos que hay para el día siguiente. El contenido de esta tabla viene de la petición a la API y está mostrando `/orders`. Debajo de la tabla, en la parte derecha, hay un botón donde te lleva a la otra página que es “Asignar” (`/assign`), allí puedes asignar los productos mostrados en la página principal.

  

En la página de asignación de productos (`/assign`) verás todos los productos separados por sus respectivas rutas asignadas desde la API; debajo de los productos encontrarás los conductores asignados a cada una de ellas. En cada producto, de cada ruta, encontrarás un botón donde podrás modificar la ruta en la que este se encuentra ya que dicho botón abre un pequeño modal donde te pide que le digas a que ruta quieres cambiar dicho producto. Una vez seleccionada la ruta deseada le das al botón de “Guardar” y ese producto se modificará. Al igual que podemos encontrar un botón encima de las rutas donde nos permitirá volver a la página de inicio.

  

El modal está diseñado de tal forma que es muy poco probable que haya un error a la hora de gestionar la asignación de productos, ya que está desarrollado de tal forma que solo puedes cambiar el producto de una ruta a otra que no sea la suya, y no hay un límite de productos para cada ruta. El único error que encontrarás es si no seleccionas ninguna ruta y le das directamente al botón de “Guardar”. Te saldrá un mensaje en forma de snackbar indicándote que no hay ninguna ruta asignada, por ende, no puede seguir adelante con la reasignación del producto.

  

En la cabecera podremos ver que tanto el logotipo, como el botón de “Inicio”, te permite volver a la página principal, además de más implementaciones que explicaremos en la siguiente sección.

  

Cada componente, servicio, interceptor y pipe tiene su propio archivo (`.spec`) donde se prueban prácticamente todas sus funcionalidades, menos el interceptor de error (`error.interceptor.ts`).

Esto es debido a que este interceptor se encarga del reintento cuando hay un error 5xx, no cuando hay un error 4xx. Como este no lograba conectar con la API a la hora de hacer los tests, ya que siempre te va a dar uno de los dos errores, el test no encontraba la ruta y daba error, así que como solo tenía un caso de prueba se optó por eliminar dicho archivo y no ensuciar el proyecto.

  

El proyecto está alojado en un repositorio GitHub ([https://github.com/sergiJimenez/exam_cafler](https://github.com/sergiJimenez/exam_cafler)), en la siguiente sección explicaré algo importante sobre el proyecto de GitHub.

  

Se utilizaron varias librerías para conseguir diferentes implementaciones, sobretodo las opcionales. Estas fueron Lottie (animaciones), Angular Material (estilos de la aplicación propios de Angular), Material Icons (iconos de Google), TranslateModule (traducción de la página web mediante `.json`), ESLint (lintado de la aplicación), Prettier (formateo del código); aparte de la nativa RxJs.

  

La persistencía existe en la aplicación web pudiendo refrescar la página desde cualquier punto de la aplicación. Los datos siempre se mantendrán ahí. Inclusive dicha persistencia existe si sales de la aplicación ya que esta hace uso del almacenamiento local (local storage) del navegador que esté utilizando el usuario para ver dicha aplicación web. Siempre y cuanto este no ejecute la aplicación en modo incognito ya que una vez que cierras la pestaña el local storage se borra.

  

Debido al interceptor de errores (`error.interceptor.ts`), cuando le des al botón de “Guardar”, enviará una petición `/post` pero, debido a como está montada la API, nunca llegarán los cambios así que este reintentará solo una vez la petición siempre que se encuentre con un error 5xx, nunca con un error 4xx.

  

Se ha creado una posible solución para mejorar las rutas utilizando trigonometría, en concreto la formula de Haversine. Esta fórmula calcula, teniendo en cuenta el radio de La Tierra, la distancia que existe entre dos puntos. Así que lo que se ha hecho es, teniendo en cuenta la distancia de cada repartidor con todos los productos, asignarle a dichos repartidores los productos que tenían más cercanos.

  

Para finalizar, toda la maquetación se ha hecho teniendo en cuenta el lenguaje visual que Cafler utiliza. Este punto se desarrollará en profundidad en la siguiente sección de la documentación.

  

### Implementaciones

  

Se ha implementado una animación de spinner en un componente, junto a su servicio y un interceptor, para que cada vez que se hace una petición a la API este intercepte la petición y ejecute dicho spinner para que el usuario no tenga que ver información vacia mientras que los datos se están cargando. Este spinner tiene los colores coorporativos de Calfer, en concreto el verde (#59f89c) y el azul (#006AE7) y se asemeja bastante al movimiento de un cigueñal y un pistón. Este spinner se ha hecho de la siguiente forma debido a que estos dos elementos son muy característicos en el mundo de la automoción ya que son una parte imprescindible del motor.

  

Todas las rutas que se utilizan en los componentes están en un archivo de constantes. La intención de esto es que si esta aplicación creciese más podríamos alojar todas las rutas añadidas en un mismo sitio. De esta forma no tienes que cambiarla en todos los sitios una por una. De esta forma cumplimos el primer principio de SOLID (single responsability).

  

Se ha implementado un servicio llamado `localStorage.service.ts`. Este tiene funciones con contratos abstractos con la finalidad de que sean lo más flexibles posibles a la hora de implementarlos en el código. Lo que conseguimos con este servicio es guardar elementos, buscar elementos, encontrar elementos y borrarlos del almacenamiento local del navegador que utilizemos.

  

Como podemos observar en el header hay un traductor. Este traduce absolutamente toda la página web, menos los datos que obtenemos desde la API. Como podemos observar hay seis idiomas disponibles, estos son el castellano, el catalán, el euskera, el francés, el inglés y el italiano. Y, ¿por qué se ha optado por estos idiomas? Principalmente porque son los idiomas que hacen referencia a las partes del mundo donde opera Cafler. Y como la siguiente expansión que Calfer tendrá será en Italia he optado por hacer también dicha traducción.

  

El header tiene un pequeño símbolo de una luna. Esto es debido a que a lo largo de estos días se intentó implementar un modo oscuro para la aplicación pero, aunque en parte se consiguió, no se logró maquetar del todo al 100% así que se ha optado por dejar ese botón ahí con la finalidad de mostrar que el header se presta también a futuras implementaciones. Si alguien tiene curiosidad por como era la lógica de este, en los Commits finales donde se elimina, se podría consultar.

  

En la página de asignar productos podemos observar que hay un botón rojo. Esta es una pequeña implementación que cambia un poco el enunciado y tiene que ver con la persistencia. El enunciado pone que el botón de la cabecera que te lleva al inicio debería de reiniciar la asignación de productos pero, desde el punto de vista de la accesibilidad y desde el punto de vista de la experiencia de usuario, no lo he encontrado algo lógico. El motivo es fráncamente simple, no forma parte de su función. El botón de Inicio, encontrado en la cabecera de la aplicación, es un botón que te lleva a la página de inicio de esta pero no debería de reestablecer la asignación ya que el usuario esto no lo sabe, si esto se llevase a cabo es algo que el usuario debería de memorizar. Es decir este debería de interpretar, y acordarse siempre, que al volver al inicio hace que se reestablezcan los pedidos pero, de esta forma, estamos complicándole la vida al usuario y no estariamos aplicando una persistencia de datos constante a lo largo de toda la aplicación, así que opté por no hacerlo de dicha forma.

Pero, como tampoco quería que esta funcionalidad no estuviese, opté principalmente por crear un botón justo al lado del botón de “Guardar”, con un lenguaje de colores bastante obvio, donde cuando pasas por encima dice claramente que hace “Restaurar los valores predeterminados”. De esta forma la persistencia siempre estará ahí y esta se eliminará solo y exclusivamente cuando nosotros se lo indiquemos, podremos navegar por toda la aplicación sin que los valores se restauren, inclusive si la página web se cerrase repentinamente por error no habría ningún problema y podriamos retomar el trabajo que habíamos hecho previamente.

  

Se ha hecho una maquetación minimalista con la finalidad de que la presentación fuese lo más limpia, semegante a Cafler y lo más descriptiva posible utilizando elementos simples, agradables a la vista e iconos claramente descriptivos. Además de usar un código de colores universal, usando los colores coorporativos de Calfer, donde cualquier persona interpretaría perfectamente la funcionalidad de cada uno de ellos. Además, para facilitar aún más la descripción de las funciones de cada botón se ha implementado un ToolTip, traducido también, donde explica en pocas cual es la función de dicho botón cuando pasas por encima de él (no disponible en la versión mobile). De esta forma ayudamos al usuario poco experimentado en este tipo de páginas web la funcionalidad de cada botón.

Las imagenes que podemos ver a los alrededores forman parte de Cafler ya que estas las podemos obtener directamente desde su página web. Se han modificado algunos colores de los `.svg` para separar la página de “Inicio” y de “Asignar productos” a modo de código de colores; de esta forma el usuario entenderá que aunque la imagen es la misma, o parecida, una no forma parte de la otra sino que es una extensión de esta.

Si inspeccionamos la página web podremos ver que la tipografía de esta es la misma que utiliza Cafler, “Roobert”. Esta se ha utilizado con la finalidad de asemejarse lo máximo posible al diseño web de Cafler.

Además también se ha trabajado, en la medida de lo posible, en el responsive pensando en una maquetación Mobile First con la finalidad de poder consumir dicha aplicación en móbiles, tablets y ordenadores.

  

Una de las cosas que se tuvieron en cuenta son los típicos errores “undefined” que a veces pueden obtenerse debido a que en la API ha habido un error y los datos no pueden mostrarse así que, para evitar huecos en blanco, se han creado dos pipes. Una pipe es para el nombre de los productos y la otra para el nombre de los conductores, de esta forma si hubiese algún tipo de problema con dichos nombres no pasaría nada ya que esta está programada de tal forma que mostraría un mensaje por defecto (traducido también) para que no veamos un valor en blanco y le de profesionalidad a dicha página web.

  

Se ha creado una página de error donde, si en algún momento alguna ruta falla, esta saltará y mostrará dicha página donde podemos ver una animación extraida de Lottie que está vinculada a la temática de la empresa. Si queréis ver esta vista es muy sencillo. Id a la URL donde estéis ejecutando la aplicación y donde pone `/home` o `/assign`, eliminais esa palabra y escribiis cualquier cosa, aparecerá. En la misma vista tenéis un botón para volver al Inicio.

  

El scafolding del proyecto está pensado exclusivamente en la escalabilidad de este. De esta forma si queremos hacer que esta aplicación crezca es increiblemente sencillo ya que la organización de esta te lo permite.

Igual que se ha aplicado Lazy Loading con al finalidad de mejorar el rendimiento de la aplicación a la hora de renderizar las vistas.

  

A lo largo del desarrollo del proyecto se aplicó GitFlow. Si indagas un poco en las ramas del proyecto, que no he querido borrarlas por si en algún momento alguien quiere ver que había en cada rama, algunas tienen las clásicas nomenclaturas que GitFlow utiliza (`feature/`, `dev`, `main` o `bugfix/`). No solo eso sino que siempre se ha trabajado con la rama `dev` hasta el último momento que se ha hecho una Pull Request a `main` para subir todo el desarrollo a dicha rama.

  

De hecho hay un GitHook programado con Bash dentro del proyecto. Este se encarga de que si queremos hacer algún Commit a la rama `main` nos salga un mensaje de error ya que esta está protegida de los commits directos. La única forma que tenemos de subir algo a dicha rama es haciendo un Pull Request.

  

Por último, y más importante, se ha tenido en cuenta que Cafler también trabaja con Docker así que la aplicación está 100% dockerizada y esta se puede consumir también descargándote la imagen y ejecutándola en un contenedor. En el apartado de la instalación podremos ver como hacerlo. Igualmente si quieres ver como es el `Dockerfile` podrás encontrarlo en el `/root` del proyecto como “Dockerfile”.

También puedes encontrar un `.json`. Este forma parte del Postman ya que esta es la herramienta que se ha utilizado para comprobar las respuestas de las peticiones a la hora de consumir la API.

  

Si has llegado hasta aquí quiero agradecerte el tiempo que le has dedicado a leer toda esta documentación. Dicho esto muchas gracias por darme la oportunidad de hacer esta prueba técnica y deseo que esta cumpla las espectativas esperadas.
