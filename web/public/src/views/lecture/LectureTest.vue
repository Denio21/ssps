<template>
  <div class="page" v-if="lecture && test">
    <h1 class="title">{{test.name}}</h1>
    <p class="subtitle">
      <router-link :to="{name: 'lecture', params: {shortcut: lecture.shortcut}}">Zpět na předmět</router-link>| Smíchovská střední průmyslová škola
    </p>

    <table>
      <tr>
          <td>Témata</td>
          <td>{{test.topics}}</td>
      </tr>
      <tr>
          <td>Datum zkoušení</td>
          <td>{{(new Date(test.date)).toLocaleDateString("cs-CZ")}}</td>
      </tr>
    </table>

    <br>

    <div v-if="!all">
      <div class="navigation">
        <div class="button icon" @click="all = true"><i class="fas fa-list"></i> Všechny otázky</div>
        <div class="button icon" @click="random = !random"><i class="fas" v-bind:class="{'fa-random': random, 'fa-sort': !random}"></i> {{ random ? "Otázky náhodně" : "Otázky postupně" }}</div>
        <div class="button icon" v-bind:class="{'disabled': !random}" @click="random ? (repeat = !repeat) : undefined"><i class="fas" v-bind:class="{'fa-redo': repeat, 'fa-dice-one': !repeat}"></i> {{ repeat ? "Opakovat otázky" : "Neopakovat otázky" }}</div>
        <div class="button icon" @click="nextQuestion"><i class="fas fa-arrow-right"></i> Další otázka</div>
      </div>

      <p class="text" style="text-align: center">
        Otázka č. {{question+1}}/{{questions.length}} {{ random && !repeat ? ("(zbývá " + (this.questions.length - this.seen.length) + " otázek)") : ""}}
      </p>

      <div class="question">{{questions[question]}}</div>
    </div>

    <div v-if="all">
      <div class="navigation">
        <div class="button icon" @click="all = false"><i class="fas fa-list"></i> Normální zobrazení otázek</div>
      </div>

      <p class="text" v-for="(question, i) in questions" v-bind:key="i">{{i+1}}. {{question}}</p>
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

    this.test = this.lecture.tests.find(
      (t) => (t.shortcut == this.$route.params.test)
    );
    this.questions = this.test.question.split("\n");
  },

  data() {
    return {
      lecture: undefined,
      test: undefined,
      questions: [],
      question: 0,

      random: false,
      repeat: true,

      all: false,

      seen: [],
    };
  },
  methods: {
    nextQuestion() {
      document.gtag('event', 'next_question', {'value': this.question, 'event_label': "RA-" + (this.random ? "T" : "F") + ", " + "RE-" + (this.repeat ? "T" : "F") + ", " + "AL-" + (this.all ? "T" : "F"), 'event_category': this.test.name});

      if(!this.random) {
        this.question++;

        if(this.question >= this.questions.length)
          this.question = 0;
        return;
      }

      let generated = this.question;

      while (generated == this.question || (!this.repeat && this.seen.includes(generated))) {
        generated = Math.floor(Math.random() * this.questions.length);
      }

      this.question = generated;

      if(!this.repeat) {
        this.seen.push(generated);

        if(this.seen.length == this.questions.length)
          this.seen = [];
      }
    },
  },
};
</script>