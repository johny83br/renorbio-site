<template lang="pug">
  pagina
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header(slot="titulo")
      titulo Cadastro de Usuário
    .conteudo(slot="principal")

      modal(name="erro")
        button(@click="$modal.hide('erro')").close
          i(class="fa fa-times" aria-hidden="true")
        .modal-conteudo
          p
            i.fa.fa-exclamation-circle(aria-hidden="true")
            | {{mensagemRetorno}}

      modal(name="sucesso")
        button(@click="$modal.hide('sucesso')").close
          i(class="fa fa-times" aria-hidden="true")
        .modal-conteudo
          p
            i.fa.fa-check-circle(aria-hidden="true")
            | {{mensagemRetorno}}

      form(v-on:submit.prevent="cadastroUsuario")

        span.categoria Identificação
        .form-group.row
          label.col-sm-2(for="nome") Nome Completo
            |
            |
            span.required *
          .col-sm-8
            input.form-control(type="text" id="nome" name="nome" v-model="dadosFormulario.nome")
            span(v-if='mensagensErro.erroNome.length > 0'): small {{ mensagensErro.erroNome }}

        .form-group.row
          label.col-sm-2(for="nascimento") Data de nascimento
          .col-sm-3
            input.form-control(type="text" id="nascimento" name="nascimento" v-model="dadosFormulario.nascimento" v-mask="'##/##/####'")
            //the-mask.form-control(:mask="'##/##/####'" id="nascimento" v-model="dadosFormulario.nascimento")
            span(v-if='mensagensErro.erroNascimento.length > 0'): small {{ mensagensErro.erroNascimento }}

        .form-group.row
          label.col-sm-2(for="identidade") Identidade (RG)
          .col-sm-2
            input.form-control(type="number" id="identidade" name="identidade" v-model="dadosFormulario.identidade")
            span(v-if='mensagensErro.erroIdentidade.length > 0'): small {{ mensagensErro.erroIdentidade }}
          label.col-sm-2.orgao(for="orgao") Órgão emissor
          .col-sm-2
            input.form-control(type="text" id="orgao" name="orgao" v-model="dadosFormulario.orgao")
            span(v-if='mensagensErro.erroOrgao.length > 0'): small {{ mensagensErro.erroOrgao }}

        .form-group.row
          label.col-sm-2(for="email") E-mail
            |
            |
            span.required *
          .col-sm-6
            input.form-control(type="text" id="email" name="email" v-model="dadosFormulario.email")
            span(v-if='mensagensErro.erroEmail.length > 0'): small {{ mensagensErro.erroEmail }}

        .form-group.row
          label.col-sm-2(for="curriculum") Curriculum Lattes
            |
            |
            span.required *
          .col-sm-6
            input.form-control(type="text" id="curriculum" name="curriculum" v-model="dadosFormulario.curriculum" placeholder="http://lattes.cnpq.br/")
            span(v-if='mensagensErro.erroCurriculum.length > 0'): small {{ mensagensErro.erroCurriculum }}

        span.categoria Endereço Residencial
        .form-group.row
          label.col-sm-2(for="endereco") Endereço
          .col-sm-8
            input.form-control(type="text" id="endereco" name="endereco" v-model="dadosFormulario.endereco")
            span(v-if='mensagensErro.erroEndereco.length > 0'): small {{ mensagensErro.erroEndereco }}

        .form-group.row
          label.col-sm-2(for="numero") Número
          .col-sm-2
            input.form-control(type="text" id="numero" name="numero" v-model="dadosFormulario.numero")
            span(v-if='mensagensErro.erroNumero.length > 0'): small {{ mensagensErro.erroNumero }}

        .form-group.row
          label.col-sm-2(for="estado") Estado
            |
            |
            span.required *
          .col-sm-4
            select.form-control(id="estado" name="estado" v-model="dadosFormulario.estado" @change="getCidades(dadosFormulario.estado)")
              option(value="")
              option(v-for="estado in estados" :value="estado.id") {{estado.name}}
            span(v-if='mensagensErro.erroEstado.length > 0'): small {{ mensagensErro.erroEstado }}

        .form-group.row
          label.col-sm-2(for="cidade") Cidade
            |
            |
            span.required *
          .col-sm-4
            select.form-control(:disabled="cidades.length == 0" id="cidade" name="cidade" v-model="dadosFormulario.cidade")
              option(value="")
              option(v-for="cidade in cidades" :value="cidade.id") {{cidade.name}}
            span(v-if='mensagensErro.erroCidade.length > 0'): small {{ mensagensErro.erroCidade }}

        .form-group.row
          label.col-sm-2(for="bairro") Bairro
          .col-sm-6
            input.form-control(type="text" id="bairro" name="bairro" v-model="dadosFormulario.bairro")
            span(v-if='mensagensErro.erroBairro.length > 0'): small {{ mensagensErro.erroBairro }}

        .form-group.row
          label.col-sm-2(for="cep") CEP
          .col-sm-3
            input.form-control(type="text" id="cep" name="cep" v-model="dadosFormulario.cep" v-mask="'##.###-###'")
            //the-mask.form-control(:mask="'##.###-###'" id="cep" v-model="dadosFormulario.cep")
            span(v-if='mensagensErro.erroCep.length > 0'): small {{ mensagensErro.erroCep }}

        span.categoria Informações do Usuário
        .form-group.row
          label.col-sm-2(for="cpf") CPF
            |
            |
            span.required *
          .col-sm-3
            input.form-control(type="text" id="cpf" name="cpf" v-model="dadosFormulario.cpf" v-mask="'###.###.###-##'")
            //the-mask.form-control(:mask="'###.###.###-##'" id="cpf" v-model="dadosFormulario.cpf")
            span(v-if='mensagensErro.erroCpf.length > 0'): small {{ mensagensErro.erroCpf }}

        .form-group.row
          label.col-sm-2(for="senha") Senha
            |
            |
            span.required *
          .col-sm-3
            input.form-control(type="password" id="senha" name="senha" v-model="dadosFormulario.senha")
            span(v-if='mensagensErro.erroSenha.length > 0'): small {{ mensagensErro.erroSenha }}

        .form-group.row
          label.col-sm-2(for="segundaSenha") Repita a senha
            |
            |
            span.required *
          .col-sm-3
            input.form-control(type="password" id="segundaSenha" name="segundaSenha" v-model="dadosFormulario.segundaSenha")
            span(v-if='mensagensErro.erroSegundaSenha.length > 0'): small {{ mensagensErro.erroSegundaSenha }}

        .form-group.row
          label.col-sm-2 Verificação
          .col-sm-4
            label.expressao {{ expressao }}
        .form-group.row
          .col-sm-4.col-sm-offset-2
            input.form-control(type="number" id="verificacao" name="verificacao" v-model="resultadoExpressao")
            span(v-if='mensagensErro.erroExpressao.length > 0'): small {{ mensagensErro.erroExpressao }}
        .form-group.row.btns
          .col-sm-offset-2
            .buttons
              button.btn.btn-custom-azul(type="submit") Enviar
              button.btn.btn-custom-branco(type="reset" v-on:click="resetForm") Limpar

      p.obs Obs.: O preenchimento dos campos
        |
        |
        span.required *
        |
        | é obrigatório.
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import InternasDescricao from "@BASICS/InternasDescricao";
import Titulo from "@BASICS/Titulo";
import Pagina from "@BASICS/Pagina";

import { mask } from "vue-the-mask";
import geraExpressao from "../../scripts/utils/geraExpressao";

import { getCidadesNovo } from "../../scripts/services/Cidades";
import { getEstados } from "../../scripts/services/Estados";
import Cadastro from "../../scripts/services/Cadastro";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    InternasDescricao,
    Titulo,
    Pagina,
  },
  directives: {
    mask,
  },
  data() {
    return {
      breadcrumb: [
        { nome: "Processo seletivo", rota: "ProcessoSeletivo" },
        { nome: "Cadastro de usuário" },
      ],
      estados: [],
      cidades: [],
      dadosFormulario: {
        nome: "",
        nascimento: "",
        identidade: "",
        orgao: "",
        email: "",
        curriculum: "",
        endereco: "",
        numero: "",
        estado: "",
        cidade: "",
        bairro: "",
        cep: "",
        cpf: "",
        senha: "",
        segundaSenha: "",
      },
      mensagensErro: {
        erroNome: "",
        erroNascimento: "",
        erroIdentidade: "",
        erroOrgao: "",
        erroEmail: "",
        erroCurriculum: "",
        erroEndereco: "",
        erroNumero: "",
        erroEstado: "",
        erroCidade: "",
        erroBairro: "",
        erroCep: "",
        erroCpf: "",
        erroSenha: "",
        erroSegundaSenha: "",
        erroExpressao: "",
      },
      mensagemRetorno: "",
      expressao: geraExpressao.gerarExpressao(),
      resultadoExpressao: "",
    };
  },
  head: {
    title() {
      return {
        inner: `${config.SITE_TITLE} - Cadastro`,
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
  mounted() {
    this.getEstados();
  },
  methods: {
    resetForm() {
      this.dadosFormulario.nome = "";
      this.dadosFormulario.nascimento = "";
      this.dadosFormulario.identidade = "";
      this.dadosFormulario.orgao = "";
      this.dadosFormulario.email = "";
      this.dadosFormulario.curriculum = "";
      this.dadosFormulario.endereco = "";
      this.dadosFormulario.numero = "";
      this.dadosFormulario.estado = "";
      this.dadosFormulario.cidade = "";
      this.dadosFormulario.bairro = "";
      this.dadosFormulario.cep = "";
      this.dadosFormulario.cpf = "";
      this.dadosFormulario.senha = "";
      this.dadosFormulario.segundaSenha = "";
      this.resultadoExpressao = "";

      this.mensagensErro.erroNome = "";
      this.mensagensErro.erroNascimento = "";
      this.mensagensErro.erroIdentidade = "";
      this.mensagensErro.erroOrgao = "";
      this.mensagensErro.erroEmail = "";
      this.mensagensErro.erroCurriculum = "";
      this.mensagensErro.erroEndereco = "";
      this.mensagensErro.erroNumero = "";
      this.mensagensErro.erroEstado = "";
      this.mensagensErro.erroCidade = "";
      this.mensagensErro.erroBairro = "";
      this.mensagensErro.erroCep = "";
      this.mensagensErro.erroCpf = "";
      this.mensagensErro.erroSenha = "";
      this.mensagensErro.erroSegundaSenha = "";
      this.mensagensErro.erroExpressao = "";
    },
    atualizarMensagem(message) {
      this.mensagemRetorno = message;
    },
    validaFormulario() {
      let status = true;
      // let erEmail = /^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/
      const erEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const erNascimento =
        /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
      const erCpf = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/;

      if (this.dadosFormulario.nome === "") {
        this.mensagensErro.erroNome = "Informe seu nome";
        status = false;
      } else {
        this.mensagensErro.erroNome = "";
      }

      // if (this.dadosFormulario.nascimento === '') {
      //   this.mensagensErro.erroNascimento = 'Informe sua data de nascimento'
      //   status = false
      // } else if (!erData.exec(this.dadosFormulario.nascimento)) {
      //    this.mensagensErro.erroNascimento = 'A data de nascimento precisa ser válida'
      //    status = false
      // } else {
      //   this.mensagensErro.erroNascimento = ''
      // }

      if (this.dadosFormulario.nascimento !== "") {
        if (!erNascimento.exec(this.dadosFormulario.nascimento)) {
          this.mensagensErro.erroNascimento =
            "A data de nascimento precisa ser válida";
          status = false;
        } else {
          this.mensagensErro.erroNascimento = "";
        }
      }

      // if (this.dadosFormulario.identidade === '') {
      //   this.mensagensErro.erroIdentidade = 'Informe o seu RG'
      //   status = false
      // } else {
      //   this.mensagensErro.erroIdentidade = ''
      // }

      // if (this.dadosFormulario.orgao === '') {
      //   this.mensagensErro.erroOrgao = 'Informe o órgão emissor'
      //   status = false
      // } else {
      //   this.mensagensErro.erroOrgao = ''
      // }

      if (this.dadosFormulario.email === "") {
        this.mensagensErro.erroEmail = "Informe seu e-mail";
        status = false;
      } else if (!erEmail.exec(this.dadosFormulario.email)) {
        this.mensagensErro.erroEmail = "O campo e-mail precisa ser válido";
        status = false;
      } else {
        this.mensagensErro.erroEmail = "";
      }

      if (this.dadosFormulario.curriculum === "") {
        this.mensagensErro.erroCurriculum = "Informe o seu curriculum";
        status = false;
      } else if (this.dadosFormulario.curriculum !== "") {
        const curriculumTratado = this.dadosFormulario.curriculum.substring(
          0,
          22,
        );
        if (curriculumTratado !== "http://lattes.cnpq.br/") {
          this.mensagensErro.erroCurriculum =
            'Link inválido, deve ser no formato "http://lattes.cnpq.br/..."';
          status = false;
        } else {
          this.mensagensErro.erroCurriculum = "";
        }
      } else {
        this.mensagensErro.erroCurriculum = "";
      }

      // if (this.dadosFormulario.endereco === '') {
      //   this.mensagensErro.erroEndereco = 'Informe o seu endereço'
      //   status = false
      // } else {
      //   this.mensagensErro.erroEndereco = ''
      // }

      // if (this.dadosFormulario.numero === '') {
      //   this.mensagensErro.erroNumero = 'Informe o número'
      //   status = false
      // } else {
      //   this.mensagensErro.erroNumero = ''
      // }

      if (this.dadosFormulario.estado === "") {
        this.mensagensErro.erroEstado = "Informe o seu estado";
        status = false;
      } else {
        this.mensagensErro.erroEstado = "";
      }

      if (this.dadosFormulario.cidade === "") {
        this.mensagensErro.erroCidade = "Informe a sua cidade";
        status = false;
      } else {
        this.mensagensErro.erroCidade = "";
      }

      // if (this.dadosFormulario.bairro === '') {
      //   this.mensagensErro.erroBairro = 'Informe o seu bairro'
      //   status = false
      // } else {
      //   this.mensagensErro.erroBairro = ''
      // }

      // if (this.dadosFormulario.cep === '') {
      //   this.mensagensErro.erroCep = 'Informe o seu CEP'
      //   status = false
      // } else {
      //   this.mensagensErro.erroCep = ''
      // }

      if (this.dadosFormulario.cep !== "") {
        if (this.dadosFormulario.cep.length !== 10) {
          this.mensagensErro.erroCep = "Informe um CEP válido";
          status = false;
        } else {
          this.mensagensErro.erroCep = "";
        }
      }

      if (this.dadosFormulario.cpf === "") {
        this.mensagensErro.erroCpf = "Informe o seu CPF";
        status = false;
      } else if (
        !erCpf.exec(this.dadosFormulario.cpf) ||
        this.dadosFormulario.cpf === "111.111.111-11" ||
        this.dadosFormulario.cpf === "222.222.222-22" ||
        this.dadosFormulario.cpf === "333.333.333-33" ||
        this.dadosFormulario.cpf === "444.444.444-44" ||
        this.dadosFormulario.cpf === "555.555.555-55" ||
        this.dadosFormulario.cpf === "666.666.666-66" ||
        this.dadosFormulario.cpf === "777.777.777-77" ||
        this.dadosFormulario.cpf === "888.888.888-88" ||
        this.dadosFormulario.cpf === "999.999.999-99" ||
        this.dadosFormulario.cpf === "000.000.000-00"
      ) {
        this.mensagensErro.erroCpf = "Informe um CPF válido";
        status = false;
      } else {
        this.mensagensErro.erroCpf = "";
      }

      if (this.dadosFormulario.senha === "") {
        this.mensagensErro.erroSenha = "Informe a sua senha";
        status = false;
      } else {
        this.mensagensErro.erroSenha = "";
      }

      if (this.dadosFormulario.segundaSenha === "") {
        this.mensagensErro.erroSegundaSenha = "Repita a senha";
        status = false;
      } else if (
        this.dadosFormulario.segundaSenha !== this.dadosFormulario.senha
      ) {
        this.mensagensErro.erroSegundaSenha = "A senha repetida está errada";
        status = false;
      } else {
        this.mensagensErro.erroSegundaSenha = "";
      }

      if (
        !geraExpressao.validarExpressao(this.expressao, this.resultadoExpressao)
      ) {
        this.mensagensErro.erroExpressao =
          "O resultado da expressão não está correto";
        status = false;
      } else {
        this.mensagensErro.erroExpressao = "";
      }
      return status;
    },
    cadastroUsuario() {
      if (this.validaFormulario()) {
        Cadastro.postCadastro(this.dadosFormulario).then(response => {
          if (response.body.data.valid) {
            this.atualizarMensagem(response.body.data.msg);
            this.$modal.show("sucesso");
            this.resetForm();
          } else {
            this.atualizarMensagem(response.body.data.msg);
            this.$modal.show("erro");
          }
        });
      }
    },
    async getEstados() {
      const estados = await getEstados();

      Object.entries(estados).forEach(v => {
        const i = v[0];
        this.estados.push(estados[i]);
      });
    },
    async getCidades(id) {
      this.cidades = [];

      const cidades = await getCidadesNovo(id);

      Object.entries(cidades).forEach(v => {
        this.cidades.push(v[1]);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v--modal-box.v--modal {
  width: auto !important;
  max-width: 450px !important;
  height: 180px !important;
  border-radius: 20px;
  left: 0 !important;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    position: absolute;
    right: 15px;
    top: 10px;
  }
}

.v--modal-box.v--modal p {
  line-height: 15px;
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: normal;
}

.fa-exclamation-circle {
  color: $cor-vermelho;
  margin-right: 10px;
  font-size: 25px;
}

.fa-check-circle {
  color: $cor-verde;
  margin-right: 10px;
  font-size: 25px;
}

@include media("<tablet") {
  .v--modal-box.v--modal {
    max-width: 90% !important;
  }

  .modal-conteudo {
    padding: 0 20px;
  }
}
p {
  font-weight: bold;
}

span.categoria {
  text-transform: uppercase;
  display: inline-block;
  margin: 20px 0;
}

form {
  margin-top: 20px;
}

.form-control {
  color: $cor-azul-1;
}

label {
  font-weight: normal;
}

.orgao {
  padding: 0;
  padding-left: 30px;
  text-align: right;
}

label.expressao {
  width: 100%;
  border: 2px solid $cor-azul-4;
  height: 35px;
  border-radius: 4px;
  padding: 6px 10px;
}

input,
textarea,
select {
  background-color: $cor-azul-2;
  border: none;
}

input::placeholder {
  color: $cor-cinza;
}

.form-group.row.btns {
  margin-bottom: 0px;
}

button.btn.btn-custom-azul,
button.btn.btn-custom-branco {
  width: 120px;
  height: 30px;
  border-radius: 15px;
  padding: 5px 0;
  margin: 0px 10px;
}

button.btn.btn-custom-azul {
  background-color: $cor-azul-1;
  color: $cor-branco;
}

button.btn.btn-custom-branco {
  background-color: $cor-branco;
  color: $cor-azul-1;
  border: 1px solid $cor-azul-1;
}

button.btn.btn-custom-azul:hover,
button.btn.btn-custom-branco:hover {
  background-color: $cor-azul-3;
  border: 1px solid $cor-azul-3;
  color: $cor-branco;
}

small {
  font-size: 10px;
  color: $cor-vermelho;
}

span.required {
  color: $cor-vermelho;
}

p.obs {
  margin-top: 20px;
  margin-bottom: 0px;
}

@include media("<tablet") {
  .orgao {
    margin-top: 10px;
    padding: 0 15px;
  }

  .buttons {
    display: flex;
    justify-content: center;
  }

  button.btn.btn-custom-azul,
  button.btn.btn-custom-branco {
    margin-top: 15px;
  }
}
</style>
