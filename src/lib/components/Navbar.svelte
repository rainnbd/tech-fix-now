<script>
    import { onMount } from "svelte";
    import { auth } from "$lib/js/firebase";
    import { onAuthStateChanged } from "firebase/auth";

    let usuario = null;

    onMount(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            usuario = user;
        });
        return () => unsubscribe();
    });
</script>

<nav
    class="navbar navbar-expand-lg navbar-dark bg-primary animate-fadeIn"
    aria-label="Navegación principal"
>
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/">
            <i class="fas fa-tools me-2"></i>
            TechFix Now
        </a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Alternar navegación"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">
                        <i class="fas fa-home me-1"></i> Inicio
                    </a>
                </li>
                <li class="nav-item">
                    {#if usuario}
                        <a class="nav-link" href="/perfil">
                            <i class="fas fa-user me-1"></i> Perfil
                        </a>
                    {:else}
                        <a class="nav-link" href="/inicio-sesion">
                            <i class="fas fa-sign-in-alt me-1"></i> Iniciar Sesión
                        </a>
                    {/if}
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/techsnow">
                        <i class="fas fa-rocket me-1"></i> Techs‑now
                    </a>
                </li>
                {#if usuario}
                    <li class="nav-item">
                        <a class="nav-link" href="/verpublicaciones">
                            <i class="fas fa-list me-1"></i> Mis Publicaciones
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mensajes">
                            <i class="fas fa-comments me-1"></i> Mis Chats
                        </a>
                    </li>
                {/if}
            </ul>
        </div>
    </div>
</nav>

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
    .animate-fadeIn {
        opacity: 0;
        animation: fadeIn 0.5s ease-out forwards;
    }

    .nav-link {
        transition:
            color 0.2s,
            transform 0.2s;
    }
    .nav-link:hover {
        color: rgba(255, 255, 255, 0.8);
        transform: translateY(-2px);
    }
</style>
