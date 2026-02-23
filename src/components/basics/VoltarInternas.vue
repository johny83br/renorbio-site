<template lang="pug">
  a.back(v-on:click="historyBack")
    i.fa.fa-chevron-circle-left(aria-hidden="true")
    | Voltar
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: false,
    },
  },
  methods: {
    historyBack() {
      if (this.url) {
        window.location.href = `/#${this.url}`;
      } else {
        window.history.back();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
i.fa.fa-chevron-circle-left {
  margin-right: 5px;
  font-size: 18px;
}

a.back {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
}
</style>
