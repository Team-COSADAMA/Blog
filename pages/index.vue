<template>
  <div class="max-w-5xl mx-auto">
    <div class="max-w-5xl grid grid-cols-1 md:grid-cols-2 mt-16 mb-8">
        <div class="pb-16 px-6 group" v-for="article of articles" :key="article">
          <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
              <div class="article-inner">
                <img class="rounded-2xl group-hover:shadow-xl transform group-hover:-translate-y-1.5 transition group-hover:duration-500"
                :src="require(`~/assets/resources/${article.img}`)" alt=""/>
                <!-- <img :src="require(`~/assets/resources/${article.img}`)" alt="" class="article-hover-image" /> -->
                <div class="mt-4">
                    <p class="mb-2 text-gray-500">{{article.category}}</p>
                    <h3 class="mb-2 text-2xl font-semibold text-gray-700 transition group-hover:text-blue-500 group-hover:duration-500">{{ article.title }}</h3>
                    <p class="text-gray-500">{{ article.datetime }}</p>
                </div>
              </div>
          </nuxt-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('blog', params.slug)
      .only(['title', 'description', 'img', 'datetime', 'category', 'author', 'slug'])
      // .sortBy('createdAt', 'asc')
      .sortBy('datetime', 'desc')
      .fetch();
    return {
      articles
    }
  }
}
</script>

<style scoped>
</style>
