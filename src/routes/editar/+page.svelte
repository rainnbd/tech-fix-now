<main>
  <div class="editar-servicio">
    <h1>Editar Servicio</h1>
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
        <label for="fotos">Fotos:</label>
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

      <button type="submit">Guardar Cambios</button>
    </form>
    <p class="mensaje">Realiza los cambios y guarda la actualización.</p>
  </div>
</main>