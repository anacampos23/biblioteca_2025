export function mostrarMensaje() {
  let mensaje = document.getElementById("mensaje");
  if (mensaje) {
    mensaje.textContent = "¡Gracias por hacer click!";
  }
}

if (typeof window !== "undefined") {
  let boton = document.getElementById("boton");
  boton.addEventListener("click", mostrarMensaje);
}



/**
 * ESTO ES UNA PRUEBAAAAA
 * Prueba unitaria para verificar que la función 'mostrarMensaje' funcione correctamente.
 * Usamos Jest para la prueba.
 
describe('Prueba de la función mostrarMensaje', () => {
  test('Debe mostrar un mensaje cuando se hace clic en el botón', () => {
    // Simula el clic en el botón
    const button = document.getElementById('mostrarMensaje');
    button.click();
    // Aquí deberíamos verificar si la alerta ha sido mostrada, para eso necesitaríamos un mock de alert
    // Pero por simplicidad, este test se enfoca en demostrar la idea.
    expect(true).toBe(true); // Esto debe ser reemplazado con una comprobación real
  });
});
*/


