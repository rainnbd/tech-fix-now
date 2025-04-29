<script>
    import { auth } from '../../firebase.js';
    import { onAuthStateChanged } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import 'firebase/storage';
  
    let usuario = null; // Usuario autenticado
    let mensaje = '';
    let servicio = {
      nombre: '',
      categoria: '',
      descripcion: '',
      fotos: [],
      departamento: '',
      ciudad: '',
      usuarioPublicador: null
    };
    const maxFotos = 3;
  
    // Datos de departamentos y ciudades de Colombia
    let departamentos = [
      {
        nombre: 'Antioquia',
        ciudades: ['Medellín', 'Envigado', 'Bello', 'Itagüí']
      },
      {
        nombre: 'Cundinamarca',
        ciudades: ['Bogotá', 'Soacha', 'Zipaquirá', 'Chía']
      },
      {
        nombre: 'Valle del Cauca',
        ciudades: ['Cali', 'Palmira', 'Jamundí', 'Buenaventura']
      }
      // Agregar más departamentos según necesidad
    ];
    let ciudades = []; // Ciudades dinámicas según el departamento seleccionado
  
    if (typeof window !== 'undefined') {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          usuario = user;
        } else {
          usuario = null;
          goto('/techsnow'); // Redirigir si no está autenticado
        }
      });
    }
  
    // Cambiar ciudades según el departamento seleccionado
    const actualizarCiudades = () => {
      const depto = departamentos.find((d) => d.nombre === servicio.departamento);
      ciudades = depto ? depto.ciudades : [];
      servicio.ciudad = ''; // Reiniciar la ciudad al cambiar el departamento
    };
  
    // Subir fotos y guardar servicio en Firebase
    const publicarServicio = async () => {
      if (!usuario) {
        mensaje = 'Inicia sesión para publicar servicios.';
        return;
      }
  
      if (!servicio.nombre || !servicio.categoria || !servicio.descripcion || !servicio.departamento || !servicio.ciudad) {
        mensaje = 'Por favor, rellena todos los campos obligatorios.';
        return;
      }
  
      try {
        const db = firebase.firestore();
        const storage = firebase.storage();
  
        // Subir fotos al storage
        let fotosURLs = [];
        for (let i = 0; i < servicio.fotos.length; i++) {
          const foto = servicio.fotos[i];
          const ref = storage.ref(`servicios/${usuario.uid}/${foto.name}`);
          await ref.put(foto);
          const url = await ref.getDownloadURL();
          fotosURLs.push(url);
        }
  
        // Guardar servicio en Firestore
        await db.collection('servicios').add({
          nombre: servicio.nombre,
          categoria: servicio.categoria,
          descripcion: servicio.descripcion,
          fotos: fotosURLs,
          departamento: servicio.departamento,
          ciudad: servicio.ciudad,
          usuarioPublicador: {
            nombre: usuario.displayName,
            tipoCuenta: usuario.photoURL ? 'Google' : 'Correo',
            foto: usuario.photoURL || 'https://via.placeholder.com/150',
          },
          creadoEl: firebase.firestore.FieldValue.serverTimestamp()
        });
  
        mensaje = 'Servicio publicado exitosamente.';
        goto('/techsnow'); // Redirigir a techsnow
      } catch (error) {
        mensaje = `Error al publicar servicio: ${error.message}`;
      }
    };
  
    // Validar cantidad de fotos
    const agregarFoto = (evento) => {
      if (servicio.fotos.length < maxFotos) {
        servicio.fotos.push(evento.target.files[0]);
      } else {
        mensaje = `Solo puedes subir un máximo de ${maxFotos} fotos.`;
      }
    };
  
    const eliminarFoto = (index) => {
      servicio.fotos.splice(index, 1);
    };
  </script>
  <main>
    {#if usuario}
      <div class="publicar">
        <h1>Publicar Servicio</h1>
        <form on:submit|preventDefault={publicarServicio}>
          <div class="campo">
            <label for="nombre">Nombre del Servicio:</label>
            <input type="text" id="nombre" bind:value={servicio.nombre} placeholder="Ej: Reparación de Computadores" required />
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
            <textarea id="descripcion" bind:value={servicio.descripcion} placeholder="Describe tu servicio..." required></textarea>
          </div>
  
          <div class="campo">
            <label for="fotos">Subir Fotos (Máximo 3):</label>
            <input type="file" id="fotos" accept="image/*" on:change={agregarFoto} />
            <div class="fotos">
              {#each servicio.fotos as foto, i}
                <div class="foto">
                  <span>{foto.name}</span>
                  <button type="button" on:click={() => eliminarFoto(i)}>Eliminar</button>
                </div>
              {/each}
            </div>
          </div>
  
          <div class="campo">
            <label for="departamento">Departamento:</label>
            <select id="departamento" bind:value={servicio.departamento} on:change={actualizarCiudades} required>
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
  
          <button type="submit">Publicar</button>
        </form>
        <p class="mensaje">{mensaje}</p>
      </div>
    {:else}
      <div class="mensaje-autenticacion">
        <h1>Inicia sesión para publicar servicios</h1>
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
    }
    .publicar {
      background-color: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
      max-width: 600px;
      width: 100%;
    }
    .campo {
      margin-bottom: 1rem;
    }
    label {
      font-weight: bold;
      display: block;
      margin-bottom: 0.5rem;
    }
    input, select, textarea {
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
      align-items: center;
      gap: 0.5rem;
    }
    .mensaje {
      margin-top: 1rem;
      color: #e53e3e;
    }
  </style>