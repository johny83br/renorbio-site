import Vue from "vue";
import Router from "vue-router";

// Importando componentes de páginas
import Index from "@/components/pages/Index";
import CadastroUsuario from "@/components/pages/CadastroUsuario";
import Contato from "@/components/pages/Contato";
import Evento from "@/components/pages/Evento";
import Eventos from "@/components/pages/Eventos";
import Noticia from "@/components/pages/Noticia";
import Noticias from "@/components/pages/Noticias";
import PaginaExtra from "@/components/pages/PaginaExtra";
import ProcessoSeletivo from "@/components/pages/ProcessoSeletivo";
import DisciplinasDoPrograma from "@/components/pages/DisciplinasDoPrograma";
import DisciplinasOfertadas from "@/components/pages/DisciplinasOfertadas";
import Documentos from "@/components/pages/Documentos";
import Documento from "@/components/pages/Documento";
import RenorbioNaMidia from "@/components/pages/RenorbioNaMidia";
import Sobre from "@/components/pages/Sobre";
import Unidades from "@/components/pages/Unidades";
import CorpoDocente from "@/components/pages/CorpoDocente";
import Laboratorios from "@/components/pages/Laboratorios";
import Generica from "@/components/pages/Generica";
import MapaDoSite from "@/components/pages/MapaDoSite";
import Galeria from "@/components/pages/Galeria";
import Album from "@/components/pages/Album";
import Busca from "@/components/pages/Busca";
import * as config from "../scripts/config";

Vue.use(Router);

const router = new Router({
  mode: "hash", // MUDANÇA PRINCIPAL: usa hash mode para evitar erro 404 no servidor
  base: "/",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      meta: {
        title: "Página principal",
      },
    },

    {
      path: "/academico",
      name: "academico",
      beforeEnter() {
        window.location.href = "https://academico.renorbio.org";
      },
    },

    {
      path: "/disciplinas/disciplinas-do-programa",
      name: "DisciplinasDoPrograma",
      component: DisciplinasDoPrograma,
      meta: {
        title: "Disciplinas do programa",
      },
    },
    {
      path: "/disciplinas/disciplinas-ofertadas",
      name: "DisciplinasOfertadas",
      component: DisciplinasOfertadas,
      meta: {
        title: "Disciplinas ofertadas",
      },
    },
    {
      path: "/ingresso/cadastro",
      name: "Cadastro",
      component: CadastroUsuario,
      meta: {
        title: "Cadastro de usuário",
      },
    },
    {
      path: "/contato",
      name: "Contato",
      component: Contato,
      meta: {
        title: "Contato",
      },
    },
    {
      path: "/eventos/:id",
      name: "Evento",
      component: Evento,
    },
    {
      path: "/eventos",
      name: "Eventos",
      component: Eventos,
      meta: {
        title: "Eventos",
      },
    },
    {
      path: "/noticias/:id",
      name: "Noticia",
      component: Noticia,
    },
    {
      path: "/noticias",
      name: "Noticias",
      component: Noticias,
      meta: {
        title: "Notícias",
      },
    },
    {
      path: "/pagina-extra/:slug",
      name: "PaginaExtra",
      component: PaginaExtra,
    },
    {
      path: "/ingresso/processo-seletivo",
      name: "ProcessoSeletivo",
      component: ProcessoSeletivo,
      meta: {
        title: "Processo seletivo",
      },
    },
    {
      path: "/documentos",
      name: "Documentos",
      component: Documentos,
      meta: {
        title: "Documentos",
      },
    },
    {
      path: "/documentos/:id",
      name: "Documento",
      component: Documento,
      meta: {
        title: "Documentos",
      },
    },
    {
      path: "/renorbio-na-midia",
      name: "RenorbioNaMidia",
      component: RenorbioNaMidia,
      meta: {
        title: "Renorbio na mídia",
      },
    },
    {
      path: "/sobre",
      name: "Sobre",
      component: Sobre,
      meta: {
        title: "Sobre",
      },
    },
    {
      path: "/unidades",
      name: "Unidades",
      component: Unidades,
      meta: {
        title: "Unidades",
      },
    },
    {
      path: "/corpo-docente",
      name: "CorpoDocente",
      component: CorpoDocente,
      meta: {
        title: "Corpo docente",
      },
    },
    {
      path: "/laboratorios",
      name: "Laboratorios",
      component: Laboratorios,
      meta: {
        title: "Laboratórios",
      },
    },
    {
      path: "/pagina/:slug",
      name: "Generica",
      component: Generica,
    },
    {
      path: "/mapa-do-site",
      name: "MapaDoSite",
      component: MapaDoSite,
      meta: {
        title: "Mapa do site",
      },
    },
    {
      path: "/galeria",
      name: "Galeria",
      component: Galeria,
      meta: {
        title: "Galeria",
      },
    },
    {
      path: "/galeria/:slug",
      name: "Album",
      component: Album,
    },
    {
      path: "/busca",
      name: "Busca",
      component: Busca,
      meta: {
        title: "Busca",
      },
    },

    // Rota coringa para rotas não definidas (opcional)
    {
      path: "*",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | ${config.SITE_TITLE}`;
  }
  next();
});

export default router;
