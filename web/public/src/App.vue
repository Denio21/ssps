<template>
  <div id="app">
    <div class="background"></div>

    <router-view v-if="$store.status != 'error'" />

    <div class="page" v-if="$store.status == 'error'">
      <h1 class="title">Chyba</h1>
      <p class="subtitle">Nepodařilo se připojit k serveru.</p>

      <p
        class="text"
      >Webová stránka se nemohla připojit k serveru, zkuste tuto stránku navštívit později.</p>
    </div>

    <footer v-if="$route.name != 'lecture-presentation'">
      <div class="author">Matěj Cajthaml &copy; 2020</div>
      <div class="policy"><router-link :to="{name: 'privacyPolicy'}">Podmínky používání</router-link></div>
    </footer>
  </div>
</template>

<script>
export default {
  mounted() {
    document.body.style.minHeight = window.innerHeight + "px";
  },
  watch: {
    $route() {
      document.gtag("event", "page_view", {
        page_title: document.title,
        page_location: location.href,
        page_path: location.pathname,
      });
    },
  },
};
</script>