<template>
  <div class="page" v-if="lecture && homework">
    <h1 class="title">{{homework.name}}</h1>
    <p class="subtitle">
      <router-link :to="{name: 'lecture', params: {shortcut: lecture.shortcut}}">Zpět na předmět</router-link>| Smíchovská střední průmyslová škola
    </p>

    <table>
      <tr>
          <td>Zadáno</td>
          <td>{{homework.start}}</td>
      </tr>
      <tr>
          <td>Termín</td>
          <td>{{(new Date(homework.deadline)).toLocaleString("cs-CZ")}}</td>
      </tr>
      <tr>
          <td>Typ</td>
          <td>{{homework.type == "povinny" ? "Povinný" : "Nepovinný" }}</td>
      </tr>
      <tr>
          <td>Úspěšné splnění</td>
          <td>{{homework.reward}}</td>
      </tr>
      <tr>
          <td>Nesplnění</td>
          <td>{{homework.punish}}</td>
      </tr>
    </table>

    <div v-html="homework.content"></div>
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

    this.homework = this.lecture.schoolworks.find(
      (h) => h.shortcut == this.$route.params.homework
    );
  },

  data() {
    return {
      lecture: undefined,
      homework: undefined,
    };
  },
};
</script>