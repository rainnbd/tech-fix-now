<script>
  import "$lib/css/app.css";
  import { auth } from "$lib/js/firebase";
  import {
    signOut,
    updateProfile,
    onAuthStateChanged,
    deleteUser,
  } from "firebase/auth";

  let usuario = null;
  let tipoCuenta = "Usuario";
  let nombre = "";
  let apellido = "";
  let genero = "";
  let ciudadMunicipio = "";
  let celular = "";
  let direccion = "";
  let numeroContacto = "";
  let imagen = "";
  let correo = "";
  let correoVerificado = false;
  let mensaje = "";
  let editandoDatos = false;
  let fechaNacimiento = "";

  const fotoPorDefecto =
    "https://static.vecteezy.com/system/resources/previews/016/753/870/original/default-profile-picture-ui-element-template-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-light-theme-vector.jpg";

  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        usuario = user;
        const partesNombre = user.displayName
          ? user.displayName.split(" ")
          : ["Usuario", ""];
        nombre = partesNombre[0];
        apellido = partesNombre[1] || "";
        correo = user.email;
        correoVerificado = user.emailVerified;
        imagen = user.photoURL || fotoPorDefecto;
      } else {
        window.location.href = "/";
      }
    });
  }

  const guardarDatos = async () => {
    try {
      if (tipoCuenta === "Usuario") {
        const nombreCompleto = `${nombre} ${apellido}`.trim();
        await updateProfile(usuario, {
          displayName: `${nombreCompleto} (${genero})`,
        });
      } else {
        await updateProfile(usuario, { displayName: nombre.trim() });
      }
      mensaje = "✔️ Datos actualizados correctamente.";
      editandoDatos = false;
    } catch (error) {
      mensaje = `❌ Error al guardar: ${error.message}`;
    }
  };

  const cambiarFoto = async (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = 250;
          canvas.height = 250;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 250, 250);
          const nuevaFoto = canvas.toDataURL("image/jpeg", 0.8);

          await updateProfile(auth.currentUser, { photoURL: nuevaFoto });
          imagen = nuevaFoto;
          mensaje = "✔️ Foto actualizada correctamente.";
        };
      } catch (error) {
        mensaje = `❌ Error al actualizar la foto: ${error.message}`;
      }
    };
    reader.readAsDataURL(archivo);
  };

  const eliminarCuenta = async () => {
    if (
      confirm(
        "⚠️ ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.",
      )
    ) {
      try {
        await deleteUser(usuario);
        window.location.href = "/";
      } catch (error) {
        mensaje = `❌ Error al eliminar la cuenta: ${error.message}`;
      }
    }
  };

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      mensaje = `❌ Error al cerrar sesión: ${error.message}`;
    }
  };
</script>

<div class="bg-secondary">
  <div class="container py-5 d-flex justify-content-center">
    <div class="card shadow profile-card">
      <div class="card-body">
        <div class="text-center">
          <img
            src={imagen}
            alt="Foto de perfil"
            class="rounded-circle mb-3"
            style="width:150px; height:150px; object-fit:cover; border:4px solid #0d6efd;"
          />
          <div class="btn-group mb-3" role="group">
            <button
              class="btn btn-outline-primary"
              on:click={() => document.querySelector("#uploadInput").click()}
            >
              <i class="fas fa-camera"></i> Cambiar
            </button>
            <button
              class="btn btn-outline-danger"
              on:click={() => (imagen = fotoPorDefecto)}
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
          </div>
          <input
            id="uploadInput"
            type="file"
            accept="image/*"
            on:change={cambiarFoto}
            hidden
          />
        </div>

        <h3 class="card-title text-center mb-4">
          {#if tipoCuenta === "Usuario"}
            {nombre} {apellido}
          {:else}
            {nombre}
          {/if}
        </h3>

        <div class="row gx-3 gy-3">
          <div class="col-12">
            <i class="fas fa-envelope me-2"></i>
            {correo}
            {#if correoVerificado}
              <i class="fas fa-check-circle text-success ms-2"></i>
            {:else}
              <i class="fas fa-times-circle text-danger ms-2"></i>
            {/if}
          </div>

          <div class="col-md-6">
            <strong>Tipo de Cuenta:</strong>
            {#if editandoDatos}
              <select
                bind:value={tipoCuenta}
                class="form-select form-select-sm"
              >
                <option>Usuario</option>
                <option>Empresa</option>
              </select>
            {:else}
              <span>{tipoCuenta}</span>
            {/if}
          </div>

          {#if tipoCuenta === "Usuario"}
            <div class="col-md-6">
              <strong>Género:</strong>
              {#if editandoDatos}
                <select bind:value={genero} class="form-select form-select-sm">
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              {:else}
                <span>{genero}</span>
              {/if}
            </div>

            <div class="col-md-6">
              <strong>Ciudad / Municipio:</strong>
              {#if editandoDatos}
                <input
                  type="text"
                  bind:value={ciudadMunicipio}
                  class="form-control form-control-sm"
                  placeholder="Ciudad o Municipio"
                />
              {:else}
                <span>{ciudadMunicipio}</span>
              {/if}
            </div>

            <div class="col-md-6">
              <strong>Celular:</strong>
              {#if editandoDatos}
                <input
                  type="tel"
                  bind:value={celular}
                  class="form-control form-control-sm"
                  placeholder="Celular"
                />
              {:else}
                <span>{celular}</span>
              {/if}
            </div>

            <div class="col-md-6">
              <strong>Fecha Nac.:</strong>
              {#if editandoDatos}
                <input
                  type="date"
                  bind:value={fechaNacimiento}
                  class="form-control form-control-sm"
                />
              {:else}
                <span>{fechaNacimiento || "No especificada"}</span>
              {/if}
            </div>
          {:else}
            <div class="col-md-6">
              <strong>Dirección:</strong>
              {#if editandoDatos}
                <input
                  type="text"
                  bind:value={direccion}
                  class="form-control form-control-sm"
                  placeholder="Dirección"
                />
              {:else}
                <span>{direccion}</span>
              {/if}
            </div>
            <div class="col-md-6">
              <strong>Contacto:</strong>
              {#if editandoDatos}
                <input
                  type="tel"
                  bind:value={numeroContacto}
                  class="form-control form-control-sm"
                  placeholder="Número de Contacto"
                />
              {:else}
                <span>{numeroContacto}</span>
              {/if}
            </div>
          {/if}
        </div>

        <div class="d-flex justify-content-center mt-4">
          {#if editandoDatos}
            <button class="btn btn-success me-2" on:click={guardarDatos}>
              <i class="fas fa-save"></i> Guardar
            </button>
            <button
              class="btn btn-secondary"
              on:click={() => (editandoDatos = false)}
            >
              <i class="fas fa-ban"></i> Cancelar
            </button>
          {:else}
            <button
              class="btn btn-primary me-2"
              on:click={() => (editandoDatos = true)}
            >
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn btn-danger me-2" on:click={eliminarCuenta}>
              <i class="fas fa-user-times"></i> Eliminar Cuenta
            </button>
            <button class="btn btn-outline-dark" on:click={cerrarSesion}>
              <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
          {/if}
        </div>

        {#if mensaje}
          <p class="text-center mt-3 fw-bold">{mensaje}</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
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
  .profile-card {
    animation: fadeIn 0.5s ease-out;
    max-width: 600px;
    width: 100%;
  }
  .btn:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }
</style>
