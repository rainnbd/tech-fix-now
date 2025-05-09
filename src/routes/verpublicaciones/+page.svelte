<script>
  import { onMount } from "svelte";
  import { auth, db } from "$lib/js/firebase";
  import { collection, query, where, getDocs } from "firebase/firestore";

  let publicaciones = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        // Si no está autenticado, redirige al login
        window.location.href = "/";
        return;
      }

      // Consulta solo las publicaciones de este usuario
      const publicacionesRef = collection(db, "publicarservicios");
      const q = query(publicacionesRef, where("usuariopubli", "==", user.uid));
      const querySnapshot = await getDocs(q);

      publicaciones = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      error = err.message;
      console.error("Error al cargar mis publicaciones:", err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="bg-secondary">
  <div class="container py-5">
    <div class="card publicaciones-card animate-fadeIn">
      <div class="card-body">
        <h1 class="h3 text-center mb-4">Mis Publicaciones</h1>

        {#if loading}
          <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando tus publicaciones...</p>
          </div>
        {:else if error}
          <div class="alert alert-danger text-center">{error}</div>
        {:else if publicaciones.length === 0}
          <p class="text-center">No tienes publicaciones aún.</p>
        {:else}
          <div class="row g-4">
            {#each publicaciones as pub}
              <div class="col-md-6">
                <div class="card publication-card h-100 bg-light">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{pub.nombre}</h5>
                    <p class="card-text mb-1">
                      <i class="fas fa-tag text-primary me-1"></i>
                      <strong>Categoría:</strong>
                      {pub.categoria?.join(", ") || "Sin categoría"}
                    </p>
                    <p class="card-text mb-1">
                      <i class="fas fa-info-circle text-primary me-1"></i>
                      <strong>Descripción:</strong>
                      {pub.descripcion}
                    </p>
                    <p class="card-text mb-1">
                      <i class="fas fa-map-marker-alt text-danger me-1"></i>
                      <strong>Ubicación:</strong>
                      {pub.ciudad?.join(", ") || "No especificada"},
                      {pub.departamento?.join(", ") || ""}
                    </p>

                    {#if pub.fotos?.length}
                      <div class="row g-2 mb-3 fotos-publicacion">
                        {#each pub.fotos as foto}
                          <div class="col-6">
                            <img
                              src={foto}
                              alt="Foto del servicio"
                              class="img-fluid rounded"
                            />
                          </div>
                        {/each}
                      </div>
                    {/if}

                    <div class="mt-auto text-end acciones">
                      <button class="btn btn-sm btn-outline-primary me-2">
                        <i class="fas fa-edit me-1"></i>Editar
                      </button>
                      <button class="btn btn-sm btn-outline-danger">
                        <i class="fas fa-trash-alt me-1"></i>Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
  }

  .publication-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .fotos-publicacion img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
</style>
