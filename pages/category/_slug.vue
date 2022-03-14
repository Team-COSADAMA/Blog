<template>
    <div>
        <div class="relative">
            <div class="bg-img section w-full py-48 sm:py-64 md:py-72 xl:py-80 inline-block" :style="{ backgroundImage: `url(/${category.img})` }"></div>
            <div class="absolute bottom-0 w-full h-full bg-gradient-to-t from-zinc-800"></div>
            <div class="absolute bottom-0 w-full">
            <div class="max-w-7xl mx-auto pb-6 md:pb-14 px-6 md:px-6">
                <div class="text-white font-medium text-3xl md:text-4xl pb-2.5 md:pb-4">
                    {{category.slug}}
                </div>
                <div class="text-slate-300 text-sm md:text-base keep-all">
                {{category.description}}
                </div>
            </div>
            </div>
        </div>

        <div class="max-w-7xl grid grid-cols-1 md:grid-cols-1 mt-4 md:mt-6 mb-8 md:mb-14 mx-auto">
            <div class="px-6 md:px-6 group" v-for="article of articles" :key="article">
              <nuxt-link :to="{path: `/articles/${article.slug}`}">
                  <div class="article-inner flex border-b py-6 md:py-8 border-gray-200">
                    <div class="h-content hidden md:block">
                      <div class="md:h-52 md:w-72 square-box">
                        <img v-if="`${article.img}` == undefined || `${article.img}` == null || `${article.img}` == 'null' || `${article.img}` == 'undefined'" class="profile h-full group-hover:scale-105 transition duration-300" 
                        :src="require(`~/static/${article.category}.jpg`)" alt="">
                        <img v-else class="profile h-full group-hover:scale-105 transition duration-300" 
                        :src="require(`~/static/${article.slug}/${article.img}`)" alt="">
                      </div>
                    </div>
                    <div class="px-0 md:px-4 md:pl-9">
                        <p class="mb-1.5 md:mb-3 text-sm md:text-base text-gray-400">{{article.category}}</p>
                        <h3 class="mb-1.5 md:mb-3 text-xl md:text-2xl font-semibold text-gray-600 keep-all">{{ article.title }}</h3>
                        <p class="mb-1.5 md:mb-3 text-sm md:text-base text-gray-400 custom-text keep-all">{{article.description}}</p>
                        <p class="text-sm md:text-base text-gray-400">{{ formatDate(article.createdAt) }} · {{article.author}}</p>
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
        const category = await $content('category', params.slug)
        .fetch();

        // const categoryTitle = category.slug

        const articles = await $content('articles')
        // .where({category: categoryTitle})
        .where({category: `${category.slug}`})
        .fetch();

        return { category, articles }
    },
    methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('ko', options)
        },
    }
}
</script>

<style scoped>
.keep-all{
    word-break: keep-all;
}
.bg-img {
        background-position: center;
        background-repeat:  no-repeat;
        /* background-attachment: fixed; */
        background-size:  cover;
        background-color: #000000;
 }
.section {
  position: relative;
}
.inner {
  box-sizing: border-box;
  position: relative;
}
.keep-all {
  word-break: keep-all;
}
.lead-box {
    overflow: hidden;
}
.square-box {
    overflow: hidden;
}
.profile {
    object-fit: cover;
    /* overflow: hidden; */
}
</style>