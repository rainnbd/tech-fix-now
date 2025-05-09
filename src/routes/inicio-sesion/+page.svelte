<script>
  import "$lib/css/app.css";
  import { auth, googleProvider, db } from "$lib/js/firebase";
  import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendEmailVerification,
  } from "firebase/auth";
  import { doc, setDoc, serverTimestamp } from "firebase/firestore";

  let modo = "login";
  let tipoCuenta = "Usuario";
  let nombre = "";
  let apellido = "";
  let municipio = "";
  let numeroContacto = "";
  let celular = "";
  let genero = "";
  let fechaNacimiento = "";
  let correo = "";
  let contraseña = "";
  let mostrarClave = false;
  let progresoSeguridad = 0;
  let mensaje = "";
  let fotoUrl = "";

  const fotoPorDefecto =
    "https://static.vecteezy.com/system/resources/previews/016/753/870/original/default-profile-picture-ui-element-template-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-light-theme-vector.jpg";

  const evaluarSeguridad = () => {
    progresoSeguridad = contraseña.length >= 8 ? 33 : 0;
    progresoSeguridad += /[A-Z]/.test(contraseña) ? 33 : 0;
    progresoSeguridad += /[0-9]/.test(contraseña) ? 34 : 0;
  };

  const registrar = async () => {
    if (progresoSeguridad < 100) {
      mensaje = "❌ Contraseña débil, mejore la contraseña.";
      return;
    }
    try {
      // Crear usuario en Authentication
      const cred = await createUserWithEmailAndPassword(
        auth,
        correo,
        contraseña,
      );

      // Actualizar perfil en Auth
      const displayName =
        tipoCuenta === "Usuario" ? `${nombre} ${apellido}` : nombre;
      await updateProfile(cred.user, {
        displayName,
        photoURL: fotoUrl || fotoPorDefecto,
      });

      // Crear documento en Firestore
      const userData = {
        nombres: nombre,
        apellidos: tipoCuenta === "Usuario" ? apellido : null,
        tipoCuenta,
        celular: tipoCuenta === "Usuario" ? celular : null,
        genero: tipoCuenta === "Usuario" ? genero : null,
        fechaNacimiento: tipoCuenta === "Usuario" ? fechaNacimiento : null,
        foto: fotoUrl || fotoPorDefecto,
        correo,
        municipio: tipoCuenta === "Empresa" ? municipio : null,
        numeroContacto: tipoCuenta === "Empresa" ? numeroContacto : null,
        fechaRegistro: serverTimestamp(),
        uid: cred.user.uid,
      };

      await setDoc(doc(db, "Register", cred.user.uid), userData);

      await sendEmailVerification(cred.user);
      mensaje = `✔️ Registro exitoso. Verifica tu correo: ${correo}.`;
      setTimeout(() => (window.location.href = "/verificacion"), 3000);
    } catch (e) {
      mensaje =
        e.code === "auth/email-already-in-use"
          ? "❗ Correo en uso, utiliza otro."
          : `❌ Error: ${e.message}`;
    }
  };

  const iniciarSesion = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        correo,
        contraseña,
      );
      mensaje = `✔️ Bienvenido, ${userCred.user.displayName || "Usuario"}`;
      window.location.href = "/perfil";
    } catch (e) {
      mensaje =
        e.code === "auth/user-not-found"
          ? "❗ Este correo no está registrado."
          : `❌ Error: ${e.message}`;
    }
  };

  const iniciarConGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Crear/Actualizar perfil en Firestore
      await setDoc(
        doc(db, "Register", result.user.uid),
        {
          nombres: result.user.displayName,
          tipoCuenta: "Usuario",
          foto: result.user.photoURL || fotoPorDefecto,
          correo: result.user.email,
          fechaRegistro: serverTimestamp(),
          uid: result.user.uid,
        },
        { merge: true },
      );

      mensaje = `✔️ Bienvenido, ${result.user.displayName || "Usuario"}`;
      window.location.href = "/perfil";
    } catch (e) {
      mensaje = `❌ Error Google: ${e.message}`;
    }
  };
</script>

<div class="bg-secondary">
  <main
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div
      class="card shadow animate-fadeIn"
      style="max-width: 400px; width:100%;"
    >
      <div class="card-body">
        {#if modo === "login"}
          <h1 class="h4 text-center mb-4">Inicia Sesión</h1>
          <form on:submit|preventDefault={iniciarSesion}>
            <div class="mb-3">
              <input
                type="email"
                bind:value={correo}
                class="form-control"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div class="input-group mb-3">
              <input
                type={mostrarClave ? "text" : "password"}
                bind:value={contraseña}
                class="form-control"
                placeholder="Contraseña"
                required
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                on:click={() => (mostrarClave = !mostrarClave)}
              >
                {#if mostrarClave}
                  <i class="fas fa-eye-slash"></i>
                {:else}
                  <i class="fas fa-eye"></i>
                {/if}
              </button>
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-2">
              <i class="fas fa-sign-in-alt me-1"></i> Iniciar Sesión
            </button>
          </form>
          <button
            type="button"
            class="btn btn-danger w-100 mb-3"
            on:click={iniciarConGoogle}
          >
            <i class="fab fa-google me-1"></i> Iniciar con Google
          </button>
          <p class="text-center mb-0">
            ¿No tienes cuenta?
            <button
              type="button"
              class="btn btn-link p-0 align-baseline"
              on:click={() => (modo = "registro")}
            >
              Regístrate
            </button>
          </p>
        {:else}
          <h1 class="h4 text-center mb-4">Regístrate</h1>
          <form on:submit|preventDefault={registrar}>
            <div class="mb-3">
              <label class="form-label">Tipo de Cuenta</label>
              <select bind:value={tipoCuenta} class="form-select" required>
                <option value="Usuario">Usuario</option>
                <option value="Empresa">Empresa</option>
              </select>
            </div>

            {#if tipoCuenta === "Usuario"}
              <div class="mb-3">
                <input
                  type="text"
                  bind:value={nombre}
                  class="form-control"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  bind:value={apellido}
                  class="form-control"
                  placeholder="Apellido"
                  required
                />
              </div>
              <div class="mb-3">
                <select bind:value={genero} class="form-select" required>
                  <option value="" disabled selected
                    >Selecciona tu género</option
                  >
                  <option>Hombre</option>
                  <option>Mujer</option>
                  <option>Otro</option>
                </select>
              </div>
              <div class="mb-3">
                <input
                  type="date"
                  bind:value={fechaNacimiento}
                  class="form-control"
                  required
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div class="mb-3">
                <input
                  type="tel"
                  bind:value={celular}
                  class="form-control"
                  placeholder="Celular"
                  pattern="[0-9]*"
                  required
                />
              </div>
            {:else}
              <div class="mb-3">
                <input
                  type="text"
                  bind:value={nombre}
                  class="form-control"
                  placeholder="Nombre de la Empresa"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  bind:value={municipio}
                  class="form-control"
                  placeholder="Municipio o Ciudad"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="tel"
                  bind:value={numeroContacto}
                  class="form-control"
                  placeholder="Número de Contacto"
                  pattern="[0-9]*"
                  required
                />
              </div>
            {/if}

            <div class="mb-3">
              <input
                type="email"
                bind:value={correo}
                class="form-control"
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div class="mb-3">
              <input
                type="url"
                bind:value={fotoUrl}
                class="form-control"
                placeholder="URL de foto de perfil (opcional)"
              />
            </div>

            <div class="input-group mb-2">
              <input
                type={mostrarClave ? "text" : "password"}
                bind:value={contraseña}
                class="form-control"
                placeholder="Contraseña"
                required
                on:input={evaluarSeguridad}
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                on:click={() => (mostrarClave = !mostrarClave)}
              >
                {#if mostrarClave}
                  <i class="fas fa-eye-slash"></i>
                {:else}
                  <i class="fas fa-eye"></i>
                {/if}
              </button>
            </div>
            <div class="progress mb-3">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: {progresoSeguridad}%"
                aria-valuenow={progresoSeguridad}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            <button type="submit" class="btn btn-success w-100 mb-2">
              <i class="fas fa-user-plus me-1"></i> Registrarse
            </button>
          </form>
          <p class="text-center mb-0">
            ¿Ya tienes cuenta?
            <button
              type="button"
              class="btn btn-link p-0 align-baseline"
              on:click={() => (modo = "login")}
            >
              Inicia Sesión
            </button>
          </p>
        {/if}

        {#if mensaje}
          <p class="text-center mt-3 text-danger">{mensaje}</p>
        {/if}
      </div>
    </div>
  </main>
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
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
  .btn:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
  .progress-bar {
    transition: width 0.3s ease;
  }
</style>
