<template lang="pug">
  #processoSeletivo
    header
      titulo Processo seletivo

    .conteudo(v-if="datas.name")
      router-link.link(:to="{ name: 'ProcessoSeletivo' }")
        span(v-if="datas.name") edital {{datas.name}}
      descricao
        | O processo seletivo se dá pela avaliação de um projeto de pesquisa submetido pelo candidato,
        | defesa desse projeto para uma banca e avaliação de currículo.
      datas
    template(v-else)
      p No momento não foi possível carregar as informações do processo seletivo
</template>

<style lang="scss" scoped>
  div#processoSeletivo .conteudo {
    display: flex;
    flex-direction: column;
  }

  div#processoSeletivo .conteudo a  {
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: $titulos-font-weight;
    color: $cor-azul-1;
    // width: 110px;
  }

  div#processoSeletivo .conteudo a:hover {
    text-decoration: underline;
  }

  @include media("<tablet") {
    div#processoSeletivo {
      border-bottom: 1px solid rgba(0, 0, 0, .3);
      padding-bottom: 45px;
    }
  }
</style>

<script>
import Arquivo from '@BASICS/ArquivoEdital';
import Datas from '@BASICS/ProcessoDatas';
import Descricao from '@BASICS/Descricao';
import Titulo from '@BASICS/Titulo';

import ProcessoSeletivo from '../../scripts/services/ProcessoSeletivo';
import DataUtil from '../../scripts/utils/Data';

export default {
  components: {
    Arquivo,
    Datas,
    Descricao,
    Titulo
  },
  data() {
    return {
      datas: { name: null }
    };
  },
  created() {
    this.getDatas();
  },
  methods: {
    getDatas() {
      try {
        ProcessoSeletivo.getProcessoSeletivo()
          .then(response => {
            console.log(response.data);
            if (response.data && response.data.registers) {
              const datasTratadas = {
                name: response.data.registers.name,
                inscricao_start: DataUtil.dataFormatada(response.data.registers.inscription_start),
                inscricao_end: DataUtil.dataFormatada(response.data.registers.inscription_end),
                homologacao: (response.data.registers.homologation_date) ? DataUtil.dataFormatada(response.data.registers.homologation_date) : 'A definir',
                avaliacao_start: DataUtil.dataFormatada(response.data.registers.rating_start),
                avaliacao_end: DataUtil.dataFormatada(response.data.registers.rating_end),
                resultado: DataUtil.dataFormatada(response.data.registers.result_date)
              };
              this.datas = datasTratadas;
            } else {
              console.log('Dados do processo seletivo não disponíveis');
              this.datas = { name: null };
            }
          });
      } catch (exc) {
        console.log(exc);
      }
    }
  }
};
</script>
