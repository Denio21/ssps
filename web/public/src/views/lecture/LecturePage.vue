<template>
  <div class="page" v-if="lecture && page">
    <h1 class="title">{{page.name}}</h1>
    <p class="subtitle"><router-link :to="{name: 'lecture', params: {shortcut: lecture.shortcut}}">Zpět na předmět</router-link> | Smíchovská střední průmyslová škola</p>

    <p class="text">Informace jsou platné pro školní rok {{lecture.valid}}.</p>
    
    <div v-html="page.content"></div>
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

      this.page = this.lecture.pages.find(p => p.shortcut == this.$route.params.page);
    },

    data() {
        return {
            lecture: undefined,
            page: undefined,
        }
    }
};
</script>