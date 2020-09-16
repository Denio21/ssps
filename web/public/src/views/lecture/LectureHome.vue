<template>
  <div class="page" v-if="lecture != undefined">
    <h1 class="title">{{lecture.name}}</h1>
    <p class="subtitle">
      <router-link :to="{name: 'home'}">Zpět na výběr</router-link>| Smíchovská střední průmyslová škola
    </p>

    <p class="text">
      Zveřejně informace jsou platné pro školní rok {{lecture.valid}}. V případě dotazů a problémů mě kontaktujte na e-mailové adrese
      <a href="mailto:matej.cajthaml@ssps.cz">matej.cajthaml@ssps.cz</a>. Nalezené chyby prosím hlašte co nejdříve.
    </p>

    <div class="cards">
      <router-link
        :to="{name: 'lecture-presentations', params: { shortcut: lecture.shortcut }}"
        class="card image"
      >
        <div class="image">
          <img src="/img/presentations.png" alt />
        </div>
        <div class="content">
          <h2>Prezentace</h2>
        </div>
      </router-link>

      <router-link :to="{name: 'lecture-homeworks'}" class="card image">
        <div class="image">
          <img src="/img/homeworks.png" alt />
        </div>
        <div class="content">
          <h2>Úkoly</h2>
        </div>
      </router-link>

      <router-link
        :to="{name: 'lecture-tests', params: { shortcut: lecture.shortcut }}"
        class="card image"
      >
        <div class="image">
          <img src="/img/tests.png" alt />
        </div>
        <div class="content">
          <h2>Písemná zkoušení</h2>
        </div>
      </router-link>

      <router-link
        v-for="page in lecture.pages"
        v-bind:key="page.shortcut"
        :to="{name: 'lecture-page', params: { page: page.shortcut }}"
        class="card image"
      >
        <div class="image">
          <img v-if="page.photo" :src="'https://api.cajthaml.eu' + page.photo.formats.thumbnail.url" alt />
        </div>
        <div class="content">
          <h2>{{page.name}}</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    this.lecture = this.$store.lectures.find(
      (l) => l.shortcut == this.$route.params.shortcut
    );

    if (!this.lecture) await this.$actions.getLectures();

    this.lecture = this.$store.lectures.find(
      (l) => l.shortcut == this.$route.params.shortcut
    );
  },

  data() {
    return {
      lecture: undefined,
    };
  },
};
</script>