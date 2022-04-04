<template>
  <div id="app" class="bg-primary">
    <div class="flex flex-col items-center space-y-10" v-if="!isLoaded">
      <img :src="require('@/assets/logo.svg')" alt="Égua do artigo logo" />
      <div class="flex sm:justify-center items-center sm:flex-row flex-col sm:gap-x-3 gap-y-3 sm:w-1/2 w-full">
        <input class="bg-quaternary w-1/2 outline-1 outline-tertiary text-primary text-opacity-75 rounded-sm h-9 justify-center p-2" type="text" placeholder="Cole aqui o link do artigo" v-model="link"/>
        <button :disabled="isLoading" @click="getArticle()" :class="`w-24 h-9 justify-center rounded-sm bg-quaternary ${isLoading ? 'bg-opacity-75' : ''} text-primary hover:bg-opacity-80`">
          <span v-if="!isLoading"> Ler artigo </span>
          <div class="flex justify-center w-20 py-3 overflow-hidden" v-if="isLoading">
            <span class="dot-typing"></span>
          </div>
        </button>
      </div>
    </div>
    <PostComponent v-if="isLoaded" :paragraphs="paragraphs"/>
  </div>
</template>

<script>
import PostComponent from './components/PostComponent.vue'

export default {
  name: 'App',
  components: {
    PostComponent
  },
  data: () => ({
    link: 'https://medium.com/@neelesh-arora/stop-using-conditional-statements-everywhere-in-javascript-use-an-object-literal-instead-e780debcda18',
    name: 'shamnad.p.s',
    postName: 'image-upload-to-aws-s3-using-nestjs-and-typescript-b32c079963e1',
    isLoading: false,
    isLoaded: false,
    paragraphs: [],
    apiUrl: process.env.VUE_APP_API_URL
  }),
  methods: {
    getArticle () {
      this.isLoaded = false
      this.isLoading = true
        fetch(`${this.apiUrl}medium?url=${this.link}?format=json`)
        .then(res => res.json())
        .then(data => {
          setTimeout(() => {
            const {data: { html }} = data
            this.paragraphs = [...html]
            this.isLoaded = true
            this.isLoading = false
          }, 3000)
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.isLoaded = false
        })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

html,
body {
  margin: 0;
  width: 100%;
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
  overflow-x: auto;
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

.dot-typing {
  position: relative;
  left: -9999px;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #466551;
  color: #466551;
  box-shadow: 9984px 0 0 0 #466551, 9999px 0 0 0 #466551, 10014px 0 0 0 #466551, 10029px 0 0 0 #466551;
  animation: dotTyping 1.5s infinite linear;
}

@keyframes dotTyping {
  0% {
    box-shadow: 9984px 0 0 0 #466551, 9999px 0 0 0 #466551, 10014px 0 0 0 , 10029px 0 0 0 #466551;
  }
  14.286% {
    box-shadow: 9984px -10px 0 0 #466551, 9999px 0 0 0 #466551, 10014px 0 0 0 , 10029px 0 0 0 #466551;
  }
  28.568% {
    box-shadow: 9984px 0 0 0 #466551, 9999px 0 0 0 #466551, 10014px 0 0 0 , 10029px 0 0 0 #466551;
  }
  42.852% {
    box-shadow: 9984px 0 0 0 #466551, 9999px -10px 0 0 #466551, 10014px 0 0 0 , 10029px 0 0 0 #466551;
  }
  57.136% {
    box-shadow: 9984px 0 0 0 #466551, 9999px 0 0 0 #466551, 10014px 0 0 0 , 10029px 0 0 0 #466551;
  }
  71.42% {
    box-shadow: 9984px 0 0 0 #466551, 9999px 0 0 0 #466551, 10014px -10px 0 0 , 10029px 0 0 0 #466551;
  }
  85.704% {
    box-shadow: 9984px 0 0 0 #466551, 9999px 0 0 0 #466551, 10014px 0 0 0 , 10029px 0 0 0 #466551;
  }
  100% {
    box-shadow: 9984px 0 0 0 #466551, 9999px 0 0 0 #466551, 10014px 0 0 0 , 10029px -10px 0 0 #466551;
  }
}
</style>
