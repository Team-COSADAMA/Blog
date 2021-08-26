<template>
    <div class="related max-w-3xl mx-auto py-10 px-3 md:py-16">
        <!-- <p class="text-lg text-gray-500 text-center mb-2">{{article.category}}</p> -->
        <h1 class="mb-2 text-3xl md:text-4xl text-center font-semibold text-gray-700">{{article.title}}</h1>
        <p class="text-lg text-gray-500 text-center">{{article.datetime}} · by {{article.author}}</p>
        <img :src="require(`~/assets/resources/${article.img}`)" alt="" class="my-5 md:rounded-2xl md:my-10" />
        <nuxt-content :document="article" class="prose max-w-3xl break-words"/>

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
        .sortBy('datetime', 'desc')
        .surround(params.slug)
        .fetch()

        return { article, prev, next }
    }
}
</script>

<style scpoed>
</style>