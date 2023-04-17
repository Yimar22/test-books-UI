# QA Books-E2E-API
#Objetivo
Este taller tiene como objetivo que se aplique los conceptos relacionados con las pruebas "End to End" (E2E), de manera que pueda probar la UI y API de la aplicación de principio a fin, simulando la interacción de un usuario real. También ofrece la oportunidad de reforzar los conocimientos en integración y despliegue continuo (CI/CD).


#Instrucciones de ejecución
Clonar el repositorio de Backend books-back a su computadora y correrlo.
Clonar el repositorio de Frontend books-ui y correrlo.
Clonar este repositorio.
Ir a la carpeta raíz del repositorio y ejecutar el siguiente comando para instalar las dependencias necesarias para una correcta ejecución de las pruebas:
npm install

Para ejecutar las pruebas en modo Headless, ejecutar el siguiente comando:
npm test

Para ejecutar las pruebas en modo GUI, seguir los siguientes pasos:
Ejecutar el siguiente comando:

npm run test:open

Seleccionar la opción de "E2E Testing"

Seleccionar la opción de navegador que más se adecue a su uso, de no ser así, seleccione la opción de Chrome y después seleccione "Start E2E Testing in Chrome".

Seleccionar el archivo de prueba que quiere ejecutar. Una vez seleccionado el archivo, se ejecutarán las pruebas.

