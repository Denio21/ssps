<template>
  <div class="page">
    <p class="time" id="time">00:00</p>
    <p class="exact">v <span contenteditable="true" @input="onInput">8:00</span></p>
    
    <p class="text" contenteditable="true">Již brzy začínáme! Počkejte na mojí přítomnost, připravte si dotazy na látku a úkoly, kterou právě probíráme.</p>


  </div>
</template>

<script>

export default {
  name: "Timer",

  mounted() {
    document.getElementsByTagName("footer").forEach(f => {
        f.parentElement.removeChild(f);
    });

    this.reset();
  },

  methods: {
      onInput(el) {
        const hour = el.target.innerText;

        this.target = hour;

        this.reset();
      },

      reset() {
            document.querySelector(".background").style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`;
            document.querySelector(".background").style.backgroundRepeat = "repeat";
            document.querySelector(".background").style.backgroundSize = "auto";

            if(this.interval)
                clearInterval(this.interval);

            this.interval = setInterval(() => {
                this.tick();
            }, 1000);
      },

      tick() {
        const current = new Date();
        const target = new Date();

        target.setHours(this.target.split(":")[0]);
        target.setMinutes(this.target.split(":")[1]);
        target.setSeconds(0);
        target.setMilliseconds(0);

        let change = target - current;

        if(change < 0) {
            document.querySelector(".background").style.backgroundImage = "url(https://i.imgur.com/ho5rlD7.gif?noredirect)";
            document.querySelector(".background").style.backgroundRepeat = "no-repeat";
            document.querySelector(".background").style.backgroundSize = "cover";

            clearInterval(this.interval);
            return;
        }

        const hours = Math.floor(change / 3600000);
        change -= hours * 3600000;

        const minutes = Math.floor(change / 60000);
        change -= minutes * 60000;

        const seconds = Math.floor(change / 1000);

        document.querySelector("#time").innerText = (hours + "").padStart(2, "0") + ":" + (minutes + "").padStart(2, "0") + ":" + (seconds + "").padStart(2, "0");
      }
  },

  destroyed() {
      console.log("destroyed!");
  
    if(this.interval)
        clearInterval(this.interval);
  },

  data() {
    return {
        target: "8:00",
        interval: undefined
    }
  }
};
</script>

<style lang="scss" scoped>
    p.time {
        font-family: monospace !important;
        font-size: 4.4em;
    }

    .page {
        text-align: center;
    }

    p.text {
        font-size: 1.4em;
    }
</style>