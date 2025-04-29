<script>
  import { auth } from '../../firebase.js';
  import { onAuthStateChanged } from 'firebase/auth';

  let tiempoRestante = 180; // Tiempo de espera en segundos (3 minutos)
  let mensaje = 'Por favor, verifica tu correo electrónico para continuar.'; // Mensaje inicial
  let intervalo; // Intervalo para el temporizador

  // Iniciar el temporizador y verificar el estado de verificación del correo periódicamente
  const iniciarTemporizador = () => {
    intervalo = setInterval(async () => {
      if (tiempoRestante > 0) {
        tiempoRestante--;
      } else {
        // Detener el temporizador y redirigir al inicio si no se verifica a tiempo
        clearInterval(intervalo);
        mensaje = '⏳ Tiempo de espera agotado. Redirigiendo al inicio...';
        setTimeout(() => {
          window.location.href = '/'; // Redirigir automáticamente al inicio
        }, 3000);
      }

      try {
        // Recargar el estado del usuario para verificar el correo
        const user = auth.currentUser;
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            clearInterval(intervalo); // Detener el temporizador
            mensaje = '✔️ Correo verificado. Redirigiendo al perfil...';
            setTimeout(() => {
              window.location.href = '/perfil'; // Redirigir al perfil
            }, 3000);
          }
        }
      } catch (error) {
        console.error('Error al verificar el estado del correo:', error.message);
      }
    }, 1000);
  };

  // Verificar si hay un usuario autenticado
  if (typeof window !== 'undefined') {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = '/'; // Redirigir automáticamente al inicio si no hay usuario autenticado
      } else {
        iniciarTemporizador(); // Iniciar el temporizador y la verificación
      }
    });
  }
</script>

<main>
  <div class="verificacion">
    <h1>Verificación de Correo</h1>
    <p>{mensaje}</p>
    <div class="barra">
      <div
        class="progreso"
        style="width: {((180 - tiempoRestante) / 180) * 100}%;">
      </div>
    </div>
    <p>Tiempo restante: {Math.floor(tiempoRestante / 60)}:{String(tiempoRestante % 60).padStart(2, '0')}</p>
  </div>
</main>

<style>
  main {
    text-align: center;
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .verificacion {
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  }
  .barra {
    background-color: #e0e0e0;
    border-radius: 10px;
    height: 10px;
    margin: 1rem 0;
    width: 100%;
    position: relative;
  }
  .progreso {
    background-color: #0070f3;
    height: 100%;
    border-radius: 10px;
    transition: width 1s ease-in-out;
  }
  p {
    margin: 1rem 0;
    color: #333;
  }
</style>