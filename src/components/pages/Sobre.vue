<template lang="pug">
  #sobre.container
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    titulo Sobre a Rede
    .row.content
      .col-sm-4.sidebar
        router-link.descricao(:to="{name: 'Generica', params: { slug: 'o-que-e-biotecnologia', id: 1 }}") O que é Biotecnlogia?
        router-link.descricao(:to="{name: 'Generica', params: { slug: 'a-rede-nordeste-de-biotecnologia', id: 2}}") A Rede Nordeste de Biotecnologia
        .lista
          span O Programa de Doutorado RENORBIO
          router-link(:to="{name: 'Generica', params: { slug: 'introducao'}}") Introdução

          router-link(:to="{name: 'Generica',params: { slug: 'estrategia-de-implantacao'}}") Estratégia de Implantação

          router-link(:to="{ name: 'Generica', params: { slug: 'associacao-institucional'}}") Associação Institucional

          router-link(:to="{name: 'Generica', params: { slug: 'objetivos'}}") Objetivos

          router-link(:to="{name: 'Generica', params: { slug: 'publico-alvo'}}") Público-alvo

          router-link(:to="{name: 'Generica', params: { slug: 'total-de-creditos-para-titulacao'}}") Total de créditos para titulação

          router-link(:to="{name: 'Generica', params: { slug: 'duracao'}}") Duração

          router-link(:to="{name: 'Generica', params: { slug: 'modelo-de-gestao'}}") Modelo de Gestão

          router-link(:to="{name: 'Generica', params: { slug: 'composicao-do-colegiado'}}") Composição do Colegiado

          router-link(:to="{name: 'Generica', params: { slug: 'atribuicoes'}}") Atribuições

          router-link(:to="{name: 'Generica', params: { slug: 'coordenacoes'}}") Coordenações

      .col-sm-8
        router-view
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Renorbio" }, { nome: "Sobre" }],
    };
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

<style lang="scss" scoped>
.content {
  margin-bottom: 30px;
}

.sidebar {
  background-color: $cor-azul-2;
  padding: 20px 0;
}

.sidebar span {
  padding-left: 25px;
  display: block;
  margin-bottom: 10px;
}

.descricao {
  color: $cor-azul-1;
  font-weight: bold;
  display: block;
  border-left: 5px solid transparent;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-bottom: 10px;
}

.descricao:hover {
  text-decoration: none;
  border-color: $cor-azul-1;
}

.lista {
  margin-top: 15px;
}

.lista a {
  display: block;
  border-left: 5px solid transparent;
  height: 25px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  color: $cor-azul-1;
  margin: 5px 0;
}

.lista a:hover {
  border-left: 5px solid $cor-azul-1;
  text-decoration: none;
}

a.descricao.router-link-exact-active.router-link-active,
a.router-link-exact-active.router-link-active {
  border-left: 5px solid $cor-azul-1;
  text-decoration: none;
}

@include media("<tablet") {
  .sidebar {
    margin-bottom: 30px;
  }
}
</style>
