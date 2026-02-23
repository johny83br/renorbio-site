<template lang="pug">
  pagina
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    titulo(slot="titulo") Mapa do Site
    .content(slot="principal")
      p Aqui está a estrutura de informações do site

      ul.item
        li
          router-link(:to="{ name: 'Index', params: {} }") Início

        li Renorbio
          ul.subitem
            li
              router-link(:to="{ name: 'Generica', params: { slug: 'o-que-e-biotecnologia', id: 1} }") Sobre a Rede
            li
              router-link(:to="{ name: 'CorpoDocente', params: {} }") Corpo Docente
            li
              router-link(:to="{ name: 'Unidades', params: {} }") Unidades

        li
          router-link(:to="{ name: 'ProcessoSeletivo', params: {} }") Ingresso

        li
          router-link(:to="{ name: 'Laboratorios', params: {} }") Laboratórios

        li Comunicação
          ul.subitem
            li
              router-link(:to="{ name: 'Noticias', params: {} }") Notícias
            li
              router-link(:to="{ name: 'Eventos', params: {} }") Eventos
            li
              router-link(:to="{ name: 'RenorbioNaMidia', params: { slug: 'renorbio-na-midia'} }") Renorbio na Mídia
            li
              router-link(:to="{ name: 'Galeria', params: {} }") Galeria

        li
          router-link(:to="{ name: 'Documentos', params: {} }") Documentos

        li Disciplinas
          ul.subitem
            li
              router-link(:to="{ name: 'DisciplinasDoPrograma', params: {} }") Disciplinas do programa
            li
              router-link(:to="{ name: 'DisciplinasOfertadas', params: {} }") Disciplinas ofertadas

        li
          router-link(:to="{ name: 'PaginaExtra', params: {slug: 'patentes'} }") Patentes

        li
          router-link(:to="{ name: 'PaginaExtra', params: {slug: 'empresas'} }") Empresas

        li
          router-link(:to="{ name: 'Contato', params: {} }") Contato

        li
          a(:href="acessoConta" target="_blank") Acessar minha conta

        li
          a(:href="baseUrl + 'busca'") Busca

        li Parceiros
          ul.subitem
            li
              a(href="http://www.uece.br/" target="_blank") UECE
            li
              a(href="http://www.ufal.edu.br/" target="_blank") UFAL
            li
              a(href="https://www.ufba.br/" target="_blank") UFBA
            li
              a(href="http://www.ufc.br/" target="_blank") UFC
            li
              a(href="http://www.ufes.br/" target="_blank") UFES
            li
              a(href="http://portais.ufma.br/PortalUfma/index.jsf" target="_blank") UFMA
            li
              a(href="hhttp://www.ufpb.br/" target="_blank") UFPB
            li
              a(href="https://www.ufpe.br/" target="_blank") UFPE
            li
              a(href="http://www.ufpi.br/" target="_blank") UFPI
            li
              a(href="http://www.ufrn.br/" target="_blank") UFRN
            li
              a(href="http://www.ufrpe.br/" target="_blank") UFRPE
            li
              a(href="http://www.ufs.br/" target="_blank") UFS
            li
              a(href="https://portal.unit.br/" target="_blank") UNIT
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import Pagina from "@BASICS/Pagina";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
    Pagina,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Mapa do Site" }],
      acessoConta: config.LOGIN,
      baseUrl: config.URL_BASE,
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
ul {
  list-style: none;
}

.item li {
  margin: 5px 0;
}

.item a {
  color: $cor-cinza;
}

.subitem li {
  margin: 5px 0;
}

.item a:hover,
.subitem a:hover {
  color: $cor-azul-1;
}

li > ul {
  padding-left: 20px;
}

ul > li:before {
  content: "\f111";
  font-family: FontAwesome;
  color: $cor-azul-1;
  margin-right: 10px;
  font-size: 8px;
}
</style>
