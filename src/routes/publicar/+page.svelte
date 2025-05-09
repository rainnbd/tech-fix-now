<script>
  import { auth, db } from "$lib/js/firebase";
  import { addDoc, collection, serverTimestamp } from "firebase/firestore";
  import { onMount } from "svelte";

  let nombre = "";
  let categoria = "";
  let descripcion = "";
  let departamento = "";
  let ciudad = "";
  let precio = 0;
  let newPhotoUrl = "";
  let fotos = [];
  let email = "";
  let telefono = "";
  let loading = false;
  let error = null;

  const categorias = [
    "Electrodomésticos",
    "Celulares",
    "Computadores",
    "Portátiles",
    "Software",
    "Hardware",
    "Instalaciones",
    "Tecnología Varia",
    "Otros",
  ];

  const departamentos = ["Antioquia", "Cundinamarca", "Valle del Cauca"];

  const ciudadesPorDepto = {
    Antioquia: ["Medellín"],
    Cundinamarca: ["Bogotá"],
    "Valle del Cauca": ["Cali"],
  };

  $: ciudades = departamento ? ciudadesPorDepto[departamento] : [];

  function addPhoto() {
    const url = newPhotoUrl.trim();
    if (!url) return;
    if (fotos.length >= 3) {
      alert("Solo puedes agregar hasta 3 fotos.");
      return;
    }
    if (!isValidUrl(url)) {
      alert("Por favor ingresa una URL válida");
      return;
    }
    fotos = [...fotos, url];
    newPhotoUrl = "";
  }

  function removePhoto(idx) {
    fotos = fotos.filter((_, i) => i !== idx);
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  async function publicar() {
    try {
      loading = true;
      error = null;

      if (!auth.currentUser) throw new Error("Debes iniciar sesión primero");
      if (fotos.length === 0)
        throw new Error("Debes agregar al menos una foto");
      if (!departamento || !ciudad)
        throw new Error("Selecciona ubicación completa");

      const nuevaPublicacion = {
        nombre,
        categoria: [categoria],
        descripcion,
        departamento: [departamento],
        ciudad: [ciudad],
        foto: fotos[0],
        fotos,
        precio: Number(precio),
        email,
        telefono,
        usuariopubli: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        isActive: true,
      };

      const docRef = await addDoc(
        collection(db, "publicarservicios"),
        nuevaPublicacion,
      );

      // Resetear
      nombre =
        categoria =
        descripcion =
        departamento =
        ciudad =
        email =
        telefono =
          "";
      precio = 0;
      fotos = [];

      alert(`¡Publicación exitosa! ID: ${docRef.id}`);
    } catch (err) {
      error = err.message;
      console.error("Error al publicar:", err);
    } finally {
      loading = false;
    }
  }
</script>

<main class="container py-5">
  <div class="card shadow-lg fade-in publicar">
    <div class="card-body">
      <h1 class="card-title mb-4">
        <i class="fas fa-upload me-2"></i>Publicar Servicio
      </h1>

      {#if error}
        <div class="alert alert-danger mb-4">
          <i class="fas fa-exclamation-triangle me-2"></i>{error}
        </div>
      {/if}

      <form on:submit|preventDefault={publicar}>
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label class="form-label">Nombre del Servicio</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-tag"></i></span>
              <input
                class="form-control"
                type="text"
                bind:value={nombre}
                placeholder="Ej: Reparación de Computadores"
                required
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Categoría</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-list"></i></span>
              <select class="form-select" bind:value={categoria} required>
                <option value="" disabled selected
                  >Selecciona una categoría</option
                >
                {#each categorias as cat}
                  <option value={cat}>{cat}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Precio (COP)</label>
            <div class="input-group mb-3">
              <span class="input-group-text"
                ><i class="fas fa-dollar-sign"></i></span
              >
              <input
                class="form-control"
                type="number"
                bind:value={precio}
                min="0"
                step="1000"
                required
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Correo electrónico</label>
            <div class="input-group mb-3">
              <span class="input-group-text"
                ><i class="fas fa-envelope"></i></span
              >
              <input
                class="form-control"
                type="email"
                bind:value={email}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Número telefónico</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-phone"></i></span>
              <input
                class="form-control"
                type="tel"
                bind:value={telefono}
                placeholder="Ej: 3001234567"
                required
              />
            </div>
          </div>

          <div class="col-12">
            <label class="form-label">Descripción</label>
            <textarea
              class="form-control mb-3"
              rows="4"
              bind:value={descripcion}
              placeholder="Describe tu servicio..."
              required
            ></textarea>
          </div>

          <div class="col-12">
            <label class="form-label">Subir Fotos (Máximo 3 URLs)</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-image"></i></span>
              <input
                class="form-control"
                type="url"
                bind:value={newPhotoUrl}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <button
                type="button"
                class="btn btn-primary"
                on:click={addPhoto}
                disabled={fotos.length >= 3}
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="row row-cols-2 row-cols-md-3 g-3 fotos">
              {#each fotos as url, i}
                <div class="col foto">
                  <img src={url} alt="Vista previa" class="img-fluid rounded" />
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    on:click={() => removePhoto(i)}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Departamento</label>
            <div class="input-group mb-3">
              <span class="input-group-text"
                ><i class="fas fa-map-marker-alt"></i></span
              >
              <select class="form-select" bind:value={departamento} required>
                <option value="" disabled selected
                  >Selecciona un departamento</option
                >
                {#each departamentos as dept}
                  <option value={dept}>{dept}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Ciudad</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-city"></i></span>
              <select
                class="form-select"
                bind:value={ciudad}
                disabled={!departamento}
                required
              >
                <option value="" disabled selected>
                  {departamento
                    ? "Selecciona una ciudad"
                    : "Primero selecciona departamento"}
                </option>
                {#each ciudades as c}
                  <option value={c}>{c}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        <div class="d-grid mt-4">
          <button
            type="submit"
            class="btn btn-success btn-lg"
            disabled={loading}
          >
            {#if loading}
              <span class="spinner-border spinner-border-sm" role="status"
              ></span>
              Publicando...
            {:else}
              Publicar
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
