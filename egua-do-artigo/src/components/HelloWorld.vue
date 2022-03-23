<template>
  <div class="container">
    <main class="article" v-html="html">
    </main>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    paragraphs: Array
  },
  data: () => ({
    html: '',
  }),
  mounted () {
    this.html = this.transformArrayInHtml()
  },
  methods: {
    transformArrayInHtml () {
      return this.paragraphs.reduce((html, paragraph) => {
        if(paragraph.tag.includes('<a')) {
          return html += `${paragraph.tag.replace('_$_', paragraph.mixtapeMetadata.href).replace('_%_', paragraph.text)}`
        }
        if(paragraph.tag.includes('<img')) {
          return html += `${paragraph.tag.replace('_$_', paragraph.metadata.id)}`
        }
        if(paragraph.tag.includes('<iframe')) {
          this.appendFile(paragraph.gist.stylesheet)
          return html += paragraph.gist.div
        }
        return html += `${paragraph.tag.replace('_$_', paragraph.text)}`
      }, '')
    },
    appendFile(stylesheet){
      let file = document.createElement('link');
      file.rel = 'stylesheet';
      file.href = stylesheet
      document.head.appendChild(file)
    }
  }
}
</script>

<style scoped>
body {
  background-color: #f2f2f2;
  color: #8d8db1;
}
img {
  width: 100vw;
}
</style>
