<script>
  import { auth } from "$lib/js/firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/storage";

  let usuario = null; // Usuario autenticado
  let servicio = {}; // Servicio a editar
  let mensaje = "Cargando servicio...";
  let ciudades = [];
  const maxFotos = 3;

  let servicioId = ""; // ID del servicio recibido desde la URL o ruta dinámica
  let departamentos = [
    {
      nombre: "Antioquia",
      ciudades: ["Medellín", "Envigado", "Bello", "Itagüí"],
    },
    {
      nombre: "Cundinamarca",
      ciudades: ["Bogotá", "Soacha", "Zipaquirá", "Chía"],
    },
    {
      nombre: "Valle del Cauca",
      ciudades: ["Cali", "Palmira", "Jamundí", "Buenaventura"],
    },
    // Agregar más departamentos según necesidad
  ];

  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        usuario = user;
        await cargarServicio();
      } else {
        usuario = null;
        mensaje = "Inicia sesión para editar servicios.";
      }
    });
  }

  // Cargar servicio desde Firestore
  const cargarServicio = async () => {
    try {
      const db = firebase.firestore();
      const doc = await db.collection("servicios").doc(servicioId).get();
      if (doc.exists) {
        servicio = doc.data();
        actualizarCiudades(servicio.departamento); // Configurar ciudades según departamento
        mensaje = "";
      } else {
        mensaje = "Servicio no encontrado.";
      }
    } catch (error) {
      mensaje = `Error al cargar servicio: ${error.message}`;
    }
  };

  // Actualizar ciudades según el departamento
  const actualizarCiudades = (departamento) => {
    const depto = departamentos.find((d) => d.nombre === departamento);
    ciudades = depto ? depto.ciudades : [];
  };

  // Agregar nueva foto
  const agregarFoto = (evento) => {
    if (servicio.fotos.length < maxFotos) {
      servicio.fotos.push(evento.target.files[0]);
    } else {
      mensaje = `Solo puedes subir un máximo de ${maxFotos} fotos.`;
    }
  };

  // Eliminar foto
  const eliminarFoto = (index) => {
    servicio.fotos.splice(index, 1);
  };

  // Guardar cambios
  const guardarCambios = async () => {
    if (
      !servicio.nombre ||
      !servicio.categoria ||
      !servicio.descripcion ||
      !servicio.departamento ||
      !servicio.ciudad
    ) {
      mensaje = "Por favor, rellena todos los campos obligatorios.";
      return;
    }

    try {
      const db = firebase.firestore();
      const storage = firebase.storage();
      let fotosURLs = [];

      for (let foto of servicio.fotos) {
        if (foto instanceof File) {
          const ref = storage.ref(`servicios/${usuario.uid}/${foto.name}`);
          await ref.put(foto);
          const url = await ref.getDownloadURL();
          fotosURLs.push(url);
        } else {
          fotosURLs.push(foto); // Fotos existentes
        }
      }

      await db.collection("servicios").doc(servicioId).update({
        nombre: servicio.nombre,
        categoria: servicio.categoria,
        descripcion: servicio.descripcion,
        fotos: fotosURLs,
        departamento: servicio.departamento,
        ciudad: servicio.ciudad,
        actualizadoEl: firebase.firestore.FieldValue.serverTimestamp(),
      });

      mensaje = "Servicio actualizado exitosamente.";
    } catch (error) {
      mensaje = `Error al guardar cambios: ${error.message}`;
    }
  };
</script>

<main>
  {#if usuario}
    <div class="editar-servicio">
      <h1>Editar Servicio</h1>
      {#if mensaje}
        <p class="mensaje">{mensaje}</p>
      {:else}
        <form on:submit|preventDefault={guardarCambios}>
          <div class="campo">
            <label for="nombre">Nombre del Servicio:</label>
            <input
              type="text"
              id="nombre"
              bind:value={servicio.nombre}
              required
            />
          </div>

          <div class="campo">
            <label for="categoria">Categoría:</label>
            <select id="categoria" bind:value={servicio.categoria} required>
              <option value="" disabled>Selecciona una categoría</option>
              <option>Electrodomésticos</option>
              <option>Celulares</option>
              <option>Computadores</option>
              <option>Portátiles</option>
              <option>Software</option>
              <option>Hardware</option>
              <option>Instalaciones</option>
              <option>Tecnología Varia</option>
              <option>Otros</option>
            </select>
          </div>

          <div class="campo">
            <label for="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              bind:value={servicio.descripcion}
              required
            ></textarea>
          </div>

          <div class="campo">
            <label for="fotos">Fotos:</label>
            <input
              type="file"
              id="fotos"
              accept="image/*"
              on:change={agregarFoto}
            />
            <div class="fotos">
              {#each servicio.fotos as foto, i}
                <div class="foto">
                  <img
                    src={typeof foto === "string"
                      ? foto
                      : URL.createObjectURL(foto)}
                    alt="Foto del servicio"
                  />
                  <button type="button" on:click={() => eliminarFoto(i)}
                    >Eliminar</button
                  >
                </div>
              {/each}
            </div>
          </div>

          <div class="campo">
            <label for="departamento">Departamento:</label>
            <select
              id="departamento"
              bind:value={servicio.departamento}
              on:change={() => actualizarCiudades(servicio.departamento)}
              required
            >
              <option value="" disabled>Selecciona un departamento</option>
              {#each departamentos as depto}
                <option>{depto.nombre}</option>
              {/each}
            </select>
          </div>

          <div class="campo">
            <label for="ciudad">Ciudad:</label>
            <select id="ciudad" bind:value={servicio.ciudad} required>
              <option value="" disabled>Selecciona una ciudad</option>
              {#each ciudades as ciudad}
                <option>{ciudad}</option>
              {/each}
            </select>
          </div>

          <button type="submit">Guardar Cambios</button>
        </form>
      {/if}
    </div>
  {:else}
    <div class="mensaje-autenticacion">
      <h1>Inicia sesión para editar servicios</h1>
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
  .editar-servicio {
    width: 100%;
    max-width: 600px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
  }
  .campo {
    margin-bottom: 1rem;
  }
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
  input,
  select,
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  button {
    padding: 0.8rem 1.5rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
  }
  button:hover {
    background-color: #005bb5;
  }
  .fotos {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .foto {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .foto img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }
  .foto button {
    background-color: #e53e3e;
    border: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .foto button:hover {
    background-color: #c53030;
  }
  .mensaje {
    margin-bottom: 1rem;
    color: #e53e3e;
    font-size: 1.1rem;
    text-align: center;
  }
</style>
