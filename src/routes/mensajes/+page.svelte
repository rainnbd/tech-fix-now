<script>
  import { onMount } from "svelte";
  import { auth, db } from "$lib/js/firebase";
  import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
  } from "firebase/firestore";
  import { writable } from "svelte/store";

  let nuevoMensaje = "";
  const mensajes = writable([]);

  // Suscripción a la colección 'mensajes' en tiempo real
  onMount(() => {
    const q = query(collection(db, "mensajes"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      mensajes.set(data);
    });
    return unsubscribe;
  });

  // Enviar mensaje
  async function enviar() {
    const user = auth.currentUser;
    if (!user || !nuevoMensaje.trim()) return;

    await addDoc(collection(db, "mensajes"), {
      texto: nuevoMensaje,
      uid: user.uid,
      displayName: user.displayName || "Anónimo",
      createdAt: serverTimestamp(),
    });

    nuevoMensaje = "";
  }
</script>

<div class="chat-container">
  <div class="mensajes">
    {#each $mensajes as msg}
      <div
        class="mensaje {msg.uid === auth.currentUser?.uid ? 'propio' : 'ajeno'}"
      >
        <strong>{msg.displayName}:</strong>
        {msg.texto}
      </div>
    {/each}
  </div>

  <div class="input-group">
    <input
      type="text"
      bind:value={nuevoMensaje}
      placeholder="Escribe tu mensaje..."
      on:keydown={(e) => e.key === "Enter" && enviar()}
      class="form-control"
    />
    <button class="btn btn-primary" on:click={enviar}>
      <i class="fas fa-paper-plane"></i>
    </button>
  </div>
</div>

<style>
  .chat-container {
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 80vh;
  }
  .mensajes {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }
  .mensaje {
    margin-bottom: 0.5rem;
  }
  .propio {
    text-align: right;
  }
  .ajeno {
    text-align: left;
  }
  .input-group {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
  }
  .input-group input {
    flex: 1;
  }
</style>
