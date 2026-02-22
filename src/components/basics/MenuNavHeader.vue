<template lang="pug">
  #menuNav(@click="toggleMenuPrincipal")
    ul(:class="{'-desktop' : isDesktopMenu, '-mobileOrTablet' : !isDesktopMenu}")
      li
        a.link(@click="toggleSubmenu1" @keyup.enter="toggleSubmenu1" v-click-outside="closeSubMenu1" :tabindex="tab").
          Renorbio #[i.fa.fa-caret-down(aria-hidden="true")]
        transition(name="fademenu")
          .sub-menu(v-show="submenu1IsOpened")
            router-link.link(:to="{ name: 'Generica', params: { slug: 'o-que-e-biotecnologia', id: 1} }" :tabindex="tab") Sobre a Rede
            router-link.link(:to="{ name: 'CorpoDocente' }" :tabindex="tab") Corpo Docente
            router-link.link(:to="{ name: 'Unidades' }" :tabindex="tab") Unidades
      li
        router-link.link(:to="{ name: 'ProcessoSeletivo' }" :tabindex="tab+1") Ingresso
      li
        router-link.link(:to="{ name: 'Laboratorios' }" :tabindex="tab+2") Laboratórios
      li
        a.link(@click="toggleSubmenu2" @keyup.enter="toggleSubmenu2" v-click-outside="closeSubMenu2" :tabindex="tab+3").
          Comunicação #[i.fa.fa-caret-down(aria-hidden="true")]
        transition(name="fademenu")
          .sub-menu(v-show="submenu2IsOpened")
            router-link.link(:to="{ name: 'Noticias' }" :tabindex="tab+3") Notícias
            router-link.link(:to="{ name: 'Eventos' }" :tabindex="tab+3") Eventos
            router-link.link(:to="{ name: 'RenorbioNaMidia', params: { slug: 'renorbio-na-midia'} }" :tabindex="tab+3") Renorbio na mídia
            router-link.link(:to="{ name: 'Galeria' }" :tabindex="tab+3") Galeria
      li
        router-link.link(:to="{ name: 'Documentos' }" :tabindex="tab+4") Documentos
      li
        a.link(@click="toggleSubmenu3" @keyup.enter="toggleSubmenu3" v-click-outside="closeSubMenu3" :tabindex="tab+5").
          Disciplinas #[i.fa.fa-caret-down(aria-hidden="true")]
        transition(name="fademenu")
          .sub-menu(v-show="submenu3IsOpened")
            router-link.link(:to="{ name: 'DisciplinasDoPrograma' }" :tabindex="tab+5") Disciplinas do programa
            router-link.link(:to="{ name: 'DisciplinasOfertadas' }" :tabindex="tab+5") Disciplinas ofertadas
      li
        router-link.link(:to="{ name: 'PaginaExtra', params: { slug: 'patentes'} }" :tabindex="tab+6") Patentes
      li
        router-link.link(:to="{ name: 'PaginaExtra', params: { slug: 'empresas'} }" :tabindex="tab+7") Empresas
      li
        router-link.link(:to="{ name: 'PaginaExtra', params: { slug: 'vitrine-tecnologica'} }" :tabindex="tab+8") Vitrine Tecnológica
      li
        router-link(:to="{ name: 'Contato', params: {} }" :tabindex="tab+8").link Contato
</template>

<script>
import { bus } from "../../main";

export default {
  name: "MenuNavHeader",
  props: {
    tab: {
      type: Number,
      default: 1,
    },
    isDesktopMenu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      submenu1IsOpened: false,
      submenu2IsOpened: false,
      submenu3IsOpened: false,
      // itensMenu : [
      //   {
      //     name : 'Renorbio',
      //     subitens : [
      //       {
      //         name : 'Sobre a Rede',
      //         'link-name' : 'Index'
      //       },
      //       {
      //         name : 'Corpo Docente',
      //         'link-name' : 'Index'
      //       },
      //       {
      //         name : 'Unidades',
      //         'link-name' : 'Index'
      //       }
      //     ]
      //   },
      //   {
      //     name : 'Ingresso',
      //     'link-name' : 'Index'
      //   },
      //   {
      //     name : 'Laboratórios',
      //     'link-name' : 'Index'
      //   },
      //   {
      //     name : 'Comunicação',
      //     subitens : [
      //       {
      //         name : 'Notícias',
      //         'link-name' : 'Noticias'
      //       },
      //       {
      //         name : 'Eventos',
      //         'link-name' : 'Index'
      //       },
      //       {
      //         name : 'Renorbio na mídia',
      //         'link-name' : 'Index'
      //       },
      //       {
      //         name : 'Galeria',
      //         'link-name' : 'Index'
      //       }
      //     ]
      //   },
      //   {
      //     name : 'Documentos',
      //     'link-name' : 'Index',
      //   },
      //   {
      //     name : 'Disciplinas',
      //     'link-name' : 'Disciplinas',
      //   },
      //   {
      //     name : 'Patentes',
      //     'link-name' : 'Index',
      //   },
      //   {
      //     name : 'Empresas',
      //     'link-name' : 'Index',
      //   },
      //   {
      //     name : 'Contato',
      //     'link-name' : 'Contato',
      //     params : {}
      //   }
      // ]
    };
  },
  methods: {
    isSubmenu(qtd) {
      return qtd !== undefined && qtd > 0;
    },
    toggleSubmenu1() {
      this.submenu1IsOpened = !this.submenu1IsOpened;
    },
    toggleSubmenu2() {
      this.submenu2IsOpened = !this.submenu2IsOpened;
    },
    toggleSubmenu3() {
      this.submenu3IsOpened = !this.submenu3IsOpened;
    },
    toggleMenuPrincipal() {
      bus.$emit("toggleMenuPrincipal", () => true);
    },
    closeSubMenu1() {
      this.submenu1IsOpened = false;
    },
    closeSubMenu2() {
      this.submenu2IsOpened = false;
    },
    closeSubMenu3() {
      this.submenu3IsOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 0.8) !important;
  }
}

#menuNav {
  //
  // display: flex;
  // flex-flow: row;

  ul.-desktop {
    box-sizing: border-box;
    min-width: 100%;
    list-style: none;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding: 0;
    padding-top: 40px;
    li:first-of-type {
      margin-left: 0px;
    }
    li {
      box-sizing: border-box;
      padding: 0;
      font-size: 14px;
      display: inline;

      a {
        color: $cor-branco;
        text-decoration: none;
      }

      .sub-menu {
        padding-top: 6px;
        display: block;
        position: absolute;
        min-width: 100px;
        //max-width: 150px;
        z-index: 1;

        a {
          display: list-item;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 15px;
          background-color: $cor-azul-1;

          &:first-child {
            border-top: 3px solid $cor-branco;
          }
        }
      }
    }
  }
}

ul.-mobileOrTablet {
  background-color: $cor-azul-1;
  padding: 0;
  padding-top: 0px;
  margin-bottom: 0px;
  box-sizing: border-box;
  min-width: 100%;
  list-style: none;
  box-shadow: 0px 20px 20px -15px rgba(0, 0, 0, 0.8);

  > li {
    font-weight: bold;
    width: 100%;
    font-size: 15px;
    display: block;

    a {
      margin-right: 30px;
      margin-left: 30px;
      padding-top: 10px;
      display: block;
      color: $cor-branco;
      text-decoration: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 10px;
    }

    .sub-menu {
      display: block;
      width: 100%;
      background: $cor-branco;

      a {
        margin-right: 30px;
        color: $cor-azul-1;
        display: list-item;
        border-bottom: 1px solid rgba(51, 122, 183, 0.3) !important;

        &:hover {
          color: rgba(51, 122, 183, 0.6) !important;
        }

        &:last-of-type {
          border: 0 !important;
        }
      }
    }

    &:last-child {
      a {
        border-bottom: 0px;
      }
    }
  }
}

.hide {
  display: none;
}

.fademenu-enter,
.fade-leave-to {
  transform: translateY(-5%);
  opacity: 0;
}

.fademenu-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
</style>
