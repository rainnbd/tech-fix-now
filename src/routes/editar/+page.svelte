<script>
  // Datos del formulario
  let nombre = "";
  let categoria = "";
  let descripcion = "";
  let departamento = "";
  let ciudad = "";

  // Para el nuevo campo de URL de foto
  let newPhotoUrl = "";
  let fotos = []; // almacenamos aquí las URLs

  // Listas de opciones
  const categorias = [
    "Electrodomésticos",
    "Celulares",
    "Computadores",
    "Portátiles",
    "Software",
    "Hardware",
    "Instalaciones",
    "Tecnologías Varias",
    "Otros",
  ];

  const departamentos = ["Antioquia", "Cundinamarca", "Valle del Cauca"];

  const ciudadesPorDepto = {
    Antioquia: ["Medellín"],
    Cundinamarca: ["Bogotá"],
    "Valle del Cauca": ["Cali"],
  };

  // Ciudades reactivas según departamento
  $: ciudades = departamento ? ciudadesPorDepto[departamento] : [];

  // Añade la URL al array de fotos
  function addPhoto() {
    const url = newPhotoUrl.trim();
    if (url) {
      fotos = [...fotos, url];
      newPhotoUrl = "";
    }
  }

  // Elimina una foto por índice
  function removePhoto(idx) {
    fotos = fotos.filter((_, i) => i !== idx);
  }

  // Simula envío
  function guardarCambios() {
    // Aquí podrías hacer fetch a tu API:
    console.log({
      nombre,
      categoria,
      descripcion,
      departamento,
      ciudad,
      fotos,
    });
    alert("Cambios guardados");
  }
</script>

<svelte:head>
  <!-- Bootstrap CSS -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <!-- FontAwesome -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<main class="container py-5">
  <div class="card shadow-lg fade-in">
    <div class="card-body">
      <h1 class="card-title mb-4">
        <i class="fas fa-edit me-2"></i>Editar Servicio
      </h1>
      <form on:submit|preventDefault={guardarCambios}>
        <div class="row g-3">
          <!-- Nombre -->
          <div class="col-12 col-md-6">
            <label for="nombre" class="form-label">Nombre del Servicio</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-tag"></i></span>
              <input
                id="nombre"
                class="form-control"
                type="text"
                bind:value={nombre}
                placeholder="Ej: Reparación de Computadores"
                required
              />
            </div>
          </div>

          <!-- Categoría -->
          <div class="col-12 col-md-6">
            <label for="categoria" class="form-label">Categoría</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-list"></i></span>
              <select
                id="categoria"
                class="form-select"
                bind:value={categoria}
                required
              >
                <option value="" disabled selected>
                  Selecciona una categoría
                </option>
                {#each categorias as cat}
                  <option value={cat}>{cat}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Descripción -->
          <div class="col-12">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea
              id="descripcion"
              class="form-control mb-3"
              rows="4"
              bind:value={descripcion}
              placeholder="Describe tu servicio..."
              required
            ></textarea>
          </div>

          <!-- Fotos (URL) -->
          <div class="col-12">
            <label for="foto-url" class="form-label">Fotos (URL)</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-image"></i></span>
              <input
                id="foto-url"
                class="form-control"
                type="url"
                bind:value={newPhotoUrl}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <button type="button" class="btn btn-primary" on:click={addPhoto}>
                <i class="fas fa-plus"></i> Agregar
              </button>
            </div>
            <div class="row row-cols-2 row-cols-md-4 g-3 fotos">
              {#each fotos as url, i}
                <div class="col foto">
                  <img src={url} alt="Vista previa" class="img-fluid rounded" />
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    on:click={() => removePhoto(i)}
                  >
                    <!-- boton basura -->
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <!-- Departamento -->
          <div class="col-12 col-md-6">
            <label for="departamento" class="form-label">Departamento</label>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              <select
                id="departamento"
                class="form-select"
                bind:value={departamento}
              >
                <option value="" disabled selected>
                  Selecciona un departamento
                </option>
                {#each departamentos as dept}
                  <option value={dept}>{dept}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Ciudad -->
          <div class="col-12 col-md-6">
            <label for="ciudad" class="form-label">Ciudad</label>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fas fa-city"></i>
              </span>
              <select
                id="ciudad"
                class="form-select"
                bind:value={ciudad}
                disabled={!departamento}
              >
                <option value="" disabled selected>
                  {departamento
                    ? "Selecciona una ciudad"
                    : "Elige primero departamento"}
                </option>
                {#each ciudades as c}
                  <option value={c}>{c}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        <!-- Botón Guardar -->
        <div class="d-grid mt-4">
          <button type="submit" class="btn btn-success btn-lg">
            <i class="fas fa-save me-2"></i>Guardar Cambios
          </button>
        </div>
      </form>

      <p class="mt-3 text-muted mensaje">
        <i class="fas fa-info-circle me-1"></i>
        Realiza los cambios y guarda la actualización.
      </p>
    </div>
  </div>
</main>

<style>
  /* Animaciones CSS */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .fade-in {
    animation: fadeIn 0.5s ease-in-out both;
  }
  .foto {
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.3s ease both;
    transition: transform 0.3s ease;
  }
  .foto:hover {
    transform: scale(1.05);
  }
  .foto button {
    position: absolute;
    top: 5px;
    right: 5px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .foto:hover button {
    opacity: 1;
  }
  .mensaje {
    animation: fadeIn 0.7s ease both;
  }
</style>
