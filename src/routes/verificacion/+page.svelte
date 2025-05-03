<script>
  import "$lib/css/app.css";
  import { auth } from "$lib/js/firebase";
  import { onAuthStateChanged } from "firebase/auth";

  let tiempoRestante = 180; // Tiempo de espera en segundos (3 minutos)
  let mensaje = "Por favor, verifica tu correo electrónico para continuar."; // Mensaje inicial
  let intervalo; // Intervalo para el temporizador

  // Iniciar el temporizador y verificar el estado de verificación del correo periódicamente
  const iniciarTemporizador = () => {
    intervalo = setInterval(async () => {
      if (tiempoRestante > 0) {
        tiempoRestante--;
      } else {
        // Detener el temporizador y redirigir al inicio si no se verifica a tiempo
        clearInterval(intervalo);
        mensaje = "⏳ Tiempo de espera agotado. Redirigiendo al inicio...";
        setTimeout(() => {
          window.location.href = "/"; // Redirigir automáticamente al inicio
        }, 3000);
      }

      try {
        // Recargar el estado del usuario para verificar el correo
        const user = auth.currentUser;
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            clearInterval(intervalo); // Detener el temporizador
            mensaje = "✔️ Correo verificado. Redirigiendo al perfil...";
            setTimeout(() => {
              window.location.href = "/perfil"; // Redirigir al perfil
            }, 3000);
          }
        }
      } catch (error) {
        console.error(
          "Error al verificar el estado del correo:",
          error.message,
        );
      }
    }, 1000);
  };

  // Verificar si hay un usuario autenticado
  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/"; // Redirigir automáticamente al inicio si no hay usuario autenticado
      } else {
        iniciarTemporizador(); // Iniciar el temporizador y la verificación
      }
    });
  }
</script>

<main
  class="container d-flex justify-content-center align-items-center min-vh-100"
>
  <div
    class="card shadow verify-card animate-fadeIn"
    style="max-width: 400px; width: 100%;"
  >
    <div class="card-body text-center p-4">
      <h1 class="h4 mb-3">
        <i class="fas fa-envelope-open-text text-primary me-2"></i>
        Verificación de Correo
      </h1>
      <p class="mb-4">{mensaje}</p>

      <!-- Barra de progreso Bootstrap -->
      <div class="progress mb-2" style="height: 1rem;">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style="width: {((180 - tiempoRestante) / 180) * 100}%;"
          aria-valuenow={((180 - tiempoRestante) / 180) * 100}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <p class="text-muted">
        <i class="fas fa-clock me-1"></i>
        Tiempo restante:
        <strong>
          {Math.floor(tiempoRestante / 60)}:
          {String(tiempoRestante % 60).padStart(2, "0")}
        </strong>
      </p>
    </div>
  </div>
</main>

<style>
  /* Fade‑in al cargar la tarjeta */
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

  /* Sutil efecto hover en la tarjeta */
  .verify-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
</style>
