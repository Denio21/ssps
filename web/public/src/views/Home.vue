<template>
  <div class="page">
    <h1 class="title">Cajthaml</h1>
    <p class="subtitle">Rozcestník</p>

    <p class="text">Tyto stránky slouží jako informační kanál pro mé studenty na Smíchovské střední průmyslové škole. Můžete také navštívit mé osobní stránky, kde se dozvíte informace o mých projektech a práci.</p>

    <div class="cards">
      <a href="https://matejcajthaml.navarru.cz" class="card image">
        <div class="image">
          <img src="/img/personal-web.png" alt="">
        </div>
        <div class="content">
          <h2>Osobní webové stránky</h2>
        </div>
      </a>

      <router-link v-for="lecture in lectures" v-bind:key="lecture.shortcut" :to="{name: 'lecture', params: { shortcut: lecture.shortcut }}" class="card image">
        <div class="image">
          <img :src="'https://api.cajthaml.eu' + lecture.photo.formats.thumbnail.url" alt="">
        </div>
        <div class="content">
          <h2>{{lecture.name}}</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",

  mounted() {
    this.$actions.getLectures();
  },

  data() {
    return {
      lectures: this.$store.lectures
    }
  }
};
</script>