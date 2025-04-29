<script>
  import { auth } from "$lib/js/firebase";
  import {
    signOut,
    updateProfile,
    onAuthStateChanged,
    deleteUser,
  } from "firebase/auth";

  let usuario = null; // Usuario autenticado
  let tipoCuenta = "Usuario"; // Tipo de cuenta seleccionado
  let nombre = ""; // Nombre del usuario o empresa
  let apellido = ""; // Apellido del usuario (solo para tipo Usuario)
  let genero = ""; // Género del usuario (solo para tipo Usuario)
  let ciudadMunicipio = ""; // Ciudad o municipio
  let celular = ""; // Celular (solo para tipo Usuario)
  let direccion = ""; // Dirección de la empresa (solo para tipo Empresa)
  let numeroContacto = ""; // Número de contacto de la empresa (solo para tipo Empresa)
  let imagen = ""; // Foto del usuario
  let correo = ""; // Correo del usuario
  let correoVerificado = false; // Estado del correo
  let mensaje = ""; // Mensajes informativos
  let editandoDatos = false; // Control para edición de datos
  let fechaNacimiento = ""; // Asegúrate de que esté declarada como una variable reactiva

  const fotoPorDefecto =
    "https://static.vecteezy.com/system/resources/previews/016/753/870/original/default-profile-picture-ui-element-template-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-light-theme-vector.jpg";

  // Monitor del estado de autenticación
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

  // Guardar datos
  const guardarDatos = async () => {
    try {
      if (tipoCuenta === "Usuario") {
        const nombreCompleto = `${nombre} ${apellido}`.trim();
        await updateProfile(usuario, {
          displayName: `${nombreCompleto} (${genero})`,
        });
      } else if (tipoCuenta === "Empresa") {
        const nombreEmpresa = nombre.trim();
        await updateProfile(usuario, { displayName: nombreEmpresa });
      }
      mensaje = "✔️ Datos actualizados correctamente.";
      editandoDatos = false;
    } catch (error) {
      mensaje = `❌ Error al guardar: ${error.message}`;
    }
  };

  // Cambiar foto del perfil
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

  // Eliminar cuenta del usuario
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

  // Cerrar sesión
  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      mensaje = `❌ Error al cerrar sesión: ${error.message}`;
    }
  };
</script>

<main>
  <div class="perfil">
    <h1>{nombre}</h1>
    <div class="foto-container">
      <img src={imagen} alt="Foto de perfil" class="foto" />
      <div class="botones-foto">
        <button
          class="btn-cambiar"
          on:click={() => document.querySelector("#uploadInput").click()}
          >Cambiar Foto</button
        >
        <button class="btn-eliminar" on:click={eliminarFoto}
          >Eliminar Foto</button
        >
      </div>
      <input
        id="uploadInput"
        type="file"
        accept="image/*"
        on:change={cambiarFoto}
        style="display: none;"
      />
    </div>

    <div class="info-container">
      <div class="info-item">
        <strong>Correo:</strong>
        <span>{correo}</span>
        <div
          class={correoVerificado
            ? "estado-verificado"
            : "estado-no-verificado"}
        >
          {correoVerificado ? "✔️ Verificado" : "❌ No Verificado"}
        </div>
      </div>
      <div class="info-item">
        <strong>Tipo de Cuenta:</strong>
        {#if editandoDatos}
          <select bind:value={tipoCuenta} class="select-tipo">
            <option>Usuario</option>
            <option>Empresa</option>
          </select>
        {:else}
          <span>{tipoCuenta}</span>
        {/if}
      </div>

      {#if tipoCuenta === "Usuario"}
        <div class="info-item">
          <strong>Nombre:</strong>
          {#if editandoDatos}
            <input
              type="text"
              bind:value={nombre}
              placeholder="Nombre"
              class="input-text"
            />
          {:else}
            <span>{nombre}</span>
          {/if}
        </div>
        <div class="info-item">
          <strong>Apellido:</strong>
          {#if editandoDatos}
            <input
              type="text"
              bind:value={apellido}
              placeholder="Apellido"
              class="input-text"
            />
          {:else}
            <span>{apellido}</span>
          {/if}
        </div>
        <div class="info-item">
          <strong>Género:</strong>
          {#if editandoDatos}
            <select bind:value={genero} class="select-tipo">
              <option>Masculino</option>
              <option>Femenino</option>
            </select>
          {:else}
            <span>{genero}</span>
          {/if}
        </div>
        <div class="info-item">
          <strong>Ciudad o Municipio:</strong>
          {#if editandoDatos}
            <input
              type="text"
              bind:value={ciudadMunicipio}
              placeholder="Ciudad o Municipio"
              class="input-text"
            />
          {:else}
            <span>{ciudadMunicipio}</span>
          {/if}
        </div>
        <div class="info-item">
          <strong>Celular:</strong>
          {#if editandoDatos}
            <input
              type="text"
              bind:value={celular}
              placeholder="Celular"
              pattern="[0-9]*"
              class="input-text"
            />
          {:else}
            <span>{celular}</span>
          {/if}
        </div>

        <div class="info-item">
          <strong>Fecha de Nacimiento:</strong>
          {#if editandoDatos}
            <input
              type="date"
              bind:value={fechaNacimiento}
              class="input-text"
            />
          {:else}
            <span>{fechaNacimiento || "No especificada"}</span>
          {/if}
        </div>
      {:else if tipoCuenta === "Empresa"}
        <div class="info-item">
          <strong>Nombre de la Empresa:</strong>
          {#if editandoDatos}
            <input
              type="text"
              bind:value={nombre}
              placeholder="Nombre de la Empresa"
              class="input-text"
            />
          {:else}
            <span>{nombre}</span>
          {/if}
        </div>
        <div class="info-item">
          <strong>Dirección:</strong>
          {#if editandoDatos}
            <input
              type="text"
              bind:value={direccion}
              placeholder="Dirección"
              class="input-text"
            />
          {:else}
            <span>{direccion}</span>
          {/if}
        </div>
        <div class="info-item">
          <strong>Ciudad o Municipio:</strong>
          {#if editandoDatos}
            <input
              type="text"
              bind:value={ciudadMunicipio}
              placeholder="Ciudad o Municipio"
              class="input-text"
            />
          {:else}
            <span>{ciudadMunicipio}</span>
          {/if}
        </div>
        <div class="info-item">
          <strong>Número de Contacto:</strong>
          {#if editandoDatos}
            <input
              type="text"
              bind:value={numeroContacto}
              placeholder="Número de Contacto"
              pattern="[0-9]*"
              class="input-text"
            />
          {:else}
            <span>{numeroContacto}</span>
          {/if}
        </div>
      {/if}
    </div>

    {#if editandoDatos}
      <div class="botones-edicion">
        <button class="btn-guardar" on:click={guardarDatos}>Guardar</button>
        <button class="btn-cancelar" on:click={() => (editandoDatos = false)}
          >Cancelar</button
        >
      </div>
    {:else}
      <button class="btn-editar" on:click={() => (editandoDatos = true)}
        >Editar Perfil</button
      >
    {/if}

    <button class="btn-eliminar-cuenta" on:click={eliminarCuenta}
      >Eliminar Cuenta</button
    >
    <button class="btn-cerrar" on:click={cerrarSesion}>Cerrar Sesión</button>
    <p class="mensaje">{mensaje}</p>
  </div>
</main>

<style>
  /* Estilo refinado para el perfil */
  main {
    font-family: "Arial", sans-serif;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  .perfil {
    background-color: white;
    padding: 2.5rem;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    text-align: center;
  }
  .foto-container {
    margin-bottom: 1.5rem;
  }
  .foto {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid #0070f3;
  }
  .botones-foto {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .btn-cambiar,
  .btn-eliminar,
  .btn-guardar,
  .btn-cancelar,
  .btn-editar,
  .btn-eliminar-cuenta,
  .btn-cerrar {
    background-color: #0070f3;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    border: none;
    font-size: 1rem;
    margin: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .btn-eliminar,
  .btn-eliminar-cuenta {
    background-color: #e53e3e;
  }
  .btn-cancelar {
    background-color: #ff5e57;
  }
  .btn-cambiar:hover,
  .btn-eliminar:hover,
  .btn-guardar:hover,
  .btn-cancelar:hover,
  .btn-editar:hover,
  .btn-eliminar-cuenta:hover,
  .btn-cerrar:hover {
    opacity: 0.9;
  }
  .info-container {
    margin-top: 2rem;
    display: grid;
    gap: 1rem;
  }
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
    color: #333;
  }
  .mensaje {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: #666;
    font-weight: bold;
  }
  .estado-verificado {
    background-color: #48bb78;
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 5px;
  }
  .estado-no-verificado {
    background-color: #e53e3e;
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 5px;
  }
</style>
