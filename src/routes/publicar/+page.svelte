<main>
  <div class="publicar">
    <h1>Publicar Servicio</h1>
    <form>
      <div class="campo">
        <label for="nombre">Nombre del Servicio:</label>
        <input type="text" id="nombre" placeholder="Ej: Reparación de Computadores" required />
      </div>

      <div class="campo">
        <label for="categoria">Categoría:</label>
        <select id="categoria" required>
          <option value="" disabled selected>Selecciona una categoría</option>
          <option>Electrodomésticos</option>
          <option>Celulares</option>
          <option>Computadores</option>
          <option>Portátiles</option>
          <option>Software</option>
          <option>Hardware</option>
          <option>Instalaciones</option>
          <option>Tecnología Varia</option>
          <option>Otros</option>
        </select>
      </div>

      <div class="campo">
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" placeholder="Describe tu servicio..." required></textarea>
      </div>

      <div class="campo">
        <label for="fotos">Subir Fotos (Máximo 3):</label>
        <input type="file" id="fotos" accept="image/*" multiple />
        <div class="fotos">
          <div class="foto">
            <img src="https://via.placeholder.com/100" alt="Vista previa" />
            <button type="button">Eliminar</button>
          </div>
        </div>
      </div>

      <div class="campo">
        <label for="departamento">Departamento:</label>
        <select id="departamento">
          <option value="" disabled selected>Selecciona un departamento</option>
          <option>Antioquia</option>
          <option>Cundinamarca</option>
          <option>Valle del Cauca</option>
        </select>
      </div>

      <div class="campo">
        <label for="ciudad">Ciudad:</label>
        <select id="ciudad">
          <option value="" disabled selected>Selecciona una ciudad</option>
          <option>Medellín</option>
          <option>Bogotá</option>
          <option>Cali</option>
        </select>
      </div>

      <button type="submit">Publicar</button>
    </form>
    <p class="mensaje">Completa todos los campos para publicar tu servicio.</p>
  </div>
</main>
<style>
  main {
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #f8f9fa;
    min-height: 100vh;
  }

  .publicar {
    background-color: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
  }

  .campo {
    margin-bottom: 1rem;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    display: block;
    width: 100%;
  }

  button:hover {
    background-color: #005bb5;
  }

  .fotos {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .foto {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .foto img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }

  .foto button {
    background-color: #e53e3e;
    border: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .foto button:hover {
    background-color: #c53030;
  }

  .mensaje {
    margin-top: 1rem;
    color: #e53e3e;
    font-size: 1.1rem;
    text-align: center;
  }
</style>