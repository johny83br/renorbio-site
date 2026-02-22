<template lang="pug">
  section#intro
    .container
      .conteudo
        .titulo
          h3 Programa de
          h1 Pós-Graduação
        p
        | O Programa de Doutorado em Biotecnologia – Rede Nordeste de Biotecnologia (RENORBIO) foi credenciado pela CAPES em 2006, com conceito 5.
        | Atualmente estamos com conceito 6. A Renorbio é uma rede formada por instituições de ensino e pesquisa de todos os estados
        | da Região Nordeste e do estado do Espírito Santo, agregando cerca de 200 pesquisadores, atuantes nas diferentes áreas da Biotecnologia.
        | A primeira medida formal para integrar a Região Nordeste pela Biotecnologia ocorreu em agosto de 2003, ao ser firmado o Protocolo de Cooperação
        | entre os Secretários de Ciência e Tecnologia dos Estados do Nordeste dando o total apoio à Rede Nordeste de Biotecnologia - RENORBIO.
        | Na sequência, em 2004, foi criada a Rede Nordeste de Biotecnologia - RENORBIO, através da Portaria MCT nº 598, de 26/11/2004,
        | publicada no Diário Oficial da União em 30/11/2004, Seção I, pág. 16, definindo sua estrutura e mecanismo de operacionalização no âmbito do MCT (atual MCTIC).
        | Desta forma, o doutorado RENORBIO é fruto dessas primeiras iniciativas, sendo sua base de sustentação.

        router-link.btn.btn-custom(:to="{ name: 'Generica', params: { slug: 'introducao'} }")  Mais informações

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section#intro {
  background-color: $cor-azul-2;
}

.container {
  padding: 40px 0px;
  display: flex;
}

.titulo {
  margin-right: 30px;
  margin-bottom: 20px;
  float: left;
}

.conteudo {
  margin: 0 85px;
}

.titulo h3,
h1 {
  margin: 0;
  font-weight: bold;
}

p {
  margin: 0;
}

h3 {
  font-size: 25px;
}

h1 {
  font-size: 35px;
  color: $cor-azul-1;
}

a.btn.btn-custom {
  background-color: $cor-azul-1;
  color: $cor-branco;
  font-size: 14px;
  border: none;
  height: 30px;
  width: 165px;
  border-radius: 15px;
  //margin-top: 25px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px auto 0 auto;
}

a.btn.btn-custom:hover {
  opacity: 1;
}

@include media("<tablet") {
  .titulo {
    text-align: left !important;
  }

  .conteudo {
    text-align: left !important;
    margin: 0 15px;
    padding: 0 15px;
  }

  .conteudo p {
    padding: 0;
  }

  a.btn.btn-custom {
    margin: 25px 0 0 0;
  }

  .conteudo {
    margin: 0 !important;
  }
}

@include media("<=tablet") {
  .container {
    flex-direction: column;
  }

  .titulo,
  .conteudo {
    margin: 0 0 25px 0;
    width: 100%;
    text-align: center;
  }

  .conteudo {
    margin: 0 !important;
  }

  p {
    padding: 0 15px;
  }
}
</style>
