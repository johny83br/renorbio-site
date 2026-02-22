<template lang="pug">
  span: slot
</template>

<style lang="scss" scoped>
span::before {
  content: "\f133";
  font-family: FontAwesome;
  margin-right: 5px;
}

span {
  margin-right: 20px;
}
</style>
