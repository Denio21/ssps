<template>
  <div class="page" v-if="lecture">
    <h1 class="title">Prezentace</h1>
    <p class="subtitle">
      <router-link :to="{name: 'lecture', params: {shortcut: lecture.shortcut}}">Zpět na předmět</router-link>| Smíchovská střední průmyslová škola
    </p>

    <p
      class="text"
    >Prezentace jsou platné pro školní rok {{lecture.valid}}. Prezentace jsou přidávány postupně, jestli Vám nějaké chybí, kontaktujte mě na e-mailové adrese.</p>

    <div class="cards">
      <router-link
        v-for="presentation in lecture.presentations"
        v-bind:key="presentation.name"
        :to="{name: 'lecture-presentation', params: { lecture: lecture.shortcut, presentation: presentation.hours } }"
        class="card presentation"
      >
        <div class="content">
          <h2>{{presentation.name}}</h2>
        </div>
      </router-link>
    </div>

    <p class="text" v-if="lecture.presentations.length == 0">
      Nebyla nalezena žádná prezentace.
    </p>
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