<template>
    <div class="related max-w-5xl mx-auto py-10 md:py-16">

        <p class="text-base md:text-lg text-gray-400 text-center mb-2">{{article.category}}</p>
        <h1 class="custom-text leading-snug md:leading-normal px-5 md:px-0 mb-2 text-2xl md:text-4xl text-center font-semibold text-gray-700">{{article.title}}</h1>
        <p class="text-base md:text-lg text-gray-500 text-center mb-6 md:mb-10">{{formatDate(article.createdAt)}} · by {{article.author}}</p>

        <nuxt-content :document="article" class="prose max-w-5xl custom-text px-6 mx-auto"/>

        <Comments class="px-4 md:px-2" />

        <Prevnext :prev="prev" :next="next" />

    </div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const article = await $content('articles', params.slug)
        .fetch();

        const [prev, next] = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch()

        return { article, prev, next }
    },
    methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('ko', options)
        }
    },

    head() {
        return {
            title: this.article.title,
            htmlAttrs: {
            lang: 'ko'
            },
            meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 't-type',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
            hid: 'og-type',
            property: 'og:type',
            content: 'website'
            },
            {
            hid: 'og:title',
            property: 'og:title',
            content: this.article.title
            },
            {
            hid: 'og:description',
            property: 'og:description',
            content: this.article.description
            },
            {
            hid: 'og:image',
            property: 'og:image',
            // content: this.article.img
            content: `https://raw.githubusercontent.com/Team-COSADAMA/Blog/main/static/${this.article.slug}/${this.article.img}`
            },
            {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: `https://raw.githubusercontent.com/Team-COSADAMA/Blog/main/static/${this.article.slug}/${this.article.img}`
            },
            {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            content: 'article image'
            },
            {
            hid: 'og:url',
            name: 'og:url',
            content: `https://www.blog.cosadama.com/articles/${this.$route.params.slug}`
            },
            ],
        }
    },
}
</script>

<style scpoed>
.custom-text{
    word-break: keep-all;
}
code::before {
    content: none !important;
}
code::after {
    content: none !important;
}
img{
    margin: auto;
}
</style>