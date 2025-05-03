<main>
  <div class="chat">
    <h1>Chat del Servicio</h1>
    <div class="mensajes">
      <!-- Ejemplo de mensajes estáticos -->
      <div class="mensaje propio">
        <img src="https://via.placeholder.com/40" alt="Foto del usuario" />
        <div class="texto">
          <p><strong>Tú:</strong> Hola, estoy interesado en tu servicio.</p>
        </div>
      </div>

      <div class="mensaje ajeno">
        <img src="https://via.placeholder.com/40" alt="Foto del usuario" />
        <div class="texto">
          <p><strong>Laura Gómez:</strong> ¡Hola! Claro, ¿cuándo te gustaría la cita?</p>
        </div>
      </div>
    </div>
    <div class="enviar-mensaje">
      <input type="text" placeholder="Escribe tu mensaje..." />
      <button>Enviar</button>
    </div>
  </div>
</main>
<style>
  main {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    height: 100vh;
  }

  .chat {
    width: 100%;
    max-width: 600px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .mensajes {
    flex: 1;
    overflow-y: auto;
    padding-right: 1rem;
    max-height: 400px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .mensaje {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .mensaje img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .mensaje .texto {
    background: #f1f1f1;
    padding: 0.5rem;
    border-radius: 5px;
    max-width: 80%;
  }

  .mensaje.propio .texto {
    background: #0070f3;
    color: white;
  }

  .mensaje.ajeno .texto {
    background: #f1f1f1;
    color: black;
  }

  .enviar-mensaje {
    display: flex;
    gap: 0.5rem;
  }

  .enviar-mensaje input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .enviar-mensaje button {
    padding: 0.8rem 1.5rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }

  .enviar-mensaje button:hover {
    background-color: #005bb5;
  }
</style>