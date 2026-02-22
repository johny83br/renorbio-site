<template lang="pug">
  nav.header
    #header(:class="{'remove-img-background' : menuMobile}" v-click-outside="closeMenuMobile")
      .container(:class="{'container-mobileOrTablet' : isMobileOrTablet}")
        .barraSuperior
          .menu(v-if="isMobileOrTablet")
            a(:tabindex="tab+2") #[i.link(aria-hidden="true" @click="toggleMenuMobile" :class="{'barras-menu' : !menuMobile, 'close-menu' : menuMobile}")]
          .menu(v-else-if="internal")
            router-link(:to="{ name: 'Index' }" :tabindex="1")
              img(src=`${process.env.PUBLIC_PATH}renorbio.logo-topo-interno_rodape.png` width="180px" alt="Logomarca da Renorbio" title="Ir para página inicial")
          .menu(v-else)
          .opcoes(v-show="!menuMobile")
            a(:href="acessoConta" target="_blank" :tabindex="tab+3").icone-acesso-conta.link
              i.fa.fa-sign-in(aria-hiden="true" title="Acessar sistema acadêmico" alt="Acessar sistema acadêmico")
              span(v-show="!isMobileOrTablet")
                | Acessar minha conta
            .busca(v-if="!isMobileOrTablet", :class="{'ativa' : !showInput}")
              form(:action="baseUrl + '/busca'")
                input(v-if="showInput", type="text" placeholder="Pesquisar", name="s")
                router-link(:to="{ name: '' }" :tabindex="tab+4", @click.native="toggleSearchInput") #[i.fa.fa-search.link(aria-hidden="true" title="Ir para página de busca")]
            a(v-else, :href="baseUrl + 'busca'", :tabindex="tab+4", @click="toggleSearchInput") #[i.fa.fa-search.link(aria-hidden="true" title="Ir para página de busca")]
            router-link(:to="{ name: 'MapaDoSite' }" :tabindex="tab+5") #[i.fa.fa-sitemap.link(aria-hiden="true" alt="Ver mapa do site" title="Ver mapa do site")]
            menu-idiomas(:langs="langsMenu" langVersao="PT" :tab="tab+6")
        .logo(v-show="logoCentral" :class="{logoMobile : mobile, logoTablet : tablet}")
          router-link(:to="{ name: 'Index' }" :tabindex="1")
            img(src=`${process.env.PUBLIC_PATH}desktop.logo-renorbio-rodape.png` title="Ir para a página inicial" alt="Logomarca da Renorbio")
        menu-nav-header(v-show="!isMobileOrTablet" :isDesktopMenu="true" :tab="tab+7")
      transition(name="toggleMenu")
        menu-nav-header(v-show="menuMobile" :isDesktopMenu="false" :tab="tab+8")
</template>

<script>
import MenuIdiomas from "@BASICS/MenuIdiomas";
import MenuNavHeader from "@BASICS/MenuNavHeader";
import { bus } from "../../main";

import * as urls from "../../scripts/config";

export default {
  name: "SiteHeader",
  components: { MenuIdiomas, MenuNavHeader },
  props: {
    tab: {
      type: Number,
      default: 1,
    },
    mobile: {
      type: Boolean,
      default: true,
    },
    tablet: {
      type: Boolean,
      default: false,
    },
    desktop: {
      type: Boolean,
      default: false,
    },
    internal: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      menuMobileIsOpened: false,
      acessoConta: urls.LOGIN,
      showInput: false,
      baseUrl: urls.URL_BASE,
    };
  },
  computed: {
    isMobileOrTablet() {
      return this.mobile || this.tablet;
    },
    logoCentral() {
      return (
        (!this.internal || this.isMobileOrTablet) &&
        (!this.menuMobileIsOpened || !this.isMobileOrTablet)
      );
    },
    langsMenu: () => [
      { sigla: "PT", descricao: "Versão Português" },
      { sigla: "EN", descricao: "Versão Inglês" },
      { sigla: "ES", descricao: "Versão Espanhol" },
    ],
    menuMobile() {
      return this.menuMobileIsOpened && this.isMobileOrTablet;
    },
  },
  created() {
    bus.$on("toggleRouter", data => {
      if (data) {
        this.menuMobileIsOpened = false;
      }
    });
  },
  methods: {
    toggleMenuMobile() {
      this.menuMobileIsOpened = !this.menuMobileIsOpened;
      bus.$emit("toggleMenuPrincipal", () => true);
    },
    closeMenuMobile() {
      this.menuMobileIsOpened = false;
    },
    toggleSearchInput() {
      this.showInput = !this.showInput;
    },
  },
};
</script>

<style lang="scss" scoped>
nav.header {
  background: url("../../../public/renorbio.imagem-topo.png") no-repeat center
    top;
  background-size: cover;
}

.link {
  &:hover {
    opacity: 0.8;
    text-decoration: none;
  }
}

.barras-menu {
  cursor: pointer;

  &:after {
    content: "\f0c9";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    position: absolute;
    font-size: 20px;
    color: $cor-branco;
  }
}

.close-menu {
  cursor: pointer;

  &:after {
    content: "\f00d";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    position: absolute;
    font-size: 22px;
    color: $cor-branco;
  }
}

#header.remove-img-background {
  background: $cor-azul-1;
}

#header {
  background: rgba(36, 40, 82, 0.517); //$cor-azul-1 80%;
  display: flex;
  flex-flow: column;

  i.fa {
    color: $cor-branco;
    font-size: 16px;
    cursor: pointer;
  }

  .barraSuperior {
    color: $cor-branco;
    width: 100%;
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;

    > div {
      height: 60px;
    }

    .icone-acesso-conta {
      > span {
        color: $cor-branco;
        margin-left: 5px;
        cursor: pointer;
      }
      &:focus {
        text-decoration: none;
      }
    }
    .menu {
      width: 20%;
      padding: 20px 0;
      align-self: flex-start;

      img {
        cursor: pointer;
      }
    }

    .opcoes {
      padding: 20px 0;
      width: 80%;
      text-align: right;
      align-self: flex-end;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      > a {
        margin-left: 20px;
      }

      .busca {
        &.ativa {
          margin-left: 20px;
        }

        input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          font-style: italic;
          color: #fff;
          position: relative;
          left: 20px;
          width: 155px;
          padding: 0 35px 0 5px;

          &::placeholder {
            color: #fff;
          }
        }

        a {
          position: relative;
        }
      }
    }
  }

  .logo {
    margin-top: -20px;
    display: flex;
    justify-content: center;
    a {
      cursor: pointer;
    }
  }
}
.container-mobileOrTablet {
  width: 100%;
}
.logoMobile {
  margin-bottom: 20px;
  img {
    cursor: pointer;
    width: 200px;
  }
}
.logoTablet {
  margin-top: 0px;
  margin-bottom: 35px;
  img {
    cursor: pointer;
  }
}
</style>
