<template lang="pug">
  #parceiros
    titulo Parceiros

    .conteudo
      carousel.parceiros(
      :paginationEnabled="false",
      :navigationEnabled="true",
      :navigationClickTargetSize="0",
      :navigationNextLabel="proximo",
      :navigationPrevLabel="anterior",
      :perPage="1",
      :perPageCustom="breakpoints")
        slide(title="Ir para o site da UECE" alt="logomarca da uece")
          a(href='http://www.uece.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-uece.png')

        slide(title="Ir para o site da UFAL" alt="logomarca da ufal")
          a(href='http://www.ufal.edu.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufal.png')

        slide(title="Ir para o site da UFBA" alt="logomarca da ufba")
          a(href='https://www.ufba.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufba.png')

        slide(title="Ir para o site da UFC" alt="logomarca da ufc")
          a(href='http://www.ufc.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufc.png')

        slide(title="Ir para o site da UFES" alt="logomarca da ufes")
          a(href='http://www.ufes.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufes.png')

        slide(title="Ir para o site da UFMA" alt="logomarca da ufma")
          a(href='http://portais.ufma.br/PortalUfma/index.jsf'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufma.png')

        slide(title="Ir para o site da UFPB" alt="logomarca da ufpb")
          a(href='http://www.ufpb.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufpb.png')

        slide(title="Ir para o site da UFPE" alt="logomarca da ufpe")
          a(href='https://www.ufpe.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufpe.png')

        slide(title="Ir para o site da UFPI" alt="logomarca da ufpi")
          a(href='http://www.ufpi.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufpi.png')

        slide(title="Ir para o site da UFRN" alt="logomarca da ufrn")
          a(href='http://www.ufrn.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufrn2.png')

        slide(title="Ir para o site da UFRPE" alt="logomarca da ufrpe")
          a(href='http://www.ufrpe.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufrpe.png')

        slide(title="Ir para o site da UFS" alt="logomarca da ufs")
          a(href='http://www.ufs.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-ufs.png')

        slide(title="Ir para o site da UNIT" alt="logomarca da unit")
          a(href='https://portal.unit.br/'  target='_blank' noopener)
            img(src='renorbio.logotipo-parceiros-unit.png')

</template>

<script>
import Titulo from "@BASICS/Titulo";
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Carousel,
    Titulo,
    Slide,
  },
  props: ["breakpoints"],
  data() {
    return {
      proximo: '<i class="fa fa-chevron-circle-right carousel-arrows">',
      anterior: '<i class="fa fa-chevron-circle-left carousel-arrows">',
    };
  },
};
</script>

<style lang="scss">
.VueCarousel-slide {
  text-align: center;
}

div#parceiros .conteudo {
  margin-top: 35px;
}

.parceiros img {
  opacity: 0.8;
}

.parceiros img:hover {
  opacity: 1;
}

.fa-chevron-circle-right,
.fa-chevron-circle-left {
  color: $cor-azul-1;
  font-size: 18px;
}

@include media("<=tablet") {
  .VueCarousel-navigation-button {
    margin: 0 15px;
  }
}

@include media("<tablet") {
  div#parceiros .conteudo {
    padding: 0 20px;
  }
}
</style>
