<template>
  <div class="max-w-4xl mx-auto">

    <div class="px-5">
        <div class="pt-10 md:pt-12 text-xl md:text-2xl text-gray-600 font-semibold">검색</div>
    </div>

    <div class="px-5 pt-7 pb-2">

      <Search />

    </div>

    <div class="px-5">
        <div class="pt-8 md:pt-11 pb-4 text-xl md:text-2xl text-gray-600 font-semibold">최근 업로드</div>
        <div class="text-gray-500 font-normal text-sm md:text-base">최근 공부 흔적입니다.</div>
    </div>

        <div class="max-w-4xl grid grid-cols-1 md:grid-cols-1 mt-5 md:mt-6 mb-8 md:mb-14">
            <div class="px-5 md:px-6 group" v-for="article of articles" :key="article">
              <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
                  <div class="article-inner flex justify-between border-t py-6 border-gray-200">
                    <div class="w-full">
                        <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{article.category}}</p>
                        <h3 class="mb-1 md:mb-1.5 text-lg md:text-xl font-semibold text-gray-600 transition group-hover:text-blue-500 group-hover:duration-500">{{ article.title }}</h3>
                        <p class="mb-1 md:mb-1.5 text-sm md:text-base text-gray-400 custom-text">{{article.description}}</p>
                        <p class="text-sm md:text-sm text-gray-400">{{ formatDate(article.createdAt) }} · {{article.author}}</p>
                    </div>
                  </div>
              </nuxt-link>
            </div>
        </div>

    <!-- </div> -->
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('blog', params.slug)
      .sortBy('createdAt', 'desc')
      .fetch();
    return {
      articles
    }
  },
  methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('ko', options)
        }
  },
}
</script>

<style scoped>
</style>
