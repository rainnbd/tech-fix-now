<script>
  import { auth } from "$lib/js/firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import firebase from "firebase/app";
  import "firebase/firestore";

  let usuario = null; // Usuario autenticado
  let mensaje = "Iniciar sesión para ver la página";
  let servicios = []; // Lista de servicios publicados

  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        usuario = user;
        await cargarServicios();
      } else {
        usuario = null;
        servicios = [];
      }
    });
  }

  // Cargar servicios desde Firestore
  const cargarServicios = async () => {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("servicios")
        .orderBy("creadoEl", "desc")
        .get();
      servicios = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      mensaje = `Error al cargar servicios: ${error.message}`;
    }
  };

  const publicarServicio = () => {
    if (!usuario) {
      mensaje = "Inicia sesión para poder publicar un servicio.";
      return;
    }
    goto("/publicar"); // Llevar al usuario a la página de publicar.svelte
  };

  const verChats = () => {
    goto("/mensajes");
  };

  const verPublicaciones = () => {
    goto("/verpublicaciones");
  };
</script>

<main>
  {#if usuario}
    <div class="pagina">
      <div class="botones">
        <button class="btn-publicar" on:click={publicarServicio}
          >Publicar Servicio</button
        >
        <button class="btn-ver" on:click={verPublicaciones}
          >Ver Publicaciones</button
        >
        <button class="btn-chats" on:click={verChats}>Chats</button>
      </div>
      <div class="servicios">
        <h2>Servicios Disponibles</h2>
        {#if servicios.length > 0}
          <div class="lista-servicios">
            {#each servicios as servicio}
              {#if servicio.usuarioPublicador && servicio.usuarioPublicador.nombre !== usuario.displayName}
                <div class="servicio">
                  <div class="detalles-servicio">
                    <h3>{servicio.nombre}</h3>
                    <p><strong>Categoría:</strong> {servicio.categoria}</p>
                    <p><strong>Descripción:</strong> {servicio.descripcion}</p>
                    <p>
                      <strong>Ubicación:</strong>
                      {servicio.departamento}, {servicio.ciudad}
                    </p>
                  </div>
                  <div class="fotos-servicio">
                    {#each servicio.fotos as foto}
                      <img src={foto} alt="Foto del servicio" />
                    {/each}
                  </div>
                  <div class="usuario-publicador">
                    <img
                      src={servicio.usuarioPublicador.foto}
                      alt="Foto del usuario"
                    />
                    <p>
                      {servicio.usuarioPublicador.nombre} ({servicio
                        .usuarioPublicador.tipoCuenta})
                    </p>
                    <button on:click={() => goto(`/chat/${servicio.id}`)}
                      >Enviar Mensaje</button
                    >
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        {:else}
          <p>No hay servicios disponibles en este momento.</p>
        {/if}
      </div>
    </div>
  {:else}
    <div class="mensaje-autenticacion">
      <h1>{mensaje}</h1>
      <p>Por favor, inicia sesión para acceder a esta página.</p>
    </div>
  {/if}
</main>

<style>
  main {
    font-family: "Arial", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(to bottom, #0070f3, #48bb78);
    color: white;
  }
  .pagina {
    text-align: center;
    max-width: 1200px;
    width: 100%;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    color: black;
  }
  .botones {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2rem;
  }
  .btn-publicar,
  .btn-ver,
  .btn-chats {
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    background-color: #0070f3;
    color: white;
    transition: background-color 0.3s;
  }
  .btn-publicar:hover,
  .btn-ver:hover,
  .btn-chats:hover {
    background-color: #005bb5;
  }
  .servicios {
    margin-top: 1rem;
  }
  .lista-servicios {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }
  .servicio {
    width: 300px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 1rem;
  }
  .detalles-servicio {
    margin-bottom: 1rem;
  }
  .detalles-servicio h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  .fotos-servicio img {
    width: 100%;
    height: auto;
    margin-top: 0.5rem;
    border-radius: 5px;
  }
  .usuario-publicador {
    margin-top: 1rem;
    text-align: left;
  }
  .usuario-publicador img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  .usuario-publicador p {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    font-size: 1rem;
    color: #555;
  }
  .usuario-publicador button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  .usuario-publicador button:hover {
    background-color: #3b9c63;
  }
  .mensaje-autenticacion {
    text-align: center;
  }
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
  }
</style>
