<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<main>
  <Navbar />

  <slot />

  <Footer />
</main>

<style>
</style>
