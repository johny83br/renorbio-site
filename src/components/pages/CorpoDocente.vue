<template lang="pug">
  .container.docentes
    breadcrumb(:itens="breadcrumb")
    titulo Corpo Docente
    .coordenacao
      p.coordenador
        strong Coordenador geral:
        |  Prof. Dr. Demetrius Antonio Machado de Araújo,
        a(href="mailto:demetrius@cbiotec.ufpb.br") demetrius@cbiotec.ufpb.br
        | (UFPB)
      p.coordenador
        strong Vice-coordenador geral:
        |  Prof. Dr. Enéas Ricardo de Moraes Goes,
        a(href="mailto:eneasricardo@cbiotec.ufpb.br") eneasricardo@cbiotec.ufpb.br
        | (UFPB)
      p.coordenador
        strong Secretária executiva:
        |  Profa. Dra. Maria Aparecida Maciel,
        a(href="mailto:mammaciel@hotmail.com") mammaciel@hotmail.com
        | (UFRN)
    .select
      .busca-docente
        .label-select Buscar por:
        .select-input
          .div
            input.form-control(type="text" placeholder="Palavra chave" v-model="input" @keypress.enter="handleInput('')")
            small(v-if="invalidInput") Insira no mínimo 3 caracteres
          button.btn.btn-custom-azul(type="submit" @click="handleInput('')") Buscar
      hr
      busca-feedback(v-if="search", :feedback="search")
      .busca-docente(v-if="!empty")
        .label-select Filtrar por:
        .select-input
          select-input(name="tipo-colaborador" v-model="filter" :itens="optionsInput" :tab="20" :key="searchKey" :type="'docentes'")
    .div(v-if="!empty")
      lista(:itens="listaFiltrada")
      p.ponto-focal(v-for="estado in estados")
        | {{estado.point}}
        span.nome(v-for="nome in estado.teachers")
          a(tabindex="0" @click="show(estado.point, nome)", @keyup.enter="show(estado.point, nome)") {{nome.name}}
          modal-generico(v-if="modal == nome.name" :titulo="'DADOS GERAIS'" :dados="dados")
    template(v-else)
      mensagem.-warn
        p Nenhum docente foi encontrado no momento
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import Lista from "@BASICS/Lista";
import SelectInput from "@BASICS/SelectInput";
import ModalGenerico from "@BASICS/ModalGenerico";
import BuscaFeedback from "@BASICS/BuscaFeedback";
import Mensagem from "@BASICS/Mensagem";

import * as config from "../../scripts/config";

import { getTeachers, searchTeacher } from "../../scripts/services/Teachers";

import { EventBus } from "../../scripts/utils/EventBus";

export default {
  components: {
    Breadcrumb,
    Titulo,
    Lista,
    SelectInput,
    ModalGenerico,
    BuscaFeedback,
    Mensagem,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Renorbio" }, { nome: "Corpo Docente" }],
      id: "",
      estados: [],
      filter: "",
      optionsInput: {},
      listaItens: [],
      listaDocentes: [],
      listaDocentesPorPontoFocal: "",
      listaFiltrada: [],
      modal: "",
      dados: "",
      docenteName: 0,
      input: "",
      search: false,
      empty: false,
      showInput: true,
      invalidInput: false,
      searchKey: "",
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
      if (data.name === this.optionsInput[0].name) {
        data.key = "all";
        if (!this.search) this.getTeachers(data.key);
        else this.handleInput(data.key);
      } else if (data.name === this.optionsInput[1].name) {
        data.key = 2;
        if (!this.search) this.getTeachers(data.key);
        else this.handleInput(data.key);
      } else if (data.name === this.optionsInput[2].name) {
        data.key = 7;
        if (!this.search) this.getTeachers(data.key);
        else this.handleInput(data.key);
      }
      if (data.name !== this.optionsInput.todos && data.name !== "") {
        this.listaFiltrada = this.ordenarPorPF(
          window._.filter(this.listaItens, iten => iten.tipo === data.name),
        );
      } else {
        this.listaFiltrada = this.ordenarPorPF(this.listaDocentes);
      }
    },
  },
  created() {
    this.getAll();
    let uf = {
      key: "all",
      name: "Mostrar todos",
    };
    this.optionsInput[0] = uf;
    uf = {
      key: 2,
      name: "Colaborador",
    };
    this.optionsInput[1] = uf;
    uf = {
      key: 7,
      name: "Permanente",
    };
    this.optionsInput[2] = uf;

    EventBus.$on("closeModal", () => {
      this.closeModal();
    });
  },
  methods: {
    ordenarPorPF(itens) {
      const listaFiltrada = [];
      const thisGlobal = this;
      const obj = window._.groupBy(itens, "ponto-focal");
      Object.keys(obj).forEach(key => {
        listaFiltrada.push({ name: key, subitens: [] });
        obj[key].forEach(value => {
          listaFiltrada[listaFiltrada.length - 1].subitens.push(value.nome);
        });
        listaFiltrada[listaFiltrada.length - 1].subitens = thisGlobal.ordenaAsc(
          listaFiltrada[listaFiltrada.length - 1].subitens,
        );
      });
      return window._.orderBy(listaFiltrada, ["name"], ["asc"]);
    },
    ordenaAsc(itens) {
      return window._.orderBy(itens, String, ["asc"]);
    },
    async getTeachers(id) {
      const teachersTratados = [];

      const teachers = await getTeachers(id);

      Object.entries(teachers).forEach(v => {
        const i = v[0];
        const teacherTratado = {
          point: teachers[i].nucleator,
          teachers: teachers[i].teachers,
        };
        teacherTratado.teachers = window._.orderBy(
          teacherTratado.teachers,
          ["name"],
          ["asc"],
        );
        teachersTratados.push(teacherTratado);
      });

      this.estados = teachersTratados;
    },
    async getAll() {
      const teachersTratados = [];

      const teachers = await getTeachers("all");

      Object.entries(teachers).forEach(v => {
        const i = v[0];

        const teacherTratado = {
          name: teachers[i].nucleator,
          subitens: teachers[i].teachers,
        };
        teacherTratado.subitens = window._.orderBy(
          teacherTratado.subitens,
          ["name"],
          ["asc"],
        );
        this.listaFiltrada.push(teacherTratado);
        this.listaItens.push(teacherTratado);
      });

      this.estados = teachersTratados;
    },
    async setTeachers(teachers) {
      this.listaFiltrada = [];
      this.listaItens = [];
      this.estados = [];

      Object.entries(teachers).forEach(v => {
        const i = v[0];
        const teacherTratado = {
          name: teachers[i].nucleator,
          subitens: teachers[i].teachers,
        };
        teacherTratado.subitens = window._.orderBy(
          teacherTratado.subitens,
          ["name"],
          ["asc"],
        );
        this.listaFiltrada.push(teacherTratado);
      });
    },
    show(estado, docente) {
      this.modal = docente.name;
      const dictionary = [
        ["Nome", docente.name, "string"],
        ["Instituição", estado, "string"],
        ["E-mail", docente.email, "email"],
        ["Área de concentração", docente.areas, "array"],
        ["Área de atuação", docente.occupation_area, "string"],
        ["Serviços", docente.services, "array"],
        ["Lattes", docente.lattes, "link"],
        ["Laboratórios", docente.laboratories, "links", "Laboratorios"],
      ];
      this.dados = dictionary;
    },
    closeModal() {
      this.modal = false;
    },
    async handleInput(key) {
      this.showInput = false;
      if (this.input.length >= 1 && this.input.length <= 2) {
        this.invalidInput = true;
        // this.search = false
        this.showInput = true;
      } else if (this.input === "") {
        this.listaFiltrada = [];
        this.listaItens = [];
        this.estados = [];
        this.empty = false;
        this.search = false;
        this.showInput = true;
        this.invalidInput = false;
        this.searchKey = this.input;
        this.getAll();
      } else {
        try {
          const {
            data: { registers },
          } = await searchTeacher(key, this.input);
          this.setTeachers(registers);
          this.search = this.input;
          this.searchKey = this.input;
        } catch (err) {
          // console.log(err);
          this.search =
            "Ocorreu um erro durante a busca, por favor tente mais tarde.";
        } finally {
          if (this.listaFiltrada.length === 0) this.empty = true;
          else this.empty = false;
          this.showInput = true;
          this.invalidInput = false;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.label-select {
  padding: 6px 0;
  padding-right: 10px;
  width: 150px;
  @media screen and (max-width: 425px) {
    width: 100%;
  }
}

.coordenacao {
  margin: 20px 0 30px 0;

  p.coordenador {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.5;

    strong {
      color: $cor-azul-1;
    }

    a {
      color: $cor-azul-3;
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }
}
.select {
  display: flex;
  flex-direction: column;

  hr {
    width: 100%;
    border-color: $cor-azul-4;
  }

  .busca-docente {
    display: flex;

    @include media("<tablet") {
      flex-direction: column;
    }
  }

  .select-input {
    display: flex;

    @include media("<611px") {
      flex-direction: column;
    }

    input {
      background-color: $cor-azul-2;
      border: none;
      color: $cor-azul-1;
      height: 31px;
      width: 230px;
      @include media("<611px") {
        width: 100%;
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
      margin: 0px 20px;
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
        margin: 25px auto 10px auto;
      }
    }
  }
}

.container.docentes {
  padding-bottom: 30px;

  small {
    color: $cor-vermelho;
    margin-top: 5px;
    display: block;
  }

  .mensagem {
    margin: 30px 0;
  }
}

p.ponto-focal {
  color: $cor-azul-1;
  // text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}

.ponto-focal span.nome {
  display: block;
  margin-top: 5px;
}

.ponto-focal .nome a {
  color: $cor-cinza;
  font-size: 14px;
  text-transform: none;
  font-weight: normal;
  cursor: pointer;
}

.ponto-focal .nome a:hover,
.ponto-focal .nome a:focus {
  color: $cor-azul-1;
}
</style>
