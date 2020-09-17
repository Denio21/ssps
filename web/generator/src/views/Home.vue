<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Generátor</div>
      <div class="card-content p-5">
        <input
          type="file"
          @change="addedFile"
          data-role="file"
          data-button-title="Vyberte soubor (JSON)"
        />

        <div class="actions">
          <button class="button primary" @click="download">Stáhnout</button>
          <button class="button success" @click="newTest">Nový</button>
        </div>
      </div>
    </div>

    <div v-if="test">
      <div class="card">
        <div class="card-header">Test</div>

        <div class="content p-5">
          <div class="row mb-2">
            <label class="cell-sm-2">Název</label>
            <div class="cell-sm-10">
              <input type="text" v-model="test.name" />
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">Nastavení</div>

        <div class="content p-5">
          <div class="row mb-2">
            <label class="cell-sm-2">Počet variant</label>
            <div class="cell-sm-10">
              <input type="number" v-model="test.settings.variants" />
            </div>
          </div>

          <div class="row mb-2">
            <label class="cell-sm-2">Pole pro informace</label>
            <div class="cell-sm-10">
              <div v-for="information of informations" v-bind:key="information.shortcut">
                <input
                  @click="informationClicked(information.shortcut)"
                  type="checkbox"
                  data-role="checkbox"
                  :data-caption="information.name"
                  :checked="test.settings.informations.includes(information.shortcut)"
                />
              </div>
            </div>
          </div>

          <div class="row mb-2">
            <label class="cell-sm-2">Zamíchání</label>
            <div class="cell-sm-10">
              <div v-for="shuffle of shuffles" v-bind:key="shuffle.shortcut">
                <input
                  @click="shuffleClicked(shuffle.shortcut)"
                  type="checkbox"
                  data-role="checkbox"
                  :data-caption="shuffle.name"
                  :checked="test.settings.shuffle.includes(shuffle.shortcut)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="mt-10 mb-10" />

      <div class="card" v-for="(question, i) in test.questions" v-bind:key="i">
        <div class="card-header">
          Otázka č. {{i+1}}
          <button
            class="button mini square place-right"
            @click="test.questions.splice(i, 1)"
          >
            <span class="mif-minus"></span>
          </button>

          <button
            class="button mini square place-right mr-3"
            @click="test.questions.push(question)"
          >
            <span class="mif-drive2"></span>
          </button>
        </div>

        <div class="content p-5">
          <div class="row mb-2">
            <label class="cell-sm-2">Typ otázky</label>
            <div class="cell-sm-10">
              <select v-model="question.type">
                <option value="fill">Doplnění</option>
                <option value="choices">Volba z možností</option>
                <option value="select">Výběr možností</option>
                <option value="text">Text</option>
              </select>
            </div>

            <label class="cell-sm-2">Zadání</label>
            <div class="cell-sm-10">
              <input type="text" v-model="question.label" />
            </div>

            <label class="cell-sm-2">Body</label>
            <div class="cell-sm-10">
              <input type="number" v-model="question.points" />
            </div>

            <label class="cell-sm-2">Započítání</label>
            <div class="cell-sm-10">
              <input
                type="checkbox"
                data-role="checkbox"
                data-caption="Bonusová (speciální)"
                v-model="question.special"
              />
            </div>

            <label class="cell-sm-2">Nápověda</label>
            <div class="cell-sm-10">
              <input type="text" v-model="question.help" />
            </div>

            <div class="cell-sm-12">
              <hr />
            </div>

            <div class="cell-sm-12" v-if="question.type == 'text'">
              <div class="row">
                <label class="cell-sm-2">Počet řádků</label>
                <div class="cell-sm-10">
                  <input type="number" v-model="question.lines" />
                </div>

                <label class="cell-sm-2">Odpověď</label>
                <div class="cell-sm-10">
                  <input type="text" v-model="question.valid" />
                </div>
              </div>
            </div>

            <div class="cell-sm-12" v-else-if="question.type == 'fill'">
              <div
                class="row mb-5"
                v-for="(sentence, i) in question.sentences"
                v-bind:key="'sent' + i"
              >
                <div class="cell-sm-6">
                  <input type="text" v-model="sentence.sentence" />
                </div>

                <div class="cell-sm-6">
                  <div v-for="(fill, i) in sentence.fill" v-bind:key="'fill' + i" class="row">
                    <div class="cell-sm-11 p-0">
                      <input type="text" v-model="sentence.fill[i]" />
                    </div>

                    <div class="cell-sm-1">
                      <button
                        class="button mini square place-right"
                        @click="sentence.fill.splice(i, 1)"
                      >
                        <span class="mif-minus"></span>
                      </button>
                    </div>
                  </div>

                  <button
                    class="button mini square place-right mt-2"
                    @click="sentence.fill.push('')"
                  >
                    <span class="mif-plus"></span>
                  </button>
                  <button
                    class="button mini square place-right mt-2 mr-3"
                    @click="question.sentences.splice(i, 1)"
                  >
                    <span class="mif-minus"></span>
                  </button>
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="cell-sm-11">Nová věta</div>
                <div class="cell-sm-1">
                  <button
                    class="button mini square place-right mt-2"
                    @click="question.sentences.push({ sentence: '', fill: []})"
                  >
                    <span class="mif-plus"></span>
                  </button>
                </div>
              </div>
            </div>

            <div class="cell-sm-12" v-else-if="question.type == 'select'">
              <div class="row mb-5" v-for="(option, i) in question.options" v-bind:key="'opt' + i">
                <div class="cell-sm-11">
                  <input type="text" v-model="option.label" />
                </div>

                <div class="cell-sm-1">
                  <input type="checkbox" data-role="checkbox" v-model="option.valid" />
                  <button
                    class="button mini square place-right mt-2"
                    @click="question.options.splice(i, 1)"
                  >
                    <span class="mif-minus"></span>
                  </button>
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="cell-sm-11">Nová možnost</div>
                <div class="cell-sm-1">
                  <button
                    class="button mini square place-right mt-2"
                    @click="question.options.push({ label: '', valid: false})"
                  >
                    <span class="mif-plus"></span>
                  </button>
                </div>
              </div>
            </div>

            <div class="cell-sm-12" v-else-if="question.type == 'choices'">
              <div
                class="row mb-1"
                v-for="(choice, i) in question.choices"
                v-bind:key="'choic' + i"
              >
                <div class="cell-sm-11">
                  <input type="text" v-model="question.choices[i]" />
                </div>

                <div class="cell-sm-1">
                  <button
                    class="button mini square place-right mt-2"
                    @click="question.choices.splice(i, 1)"
                  >
                    <span class="mif-minus"></span>
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="cell-sm-11">Nová možnost</div>

                <div class="cell-sm-1">
                  <button
                    class="button mini square place-right mt-2"
                    @click="question.choices.push('')"
                  >
                    <span class="mif-plus"></span>
                  </button>
                </div>
              </div>

              <hr />

              <div
                class="row mb-1"
                v-for="(statement, i) in question.statements"
                v-bind:key="'state' + i"
              >
                <div class="cell-sm-9">
                  <input type="text" v-model="statement.label" />
                </div>

                <div class="cell-sm-2">
                  <select v-model="statement.valid">
                    <option
                      v-for="(choice, i) in question.choices"
                      v-bind:key="'choicsel' + i"
                    >{{choice}}</option>
                  </select>
                </div>

                <div class="cell-sm-1">
                  <button
                    class="button mini square place-right mt-2"
                    @click="question.statements.splice(i, 1)"
                  >
                    <span class="mif-minus"></span>
                  </button>
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="cell-sm-11">Nové tvrzení</div>
                <div class="cell-sm-1">
                  <button
                    class="button mini square place-right mt-2"
                    @click="question.statements.push({ label: '', valid: question.choices[0]})"
                  >
                    <span class="mif-plus"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="mt-10 mb-10" />

      <div class="card">
        <div class="card-header">Nová otázka</div>
        <div class="content p-5">
          <button class="button primary" @click="test.questions.push({})">Nová otázka</button>
        </div>
      </div>
    </div>

    <div class="p-5">
      <p>Matěj Cajthaml &copy; 2020</p>
    </div>
  </div>
</template>

<style lang="scss">
.actions {
  margin-top: 20px;

  > button {
    margin-right: 10px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      informations: [
        {
          shortcut: "name",
          name: "Jméno a příjmení",
        },
        {
          shortcut: "date",
          name: "Datum",
        },
        {
          shortcut: "class",
          name: "Třída",
        },
        {
          shortcut: "grade",
          name: "Hodnocení",
        },
      ],
      shuffles: [
        {
          shortcut: "options",
          name: "Možnosti",
        },
        {
          shortcut: "questions",
          name: "Otázky",
        },
      ],
    };
  },
  computed: {
    test() {
      return this.$store.state.test;
    },
  },
  methods: {
    informationClicked(type) {
      const current = this.test.settings.informations.includes(type);

      if (!current) this.test.settings.informations.push(type);
      else
        this.test.settings.informations = this.test.settings.informations.filter(
          (t) => t != type
        );
    },
    shuffleClicked(type) {
      const current = this.test.settings.shuffle.includes(type);

      if (!current) this.test.settings.shuffle.push(type);
      else
        this.test.settings.shuffle = this.test.settings.shuffle.filter(
          (t) => t != type
        );
    },
    newTest() {
      this.$store.commit("setTest", {
        name: "",
        settings: {
          variants: 1,
          informations: [],
          shuffle: [],
        },
        questions: {},
      });
      this.$store.commit("setFile", "test");
    },
    addedFile(e) {
      const files = e.target.files;

      if (files.length != 1) return;

      const file = files[0];

      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = (event) => {
        this.$store.commit("setTest", JSON.parse(event.target.result));
        this.$store.commit("setFile", file.name);
      };
    },
    download() {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(this.test))
      );
      element.setAttribute("download", this.$store.state.file);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>
