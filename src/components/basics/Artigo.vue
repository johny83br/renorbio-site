<template lang="pug">
  article.artigo
    slot(name="loading")
    slot(name="header")
    slot(name="feedback")
    slot(name="content")
    slot(name="footer")
</template>

<script>
export default {
  name: "Conteudo",
};
</script>

<style lang="scss">
.artigo {
  line-height: 20px;

  table {
    display: block;
    overflow: auto;
    max-width: 100% !important;
  }

  p {
    margin: 15px 0;
    text-align: justify;

    img {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      object-fit: contain;
      height: 100%;
      margin-bottom: 15px;
      margin-top: 5px;
    }

    a {
      color: $cor-azul-1;
    }
  }

  ul {
    list-style: none;
    align-self: flex-start;
  }

  li {
    padding: 3px 0;
  }

  ul > li {
    display: flex;
  }

  ul > li:before {
    content: "\f111";
    font-family: FontAwesome;
    color: $cor-azul-1;
    margin-right: 10px;
    font-size: 8px;
  }

  ol {
    list-style: none;
    counter-reset: li;
    align-self: flex-start;
  }

  ol > li::before {
    content: counter(li);
    color: $cor-azul-1;
    display: inline-block;
    margin-right: 10px;
    direction: rtl;
  }

  ol > li {
    counter-increment: li;
  }

  blockquote {
    border: none;
    font-style: italic;
    font-size: 14px;
    padding: 0 40px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
  }

  figure {
    max-width: 100%;
    max-height: 50%;
    margin-right: 20px;
    margin-bottom: 10px;
  }

  .alignleft,
  .alignnone {
    float: left;
    margin-right: 15px;
  }

  .aligncenter {
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .alignright {
    float: right;
    margin-left: 15px;
  }

  figcaption {
    text-align: center;
    font-style: italic;
  }

  figcaption p {
    margin: 0;
  }

  figure img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    margin-top: 4px;
  }

  td {
    border: 1px solid $cor-azul-1;
    padding: 10px;
  }
}

@include media("<tablet") {
  .artigo .alignleft,
  .artigo .alignnone,
  .artigo .alignright {
    float: none;
    margin: 0 auto;
  }

  .artigo figure img {
    max-height: 280px;
  }
}
</style>
