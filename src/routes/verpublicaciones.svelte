<script>
  import { auth } from "$lib/js/firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import firebase from "firebase/app";
  import "firebase/firestore";

  let usuario = null; // Usuario autenticado
  let publicaciones = []; // Lista de publicaciones
  let mensajeCargando = "Cargando publicaciones...";

  // Recuperar el usuario autenticado
  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        usuario = user;
        await cargarPublicaciones(); // Cargar las publicaciones del usuario
      } else {
        usuario = null;
        publicaciones = [];
        mensajeCargando = "Inicia sesión para ver tus publicaciones.";
      }
    });
  }

  // Cargar publicaciones desde Firestore
  const cargarPublicaciones = async () => {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("servicios")
        .where("usuarioPublicador.nombre", "==", usuario.displayName)
        .get();

      publicaciones = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      mensajeCargando =
        publicaciones.length > 0 ? "" : "Aún no hay publicaciones.";
    } catch (error) {
      mensajeCargando = `Error al cargar publicaciones: ${error.message}`;
    }
  };

  // Editar publicación
  const editarPublicacion = (publicacionId) => {
    goto(`/editar/${publicacionId}`); // Redirigir a la página de edición específica
  };

  // Eliminar publicación
  const eliminarPublicacion = async (publicacionId) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      try {
        const db = firebase.firestore();
        await db.collection("servicios").doc(publicacionId).delete();

        await cargarPublicaciones(); // Recargar publicaciones después de eliminar
        mensajeCargando = "Publicación eliminada exitosamente.";
      } catch (error) {
        mensajeCargando = `Error al eliminar publicación: ${error.message}`;
      }
    }
  };
</script>

<main>
  {#if usuario}
    <div class="publicaciones">
      <h1>Mis Publicaciones</h1>
      <div class="lista-publicaciones">
        {#if publicaciones.length > 0}
          {#each publicaciones as publicacion}
            <div class="publicacion">
              <div class="detalles-publicacion">
                <h3>{publicacion.nombre}</h3>
                <p><strong>Categoría:</strong> {publicacion.categoria}</p>
                <p><strong>Descripción:</strong> {publicacion.descripcion}</p>
                <p>
                  <strong>Ubicación:</strong>
                  {publicacion.departamento}, {publicacion.ciudad}
                </p>
              </div>
              <div class="fotos-publicacion">
                {#each publicacion.fotos as foto}
                  <img src={foto} alt="Foto del servicio" />
                {/each}
              </div>
              <div class="acciones">
                <button on:click={() => editarPublicacion(publicacion.id)}
                  >Editar</button
                >
                <button on:click={() => eliminarPublicacion(publicacion.id)}
                  >Eliminar</button
                >
              </div>
            </div>
          {/each}
        {:else}
          <p>{mensajeCargando}</p>
        {/if}
      </div>
    </div>
  {:else}
    <div class="mensaje-autenticacion">
      <h1>{mensajeCargando}</h1>
    </div>
  {/if}
</main>

<style>
  main {
    font-family: "Arial", sans-serif;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    height: 100vh;
  }
  .publicaciones {
    width: 100%;
    max-width: 800px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .lista-publicaciones {
    flex: 1;
    overflow-y: auto;
    padding-right: 1rem;
    max-height: 500px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .publicacion {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .detalles-publicacion h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  .fotos-publicacion img {
    width: 100%;
    height: auto;
    margin-top: 0.5rem;
    border-radius: 5px;
  }
  .acciones {
    margin-top: 1rem;
    text-align: right;
  }
  .acciones button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    background-color: #0070f3;
    color: white;
  }
  .acciones button:hover {
    background-color: #005bb5;
  }
  .acciones button:nth-child(2) {
    background-color: #e53e3e;
  }
  .acciones button:nth-child(2):hover {
    background-color: #c53030;
  }
  .mensaje-autenticacion {
    text-align: center;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    color: #333;
  }
</style>
