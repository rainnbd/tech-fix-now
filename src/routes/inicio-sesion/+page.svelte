<script>
  import { auth, googleProvider } from '../../firebase.js';
  import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendEmailVerification,
  } from 'firebase/auth';

  let modo = 'login'; // Alternar entre "login" y "registro"
  let tipoCuenta = 'Usuario'; // Tipo de cuenta seleccionado
  let nombre = ''; // Nombre del usuario o empresa
  let apellido = ''; // Apellido del usuario (solo para tipo Usuario)
  let municipio = ''; // Ciudad o municipio (solo para tipo Empresa)
  let numeroContacto = ''; // Número de contacto (solo para tipo Empresa)
  let celular = ''; // Celular (solo para tipo Usuario)
  let correo = ''; // Correo electrónico
  let contraseña = ''; // Contraseña
  let mostrarClave = false; // Mostrar u ocultar la contraseña
  let progresoSeguridad = 0; // Barra de progreso de seguridad de la contraseña
  let mensaje = ''; // Mensajes informativos

  const fotoPorDefecto = 'https://static.vecteezy.com/system/resources/previews/016/753/870/original/default-profile-picture-ui-element-template-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-light-theme-vector.jpg';

  // Evaluar la seguridad de la contraseña
  const evaluarSeguridad = () => {
    progresoSeguridad = contraseña.length >= 8 ? 33 : 0; // Longitud mínima
    progresoSeguridad += /[A-Z]/.test(contraseña) ? 33 : 0; // Al menos una mayúscula
    progresoSeguridad += /[0-9]/.test(contraseña) ? 34 : 0; // Al menos un número
  };

  // Registrar usuario
  const registrar = async () => {
    if (progresoSeguridad < 100) {
      mensaje = '❌ Contraseña débil, mejore la contraseña.';
      return;
    }
    try {
      const credenciales = await createUserWithEmailAndPassword(auth, correo, contraseña);

      let displayName = '';
      if (tipoCuenta === 'Usuario') {
        displayName = `${nombre}`;
        await updateProfile(credenciales.user, {
          displayName: `${nombre} ${apellido}`,
          photoURL: fotoPorDefecto,
        });
      } else if (tipoCuenta === 'Empresa') {
        displayName = nombre;
        await updateProfile(credenciales.user, {
          displayName,
          photoURL: fotoPorDefecto,
        });
      }

      await sendEmailVerification(credenciales.user);

      mensaje = `Registro exitoso. Se envió un correo de verificación a ${correo}.`;
      setTimeout(() => {
        window.location.href = '/verificacion'; // Redirigir a la página de verificación
      }, 3000);
    } catch (error) {
      mensaje = error.code === 'auth/email-already-in-use' ? '❗ Correo en uso, utilice otro.' : `Error al registrar usuario: ${error.message}`;
    }
  };

  // Iniciar sesión
  const iniciarSesion = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, correo, contraseña);
      mensaje = `Inicio de sesión exitoso. Bienvenido, ${userCred.user.displayName || 'Usuario'}.`;
      window.location.href = '/perfil'; // Redirigir al perfil
    } catch (error) {
      mensaje = error.code === 'auth/user-not-found' ? '❗ Este correo no está asociado a ninguna cuenta.' : `Error al iniciar sesión: ${error.message}`;
    }
  };

  // Iniciar sesión con Google
  const iniciarConGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      if (!result.user.photoURL) {
        const inicial = result.user.displayName.charAt(0).toUpperCase();
        const urlInicial = `https://via.placeholder.com/150/0070f3/FFFFFF?text=${inicial}`;
        await updateProfile(result.user, { photoURL: urlInicial });
      }

      mensaje = `Inicio de sesión exitoso con Google. Bienvenido, ${result.user.displayName || 'Usuario'}.`;
      window.location.href = '/perfil'; // Redirigir al perfil
    } catch (error) {
      mensaje = `Error al iniciar sesión con Google: ${error.message}`;
    }
  };
</script>
<main>
  <div class="contenedor">
    {#if modo === 'login'}
      <div class="login">
        <h1>Inicia Sesión</h1>
        <form on:submit|preventDefault={iniciarSesion}>
          <input type="email" bind:value={correo} placeholder="Correo electrónico" required />
          <div class="contraseña">
            <input
              type={mostrarClave ? 'text' : 'password'}
              bind:value={contraseña}
              placeholder="Contraseña"
              required
            />
            <button type="button" on:click={() => mostrarClave = !mostrarClave}>
              {mostrarClave ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button on:click={iniciarConGoogle}>Iniciar sesión con Google</button>
        <p>¿No tienes una cuenta? <button on:click={() => modo = 'registro'}>Regístrate</button></p>
      </div>
    {:else if modo === 'registro'}
      <div class="registro">
        <h1>Regístrate</h1>
        <form on:submit|preventDefault={registrar}>
          <div class="tipo-cuenta">
            <strong>Tipo de Cuenta:</strong>
            <select bind:value={tipoCuenta}>
              <option>Usuario</option>
              <option>Empresa</option>
            </select>
          </div>
          {#if tipoCuenta === 'Usuario'}
            <input type="text" bind:value={nombre} placeholder="Nombre" required />
            <input type="text" bind:value={apellido} placeholder="Apellido" required />
            <input type="text" bind:value={celular} placeholder="Celular" pattern="[0-9]*" required />
          {:else}
            <input type="text" bind:value={nombre} placeholder="Nombre de la Empresa" required />
            <input type="text" bind:value={municipio} placeholder="Municipio o Ciudad" required />
            <input type="text" bind:value={numeroContacto} placeholder="Número de Contacto" pattern="[0-9]*" required />
          {/if}
          <input type="email" bind:value={correo} placeholder="Correo electrónico" required />
          <div class="contraseña">
            <input
              type={mostrarClave ? 'text' : 'password'}
              bind:value={contraseña}
              placeholder="Contraseña"
              required
              on:input={evaluarSeguridad}
            />
            <button type="button" on:click={() => mostrarClave = !mostrarClave}>
              {mostrarClave ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <div class="barra">
            <div
              class="progreso"
              style="width: {progresoSeguridad}%;">
            </div>
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes una cuenta? <button on:click={() => modo = 'login'}>Inicia Sesión</button></p>
      </div>
    {/if}
    <p class="mensaje">{mensaje}</p>
  </div>
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #0070f3, #48bb78);
    font-family: 'Arial', sans-serif;
    margin: 0;
  }
  .contenedor {
    background-color: white;
    padding: 3rem;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 450px;
    width: 100%;
    text-align: center;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  input, select {
    width: calc(100% - 2rem);
    margin: 0.5rem auto;
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #ced4da;
    display: block;
    font-size: 1rem;
  }
  .contraseña {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 2rem);
    margin: auto;
  }
  .contraseña input {
    width: 80%;
  }
  button {
    width: calc(100% - 2rem);
    margin: 0.5rem auto;
    padding: 0.8rem;
    border-radius: 5px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  button[type="submit"], button[type="button"] {
    background-color: #0070f3;
    color: white;
  }
  button:hover {
    background-color: #005bb5;
  }
  button:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }
  .barra {
    background-color: #e0e0e0;
    border-radius: 10px;
    height: 10px;
    margin: 1rem auto;
    position: relative;
    width: calc(100% - 2rem);
  }
  .progreso {
    background-color: #0070f3;
    height: 100%;
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
  }
  .mensaje {
    margin-top: 1rem;
    color: #666;
  }
  .tipo-cuenta {
    margin: 1rem 0;
    text-align: left;
    font-size: 1rem;
  }
  .tipo-cuenta strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
  }
  p {
    margin: 1rem 0;
    color: #333;
  }
  p button {
    background: none;
    border: none;
    color: #0070f3;
    font-size: 1rem;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.3s;
  }
  p button:hover {
    color: #005bb5;
  }
</style>