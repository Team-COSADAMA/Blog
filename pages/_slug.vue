<template>
    <div class="related max-w-3xl mx-auto py-10 md:py-16">
        <SocialHead
        :title="article.title"
        :description="article.description"
        :image="article.img"
        />

        <p class="text-base md:text-lg text-gray-400 text-center mb-2">{{article.category}}</p>
        <h1 class="custom-text leading-snug md:leading-normal px-5 md:px-0 mb-2 text-2xl md:text-4xl text-center font-semibold text-gray-700">{{article.title}}</h1>
        <p class="text-base md:text-lg text-gray-500 text-center mb-6 md:mb-10">{{formatDate(article.createdAt)}} · by {{article.author}}</p>

        <nuxt-content :document="article" class="prose max-w-3xl custom-text px-6"/>

        <Prevnext :prev="prev" :next="next" />

    </div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const article = await $content('blog', params.slug)
        .fetch();

        const [prev, next] = await $content('blog')
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
            { hid: 'description', name: 'description', content: 'COSADAMA Blog, Archiving Place for COSADAMA' },
            { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                {
                hid: 'canonical',
                rel: 'canonical',
                href: `https://www.blog.cosadama.com/${this.$route.params.slug}`
                }
            ]
        }
    },
}
</script>

<style scpoed>
.custom-text{
    word-break: keep-all;
}
</style>