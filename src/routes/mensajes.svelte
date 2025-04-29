<script>
    import { auth } from '../../firebase.js';
    import { onAuthStateChanged } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import firebase from 'firebase/app';
    import 'firebase/firestore';
  
    let usuario = null; // Usuario autenticado
    let chats = []; // Lista de chats
    let mensajeCargando = 'Cargando los historiales de chats...';
  
    // Recuperar el usuario autenticado
    if (typeof window !== 'undefined') {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          usuario = user;
          await cargarChats(); // Cargar los chats del usuario
        } else {
          usuario = null;
          chats = [];
          mensajeCargando = 'Inicia sesión para ver tus chats.';
        }
      });
    }
  
    // Cargar chats desde Firestore
    const cargarChats = async () => {
      try {
        const db = firebase.firestore();
        const querySnapshot = await db.collection('chats').where('participantes', 'array-contains', usuario.uid).get();
  
        chats = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        mensajeCargando = chats.length > 0 ? '' : 'Aún no tienes chats.';
      } catch (error) {
        mensajeCargando = `Error al cargar chats: ${error.message}`;
      }
    };
  
    const abrirChat = (chatId) => {
      goto(`/chat/${chatId}`); // Redirigir al chat específico
    };
  </script>
<main>
    {#if usuario}
      <div class="mensajes">
        <h1>Mis Chats</h1>
        <div class="lista-chats">
          {#if chats.length > 0}
            {#each chats as chat}
              <button
                class="chat"
                on:click={() => abrirChat(chat.id)}
                on:keydown={(event) => { if (event.key === 'Enter') abrirChat(chat.id); }}
              >
                <img src={chat.servicio.usuarioPublicador.foto} alt="Foto del usuario" />
                <div class="detalle-chat">
                  <p><strong>Servicio:</strong> {chat.servicio.nombre}</p>
                  <p><strong>Último mensaje:</strong> {chat.ultimoMensaje || 'No hay mensajes aún.'}</p>
                </div>
              </button>
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
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      height: 100vh;
    }
    .mensajes {
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
    .lista-chats {
      flex: 1;
      overflow-y: auto;
      padding-right: 1rem;
      max-height: 400px;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .chat {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      cursor: pointer;
      padding: 1rem;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
    .chat:hover {
      background-color: #f1f1f1;
    }
    .chat img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .detalle-chat {
      flex: 1;
      text-align: left;
    }
    .detalle-chat p {
      margin: 0;
      font-size: 1rem;
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