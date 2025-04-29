<script>
  import { auth } from "$lib/js/firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import firebase from "firebase/app";
  import "firebase/firestore";

  let usuario = null; // Usuario autenticado
  let mensajes = []; // Lista de mensajes en el chat
  let nuevoMensaje = ""; // Mensaje a enviar
  let servicioId = ""; // ID del servicio en el cual se está interactuando
  let mensajeCargando = "Cargando chat...";

  // Recuperar el usuario autenticado
  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        usuario = user;
        await cargarMensajes(); // Cargar los mensajes del chat
      } else {
        usuario = null;
        mensajes = [];
        mensajeCargando = "Inicia sesión para chatear.";
      }
    });
  }

  // Cargar mensajes desde Firestore
  const cargarMensajes = async () => {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("chats")
        .doc(servicioId)
        .collection("mensajes")
        .orderBy("enviadoEl", "asc")
        .get();

      mensajes = querySnapshot.docs.map((doc) => doc.data());
      mensajeCargando =
        mensajes.length > 0 ? "" : "No hay mensajes en este chat.";
    } catch (error) {
      mensajeCargando = `Error al cargar mensajes: ${error.message}`;
    }
  };

  // Enviar un mensaje
  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim()) return;

    try {
      const db = firebase.firestore();
      await db
        .collection("chats")
        .doc(servicioId)
        .collection("mensajes")
        .add({
          texto: nuevoMensaje,
          usuario: {
            id: usuario.uid,
            nombre: usuario.displayName,
            foto: usuario.photoURL || "https://via.placeholder.com/150",
          },
          enviadoEl: firebase.firestore.FieldValue.serverTimestamp(),
        });

      nuevoMensaje = ""; // Limpiar el campo de entrada
      await cargarMensajes(); // Recargar los mensajes
    } catch (error) {
      mensajeCargando = `Error al enviar mensaje: ${error.message}`;
    }
  };
</script>

<main>
  {#if usuario}
    <div class="chat">
      <h1>Chat del Servicio</h1>
      <div class="mensajes">
        {#if mensajes.length > 0}
          {#each mensajes as mensaje}
            <div
              class="mensaje {mensaje.usuario.id === usuario.uid
                ? 'propio'
                : 'ajeno'}"
            >
              <img src={mensaje.usuario.foto} alt="Foto del usuario" />
              <div class="texto">
                <p>
                  <strong>{mensaje.usuario.nombre}:</strong>
                  {mensaje.texto}
                </p>
              </div>
            </div>
          {/each}
        {:else}
          <p class="cargando">{mensajeCargando}</p>
        {/if}
      </div>
      <div class="enviar-mensaje">
        <input
          type="text"
          bind:value={nuevoMensaje}
          placeholder="Escribe tu mensaje..."
        />
        <button on:click={enviarMensaje}>Enviar</button>
      </div>
    </div>
  {:else}
    <div class="mensaje-autenticacion">
      <h1>Inicia sesión para acceder al chat</h1>
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
  .chat {
    width: 100%;
    max-width: 600px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .mensajes {
    flex: 1;
    overflow-y: auto;
    padding-right: 1rem;
    max-height: 400px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .mensaje {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .mensaje img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .mensaje .texto {
    background: #f1f1f1;
    padding: 0.5rem;
    border-radius: 5px;
    max-width: 80%;
  }
  .mensaje.propio .texto {
    background: #0070f3;
    color: white;
  }
  .mensaje.ajeno .texto {
    background: #f1f1f1;
    color: black;
  }
  .enviar-mensaje {
    display: flex;
    gap: 0.5rem;
  }
  .enviar-mensaje input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .enviar-mensaje button {
    padding: 0.8rem 1.5rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  .enviar-mensaje button:hover {
    background-color: #005bb5;
  }
  .mensaje-autenticacion {
    text-align: center;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p.cargando {
    color: #666;
    text-align: center;
  }
</style>
