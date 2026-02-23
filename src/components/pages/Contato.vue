<template lang="pug">
  pagina
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header(slot="titulo")
      titulo Contato
      internas-descricao Obs.: O preenchimento de todos os campos é obrigatório.
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
      form(v-on:submit.prevent="enviaEmail")
        .form-group.row
          label.col-sm-2(for="nome") Nome Completo
          .col-sm-8
            input.form-control(type="text" id="nome" name="nome" v-model="dadosFormulario.nome")
            span(v-if='mensagensErro.erroNome.length > 0'): small {{ mensagensErro.erroNome }}
        .form-group.row
          label.col-sm-2(for="email") Email
          .col-sm-6
            input.form-control(type="text" id="email" name="email" v-model="dadosFormulario.email")
            span(v-if='mensagensErro.erroEmail.length > 0'): small {{ mensagensErro.erroEmail }}
        .form-group.row
          label.col-sm-2(for="setor") Setor/Destinatário
          .col-sm-6
            select.form-control(id="setor" name="setor" v-model="dadosFormulario.setor")
              option(value="")
              option(value="UFAL") Universidade Federal de Alagoas
              option(value="UFBA") Universidade Federal da Bahia
              option(value="UECE") Universidade Estadual do Ceará
              option(value="UFC") Universidade Federal do Ceará
              option(value="UFES") Universidade Federal do Espírito Santo
              option(value="UFMA") Universidade Federal do Maranhão
              option(value="UFPB") Universidade Federal da Paraíba
              option(value="UFRPE") Universidade Federal Rural de Pernambuco
              option(value="UFPE") Universidade Federal de Pernambuco
              option(value="UFPI") Universidade Federal do Piauí
              option(value="UFRN") Universidade Federal do Rio Grande do Norte
              option(value="UFSE") Universidade Federal de Sergipe
              option(value="UNIT") UNIT - Universidade de Tiradentes
            span(v-if='mensagensErro.erroSetor.length > 0'): small {{ mensagensErro.erroSetor }}
        .form-group.row
          label.col-sm-2(for="assunto") Assunto
          .col-sm-6
            input.form-control(type="text" id="assunto" name="assunto" v-model="dadosFormulario.assunto")
            span(v-if='mensagensErro.erroAssunto.length > 0'): small {{ mensagensErro.erroAssunto }}
        .form-group.row
          label.col-sm-2(for="mensagem") Mensagem
          .col-sm-8
            textarea.form-control(type="text" rows="10" name="mensagem" id="mensagem" v-model="dadosFormulario.mensagem")
            span(v-if='mensagensErro.erroMensagem.length > 0'): small {{ mensagensErro.erroMensagem }}
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
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import InternasDescricao from "@BASICS/InternasDescricao";
import Titulo from "@BASICS/Titulo";
import Pagina from "@BASICS/Pagina";
import ModalGenerico from "@BASICS/ModalGenerico";

import geraExpressao from "../../scripts/utils/geraExpressao";
import EmailService from "../../scripts/services/EmailService";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    InternasDescricao,
    Titulo,
    Pagina,
    ModalGenerico,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Contato" }],
      statusEnvio: 0, // 0: aguardando - 1: erro - 2: sucesso,
      dadosFormulario: {
        nome: "",
        email: "",
        setor: "",
        assunto: "",
        mensagem: "",
      },
      mensagensErro: {
        erroNome: "",
        erroEmail: "",
        erroSetor: "",
        erroAssunto: "",
        erroMensagem: "",
        erroExpressao: "",
      },
      mensagemRetorno: "",
      expressao: geraExpressao.gerarExpressao(),
      resultadoExpressao: "",
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
  methods: {
    resetForm() {
      this.dadosFormulario.nome = "";
      this.dadosFormulario.email = "";
      this.dadosFormulario.setor = "";
      this.dadosFormulario.assunto = "";
      this.dadosFormulario.mensagem = "";
      this.resultadoExpressao = "";

      this.mensagensErro.erroNome = "";
      this.mensagensErro.erroEmail = "";
      this.mensagensErro.erroSetor = "";
      this.mensagensErro.erroAssunto = "";
      this.mensagensErro.erroMensagem = "";
      this.mensagensErro.erroExpressao = "";
    },
    atualizarMensagem(message) {
      this.mensagemRetorno = message;
    },
    validaFormulario() {
      let status = true;
      const erEmail =
        /^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/;
      if (this.dadosFormulario.nome === "") {
        this.mensagensErro.erroNome = "Informe seu nome";
        status = false;
      } else {
        this.mensagensErro.erroNome = "";
      }
      if (this.dadosFormulario.email === "") {
        this.mensagensErro.erroEmail = "Informe seu e-mail";
        status = false;
      } else if (!erEmail.exec(this.dadosFormulario.email)) {
        this.mensagensErro.erroEmail = "O campo e-mail precisa ser válido";
        status = false;
      } else {
        this.mensagensErro.erroEmail = "";
      }
      if (this.dadosFormulario.setor === "") {
        this.mensagensErro.erroSetor = "Informe o setor";
        status = false;
      } else {
        this.mensagensErro.erroSetor = "";
      }
      if (this.dadosFormulario.assunto === "") {
        this.mensagensErro.erroAssunto = "Informe o assunto";
        status = false;
      } else {
        this.mensagensErro.erroAssunto = "";
      }
      if (this.dadosFormulario.mensagem === "") {
        this.mensagensErro.erroMensagem = "Digite sua mensagem";
        status = false;
      } else {
        this.mensagensErro.erroMensagem = "";
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
    enviaEmail() {
      if (this.validaFormulario()) {
        EmailService.enviaEmail(this.dadosFormulario).then(response => {
          if (response.status === "success") {
            this.$modal.show("sucesso");
            this.atualizarMensagem(response.message);
            this.resetForm();
          } else {
            this.$modal.show("erro");
            this.atualizarMensagem(response.message);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-weight: bold;
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

label.expressao {
  width: 100%;
  border: 2px solid $cor-azul-4;
  height: 35px;
  border-radius: 4px;
  padding: 6px 10px;
}

input,
textarea,
select#setor {
  background-color: $cor-azul-2;
  border: none;
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

@include media("<tablet") {
  .buttons {
    display: flex;
    justify-content: center;
  }

  button.btn.btn-custom-azul,
  button.btn.btn-custom-branco {
    margin-top: 15px;
  }
}

.v--modal-box.v--modal {
  width: auto !important;
  max-width: 450px !important;
  // height: 180px !important;
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

.modal-conteudo {
  padding: 0 75px;
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
</style>
