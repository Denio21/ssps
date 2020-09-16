<template>
  <div class="presentation" v-if="presentation" @click="movePageClick">
    <pdf
      :src="'https://api.cajthaml.eu' + presentation.file.url"
      :page="page"
      @num-pages="pages = $event"
    />
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  components: {
    pdf,
  },

  async mounted() {
    this.lecture = this.$store.lectures.find(
      (l) => l.shortcut == this.$route.params.shortcut
    );

    if (!this.lecture) await this.$actions.getLectures();

    this.lecture = this.$store.lectures.find(
      (l) => l.shortcut == this.$route.params.shortcut
    );

    this.presentation = this.lecture.presentations.find(p => p.hours == this.$route.params.presentation)

    window.addEventListener(
      "keydown",
      function (e) {
        if (e.keyCode == 37) this.movePage(-1);
        else if (e.keyCode == 39) this.movePage(1);
      }.bind(this)
    );
  },

  methods: {
    movePage(dir = 1) {
      this.page += dir;

      if (this.page <= 0) this.page = 1;

      if (this.page > this.pages) this.page = this.pages;
    },

    movePageClick(e) {
      const click = e.clientX;

      const clickTreshold = document.body.clientWidth / 2;

      this.movePage(click > clickTreshold ? 1 : -1);
    },
  },

  data() {
    return {
      lecture: undefined,
      presentation: undefined,

      page: 1,
      pages: 1,
    };
  },
};
</script>