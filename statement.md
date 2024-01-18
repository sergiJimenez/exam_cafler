# Angular Developer Test

La compañía Aparatos S.L ha decidido expandir su negocio y crear una aplicación web para que los usuarios puedan comprar sus productos electrónicos desde la comodidad de sus hogares. La empresa quiere ofrecer una experiencia de usuario óptima y está buscando a un Angular Frontend Developer para que la ayude a lograr este objetivo. Planea tener un gran volumen de pedidos y por ello también quieren desarrollar una plataforma interna para la gestión de rutas y asignación de pedidos.

Actualmente la empresa dispone de 3 repartidores activos y tiene una media de 21 repartos diarios, por lo que cada día, justo antes de acabar la jornada laboral se asignan aleatoriamente 7 paquetes a cada uno de estos y se cargan las furgonetas eléctricas de cada uno. Al día siguiente los repartidores empiezan la jornada partiendo desde su dirección de preferencia y acaban todos en la central de la empresa para repetir el proceso para el día siguiente. 

La asignación se está realizando de manera aleatoria, por lo que puede que no sea la más óptima. Esto repercute directamente en las emisiones de la empresa, además del coste logístico asociado. 

Se necesita crear un sistema que ofrezca a los operadores generar unas rutas más optimizadas que tengan en cuenta las direcciones de partida de los repartidores y las direcciones de cada uno de los servicios. Así como poder visualizar esas rutas y poder modificarlas manualmente en caso de que sea necesario.

Para ello se propone implementar un proyecto en Angular que muestre todas las rutas de reparto que deberán ser entregadas el día así como los paquetes que contiene la misma.

Actualmente se disponen de varios endpoints:

```jsx
exam.development.cafler.com
```

- Get /riders devuelve la lista de drivers que tiene Aparatos S.L
    
    ```jsx
    [
      {
        driverId: string,
        driverName: string,
        initialLocation: {
          lat: number,
          lng: number
        }
      }
    ]
    ```
    
- Get /orders devuelve la lista de pedidos hechos para la fecha especificada
    
    ```jsx
    [
      {
        orderId: string,
        productName: string,
        price: number,
        deliveryLocation: {
          lat: number,
          lng: number
        }
      }
    ]
    ```
    
- Get /optimized-routes devuelve la lista de las rutas que hará cada driver con los pedidos indicados para dicho día.
    
    ```jsx
    [
      {
        routeId: string,
        driverId: string,
        productsToDeliver: {
          orderId: string
        }
      }
    ]
    ```
    
- Post /route-updated actualiza las rutas con los datos que se le manden (no importa el formato) y puede devolver un error 400 o 500.

Para la prueba se requiere realizar las siguientes tareas: 

- Crear un nuevo proyecto en Angular 12 o superior donde se deberá incluir:
    - Una página de inicio donde se muestren los pedidos que hay para el siguiente día con un botón que sirva para asignar esos pedidos.
    - Una página a la que te manda después de seleccionar “asignar” en la página de inicio con el resultado de dicha asignación mostrando las rutas y los pedidos que tiene cada ruta asignada. Así como una forma de mover pedidos de una ruta a otra a voluntad. Una vez editados, un botón para guardarlos.
    - Gestión de los posibles errores que pueda dar el guardado de las rutas.
    - Una cabecera con navegación para que te devuelva a la página principal en caso de que quieras reiniciar la asignación (o mostrar más funcionalidades que se realizarán en un futuro).
    - Implementar los test unitarios para las funciones desarrolladas.
- Utilizar un repositorio de GitHub para subir todos los cambios que se hagan en el proyecto.
- Utilizar cualquier librería tanto de funcionalidad como de diseño que conozcas para este proyecto.
- Implementar persistencia en el front, para que los datos se mantengan incluso al recargar la página.
- Reintentar la petición automáticamente si es un error 500 pero no si es un 400.
- Crear una implementación propia de GET /optimized-routes usando los criterios que consideres adecuados para intentar optimizar todavía más la ruta.

Se valorará positivamente la maquetación de la aplicación desarrollada teniendo en cuenta el lenguaje de marca Cafler.
