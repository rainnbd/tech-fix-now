<script>
  import "$lib/css/app.css";
</script>

<div class="bg-secondary">
  <div class="container py-5">
    <div class="card publicaciones-card animate-fadeIn">
      <div class="card-body">
        <h1 class="h3 text-center mb-4">Mis Publicaciones</h1>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="card publication-card h-100 bg-light">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">Reparación de Computadores</h5>
                <p class="card-text mb-1">
                  <i class="fas fa-tag text-primary me-1"></i>
                  <strong>Categoría:</strong> Hardware
                </p>
                <p class="card-text mb-1">
                  <i class="fas fa-info-circle text-primary me-1"></i>
                  <strong>Descripción:</strong> Servicio de mantenimiento y reparación
                  de PC.
                </p>
                <p class="card-text mb-3">
                  <i class="fas fa-map-marker-alt text-danger me-1"></i>
                  <strong>Ubicación:</strong> Bogotá, Cundinamarca
                </p>

                <div class="row g-2 mb-3 fotos-publicacion">
                  <div class="col-6">
                    <img
                      src="https://via.placeholder.com/300"
                      alt="Foto del servicio"
                      class="img-fluid rounded"
                    />
                  </div>
                  <div class="col-6">
                    <img
                      src="https://via.placeholder.com/300"
                      alt="Foto del servicio"
                      class="img-fluid rounded"
                    />
                  </div>
                </div>

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
          <div class="col-md-6">
            <div class="card publication-card h-100 bg-light">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">Instalación de Cámaras de Seguridad</h5>
                <p class="card-text mb-1">
                  <i class="fas fa-tag text-primary me-1"></i>
                  <strong>Categoría:</strong> Instalaciones Tecnológicas
                </p>
                <p class="card-text mb-1">
                  <i class="fas fa-info-circle text-primary me-1"></i>
                  <strong>Descripción:</strong> Instalación profesional de sistemas
                  de seguridad.
                </p>
                <p class="card-text mb-3">
                  <i class="fas fa-map-marker-alt text-danger me-1"></i>
                  <strong>Ubicación:</strong> Medellín, Antioquia
                </p>

                <div class="row g-2 mb-3 fotos-publicacion">
                  <div class="col-12">
                    <img
                      src="https://via.placeholder.com/300"
                      alt="Foto del servicio"
                      class="img-fluid rounded"
                    />
                  </div>
                </div>

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
        </div>
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
</style>
