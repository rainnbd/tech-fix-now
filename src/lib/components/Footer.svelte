<script>
    const year = new Date().getFullYear();
</script>

<footer class="footer bg-primary text-light animate-fadeIn py-3">
    <div class="container">
        <div class="row small gx-3">
            <div class="col-12 col-md-6 mb-2 mb-md-0">
                <h6 class="mb-2">
                    <i class="fas fa-tools me-1"></i>TechFix Now
                </h6>
                <p class="mb-0" style="font-size: 0.85rem;">
                    Conecta con expertos en tecnología para reparaciones y
                    soporte rápido.
                </p>
            </div>

            <div class="col-12 col-md-6">
                <h6 class="mb-2">
                    <i class="fas fa-envelope me-1"></i>Contacto
                </h6>
                <p class="mb-1 small">
                    <i class="fas fa-phone-alt me-1"></i>+57 300 123 4567
                </p>
                <p class="mb-0 small">
                    <i class="fas fa-envelope me-1"></i>soporte@techfixnow.com
                </p>
            </div>
        </div>

        <hr class="my-2" />

        <div class="d-flex justify-content-between align-items-center small">
            <div>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a
                    href="#"
                    class="me-2 social-icon text-light"
                    aria-label="Facebook"
                >
                    <i class="fab fa-facebook-f"></i>
                </a>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a
                    href="#"
                    class="me-2 social-icon text-light"
                    aria-label="Twitter"
                >
                    <i class="fab fa-twitter"></i>
                </a>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a
                    href="#"
                    class="social-icon text-light"
                    aria-label="LinkedIn"
                >
                    <i class="fab fa-linkedin-in"></i>
                </a>
            </div>
            <div>© {year} TechFix Now</div>
        </div>
    </div>
</footer>

<style>
    /* Fade‑in al montar */
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
        animation: fadeIn 0.5s ease-out forwards;
    }

    .footer {
        font-size: 0.875rem;
    }

    .social-icon {
        color: var(--bs-dark);
        font-size: 1rem;
        transition:
            color 0.2s,
            transform 0.2s;
    }
    .social-icon:hover {
        transform: scale(1.1);
    }
</style>
