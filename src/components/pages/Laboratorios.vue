<template lang="pug">
  .container
    breadcrumb(:itens="breadcrumb")
    titulo Laboratórios
    .caixa-selecao-box
      .busca-lab
        .label-select Buscar por:
        .caixa-selecao
          .div
            input.form-control(type="text" placeholder="Palavra chave" v-model="input" @keypress.enter="handleInput")
            small(v-if="invalidInput") Insira no mínimo 3 caracteres
          button.btn.btn-custom-azul(type="submit" @click="handleInput") Buscar
      hr
      busca-feedback(v-if="search", :feedback="search")
      .busca-lab(v-if="this.listaItens.length > 0")
        .label-select Filtrar por instituição:
        .caixa-selecao(v-if="this.listaItens.length > 0")
          select-input(name="area-concentracao" v-model="filter" :itens="optionsInput" :tab="0")
    ul(v-if="!empty")
      li(v-for="lab in labs")
        span {{lab}}
    template(v-else)
      mensagem.-warn
        p Nenhum laboratório foi encontrado no momento
    lista-accordion(:item="0" :itens="listaFiltrada", :origin="'labs'")
    modal-generico(:name="'laboratorio'" v-if="modal === labId" :type="'datalist'" :titulo="'DADOS GERAIS'", :dados="labContent")
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import ListaAccordion from "@BASICS/ListaAccordion";
import SelectInput from "@BASICS/SelectInput";
import ModalGenerico from "@BASICS/ModalGenerico";
import BuscaFeedback from "@BASICS/BuscaFeedback";
import Mensagem from "@BASICS/Mensagem";

import Laboratories from "../../scripts/services/Laboratories";

import { EventBus } from "../../scripts/utils/EventBus";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
    ListaAccordion,
    SelectInput,
    ModalGenerico,
    BuscaFeedback,
    Mensagem,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Laboratórios" }],
      filter: {},
      optionsInput: {
        0: { key: 0, name: "Mostrar todas" },
        // 1: { key: 1, name: 'UECE' },
        // 2: { key: 2, name: 'UESC' },
        // 3: { key: 3, name: 'UFAL' },
        // 4: { key: 4, name: 'UFBA' },
        // 5: { key: 5, name: 'UFC' },
        // 6: { key: 6, name: 'UFPE' },
        // 7: { key: 7, name: 'UFRN'},
        // 8: { key: 8, name: 'UFRPE'},
        // 9: { key: 9, name: 'UFS'}
      },
      listaItens: [
        // {name: 'UFAL - Universidade Federal de Alagoas', key: 3, subitens: [{nome: 'Biotecnologia em Agropecuária', link: ''}, {nome: 'Laboratório de Melhoramento Animal', link: ''}, {nome: 'Biotecnologia em Recursos Naturais', link: ''}, {nome: 'Laboratório de Eletroquímica Aplicada da UFAL', link: ''}, {nome: 'Laboratório de Biomagnetismo em Gastroenterologia', link: ''}, {nome: 'Laboratório de Bioquímica e Fisiologia de Insetos', link: ''}, {nome: 'Laboratório de Eletroquímica e Estresse Oxidativo', link: ''}, {nome: 'Laboratório de Audição e Tecnologia', link: ''}, {nome: 'Laboratório de Ecologia Química', link: ''}]},
        // {name: 'UECE - Universidade Estadual do Ceará', key: 1, subitens: [{nome: 'Farmacologia de Produtos Naturais e Sintéticos', link: ''}, {nome: 'Laboratório de Manipulação de Oócitos e Folículos Ovarianos Pré-antrais (Lamofopa)', link: ''}, {nome: 'Desenvolvimento de materiais poliméricos obtidos a partir de recursos naturais renováveis', link: ''}, {nome: 'Laboratório de Pesquisa em Bioagentes Patogênicos (Unifor/Nubex)', link: ''}, {nome: 'Laboratório de Nutrição e Produção de Ruminantes', link: ''}, {nome: 'Atualmente sem Laboratório próprio na IES, porém montando um laboratório privado de di-agnóstico genômico incubado nas instalações do Instituto do Câncer do Ceará (ICC BioLabs)', link: ''}, {nome: 'Laboratório de Ciência e Tecnologia de Alimentos', link: ''}, {nome: 'Bioinformática estrutural', link: ''}, {nome: 'Produtos Naturais: Aspectos químicos, ensaios antioxidantes e biocatálise', link: ''}, {nome: 'Laboratório de Virologia', link: ''}, {nome: 'Laboratório de Reprodução Suína e Tecnologia de Sêmen', link: ''}, {nome: 'Laboratório de Biotecnologia', link: ''}, {nome: 'Laboratório de Química de Produtos Naturais', link: ''}, {nome: 'Avaliação bioquímica, Avaliação de órteses ortopédicas, Avaliação de terapêutica hipoglicemiante por modificação na expressão de IGF-1 e BDNF via micro-RNAs na resistência à insulina', link: ''}, {nome: 'Laboratório de Biotecnologia e Biologia Molecular (LBBM)', link: 'http://www.labbm.com.br/'}]},
        // {name: 'UFC - Universidade Federal do Ceará', key: 5, subitens: [{nome: 'Laboratório de Processos de Separação e Cromatografia (LAPS&C)', link: ''}, {nome: 'Laboratório de Ecologia Microbiana e Biotecnologia (LEMBIOTECH)', link: ''}, {nome: 'Laboratório de Cultura de Células e Tecidos', link: ''}, {nome: 'Laboratório de Oncologia Experimental (LOE)', link: ''}, {nome: 'Laboratório de Biotecnologia Molecular (LabBMol/UFC)', link: ''}, {nome: 'Laboratório de Moléculas Biologicamente Ativas (BioMol-Lab)', link: ''}, {nome: 'Laboratório de Biotecnologia – Labiotec', link: ''}, {nome: 'LIBS - Laboratório Integrado de Biomoléculas', link: ''}, {nome: 'Laboratório de Farmacologia de Sobral (LaFS)', link: ''}, {nome: 'Laboratório de Produtos e Tecnologia em Processos-LPT', link: ''}]},
        // {name: 'UFPE - Universidade Federal de Pernambuco', key: 6, subitens: [{nome: 'Laboratório de Genética e Biotecnologia Vegetal', link: ''}, {nome: 'Laboratório de Processos Biotecnológicos', link: ''}, {nome: 'Laboratório de Genética Molecular', link: ''}, {nome: 'Laboratório de Farmacologia de Produtos Bioativos', link: ''}, {nome: 'Laboratório de Biotecnologia', link: ''}, {nome: 'Laboratório de Etnofarmacologia Aplicada', link: ''}, {nome: 'Laboratório de Biologia Molecular do Laboratório de Imunopatologia Keizo Asami', link: ''}, {nome: 'Laboratório de Prospecção Farmacológica e Toxicológica de Produtos Bioativos', link: ''}]},
        // {name: 'UFRN - Universidade Federal do Rio Grande do Norte', key: 7, subitens: [{nome: 'BioME - Bioinformatics Multidisciplinary Environment', link: 'http://bioinfo.imd.ufrn.br/'},{nome: 'Laboratório de Proteínas do Instituto de Medicina Tropical', link: ''}, {nome: 'Laboratório de Conservação de Germoplasma Animal', link: ''}, {nome: 'Laboratório de farmacologia molecular', link: ''}, {nome: 'Biorreatores de bancada', link: ''}, {nome: 'Biotecnologia em Saúde', link: ''}, {nome: 'Laboratório de Microscopia e Transformação de plantas', link: ''}, {nome: 'Laboratório de Mutagênese Ambiental', link: ''}, {nome: 'Laboratório de Biologia Molecular e Genômica', link: 'http://lbmg.cb.ufrn.br/'}, {nome: 'Métodos de Estudos Fitoquímicos Clássicos e Modernos', link: ''}, {nome: 'Instituto de Medicina Tropical', link: ''}, {nome: 'Laboratório de Genética bioquímica', link: ''}, {nome: 'Parque computacional do IMD', link: ''}, {nome: 'Laboratório de Imunogenética de Doenças Complexas do Instituto de Medicina Tropical', link: ''}, {nome: 'Laboratório de Bioanalise e Biotecnologia Molecular', link: ''}, {nome: 'Laboratório de Genética Toxicológica', link: ''}, {nome: 'Laboratório de Genética de Recursos Marinhos', link: ''}]},
        // {name: 'UFRPE - Universidade Federal Rural de Pernambuco', key: 8, subitens: [{nome: 'Laboratório de Fisiologia animal molecular aplicada', link: ''}, {nome: 'Laboratório  de Bioengenharia e Laboratório de Química e Meio Ambiente', link: ''}, {nome: 'Central de Análise de Fármacos, Medicamentos e Alimentos', link: ''}, {nome: 'Núcleo de Estudos e Pesquisas de Plantas Medicinais', link: ''}, {nome: 'Laboratório de Espectroscopia de Impedância e Materiais Orgânicos', link: ''}, {nome: 'Laboratório de Fisiologia Vegetal', link: ''}, {nome: 'Laboratório de Microbiologia e Imunologia', link: ''}, {nome: 'Androlab', link: ''}, {nome: 'Centro Laboratorial de Apoio à Pesquisa da Unidade Acadêmica de Garanhuns', link: ''}, {nome: 'Biotecnologia Industrial: Bioquímica dos Microorganismos/Extração e purificação de biomoléculas por extração líquido-líquido', link: ''}]},
        // {name: 'UFS - Universidade Federal de Sergipe', key: 9, subitens: [{nome: 'Laboratório de Neurociências e Ensaios Farmacológicos', link: ''}, {nome: 'Laboratório de Química de Produtos Naturais e Bioquímica', link: ''}, {nome: 'Laboratório de Biomassa, Bioproduto e Bioenergia', link: ''}, {nome: 'Laboratório Multiusuário de Genética Molecular e Biotecnologia', link: ''}, {nome: 'Produção e melhoramento de biocombustível de 2ª geração', link: ''}, {nome: 'Laboratório de Microbiologia de Alimentos e Bioengenharia', link: ''}, {nome: 'Laboratório de Fisiologia e Farmacologia Cardiovascular', link: ''}, {nome: 'Laboratório de Neurociência Molecular de Sergipe - LaNMSE', link: ''}]},
        // {name: 'UFBA - Universidade Federal da Bahia', key: 4, subitens: [{nome: 'Laboratório Multi-Usuário de Microscopia Eletrônica da UFBA (LAMUME)', link: ''}, {nome: 'Laboratório de Propriedades Óticas', link: 'http://www.lapo.ufba.br/port/'}, {nome: 'Centro de Biofotônica - FOUFBA', link: ''}, {nome: 'Laboratório de Cinética e Dinâmica Molecular', link: 'http://www.lablaser.ufba.br'}, {nome: 'Laboratório de Biotecnologia e Ecologia de Microrganismos - LABEM', link: ''}, {nome: 'Laboratório Dr. Moacyr Dunham de Moura Costa', link: ''}, {nome: 'Laboratório de Virologia', link: ''}, {nome: 'LAPESCA/Laboratório de Pescados e Cromatografia Aplicada', link: 'http://www.pgalimentos.far.ufba.br/'}, {nome: 'Laboratório de Bioquímica, Biotecnologia e Bioprodutos - LBBB', link: ''}, {nome: 'Laboratório de Imunologia do Instituto de Ciências da Saúde da UFBA', link: ''}, {nome: 'Laboratório de Produtos Naturais GESNAT', link: ''}]},
        // {name: 'UESC - Universidade Estadual de Santa Cruz', key: 2, subitens: [{nome: 'Laboratório de Biologia de Fungos', link: ''}]}
      ],
      listaFiltrada: [],
      modal: "",
      labId: 0,
      labContent: "",
      input: "",
      search: false,
      empty: false,
      labs: [],
      invalidInput: false,
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
  watch: {
    filter(data) {
      if (data.key !== this.optionsInput[0].key && data.key !== "") {
        this.listaFiltrada = window._.filter(
          this.listaItens,
          obj => obj.key === data.key,
        );
      } else {
        this.listaFiltrada = window._.orderBy(
          this.listaItens,
          ["name"],
          ["asc"],
        );
      }
    },
  },
  mounted() {
    this.getLabs();
    if (this.$route.params.id) this.getLab(this.$route.params.id);
  },
  created() {
    EventBus.$on("closeModal", () => {
      this.closeModal();
    });
  },
  methods: {
    async getLabs() {
      this.listaFiltrada = [];
      this.listaItens = [];
      try {
        const response = await Laboratories.getLaboratories();
        Object.keys(response.data.laboratories).forEach(laboratorie => {
          const labTratado = {
            name: `${response.data.laboratories[laboratorie].initials} - ${response.data.laboratories[laboratorie].institution}`,
            key: laboratorie,
            subitens: response.data.laboratories[laboratorie].laboratories,
          };
          this.listaItens.push(labTratado);

          const optionTratado = {
            key: laboratorie,
            name: response.data.laboratories[laboratorie].initials,
          };
          this.optionsInput[laboratorie] = optionTratado;
        });

        this.listaFiltrada = window._.orderBy(
          this.listaItens,
          ["name"],
          ["asc"],
        );
        for (let i = 0; i < this.listaFiltrada.length; i++) {
          this.listaFiltrada[i].subitens = window._.orderBy(
            this.listaFiltrada[i].subitens,
            ["nome"],
            ["asc"],
          );
        }
      } catch (err) {
        // console.log(err);
      }
    },
    async getLab(id) {
      try {
        const dictionary = [
          ["Nome", "", "string"],
          ["Instituição", "", "string"],
          ["E-mail", "", "email"],
          ["Página", "", "link"],
          ["Telefone", "", "string"],
          ["Descrição", "", "descricao"],
          ["Responsáveis", "", "links", "CorpoDocente"],
        ];
        const response = await Laboratories.getLaboratorie(id);
        Object.keys(response.data.laboratories).forEach(laboratorie => {
          Object.keys(
            response.data.laboratories[laboratorie].laboratories,
          ).forEach(lab => {
            dictionary[0][1] =
              response.data.laboratories[laboratorie].laboratories[lab].name;
            dictionary[1][1] = `${response.data.laboratories[laboratorie].initials} - ${response.data.laboratories[laboratorie].institution}`;
            dictionary[2][1] =
              response.data.laboratories[laboratorie].laboratories[lab].email;
            dictionary[3][1] =
              response.data.laboratories[laboratorie].laboratories[
                lab
              ].homepage;
            dictionary[4][1] =
              response.data.laboratories[laboratorie].laboratories[lab].phone;
            dictionary[5][1] =
              response.data.laboratories[laboratorie].laboratories[
                lab
              ].description;
            dictionary[6][1] =
              response.data.laboratories[laboratorie].laboratories[
                lab
              ].responsables;
            this.labId =
              response.data.laboratories[laboratorie].laboratories[lab].id;
            this.modal =
              response.data.laboratories[laboratorie].laboratories[lab].id;
          });
        });
        this.labContent = dictionary;
      } catch (err) {
        // console.log(err);
      }
    },
    closeModal() {
      this.modal = false;
    },
    async handleInput() {
      if (this.input.length >= 1 && this.input.length <= 2) {
        this.invalidInput = true;
        // this.search = false
        this.showInput = true;
        return;
      }
      if (this.input === "") {
        this.getLabs();
        this.empty = false;
        this.search = false;
        this.invalidInput = false;
        return;
      }
      this.listaFiltrada = [];
      this.listaItens = [];
      this.optionsInput = "";
      this.optionsInput = { 0: { key: 0, name: "Mostrar todas" } };
      try {
        const response = await Laboratories.searchLab(this.input);
        Object.keys(response.data.laboratories).forEach(laboratorie => {
          const labTratado = {
            name: `${response.data.laboratories[laboratorie].initials} - ${response.data.laboratories[laboratorie].institution}`,
            key: laboratorie,
            subitens: response.data.laboratories[laboratorie].laboratories,
          };
          this.listaItens.push(labTratado);

          const optionTratado = {
            key: laboratorie,
            name: response.data.laboratories[laboratorie].initials,
          };
          this.optionsInput[laboratorie] = optionTratado;
        });
        this.listaFiltrada = window._.orderBy(
          this.listaItens,
          ["name"],
          ["asc"],
        );
        for (let i = 0; i < this.listaFiltrada.length; i++) {
          this.listaFiltrada[i].subitens = window._.orderBy(
            this.listaFiltrada[i].subitens,
            ["nome"],
            ["asc"],
          );
        }
      } catch (err) {
        // console.log(err);
        this.search =
          "Ocorreu um erro durante a busca, por favor tente mais tarde.";
      } finally {
        this.search = this.input;
        if (this.listaItens.length === 0) this.empty = true;
        else this.empty = false;
        this.invalidInput = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.label-select {
  padding: 6px 0;
  padding-right: 10px;
  @media screen and (max-width: 425px) {
    width: 100%;
  }
}
.select {
  display: flex;
  flex-flow: row nowrap;
  @media screen and (max-width: 425px) {
    flex-flow: row wrap;

    .select-input {
      width: 100%;
    }
  }
}
.caixa-selecao-box {
  display: flex;
  flex-direction: column;

  hr {
    width: 100%;
    border-color: $cor-azul-4;
  }

  .busca-lab {
    display: flex;
    @include media("<tablet") {
      flex-direction: column;
    }
  }

  .label-select {
    margin-right: 10px;
    padding: 6px 0;
    width: 170px;
  }
  .caixa-selecao {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    @include media("<611px") {
      flex-direction: column;
    }

    small {
      color: $cor-vermelho;
      margin-top: 5px;
      display: block;
    }

    input {
      background-color: $cor-azul-2;
      border: none;
      color: $cor-azul-1;
      height: 31px;
      margin-right: 10px;
      width: 230px;

      @include media("<611px") {
        width: 100%;
        margin: 0 0 15px 0;
      }
    }

    ::placeholder {
      color: $cor-azul-1;
    }

    button.btn.btn-custom-azul {
      width: 120px;
      height: 30px;
      border-radius: 15px;
      padding: 5px 0;
      margin: 0px 10px;
      background-color: $cor-azul-1;
      color: $cor-branco;
    }

    button.btn.btn-custom-azul:hover,
    button.btn.btn-custom-azul:focus {
      background-color: $cor-azul-3;
      border: 1px solid $cor-azul-3;
      color: $cor-branco;
    }

    button.btn.btn-custom-azul {
      @include media("<611px") {
        margin: 10px auto 10px auto;
      }
    }

    @media screen and (max-width: 425px) {
      width: 100%;
    }
  }

  @media screen and (max-width: 425px) {
    display: inline;
  }
}
.container {
  padding-bottom: 30px;

  .mensagem {
    margin: 30px 0;
  }
}
</style>
