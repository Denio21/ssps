<template>
  <div class="page" v-if="lecture">
    <h1 class="title">Domácí úkoly</h1>
    <p class="subtitle">
      <router-link :to="{name: 'lecture', params: {shortcut: lecture.shortcut}}">Zpět na předmět</router-link>| Smíchovská střední průmyslová škola
    </p>

    <p
      class="text"
    >Úkoly jsou přidávány postupně, prioritní jsou pouze povinné úkoly. Jestli Vám nějaké chybí, kontaktujte mě na e-mailové adrese.</p>

    <div class="cards">
      <router-link
        v-for="homework in lecture.schoolworks"
        v-bind:key="homework.shortcut"
        :to="{name: 'lecture-homework', params: { lecture: lecture.shortcut, homework: homework.shortcut } }"
        class="card"
      >
        <div class="content">
          <h1>{{homework.name}}</h1>
        </div>
      </router-link>
    </div>

    <p class="text" v-if="lecture.schoolworks.length == 0">
      Nebyl nalezen žádný úkol. Nejspíše nebyl žádný zadán, zkontrolujte systém Bakalářů.
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