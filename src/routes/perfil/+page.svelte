<script>
  import "$lib/css/app.css";
  import { auth, db } from "$lib/js/firebase";
  import {
    signOut,
    updateProfile,
    onAuthStateChanged,
    deleteUser,
  } from "firebase/auth";
  import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
  import {
    getStorage,
    ref as storageRef,
    uploadString,
    getDownloadURL,
  } from "firebase/storage";

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
  let userDocRef = null;

  const fotoPorDefecto =
    "https://static.vecteezy.com/system/resources/previews/016/753/870/original/default-profile-picture-ui-element-template-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-light-theme-vector.jpg";

  const storage = getStorage();

  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        usuario = user;
        userDocRef = doc(db, "Register", user.uid);

        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          tipoCuenta = data.tipoCuenta;
          nombre = data.nombres;
          apellido = data.apellidos || "";
          genero = data.genero || "";
          ciudadMunicipio = data.municipio || data.ciudadMunicipio || "";
          celular = data.celular || "";
          direccion = data.direccion || "";
          numeroContacto = data.numeroContacto || "";
          imagen = data.foto || fotoPorDefecto;
          fechaNacimiento = data.fechaNacimiento || "";
        }

        correo = user.email;
        correoVerificado = user.emailVerified;
      } else {
        window.location.href = "/";
      }
    });
  }

  const guardarDatos = async () => {
    try {
      await updateProfile(usuario, {
        displayName:
          tipoCuenta === "Usuario" ? `${nombre} ${apellido}` : nombre,
        photoURL: imagen,
      });

      const updateData = {
        nombres: nombre,
        apellidos: tipoCuenta === "Usuario" ? apellido : null,
        genero: tipoCuenta === "Usuario" ? genero : null,
        fechaNacimiento: tipoCuenta === "Usuario" ? fechaNacimiento : null,
        foto: imagen,
        celular: tipoCuenta === "Usuario" ? celular : null,
        ...(tipoCuenta === "Empresa" && {
          municipio: ciudadMunicipio,
          numeroContacto,
          direccion,
        }),
      };
      await updateDoc(userDocRef, updateData);

      mensaje = "✔️ Datos actualizados correctamente.";
      editandoDatos = false;
    } catch (error) {
      mensaje = `❌ Error al guardar: ${error.code || error.message}`;
    }
  };

  const eliminarCuenta = async () => {
    if (
      confirm(
        "⚠️ ¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.",
      )
    ) {
      try {
        await deleteDoc(userDocRef);
        await deleteUser(usuario);
        window.location.href = "/";
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          mensaje =
            "❌ Para eliminar la cuenta debes volver a iniciar sesión y luego intentarlo de nuevo.";
        } else {
          mensaje = `❌ Error al eliminar cuenta: ${error.message}`;
        }
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
