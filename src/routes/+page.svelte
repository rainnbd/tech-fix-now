<main class="container py-5">
  <section class="hero card mb-5 animate-fadeIn">
    <div class="card-body text-center">
      <h1 class="card-title mb-3 text-primary">
        Bienvenido a TechFix Now: Tu Plataforma de Soluciones Tecnológicas
      </h1>
      <p class="card-text">
        La tecnología ha transformado la manera en que vivimos, trabajamos y nos
        comunicamos. Sin embargo, con el uso constante de dispositivos
        electrónicos, sistemas digitales y herramientas tecnológicas, surgen
        necesidades de mantenimiento, reparación e instalación. Aquí es donde <strong
          >TechFix Now</strong
        > se convierte en tu mejor aliado.
      </p>
    </div>
  </section>

  <section class="descripcion card mb-5 animate-fadeIn delay-1">
    <div class="card-body">
      <h2 class="h4 mb-3">
        <i class="fas fa-thumbtack text-primary me-2"></i>
        ¿Qué es TechFix Now?
      </h2>
      <p>
        TechFix Now es una plataforma diseñada para conectar personas que
        necesitan ayuda con tecnología con expertos en reparación, instalación y
        servicios digitales. Inspirado en la funcionalidad de los marketplaces
        modernos, este sitio web te permite
        <strong>buscar y publicar servicios tecnológicos</strong>, facilitando
        el acceso a soluciones rápidas y confiables sin intermediarios.
      </p>
      <p>
        En nuestro espacio digital, cualquier persona puede encontrar ayuda para
        reparar un teléfono, optimizar un ordenador, instalar software o
        realizar mantenimiento técnico. Tanto si buscas asistencia como si eres
        un profesional del sector, TechFix Now te brinda la herramienta perfecta
        para
        <strong
          >crear conexiones, generar oportunidades y mejorar el acceso a
          servicios tecnológicos especializados</strong
        >.
      </p>
    </div>
  </section>

  <section class="funcionamiento card mb-5 animate-fadeIn delay-2">
    <div class="card-body">
      <h2 class="h4 mb-4 text-center">
        <i class="fas fa-rocket text-primary me-2"></i>
        ¿Cómo Funciona TechFix Now?
      </h2>
      <div class="row gy-4">
        <div class="col-md-4">
          <div class="paso h-100 p-3 border rounded">
            <h3 class="h6 mb-2 text-primary">
              <i class="fas fa-search me-2"></i>
              Explora Servicios en tu Área
            </h3>
            <p class="mb-0">
              Accede a una lista de servicios tecnológicos disponibles en tu
              ciudad o departamento. Filtra por categoría, ubicación o
              necesidades específicas.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="paso h-100 p-3 border rounded">
            <h3 class="h6 mb-2 text-primary">
              <i class="fas fa-edit me-2"></i>
              Publica tu Servicio
            </h3>
            <p class="mb-0">
              Si ofreces servicios tecnológicos, regístrate y publica tus
              ofertas con detalles como nombre, categoría, ubicación, imágenes y
              descripción.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="paso h-100 p-3 border rounded">
            <h3 class="h6 mb-2 text-primary">
              <i class="fas fa-comments me-2"></i>
              Conéctate Directamente con Expertos
            </h3>
            <p class="mb-0">
              Chatea directamente con proveedores de servicios sin
              intermediarios ni costos ocultos. Negocia precios, consulta
              disponibilidad y agenda servicios fácilmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BENEFICIOS -->
  <section class="beneficios card animate-fadeIn delay-3">
    <div class="card-body">
      <h2 class="h4 mb-3 text-center">
        <i class="fas fa-trophy text-primary me-2"></i>
        Beneficios de Usar TechFix Now
      </h2>
      <ul class="list-unstyled">
        <li class="mb-2">
          <i class="fas fa-check-circle text-success me-2"></i>
          Acceso rápido a servicios tecnológicos sin complicaciones.
        </li>
        <li class="mb-2">
          <i class="fas fa-check-circle text-success me-2"></i>
          Plataforma intuitiva y fácil de usar.
        </li>
        <li class="mb-2">
          <i class="fas fa-check-circle text-success me-2"></i>
          Conexión segura entre clientes y proveedores.
        </li>
        <li class="mb-2">
          <i class="fas fa-check-circle text-success me-2"></i>
          Ideal para técnicos y emprendedores del sector tecnológico.
        </li>
        <li class="mb-2">
          <i class="fas fa-check-circle text-success me-2"></i>
          Compatible con múltiples categorías tecnológicas.
        </li>
        <li class="mb-2">
          <i class="fas fa-check-circle text-success me-2"></i>
          Crecimiento del mercado digital en Colombia.
        </li>
      </ul>
    </div>
  </section>
</main>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    opacity: 0;
    animation: fadeIn 0.6s forwards;
  }
  .delay-1 {
    animation-delay: 0.2s;
  }
  .delay-2 {
    animation-delay: 0.4s;
  }
  .delay-3 {
    animation-delay: 0.6s;
  }
  .paso:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
</style>
