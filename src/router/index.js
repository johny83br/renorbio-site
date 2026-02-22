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

Vue.use(Router);

const router = new Router({
  mode: "hash", // MUDANÇA PRINCIPAL: usa hash mode para evitar erro 404 no servidor
  base: "/",
  routes: [
    { path: "/", name: "Index", component: Index },

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
    },
    {
      path: "/disciplinas/disciplinas-ofertadas",
      name: "DisciplinasOfertadas",
      component: DisciplinasOfertadas,
    },
    {
      path: "/ingresso/cadastro",
      name: "Cadastro",
      component: CadastroUsuario,
    },
    {
      path: "/contato",
      name: "Contato",
      component: Contato,
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
    },
    {
      path: "/documentos",
      name: "Documentos",
      component: Documentos,
    },
    {
      path: "/documentos/:id",
      name: "Documento",
      component: Documento,
    },
    {
      path: "/renorbio-na-midia",
      name: "RenorbioNaMidia",
      component: RenorbioNaMidia,
    },
    {
      path: "/sobre",
      name: "Sobre",
      component: Sobre,
    },
    {
      path: "/unidades",
      name: "Unidades",
      component: Unidades,
    },
    {
      path: "/corpo-docente",
      name: "CorpoDocente",
      component: CorpoDocente,
    },
    {
      path: "/laboratorios",
      name: "Laboratorios",
      component: Laboratorios,
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
    },
    {
      path: "/galeria",
      name: "Galeria",
      component: Galeria,
    },
    {
      path: "/galeria/:id",
      name: "Album",
      component: Album,
    },
    {
      path: "/busca",
      name: "Busca",
      component: Busca,
    },

    // Rota coringa para rotas não definidas (opcional)
    {
      path: "*",
      redirect: "/",
    },
  ],
});

export default router;
