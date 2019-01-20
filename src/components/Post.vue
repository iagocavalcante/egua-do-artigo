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
        return html += `${paragraph.tag.replace('_$_', paragraph.text)}`
      }, '')
    }
  }
}
</script>
