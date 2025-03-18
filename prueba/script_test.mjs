import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { mostrarMensaje } from './script.js'; // Importa la función de script.js

describe('Pruebas para la función mostrarMensaje', function () {
  let window;
  let document;
  let botonElement;
  let mensajeElement;

  // Ejecutamos antes de cada prueba
  beforeEach(function () {
    // Configuramos un entorno simulado de DOM con jsdom
    const dom = new JSDOM(`
      <html lang="es">
        <body>
          <div id="mensaje"></div>
          <button id="boton">Haz clic</button>
        </body>
      </html>
    `);
    window = dom.window;
    document = window.document;

    // Enlazamos el DOM al contexto global para que el código de script.js funcione
    global.document = document;
    global.window = window;

    // Accedemos a los elementos para manipularlos en la prueba
    botonElement = document.getElementById('boton');
    mensajeElement = document.getElementById('mensaje');

    // Llamamos a la función que enlaza el evento click
    // Esto simula lo que hace tu script cuando se ejecuta en el navegador
    botonElement.addEventListener("click", mostrarMensaje);
  });

  // Test de la función
  it('debería cambiar el texto del mensaje cuando se hace clic en el botón', function () {
    // Simulamos un clic en el botón
    botonElement.click(); // Esto debería llamar a la función mostrarMensaje

    // Comprobamos que el contenido de #mensaje se ha actualizado
    expect(mensajeElement.textContent).to.equal('¡Gracias por hacer click!');
  });
});
