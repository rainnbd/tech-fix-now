<main class="container py-5">
  <div class="pagina animate-fadeIn">
    <div class="d-flex justify-content-center gap-3 mb-5 flex-wrap">
      <button class="btn btn-primary">
        <i class="fas fa-plus-circle me-2"></i>
        Publicar Servicio
      </button>
      <button class="btn btn-outline-secondary">
        <i class="fas fa-list me-2"></i>
        Ver Publicaciones
      </button>
      <button class="btn btn-info text-white">
        <i class="fas fa-comments me-2"></i>
        Chats
      </button>
    </div>

    <section class="servicios">
      <h2 class="h4 text-center mb-4">Servicios Disponibles</h2>
      <div class="row g-4 justify-content-center">
        <div class="col-sm-6 col-lg-4">
          <div class="card h-100 servicio-card">
            <img
              src="https://via.placeholder.com/300"
              class="card-img-top"
              alt="Foto del servicio"
            />
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
              <div class="mt-auto d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  class="rounded-circle me-2"
                  alt="Foto del usuario"
                  style="width:40px; height:40px; object-fit:cover;"
                />
                <div class="flex-grow-1">
                  <p class="mb-1">
                    Juan Pérez <small class="text-muted">(Usuario)</small>
                  </p>
                  <button class="btn btn-sm btn-success">
                    <i class="fas fa-paper-plane me-1"></i>
                    Enviar Mensaje
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-4">
          <div class="card h-100 servicio-card">
            <img
              src="https://via.placeholder.com/300"
              class="card-img-top"
              alt="Foto del servicio"
            />
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
              <div class="mt-auto d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  class="rounded-circle me-2"
                  alt="Foto del usuario"
                  style="width:40px; height:40px; object-fit:cover;"
                />
                <div class="flex-grow-1">
                  <p class="mb-1">
                    Laura Gómez <small class="text-muted">(Empresa)</small>
                  </p>
                  <button class="btn btn-sm btn-success">
                    <i class="fas fa-paper-plane me-1"></i>
                    Enviar Mensaje
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

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

  .servicio-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
</style>
