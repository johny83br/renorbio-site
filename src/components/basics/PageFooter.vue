<template lang="pug">
  footer#footer
    .container.rodape
      .rodape-esq
        router-link(:to='{ name: "Index" , params: {}}')
          img(src=`${process.env.PUBLIC_PATH}renorbio.logo-topo-interno_rodape.png` alt="logomarca da renorbio" title="Ir para página inicial")
        p
          | Programa de Pós-Graduação em Biotecnologia –
          br
          | RENORBIO
          br
          | UNIVERSIDADE FEDERAL DA PARAÍBA
          br
          | Centro de Biotecnologia
          br
          | Cidade Universitária, Campus I. CEP 58051-900.
          br
          | João Pessoa, PB. Brasil.
      .rodape-centro
        .telefone
          i.fa.fa-phone
          a(href="tel:+558332167366" title="Ligar para:") +55 (83) 32167366
        .email
          i.fa.fa-envelope
          a(href="mailto:renorbiopb.cg@cbiotec.ufpb.br"  title="Enviar e-mail para:") renorbiopb.cg@cbiotec.ufpb.br
                .email
          i.fa.fa-envelope
          a(href="mailto:secrenorbio.cg@cbiotec.ufpb.br"  title="Enviar e-mail para:") secrenorbio.cg@cbiotec.ufpb.br
        .facebook
          a(href='https://www.facebook.com/Doutorado-em-Biotecnologia-Renorbio-254004538887724/' target='_blank' title='Acessar página do'  rel="noopener noreferrer")
            i.fa.fa-facebook-official
            | Facebook
        .instagram
          a(href='https://www.instagram.com/renorbio/' target='_blank' title='Acessar perfil do'  rel="noopener noreferrer")
            i.fa.fa-instagram
            | Instagram
        .linkedin
          a(href='https://www.linkedin.com/in/rede-nordeste-biotecnologia-a74880205/' target='_blank' title='Acessar página do'  rel="noopener noreferrer")
            i.fa.fa-linkedin
            | Linkedin

    .container.rodape-sinfo
      a(href='http://info.ufrn.br/' target='_blank' noopener title="Ir para o site da Superintendência de Tecnologia da Informação da UFRN") Desenvolvido pela STI/UFRN
</template>

<script>
export default {
  name: "SiteFooter",
  methods: {
    backTop: () => {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss">
footer#footer {
  background-color: $cor-azul-1;
  color: $cor-branco;
}

.container.rodape {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
}

.rodape-esq {
  margin-top: 24px;
  width: 40%;
}

.rodape-esq img {
  margin-bottom: 20px;
}

.rodape-centro {
  display: flex;
  flex-direction: column;
  margin-top: 38px;
}

.rodape-centro a {
  color: $cor-branco !important;
}

.telefone,
.email,
.facebook,
.instagram,
.linkedin {
  margin-bottom: 5px;
}

i.fa.fa-phone,
i.fa.fa-envelope,
i.fa-facebook-official,
i.fa-instagram,
i.fa-linkedin {
  margin-right: 10px;
}

.fa-facebook-official,
.fa-instagram,
.fa-linkedin {
  font-size: 16px;
}

.rodape-sinfo {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 15px;
}

.rodape-sinfo a {
  color: rgba(255, 255, 255, 0.5) !important;
  text-decoration: none;
  font-size: 14px;
  margin-top: 5px;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

@include media("<tablet") {
  .container.rodape {
    flex-direction: column;
  }

  .rodape-esq {
    margin-top: 15px;
  }

  .rodape-esq,
  .rodape-centro {
    width: 100%;
  }

  .rodape-sinfo {
    margin-top: 45px;
    padding-bottom: 20px;
  }
}

@include media("<=tablet") {
  .rodape-centro {
    margin-top: 25px;
  }
}
</style>
