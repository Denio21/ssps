<template>
  <div class="page">
    <h1 class="title">Podmínky používání</h1>
    <p class="subtitle">
      <router-link :to="{name: 'home'}">Zpět na hlavní stránku</router-link>
    </p>

    <p
      class="text"
    >Webové stránky na doméně cajthaml.eu provozuje Matěj Cajthaml (dále jen autor). Autora lze kontaktovat na e-mailové schránce matej.cajthaml@ssps.cz. Webové stránky slouží jako hlavní komunikační kanál pro mé studenty na Smíchovské střendí průmyslové školy.</p>

    <p
      class="text"
    >Uživatel webových stránek bere na vědomí níže uvedené podmínky použití webových stránek a potvrzuje, že se s nimi seznámil a že s nimi souhlasí. Autor nenese žádnou odpovědnost za škody způsobené užíváním webových stránek v rozporu s níže uvedenými podmínkami, škody způsobené neznalostí níže uvedených podmínek ani za důsledky používání webových stránek, přestože uživatel nesouhlasí s níže uvedenými podmínkami.</p>

    <h2>Soubory cookies a služby společnosti Google</h2>

    <p
      class="text"
    >Za účelem zlepšení poskytovaných služeb a zvýšení uživatelského komfortu využívá webové rozhraní tzv. soubory cookies. Autor také využívá služby společnosti Google (zejména Google Analytics), v jejichž rámci může rovněž dochází k využívání souborů cookies.</p>

    <p
      class="text"
    >Soubory cookies jsou malé soubory, které ukládají informace ve prohlížeči uživatele a běžně slouží k rozlišování jednotlivých uživatelů. Osoba uživatele však není na základě těchto informací identifikovatelná. Soubory cookies tak pomáhají např.:</p>
    <div class="text">
      <p>autorovy zjistit, jak jsou dané stránky navštěvované a podle těchto dat se zaměřit na úpravy</p>
      <p>ukládat různé rozhodnutí uživatele stránek pro boudoucí návštěvy</p>
    </div>

    <p class="text">
      Další obecné informace o souborech cookies je možné nalézt např. na
      <a
        href="https://cs.wikipedia.org/wiki/HTTP_cookie"
      >Wikipedii</a>.
    </p>

    <p class="text">Podmínky používání služeb Google Analytics jsou k dispozici např. zde:</p>

    <div class="text">
      <p>
        <a
          href="https://marketingplatform.google.com/about/analytics/terms/cz/"
        >Podmínky služeb Google Analytics</a>
      </p>
      <p>
        <a
          href="https://policies.google.com/technologies/partner-sites?hl=cs"
        >Jak Google využívá data</a>
      </p>
    </div>

    <p
      class="text"
    >Používání souborů cookie je možné nastavit pomocí internetového prohlížeče uživatele. Většina prohlížečů soubory cookies automaticky přijímá již ve výchozím nastavení. Soubory cookies lze pomocí webového prohlížeče uživatele odmítnout nebo nastavit užívání jen některých souborů cookies.</p>

    <p class="text">
      Tyto podmínky jsou platné a účinné dnem jejich zveřejnění. Autor je oprávněn podmínky pro použití webu kdykoliv změnit.
      <br />V Praze dne 13. září 2020
      <br />Matěj Cajthaml
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",

  mounted() {
    this.$actions.getLectures();
  },

  data() {
    return {
      lectures: this.$store.lectures,
    };
  },
};
</script>