<script>
  import { auth } from "$lib/js/firebase"; // Ruta relativa al archivo firebase.js
  import { onAuthStateChanged } from "firebase/auth";

  let usuario = null; // Variable para detectar si el usuario está autenticado

  // Monitorear el estado de autenticación
  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, (user) => {
      usuario = user ? user : null; // Establecer el usuario autenticado o nulo
    });
  }
</script>

<main>
  <!-- Encabezado con navegación dinámica -->
  <header>
    <h1>TechFix Now</h1>
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li>
          {#if usuario}
            <a href="/perfil">Perfil</a>
          {:else}
            <a href="/inicio-sesion">Iniciar Sesión</a>
          {/if}
        </li>
        <li><a href="/techsnow">Techs-now</a></li>
        {#if usuario}
          <li><a href="/verpublicaciones">Mis Publicaciones</a></li>
          <li><a href="/mensajes">Mis Chats</a></li>
        {/if}
      </ul>
    </nav>
  </header>

  <!-- Contenido específico de cada ruta -->
  <slot />

  <!-- Pie de página -->
  <footer>
    <p>© 2025 TechFix Now. Todos los derechos reservados.</p>
  </footer>
</main>

<style>
  /* Estilo del encabezado */
  header {
    background-color: #0070f3;
    color: white;
    padding: 1rem;
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  nav ul li {
    margin: 0 1rem;
  }
  nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
  }
  nav ul li a:hover {
    text-decoration: underline;
    color: #e0e0e0;
  }

  /* Configuración básica del layout */
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f8f9fa;
  }

  /* Estilo del pie de página */
  footer {
    background-color: #f8f8f8;
    color: #333;
    text-align: center;
    padding: 1rem;
    margin-top: auto;
    box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
