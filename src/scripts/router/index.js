import Vue from "vue";
import Router from "vue-router";

import Index from "@PAGES/Index";
import CadastroUsuario from "@PAGES/CadastroUsuario";
import Contato from "@PAGES/Contato";
import Evento from "@PAGES/Evento";
import Eventos from "@PAGES/Eventos";
import Noticia from "@PAGES/Noticia";
import Noticias from "@PAGES/Noticias";
import PaginaExtra from "@PAGES/PaginaExtra";
import ProcessoSeletivo from "@PAGES/ProcessoSeletivo";
import DisciplinasDoPrograma from "@PAGES/DisciplinasDoPrograma";
import DisciplinasOfertadas from "@PAGES/DisciplinasOfertadas";
import Documentos from "@PAGES/Documentos";
import Documento from "@PAGES/Documento";
import RenorbioNaMidia from "@PAGES/RenorbioNaMidia";
import Sobre from "@PAGES/Sobre";
import Unidades from "@PAGES/Unidades";
import CorpoDocente from "@PAGES/CorpoDocente";
import Laboratorios from "@PAGES/Laboratorios";
import Generica from "@PAGES/Generica";
import MapaDoSite from "@PAGES/MapaDoSite";
import Galeria from "@PAGES/Galeria";
import Album from "@PAGES/Album";
import Busca from "@PAGES/Busca";

Vue.use(Router);

const routes = [
  {
    path: process.env.NODE_ENV === "staging" ? "/renorbio" : "/",
    name: "Index",
    component: Index,
  },
  { path: "*", name: "*", component: Index },
  {
    path: "/academico",
    name: "academico",
    redirect: "https://academico.renorbio.org",
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
  { path: "/contato", name: "Contato", component: Contato },
  { path: "/comunicacao/noticia/:id", name: "Noticia", component: Noticia },
  {
    path: "/comunicacao/noticias/:page?",
    name: "Noticias",
    component: Noticias,
  },
  { path: "/extra/:slug", name: "PaginaExtra", component: PaginaExtra },
  {
    path: "/ingresso",
    name: "ProcessoSeletivo",
    component: ProcessoSeletivo,
  },
  { path: "/comunicacao/evento/:id", name: "Evento", component: Evento },
  {
    path: "/comunicacao/eventos/:page?",
    name: "Eventos",
    component: Eventos,
  },
  { path: "/documentos", name: "Documentos", component: Documentos },
  { path: "/documento/:id/:nome", name: "Documento", component: Documento },
  {
    path: "/comunicacao/galeria/:page?",
    name: "Galeria",
    component: Galeria,
  },
  {
    path: "/comunicacao/galeria/album/:slug?",
    name: "Album",
    component: Album,
  },
  {
    path: "/comunicacao/:slug",
    name: "RenorbioNaMidia",
    component: RenorbioNaMidia,
  },
  { path: "/unidades", name: "Unidades", component: Unidades },
  {
    path: "/corpodocente/:id?",
    name: "CorpoDocente",
    component: CorpoDocente,
  },
  {
    path: "/laboratorios/:id?",
    name: "Laboratorios",
    component: Laboratorios,
  },
  {
    path: "/sobre/:slug?",
    name: "Sobre",
    component: Sobre,
    children: [
      {
        path: "/sobre/:slug",
        name: "Generica",
        component: Generica,
      },
    ],
  },
  { path: "/mapa-do-site", name: "Mapa", component: MapaDoSite },
  { path: "/busca", name: "Busca", component: Busca },
];

// const isNodeSus = process.env.NODE_ENV == "staging"

// function addPrefixToRoutes(routeList) {
//   for (const route of routeList) {
//     if (!["*", "/"].includes(route.path)) route.path = `/renorbio${route.path}`

//     // Recursividade para adicionar o prefixo as rotas-filho
//     if (route.children) addPrefixToRoutes(route.children)
//   }
// }

// console.log(`ENV: ${process.env}`);

export default new Router({
  mode: "hash",
  base: "/",
  routes,
});
