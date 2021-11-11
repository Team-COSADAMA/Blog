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

    <!-- <div class="max-w-5xl grid grid-cols-1 md:grid-cols-2 mt-11 md:mt-16 mb-5"> -->

        <!-- <div class="pb-9 px-5 md:pb-16 md:px-6 group" v-for="article of articles" :key="article">
          <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
              <div class="article-inner">
                <img class="rounded-2xl group-hover:shadow-xl transform group-hover:-translate-y-1.5 transition group-hover:duration-500"
                :src="require(`~/assets/resources/${article.img}`)" alt=""/>
                <div class="mt-4">
                    <p class="mb-1 md:mb-2 text-sm md:text-base text-gray-500">{{article.category}}</p>
                    <h3 class="mb-1 md:mb-2 text-xl md:text-2xl font-semibold text-gray-700 transition group-hover:text-blue-500 group-hover:duration-500">{{ article.title }}</h3>
                    <p class="mb-1 md:mb-1.5 text-sm md:text-base text-gray-400 custom-text">{{article.description}}</p>
                    <p class="text-sm md:text-base text-gray-500">{{ article.datetime }}</p>
                </div>
              </div>
          </nuxt-link>
        </div> -->

        <div class="max-w-4xl grid grid-cols-1 md:grid-cols-1 mt-5 md:mt-6 mb-8 md:mb-14">
            <div class="px-5 md:px-6 group" v-for="article of articles" :key="article">
              <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
                  <div class="article-inner flex justify-between border-t py-6 border-gray-200">
                    <div class="w-full">
                        <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{article.category}}</p>
                        <h3 class="mb-1 md:mb-1.5 text-lg md:text-xl font-semibold text-gray-600 transition group-hover:text-blue-500 group-hover:duration-500">{{ article.title }}</h3>
                        <p class="mb-1 md:mb-1.5 text-sm md:text-base text-gray-400 custom-text">{{article.description}}</p>
                        <p class="text-sm md:text-sm text-gray-400">{{ article.datetime }}</p>
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
