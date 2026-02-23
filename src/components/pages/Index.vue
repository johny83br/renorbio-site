<template lang="pug">
  main#conteudo
    index-intro
    .container
      section.top
        .left
          noticias
        .right
          eventos
    section.bottom
      .container
        .row
          .col-sm-12.col-md-7.left
            processoSeletivo
          .col-sm-12.col-md-5.right
            disciplinasOfertadas
    .container.parceiros
      .row
        .col-sm-12
          parceiros(:breakpoints='[[768, 3], [1024, 5]]')
</template>

<script>
import DisciplinasOfertadas from "@MODULES/DisciplinasOfertadas";
import Eventos from "@MODULES/Eventos";
import IndexIntro from "@BASICS/IndexIntro";
import Noticias from "@MODULES/Noticias";
import Parceiros from "@MODULES/Parceiros";
import ProcessoSeletivo from "@MODULES/ProcessoSeletivo";

import * as config from "../../scripts/config";

export default {
  components: {
    DisciplinasOfertadas,
    Eventos,
    IndexIntro,
    Noticias,
    Parceiros,
    ProcessoSeletivo,
  },
  head: {
    meta: [
      {
        name: "description",
        content: config.SITE_DESC,
        id: "description",
      },
    ],
  },
};
</script>

<style lang="scss">
section.top {
  margin: 20px 0;
  display: flex;
}

.top .left {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  padding-right: 25px;
  padding-bottom: 25px;
  min-height: 170px;
  width: 65%;
}

.top .right {
  padding-left: 25px;
  padding-bottom: 25px;
  width: 35%;
}

section.bottom {
  background-color: $cor-azul-2;
}

.bottom {
  padding: 20px 0;
}

.bottom .left {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  padding-right: 25px;
  padding-bottom: 25px;
}

.bottom .right {
  padding-left: 25px;
  padding-bottom: 25px;
}

.more a {
  font-size: 12px;
  color: $cor-azul-1;
}

.more a:hover {
  text-decoration: underline;
}

.more:before {
  content: "";
  margin: 0 10px;
  opacity: 0.3;
  border-left: 1px solid $cor-cinza;
}

.container.parceiros {
  margin-bottom: 30px;
}

@include media("<992px") {
  section.top {
    flex-direction: column;
  }

  .top .left {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-right: 0;
  }

  .top .right {
    padding-left: 0;
  }

  .top .left,
  .top .right {
    width: 100%;
  }
}

@include media("<=tablet") {
  .bottom .left {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-right: 15px;
    padding-bottom: 30px;
  }

  .bottom .right {
    padding-left: 15px;
    margin-top: 10px;
  }
}

@include media("<tablet") {
  .top .left,
  .bottom .left {
    border: none;
    padding-bottom: 10px;
  }

  div#noticias,
  div#processoSeletivo {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-bottom: 30px !important;
  }
}
</style>
