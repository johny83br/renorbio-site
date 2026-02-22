<template lang="pug">
  //- Add class hide enquanto o fuso horario não é consertado
  span(:class="{'hide': !show}"): slot
</template>

<script>
export default {
  props: ["show"],
};
</script>

<style lang="scss" scoped>
span::before {
  content: "\f017";
  font-family: FontAwesome;
  margin-right: 5px;
}
</style>
