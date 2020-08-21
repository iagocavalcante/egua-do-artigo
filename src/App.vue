<template>
  <div id="app">
    <h1 v-if="!isLoaded" class="box--title">Égua do Artigo</h1>
    <h4 v-if="!isLoaded" class="box--subtitle">
      Com o <b>Égua do Artigo</b> você pode ler os artigos do **dium sem paywall,
      é grátis e <a class="box--link" href="github.com/iagocavalcante/medium/" target="_blank">open source</a>.
      Venha dar sugestões e ajude a evoluir!
    </h4>
    <div class="box" v-if="!isLoaded">
      <img class="box--logo" :src="require('@/assets/freedium_logo.svg')" />
      <input class="box--input" type="text" placeholder="Link do artigo" v-model="link">
      <button :class="{
        'box--button-loading': isLoading,
        }"
        :disabled="isLoading"
        class="box--button"
        @keydown.enter="getArticle()"
        @click="getArticle()"
      >
        <slot v-if="!isLoading">Ler artigo</slot>
        <span class="box--button-spinner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
    <Post v-if="isLoaded" :paragraphs="paragraphs"/>
  </div>
</template>

<script>
import Post from './components/Post.vue'
import axios from 'axios'
export default {
  name: 'Medium',
  components: {
    Post
  },
  data: () => ({
    link: '',
    name: 'shamnad.p.s',
    postName: 'image-upload-to-aws-s3-using-nestjs-and-typescript-b32c079963e1',
    isLoading: false,
    isLoaded: false,
    paragraphs: []
  }),
  methods: {
    async getArticle () {
      const re = /medium\.com\/(?<username>\S+)\/(?<title>\S+)/
      const matchedRegex = this.link.match(re)
      this.name = matchedRegex['groups'].username
      this.postName = matchedRegex['groups'].title
      this.isLoading = true
      this.isLoaded = false
      try {
        const { data } = await axios.get(`${process.env.VUE_APP_API_URL}${this.name}/${this.postName}`)
        this.paragraphs = [...data]
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.isLoading = false
        this.isLoaded = true
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lato:400,700|Lora|Playfair+Display:700i,900');

* {
  font-family: 'Inter', sans-serif;
}

html,
body {
  margin: 0;
  width: 100%;
}

h1,
h2,
p,
i,
a,
.first-letter,
.authorName a {
  color: #8d8db1;
  text-rendering: optimizeLegibility;
}

h1 {
  font-size: 48px;
  text-align: left;
  margin-bottom: 8px;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  padding: 0;
  margin: 56px 0 -13px -1.883px;
  text-align: left;
  line-height: 34.5px;
  letter-spacing: -0.45px;
}

p, i, a {
  margin-top: 21px;
  font-size: 21px;
  letter-spacing: -0.03px;
  line-height: 1.58;
}

a {
  text-decoration: underline;
}

blockquote {
  font-family: "Playfair Display", serif;
  font-size: 30px;
  font-style: italic;
  letter-spacing: -0.36px;
  line-height: 44.4px;
  overflow-wrap: break-word;
  margin: 55px 0 33px 0;
  /* text-align: center; */
  color: rgba(0, 0, 0, 0.68);
  padding: 0 0 0 50px;
}

code {
  font-size: 18px;
  border-radius: 2px;
  padding: 3px 5px;
  background: rgb(242, 242, 242) none repeat scroll 0% 0%;
  padding: 20px;
  color: rgb(41, 41, 41);
}

pre {
  font-size: 18px;
  border-radius: 2px;
  padding: 3px 5px;
  background: rgb(242, 242, 242) none repeat scroll 0% 0%;
  padding: 20px;
  color: rgb(41, 41, 41);
}

/* ##################################################################################
########################################  LAYOUT  ###################################
##################################################################################### */

.container {
  display: -ms-grid;
  display: grid;
      -ms-grid-columns: auto 166px 740px 166px auto;
      grid-template-columns: auto 166px 740px 166px auto;
      grid-template-areas:
    ". img img img ."
    ". . article . ."
    ". . footer . .";
}

.meta {
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  -ms-grid-column-span: 3;
  grid-area: img;
  margin: 10px;

  display: -ms-grid;

  display: grid;
      -ms-grid-rows: auto;
      grid-template-rows: auto;
      -ms-grid-columns: 1fr 1fr;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
    "info image";
}

.image {
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  grid-area: image;
  background: url("https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec073341402b36bb155e3bcb77eea9cd&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb");
  background-size: cover;
  background-repeat: no-repeat;
}

.info {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  grid-area: info;
  padding: 60px 60px 0 0;
  margin-bottom: 30px;
}

.author {
  display: -ms-grid;
  display: grid;
      -ms-grid-columns: 60px auto;
      grid-template-columns: 60px auto;
      -ms-grid-rows: 60px;
      grid-template-rows: 60px;
      grid-template-areas:
    "authorImage authorInfo";
  margin-bottom: 10px;
}

.authorImage {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  grid-area: authorImage;
  border: 2px solid #7DFFB3;
  border-radius: 50%;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1307985/profile/profile-512.jpg?1520076483');
  background-size: cover;
}

.authorInfo {
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  grid-area: authorInfo;
  padding-left: 10px;
}

.authorName,
.authorSub {
  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-top: 6px;
}

.authorName a {
  font-size: inherit;
  font-family: inherit;
  text-decoration: none;
}

.authorName a:hover {
  text-decoration: underline;
}

.authorSub {
  color: rgba(0, 0, 0, 0.54);
}

.median-divider {
  padding: 0 6px;
}

.lineLength {
  border: 2px dashed rgba(0, 0, 0, 0.54);
}

.article {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  grid-area: article;
  margin: 40px 10px;
}

.footer {
  -ms-grid-row: 3;
  -ms-grid-column: 3;
  grid-area: footer;
  background: #333333;
}

@media screen and (max-width: 1072px) {
  .container {
        -ms-grid-columns: auto 740px auto;
        grid-template-columns: auto 740px auto;
        grid-template-areas:
      ". img ."
      ". article ."
      ". footer  .";
  }
  .meta {
    -ms-grid-row: 1;
    -ms-grid-column: 2;
    -ms-grid-column-span: 1;
  }
  .article {
    -ms-grid-row: 2;
    -ms-grid-column: 2;
  }
  .footer {
    -ms-grid-row: 3;
    -ms-grid-column: 2;
  }
}

@media screen and (max-width: 740px) {
  .container {
        -ms-grid-rows: auto auto 150px;
        grid-template-rows: auto auto 150px;
        -ms-grid-columns: auto;
        grid-template-columns: auto;
        grid-template-areas:
      "img"
      "article"
      "footer";
  }

  .meta {
        -ms-grid-rows: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
        grid-template-areas:
      "info"
      "image";
  }
  .info {
    padding-top: 0;
  }
  .meta {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }

  .image {
    -ms-grid-row: 2;
    -ms-grid-column: 1;
  }

  .info {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
  }
  .article {
    -ms-grid-row: 2;
    -ms-grid-column: 1;
  }
  .footer {
    -ms-grid-row: 3;
    -ms-grid-column: 1;
  }
}

#app {
  display:table-cell;
  vertical-align:middle;
  height: 100vh;
  width: 100vw;
}

.box {
  display: flex;/* shrinks to fit content */
  flex-direction: column;
  width: 20rem;
  margin: auto;
}

.box--title {
  margin: auto;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  color: #8d8db1;
  text-align: center;
}

.box--subtitle {
  margin: auto;
  font-family: 'Inter', sans-serif;
  color: #8d8db1;
  text-align: center;
}

.box--link {
  font-size: 12pt;
  font-family: 'Inter', sans-serif;
  color: #8d8db1;
}

@media only screen and (min-width: 768px) {
  .box--title {
    width: 22rem;
  }
  
  .box--subtitle {
    width: 35rem;
  }
}

.box--logo {
  margin: 1rem;
  height: 12rem;
}

.box--input {
  font-family: 'Inter', sans-serif;
  margin: .7rem;
  padding: 1.2rem;
  font-size: 14pt;
  color: #8d8db1;
  background-color: #f2f2f2;
  border: 1px solid;
  border-radius: 2px;
}

.box--input:focus {
  outline: none;
  border-style: none;
}

.box--button {
  font-family: 'Inter', sans-serif;
  margin: .7rem;
  padding: 1.2rem;
  font-size: 14pt;
  color: #f2f2f2;
  background-color: #8d8db1;
  border: none;
  border-radius: 2px;
}

.box--button:hover {
  cursor: pointer;
  color: #f2f2f2;
  background-color: #8d8db1A6;
}

.box--button::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
.box--button:-moz-focusring {
  outline: 1px dotted ButtonText;
}
/* loading styles */
.box--button {
  position: relative;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  transition-timing-function: ease-in;
}
.box--button-spinner {
  position: relative;
  justify-content: center;
  opacity: 0;
  transition-property: padding, opacity;
  transition-duration: 0.2s, 0.2s;
  transition-timing-function: ease-in, ease;
  transition-delay: 0s, 0.2s;
}
.box--button-spinner span {
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  width: 2.2rem;
  height: 2.2rem;
  opacity: 1;
  border: 3.4px solid #f2f2f2;
  border-radius: 50%;
  animation: box--button-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #f2f2f2 transparent transparent transparent;
}
.box--button-spinner span:nth-child(1) {
  animation-delay: 0.45s;
}
.box--button-spinner span:nth-child(2) {
  animation-delay: 0.3s;
}
.box--button-spinner span:nth-child(3) {
  animation-delay: 0.15s;
}
.box--button-loading {
  padding-right: 3.5rem;
}
.box--button-loading .box--button-spinner {
  opacity: 1;
  padding: 1.2rem;
}
.box--button-loading .box--button-spinner span {
  opacity: 1;
}
button:not(:disabled) {
  transition-delay: 0.2s;
}
button:not(:disabled) .box--button-spinner span {
  box-shadow: 0 0 0 0.2rem #f2f2f2 inset;
  border: 7.4px solid transparent;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
}
button:not(:disabled) .box--button-spinner span:nth-child(1) {
  transform: rotate(0deg);
}
button:not(:disabled) .box--button-spinner span:nth-child(2) {
  transform: rotate(90deg);
}
button:not(:disabled) .box--button-spinner span:nth-child(3) {
  transform: rotate(180deg);
}
button:not(:disabled) .box--button-spinner span:nth-child(4) {
  transform: rotate(270deg);
}
@keyframes box--button-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
