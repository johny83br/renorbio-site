<template lang="pug">
  .footer
    voltar-internas(:url="this.url")
</template>

<script>
import VoltarInternas from "@BASICS/VoltarInternas";

export default {
  components: {
    VoltarInternas,
  },
  props: {
    url: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@include media("<tablet") {
  .footer {
    flex-direction: column-reverse;
    align-items: center;
  }
}
</style>
