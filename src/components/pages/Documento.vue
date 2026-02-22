<template lang="pug">
  .container.documento(v-if="!loading")
    header
      breadcrumb(:itens="this.breadcrumb")
    titulo Documentos
    h4.custom-titulo #[i.fa.fa-folder-open] {{nome}}
    ul.itens-categoria(v-if="!naoTemDocumentos")
      li(v-for="documento in documentos")
        a(v-if="documento.interno" :href="documento.anexo" target="_blank") {{documento.titulo}}
          |
          |
          i(v-if="!documento.imagem") #[i.fa.fa-file-pdf-o]
          i(v-else) #[i.fa.fa-file-image-o]
        a(v-else :href="documento.anexo" target="_blank") {{documento.titulo}} #[i.fa.fa-external-link]
      paginacao(v-if="totalPages > 1" slot="footer", :gender='"a"', :object='"notícias"', :total='totalNoticias', :totalPage='totalPages', :perPage='perPage', :perPageAtual='noticias.length', :pageAtual="page")
    .itens-vazio
      template(v-if='naoTemDocumentos')
        mensagem.-warn
          p Nenhum documento foi encontrado no momento

    internas-rodape

  .container.documento(v-else)
    header
      breadcrumb(:itens="this.breadcrumb")
    .titulo.loading-effect
    .descricao.loading-effect

</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import ListaCategorias from "@BASICS/ListaCategorias";
import InternasRodape from "@MODULES/InternasRodape";
import Mensagem from "@BASICS/Mensagem";

import DocumentosService from "../../scripts/services/DocumentosService";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
    ListaCategorias,
    InternasRodape,
    Mensagem,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Documentos", rota: "Documentos" }, { nome: "" }],
      documentos: [],
      nome: "",
      naoTemDocumentos: false,
      loading: true,
      totalDocumentos: 0,
      totalPages: 0,
      page: "",
      perPage: 30,
    };
  },
  head() {
    return {
      title() {
        return {
          inner: `${config.SITE_TITLE} - Documentos`,
        };
      },
      meta: [
        { name: "description", content: config.SITE_DESC, id: "description" },
      ],
    };
  },
  created() {
    this.getDocumentos(this.$route.params.id, this.perPage);
    this.nome = this.$route.params.nome;
    this.breadcrumb[1].nome = this.$route.params.nome;
  },
  methods: {
    getDocumentos(id, perPage) {
      const documentosTratados = [];
      DocumentosService.getDocumentos(id, perPage).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          const documentoTratado = {
            titulo: response.data[i].title.rendered,
            anexo: response.data[i].acf.anexo
              ? response.data[i].acf.anexo
              : false,
            extensao: response.data[i].acf.extensao_do_documento,
            link: response.data[i].acf.link,
            interno: true,
            imagem: false,
          };
          if (documentoTratado.anexo === false) {
            documentoTratado.anexo = documentoTratado.link;
            documentoTratado.interno = false;
          }
          if (documentoTratado.extensao !== "pdf") {
            documentoTratado.imagem = true;
          }
          documentosTratados.push(documentoTratado);
        }
        if (documentosTratados.length === 0) {
          this.naoTemDocumentos = true;
        }
        this.documentos = documentosTratados;
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-titulo {
  color: $cor-azul-1;
  font-weight: bolder;

  i.fa.fa-folder-open {
    font-size: 22px;
    margin-right: 8px;
  }
}
.itens-categoria {
  color: $cor-azul-1;
  font-weight: bolder;
  padding: 0px 15px;
  margin-left: 24px;
  margin-bottom: 40px;
  list-style: none;
  border-left: 2px solid $cor-cinza-2;

  li {
    padding-top: 10px;

    &:first-child {
      margin-top: 20px;
      padding-top: 0;
    }

    i.fa {
      margin-left: 3px;
    }
  }

  a {
    color: $cor-azul-1;
    word-break: break-all;
  }
}

.itens-vazio {
  margin: 20px 0;
}

.container.documento {
  margin-bottom: 30px;
}
</style>
