<main>
  <div class="mensajes">
    <h1>Mis Chats</h1>
    <div class="lista-chats">
      <!-- Ejemplo de chats estáticos -->
      <button class="chat">
        <img src="https://via.placeholder.com/50" alt="Foto del usuario" />
        <div class="detalle-chat">
          <p><strong>Servicio:</strong> Reparación de Computadores</p>
          <p><strong>Último mensaje:</strong> "¿Cuándo podríamos agendar la revisión?"</p>
        </div>
      </button>

      <button class="chat">
        <img src="https://via.placeholder.com/50" alt="Foto del usuario" />
        <div class="detalle-chat">
          <p><strong>Servicio:</strong> Instalación de Cámaras de Seguridad</p>
          <p><strong>Último mensaje:</strong> "Genial, mañana te envío la cotización."</p>
        </div>
      </button>
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

  .mensajes {
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

  .lista-chats {
    flex: 1;
    overflow-y: auto;
    padding-right: 1rem;
    max-height: 400px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .chat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
    padding: 1rem;
    border-radius: 5px;
    background: #f9f9f9;
    transition: background-color 0.3s;
  }

  .chat:hover {
    background-color: #e0e0e0;
  }

  .chat img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .detalle-chat {
    flex: 1;
    text-align: left;
  }

  .detalle-chat p {
    margin: 0;
    font-size: 1rem;
    color: #333;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #0070f3;
  }
</style>