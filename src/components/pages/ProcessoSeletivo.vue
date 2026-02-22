<template lang="pug">
  pagina
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    titulo(slot="titulo") Processo seletivo
    .content(slot="principal")
      p
        | O ingresso no programa de doutorado ocorre mediante edital de seleção.
        | O processo seletivo se dá pela avaliação de um projeto de pesquisa submetido pelo candidato,
        | defesa desse projeto para uma banca e avaliação de currículo. O processo seletivo é semestral
        | na maioria das instituições integrantes da rede, com exceção da UFRN, que adota seleção por fluxo contínuo.

      span.subtitulo edital {{datas.name}}

      p.descricao
        | ANTES DE INICIAR A INSCRIÇÃO, LEIA ATENTAMENTE AS NORMAS COMPLEMENTARES DO EDITAL, ANEXADAS
        | NO LINK: CHAMADA PÚBLICA PARA SELEÇÃO DA TURMA {{datas.name}}

      processo-seletivo-passos 1. Passos:
      ol
        li Identificar a área de concentração, a linha de pesquisa e o possível orientador habilitado com
          | o qual deseja trabalhar (ver lista de vagas abertas). A busca pode ser realizada consultando o currículo
          | lattes do orientador de escolha.

        li lista de professores com vaga para orientar se encontra nos Anexos I e II do edital. Procurar o orientador de
          |
          | interesse para discutir a Proposta de Pesquisa.

        li Efetuar a inscrição online:
          ul
            li - No final desta página, escolher a opção apropriada. Se novo usuário, fazer o cadastro no sistema.

            li - Entrar no sistema utilizando usuário e senha cadastrados.

            li - No menu Seleção, siga a ordem abaixo (é fundamental seguir esta ordem):
              ul
                li.subitem - Preencher a Proposta de Pesquisa, no link Proposta.

                li.subitem - Preencher a Ficha de Pontuação do Curriculum vitae, no link Currículo.

                li.subitem - Depois de preencher os dois itens acima, realizar a Inscrição.

        li A Proposta de Pesquisa deve ser elaborada pelo candidato, com adequação à área de atuação e projetos de
          |
          | pesquisa desenvolvidos pelo orientador de interesse, constando dos seguintes itens:
          ul
            li - Título do projeto (máximo de 255 caracteres)

            li - Sigla do Projeto (máximo de 32 caracteres)

            li - Resumo do projeto (máximo de 4.000 caracteres)

            li - Palavras-Chaves (3 a 5 palavras que caracterizam o trabalho)

            li - Justificativa de Execução do Projeto (máximo de 12.000 caracteres) (Descrever objetivamente,
              | a revisão da literatura, o problema focalizado, sua relevância no contexto da área de
              | biotecnologia na qual se insere, sua importância específica para o avanço do conhecimento e a
              | experiência da equipe)

            li - Objetivos e Metas (máximo de 6.000 caracteres) (Explicar os objetivos e metas do projeto, definindo o produto
              | final a ser obtido)

            li - Metodologia e Estratégia de Ação (máximo de 12.000 caracteres) (Descrever a metodologia a ser empregada
              | para a execução do projeto e como os objetivos serão alcançados)

            li - Prospecção (máximo de 700 caracteres) (Descrever de forma sucinta o aspecto inovador do projeto, baseado
              | em pesquisa em bancos de patentes, tais como
              |
              a(href="http://www.inpi.gov.br/" target="_blank") http://www.inpi.gov.br
              |
              | e
              |
              a(href="https://worldwide.espacenet.com/" target="_blank") http://ep.espacenet.com).

            li - Impactos Esperados (Estimar a repercussão e/ou impactos Regional, Econômico, Social, Técnico-científico dos
              | resultados esperados na solução do problema focalizado)

            li - Plano de Atividades.

            li - Orçamento Previsto.

            li - Resultados: Descrever os resultados e/ou produtos esperados.

            li - Referências Bibliográficas (máximo de 4.000 caracteres) (Relacionar as obras da literatura citadas, de acordo
              | com as normas da ABNT)

            li - Entregar a proposta de pesquisa impressa on line, juntamente com os documentos solicitados.

        li Gerar a Guia de Recolhimento da União (GRU) e efetuar o pagamento da taxa de inscrição.

        li Todos os documentos devem ser enviados eletronicamente, no formulário de inscrição online, conforme descrito no edital.

      processo-seletivo-passos 2. Dados Gerais:
      ol
        li Áreas de Concentração:
          ul
            li - Biotecnologia em Saúde
            li - Biotecnologia em Agropecuária
            li - Biotecnologia Industrial
            li - Biotecnologia em Recursos Naturais

        li Clientela: Portadores de Diploma de Cursos de Nível Superior (graduação plena), reconhecido pelo MEC.

        li Vagas: definidas conforme disponibilidade dos orientadores em cada edital.

        li Taxa de inscrição: VER NORMAS COMPLEMENTARES DO EDITAL

        li Documentos necessários: VER NORMAS COMPLEMENTARES DO EDITAL

        li Divulgação da homologação das inscrições: No Portal da RENORBIO
          |
          |(
          a(href="http://www.renorbio.org" target="_blank") http://www.renorbio.org
          |)
          | e no Quadro de Avisos do Ponto Focal.

      processo-seletivo-passos 3. Seleção:
      ol
        li Análise da Proposta de Pesquisa (critério eliminatório) e do Curriculum vitae (critério eliminatório e classificatório).
          |
          | VER NORMAS COMPLEMENTARES DO EDITAL PARA OUTROS CRITÉRIOS CLASSIFICATÓRIOS
        li Resultado da seleção: Divulgado no Portal da RENORBIO
          |
          |(
          a(href="http://www.renorbio.org" target="_blank") http://www.renorbio.org
          |)
          | e no Quadro de Avisos dos Pontos Focais.

      processo-seletivo-passos 4. Calendário:
      datas(:interna='true')
      p.descricao VER DETALHAMENTO DA DIVULGAÇÃO DOS RESULTADOS NAS NORMAS COMPLEMENTARES DO EDITAL.

      processo-seletivo-passos 5. Documentos e acesso:
      ul.links
        li.edital
          router-link.link(:to="{ name: 'Documento', params: { id: this.documentoId , nome: this.documentoCategoria} }") Ver edital atual

        li.acesso-conta
          a(:href="acessoConta" target="_blank") Acessar minha conta

        li.criar-conta
          router-link.link(:to="{ name: 'Cadastro' }") Criar conta no portal da Renorbio
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Datas from "@BASICS/ProcessoDatas";
import InternasDescricao from "@BASICS/InternasDescricao";
import Pagina from "@BASICS/Pagina";
import ProcessoSeletivoPassos from "@BASICS/ProcessoSeletivoPassos";
import Titulo from "@BASICS/Titulo";

import { getProcessoSeletivo } from "../../scripts/services/ProcessoSeletivo";
import DataUtil from "../../scripts/utils/Data";

import { getAreas } from "../../scripts/services/Disciplinas";

import { getCategorias } from "../../scripts/services/DocumentosService";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Datas,
    InternasDescricao,
    Pagina,
    ProcessoSeletivoPassos,
    Titulo,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Ingresso" }],
      acessoConta: config.LOGIN,
      datas: [],
      areas: [],
      documentoId: 0,
      documentoCategoria: 0,
    };
  },
  head: {
    title() {
      return {
        inner: `${config.SITE_TITLE} - Processo Seletivo`,
      };
    },
    meta: [
      {
        name: "description",
        content: config.SITE_DESC,
        id: "description",
      },
    ],
  },
  created() {
    this.getDatas();
    this.getAreas();
    this.getDocumentos();
  },
  methods: {
    async getDatas() {
      const processoSeletivo = await getProcessoSeletivo();

      const datasTratadas = {
        name: processoSeletivo.name,
        inscricao_start: DataUtil.dataFormatada(
          processoSeletivo.inscription_start,
        ),
        inscricao_end: DataUtil.dataFormatada(processoSeletivo.inscription_end),
        homologacao: DataUtil.dataFormatada(processoSeletivo.processing_date),
        avaliacao_start: DataUtil.dataFormatada(processoSeletivo.rating_start),
        avaliacao_end: DataUtil.dataFormatada(processoSeletivo.rating_end),
        resultado: DataUtil.dataFormatada(processoSeletivo.result_date),
      };
      this.datas = datasTratadas;
    },
    async getAreas() {
      const areasTratadas = [];

      const areas = getAreas();

      Object.entries(areas).forEach(v => {
        const i = v[0];

        const areaTratada = {
          key: areas[i].id,
          name: areas[i].name,
        };
        areasTratadas.push(areaTratada);
      });

      this.areas = areasTratadas;
    },
    async getDocumentos() {
      const categoriasDocumentos = await getCategorias();

      if (!categoriasDocumentos) return;

      Object.entries(categoriasDocumentos).forEach(v => {
        const i = v[0];
        if (categoriasDocumentos[i].slug.includes("editais")) {
          this.documentoId = categoriasDocumentos[i].id;
          this.documentoCategoria = categoriasDocumentos[i].name;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
i.fa.fa-file-pdf-o {
  color: $cor-azul-1;
  font-size: 16px;
  margin-right: 10px;
}

.content {
  margin-bottom: 0px !important;
}

.subtitulo {
  display: block;
  margin: 40px 0 25px 0;
}

.descricao {
  margin: 25px 0 25px 0;
}

.subtitulo,
.descricao {
  text-transform: uppercase;
  font-weight: bold;
  cursor: default;
}

ol {
  list-style-type: lower-latin;
  padding-left: 20px;
}

ol > li {
  margin-bottom: 30px;
}

ul {
  list-style: none;
  padding-left: 10px;
}

ul > li {
  margin-top: 10px;
}

.subitem {
  padding-top: 5px;
  padding-left: 5px;
}

a {
  color: $cor-azul-1;
}

.links > li {
  margin: 25px 0;
}

.links > li:last-child {
  margin-bottom: 0px;
}

.links a {
  color: $cor-cinza;
  text-decoration: none;
}

.links a:hover {
  color: $cor-azul-1;
  text-decoration: underline;
  cursor: pointer;
}

ul.links {
  padding: 0;
}

.edital::before {
  content: "\f15c";
}

.edital-anterior::before {
  content: "\F0ca";
}

.vagas::before {
  content: "\F15c";
}

.acesso-conta::before {
  content: "\F090";
}

.criar-conta::before {
  content: "\F234";
}

.edital::before,
.edital-anterior::before,
.vagas::before,
.acesso-conta::before,
.criar-conta::before {
  font-family: FontAwesome;
  font-size: 16px;
  color: $cor-azul-1;
  margin-right: 10px;
}
</style>
