<template lang="pug">
  pagina
    extra(slot="principal")
</template>

<script>
import Extra from "@MODULES/Extra";
import Pagina from "@BASICS/Pagina";

export default {
  components: {
    Extra,
    Pagina,
  },
};
</script>
