<template lang="pug">
  #disciplinasOfertadas

    header
      titulo Disciplinas
        small.more: router-link(:to="{ name: 'DisciplinasDoPrograma' }") Ver lista completa

    .conteudo
      disciplinas
</template>

<script>
import Disciplinas from "@MODULES/DisciplinasLista";
import Titulo from "@BASICS/Titulo";

export default {
  components: {
    Disciplinas,
    Titulo,
  },
};
</script>
