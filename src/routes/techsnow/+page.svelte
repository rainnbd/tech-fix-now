<script>
  import "$lib/css/app.css";
  import { onMount } from "svelte";
  import { db, auth } from "$lib/js/firebase";
  import { collection, getDocs, doc, getDoc } from "firebase/firestore";

  let posts = [];
  let loading = true;
  let error = null;
  const fotoPorDefecto =
    "https://static.vecteezy.com/system/resources/previews/016/753/870/original/default-profile-picture-ui-element-template-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-light-theme-vector.jpg";

  const chunkArray = (arr, size = 10) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );
  };

  onMount(async () => {
    try {
      const postsQuery = collection(db, "publicarservicios");
      const postsSnapshot = await getDocs(postsQuery);
      const allPosts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userIds = [
        ...new Set(allPosts.map((post) => post.usuariopubli).filter(Boolean)),
      ];
      let users = {};

      if (userIds.length > 0) {
        const userIdChunks = chunkArray(userIds);
        const userQueries = userIdChunks.map((chunk) =>
          Promise.all(
            chunk.map(async (uid) => {
              const userDocRef = doc(db, "Register", uid);
              const userSnap = await getDoc(userDocRef);
              if (userSnap.exists()) {
                const data = userSnap.data();
                users[uid] = {
                  displayName:
                    data.tipoCuenta === "Usuario"
                      ? `${data.nombres || ""} ${data.apellidos || ""}`.trim()
                      : data.nombres || "Empresa",
                  photoURL: data.foto || fotoPorDefecto,
                  role: data.tipoCuenta || "user",
                  email: data.correo || "No disponible",
                  phone: data.celular || "No disponible",
                };
              }
            }),
          ),
        );

        await Promise.all(userQueries);
      }

      posts = allPosts.map((post) => ({
        ...post,
        user: users[post.usuariopubli] || {
          displayName: "Usuario desconocido",
          photoURL: fotoPorDefecto,
          role: "user",
          email: "No disponible",
          phone: "No disponible",
        },
      }));
    } catch (err) {
      error = err.message;
      console.error("Error fetching data:", err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="bg-secondary">
  <div class="container py-5">
    <div class="pagina animate-fadeIn">
      <div class="d-flex justify-content-center gap-3 mb-5 flex-wrap">
        <a href="/publicar" class="btn btn-primary">
          <i class="fas fa-plus-circle me-2"></i>
          Publicar Servicio
        </a>
        <!-- <a href="/mensajes" class="btn btn-info text-white">
          <i class="fas fa-comments me-2"></i>
          Chats
        </a> -->
      </div>

      <section class="servicios">
        <div class="bg-secondary">
          <div class="container py-4">
            {#if loading}
              <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Cargando publicaciones...</p>
              </div>
            {:else if error}
              <div class="alert alert-danger mx-3">{error}</div>
            {:else if posts.length === 0}
              <div class="text-center py-4">
                <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                <p class="h5">No hay publicaciones disponibles</p>
              </div>
            {:else}
              <div class="pagina animate-fadeIn">
                <section class="servicios">
                  <h2 class="h4 text-center mb-4">Servicios Disponibles</h2>
                  <div class="row g-4 justify-content-center">
                    {#each posts as post}
                      <div class="col-sm-6 col-lg-4">
                        <div class="card h-100 servicio-card">
                          <img
                            src={post.foto || "https://via.placeholder.com/300"}
                            class="card-img-top"
                            alt="Foto del servicio"
                            loading="lazy"
                          />
                          <div class="card-body d-flex flex-column">
                            <h3 class="card-title">{post.precio}$</h3>
                            <h5 class="card-title">{post.nombre}</h5>
                            <p class="card-text mb-1">
                              <i class="fas fa-tag text-primary me-1"></i>
                              <strong>Categoría:</strong>
                              {post.categoria?.join(", ") || "Sin categoría"}
                            </p>
                            <p class="card-text mb-1">
                              <i class="fas fa-info-circle text-primary me-1"
                              ></i>
                              <strong>Descripción:</strong>
                              {post.descripcion || "Sin descripción"}
                            </p>
                            <p class="card-text mb-1">
                              <i class="fas fa-map-marker-alt text-danger me-1"
                              ></i>
                              <strong>Ubicación:</strong>
                              {post.ciudad?.join(", ") || "No especificada"},
                              {post.departamento?.join(", ") || ""}
                            </p>
                            <p class="card-text mb-1">
                              <i class="fas fa-envelope text-primary me-1"></i>
                              <strong>Email:</strong>
                              {post.user.email}
                            </p>
                            <p class="card-text mb-3">
                              <i class="fas fa-phone-alt text-primary me-1"></i>
                              <strong>Teléfono:</strong>
                              {post.user.phone}
                            </p>
                            <div class="mt-auto d-flex align-items-center">
                              <img
                                src={post.user.photoURL}
                                class="rounded-circle me-2"
                                alt="Avatar del usuario"
                                style="width:40px; height:40px; object-fit:cover; border:2px solid #0d6efd;"
                              />
                              <div class="flex-grow-1">
                                <p class="mb-1">
                                  {post.user.displayName}
                                  {#if post.user.role === "company"}
                                    <small class="text-muted">(Empresa)</small>
                                  {:else}
                                    <small class="text-muted">(Usuario)</small>
                                  {/if}
                                </p>
                                <button class="btn btn-sm btn-success">
                                  <i class="fas fa-paper-plane me-1"></i>
                                  Enviar Mensaje
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </section>
              </div>
            {/if}
          </div>
        </div>
      </section>
    </div>
  </div>
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
  }

  .servicio-card {
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      opacity 0.3s ease;
    opacity: 0.95;
  }

  .servicio-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    opacity: 1;
    cursor: pointer;
  }

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
</style>
