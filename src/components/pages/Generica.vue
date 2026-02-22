<template lang="pug">
  generica(slot="principal")
</template>

<script>
import Generica from "@MODULES/Generica";
import Pagina from "@BASICS/Pagina";

export default {
  components: {
    Generica,
    Pagina,
  },
};
</script>
