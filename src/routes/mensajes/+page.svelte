<main class="container py-5">
  <div class="card chat-card animate-fadeIn mx-auto" style="max-width: 600px;">
    <div class="card-body d-flex flex-column p-4">
      <h1 class="h4 text-center mb-4">Chat del Servicio</h1>

      <div
        class="flex-grow-1 overflow-auto mb-3 px-2"
        style="max-height: 400px;"
      >
        <div class="d-flex justify-content-end mb-3 mensaje propio">
          <div class="d-flex align-items-end">
            <div
              class="px-3 py-2 rounded bg-primary text-white position-relative"
              style="max-width: 75%;"
            >
              <p class="mb-0">
                <strong>Tú:</strong> Hola, estoy interesado en tu servicio.
              </p>
            </div>
            <img
              src="https://via.placeholder.com/40"
              alt="Foto del usuario"
              class="rounded-circle ms-2"
              style="width:40px; height:40px; object-fit:cover;"
            />
          </div>
        </div>

        <div class="d-flex justify-content-start mb-3 mensaje ajeno">
          <div class="d-flex align-items-end">
            <img
              src="https://via.placeholder.com/40"
              alt="Foto del usuario"
              class="rounded-circle me-2"
              style="width:40px; height:40px; object-fit:cover;"
            />
            <div
              class="px-3 py-2 rounded bg-light text-dark"
              style="max-width: 75%;"
            >
              <p class="mb-0">
                <strong>Laura Gómez:</strong> ¡Hola! Claro, ¿cuándo te gustaría la
                cita?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Escribe tu mensaje..."
        />
        <button class="btn btn-primary">
          <!-- xddd -->
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
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

  .mensaje .rounded:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
</style>
