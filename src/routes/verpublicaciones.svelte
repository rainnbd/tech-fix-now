<main>
  <div class="publicaciones">
    <h1>Mis Publicaciones</h1>
    <div class="lista-publicaciones">
      <!-- Ejemplo de publicaciones estáticas -->
      <div class="publicacion">
        <div class="detalles-publicacion">
          <h3>Reparación de Computadores</h3>
          <p><strong>Categoría:</strong> Hardware</p>
          <p><strong>Descripción:</strong> Servicio de mantenimiento y reparación de PC.</p>
          <p><strong>Ubicación:</strong> Bogotá, Cundinamarca</p>
        </div>
        <div class="fotos-publicacion">
          <img src="https://via.placeholder.com/300" alt="Foto del servicio" />
          <img src="https://via.placeholder.com/300" alt="Foto del servicio" />
        </div>
        <div class="acciones">
          <button>Editar</button>
          <button>Eliminar</button>
        </div>
      </div>

      <div class="publicacion">
        <div class="detalles-publicacion">
          <h3>Instalación de Cámaras de Seguridad</h3>
          <p><strong>Categoría:</strong> Instalaciones Tecnológicas</p>
          <p><strong>Descripción:</strong> Instalación profesional de sistemas de seguridad.</p>
          <p><strong>Ubicación:</strong> Medellín, Antioquia</p>
        </div>
        <div class="fotos-publicacion">
          <img src="https://via.placeholder.com/300" alt="Foto del servicio" />
        </div>
        <div class="acciones">
          <button>Editar</button>
          <button>Eliminar</button>
        </div>
      </div>
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

  .publicaciones {
    width: 100%;
    max-width: 800px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .lista-publicaciones {
    flex: 1;
    overflow-y: auto;
    padding-right: 1rem;
    max-height: 500px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .publicacion {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .detalles-publicacion h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .fotos-publicacion img {
    width: 100%;
    height: auto;
    margin-top: 0.5rem;
    border-radius: 5px;
  }

  .acciones {
    margin-top: 1rem;
    text-align: right;
  }

  .acciones button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    background-color: #0070f3;
    color: white;
  }

  .acciones button:hover {
    background-color: #005bb5;
  }

  .acciones button:nth-child(2) {
    background-color: #e53e3e;
  }

  .acciones button:nth-child(2):hover {
    background-color: #c53030;
  }
</style>