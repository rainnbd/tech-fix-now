<main>
  <div class="pagina">
    <div class="botones">
      <button class="btn-publicar">Publicar Servicio</button>
      <button class="btn-ver">Ver Publicaciones</button>
      <button class="btn-chats">Chats</button>
    </div>
    <div class="servicios">
      <h2>Servicios Disponibles</h2>
      <div class="lista-servicios">
        <!-- Ejemplo de servicios estáticos -->
        <div class="servicio">
          <div class="detalles-servicio">
            <h3>Reparación de Computadores</h3>
            <p><strong>Categoría:</strong> Hardware</p>
            <p><strong>Descripción:</strong> Servicio de mantenimiento y reparación de PC.</p>
            <p><strong>Ubicación:</strong> Bogotá, Cundinamarca</p>
          </div>
          <div class="fotos-servicio">
            <img src="https://via.placeholder.com/300" alt="Foto del servicio" />
          </div>
          <div class="usuario-publicador">
            <img src="https://via.placeholder.com/50" alt="Foto del usuario" />
            <p>Juan Pérez (Usuario)</p>
            <button>Enviar Mensaje</button>
          </div>
        </div>

        <div class="servicio">
          <div class="detalles-servicio">
            <h3>Instalación de Cámaras de Seguridad</h3>
            <p><strong>Categoría:</strong> Instalaciones Tecnológicas</p>
            <p><strong>Descripción:</strong> Instalación profesional de sistemas de seguridad.</p>
            <p><strong>Ubicación:</strong> Medellín, Antioquia</p>
          </div>
          <div class="fotos-servicio">
            <img src="https://via.placeholder.com/300" alt="Foto del servicio" />
          </div>
          <div class="usuario-publicador">
            <img src="https://via.placeholder.com/50" alt="Foto del usuario" />
            <p>Laura Gómez (Empresa)</p>
            <button>Enviar Mensaje</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<style>
  main {
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(to bottom, #0070f3, #48bb78);
    color: white;
  }

  .pagina {
    text-align: center;
    max-width: 1200px;
    width: 100%;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    color: black;
  }

  .botones {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2rem;
  }

  .btn-publicar, .btn-ver, .btn-chats {
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    background-color: #0070f3;
    color: white;
    transition: background-color 0.3s;
  }

  .btn-publicar:hover, .btn-ver:hover, .btn-chats:hover {
    background-color: #005bb5;
  }

  .servicios {
    margin-top: 1rem;
  }

  .lista-servicios {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }

  .servicio {
    width: 300px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 1rem;
  }

  .detalles-servicio {
    margin-bottom: 1rem;
  }

  .detalles-servicio h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .fotos-servicio img {
    width: 100%;
    height: auto;
    margin-top: 0.5rem;
    border-radius: 5px;
  }

  .usuario-publicador {
    margin-top: 1rem;
    text-align: left;
  }

  .usuario-publicador img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 0.5rem;
  }

  .usuario-publicador p {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    font-size: 1rem;
    color: #555;
  }

  .usuario-publicador button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }

  .usuario-publicador button:hover {
    background-color: #3b9c63;
  }
</style>