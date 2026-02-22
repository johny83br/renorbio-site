<template lang="pug">
  .disciplinas
    ul(v-if="areas.length")
      li(v-for="(area,index) in areas")
        router-link(:to="{ name: 'DisciplinasDoPrograma', params: { item: index} }") {{area.name}}
    template(v-else)
      p No momento não foi possível carregar a lista das áreas de concentração

</template>

<script>
import { getAreas } from "../../scripts/services/Disciplinas";

export default {
  data() {
    return {
      areas: [],
    };
  },
  mounted() {
    this.getAreas();
  },
  methods: {
    async getAreas() {
      const areasTratadas = [];

      const areas = await getAreas();

      Object.entries(areas).forEach(v => {
        const i = v[0];
        const areaTratada = {
          key: areas[i].id,
          name: areas[i].name,
        };
        areasTratadas.push(areaTratada);
      });

      this.areas = areasTratadas;
    },
  },
};
</script>

<style lang="scss">
.disciplinas ul {
  padding: 0;
  list-style: none;
}

.disciplinas li {
  margin-top: 15px;
}

.disciplinas li::after {
  content: "\f0a9";
  font-family: FontAwesome;
  font-size: 12px;
  color: $cor-azul-1;
  margin-left: 5px;
}

.disciplinas a {
  color: $cor-cinza;
}

.disciplinas a:hover {
  color: $cor-azul-1;
  text-decoration: none;
  cursor: pointer;
}
</style>
