<template lang="pug">
  #app
    page-header(
      :mobile="isMobile"
      :tablet="isTablet"
      :desktop="isDesktop"
      :internal="isInternal"
      :tab="1")
    .default-content
      router-view
    page-footer
    transition(name="fade")
      .back-top(@click="backTop" v-show="scrollPage > 200")
        back-to-top
</template>

<script>
import PageHeader from "@BASICS/PageHeader";
import PageFooter from "@BASICS/PageFooter";
import backToTop from "@BASICS/backToTop";
import { bus } from "./main";

export default {
  name: "App",
  components: { PageHeader, PageFooter, backToTop },
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      isInternal: false,
      scrollPage: 0,
    };
  },
  computed: {
    isDesktop() {
      return this.windowWidth > 768;
    },
    isTablet() {
      return this.windowWidth <= 768 && this.windowWidth > 425;
    },
    isMobile() {
      return this.windowWidth <= 425;
    },
  },
  watch: {
    $route(to, from) {
      bus.$emit("toggleRouter", () => true);

      if (to.path !== "/" && to.path !== undefined) {
        this.isInternal = true;
      } else {
        this.isInternal = false;
      }
    },
  },
  created() {
    if (this.$route.name !== "Index") {
      this.isInternal = true;
    } else {
      this.isInternal = false;
    }
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.getWindowWidth);
      window.addEventListener("resize", this.getWindowHeight);

      // Init
      this.getWindowWidth();
      this.getWindowHeight();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("resize", this.getWindowHeight);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    backTop: () => {
      // Informações sobre a função: http://iamdustan.com/smoothscroll/
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },
    handleScroll() {
      this.scrollPage = window.scrollY;
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.back-top {
  display: block;
  position: fixed;
  bottom: 50px;
  right: 30px;
  z-index: 10000;
  border: none;
  outline: none;
  cursor: pointer;
}

.default-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.default-content {
  @media screen and (min-width: 992px) {
    //min-height: 500px;
  }
}
</style>
<style lang="scss">
.v--modal-box.v--modal {
  button.close {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0 0 10px 0;
    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }
}
</style>
