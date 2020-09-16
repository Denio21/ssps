<template>
  <div class="page" v-if="lecture">
    <h1 class="title">Písemná zkoušení</h1>
    <p class="subtitle"><router-link :to="{name: 'lecture', params: {shortcut: lecture.shortcut}}">Zpět na předmět</router-link> | Smíchovská střední průmyslová škola</p>

    <p class="text">Pro každé brzké plánované písemné zkoušení je vytvořen soubor otázek, které slouží k připomenutí učiva a jako příprava k testu. Některé otázky se lehce pozměněné mohou oběvit v písemném zkoušení.</p>

    <div class="cards">
      <router-link v-for="test in lecture.tests" v-bind:key="test.shortcut" :to="{name: 'lecture-test', params: { lecture: lecture.shortcut, test: test.shortcut } }" class="card">
        <div class="content">
          <h1>{{test.name}}</h1>
        </div>
      </router-link>
    </div>

    <p class="text" v-if="lecture.tests.length == 0">
      Nebyl nalezen žádný test.
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
            lecture: undefined
        }
    }
};
</script>