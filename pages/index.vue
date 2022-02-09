<template>
  <div class="w-full">

      <div class="relative">
        <div class="z-0 bg-img section w-full py-48 sm:py-64 md:py-72 xl:py-80 inline-block" style="background-image: url(main4.jpg)"></div>
        <div class="z-20 absolute bottom-0 w-full h-full bg-gradient-to-t from-zinc-800"></div>
        <div class="z-30 absolute bottom-0 w-full">
          <div class="max-w-7xl mx-auto pb-7 md:pb-14 px-7 md:px-6">
            <div class="text-white font-semibold text-3xl md:text-4xl pb-2.5 md:pb-4">
                나눔으로써 <br/> 함께하는 성장
            </div>
            <div class="text-slate-300 text-sm md:text-base keep-all">
              코사다마는 혼자만의 성장이 아닌, 함께하는 성장을 지향합니다. <br class="hidden md:inline"/> 앎을 나누고, 함께 결과물을 만들어가는 과정에서 모두가 가파른 성장을 이뤄낼 수 있습니다.
            </div>
          </div>
        </div>
      </div>


<div class="max-w-7xl mx-auto">

<!-- 검색 -->

    <!--<div class="px-5">
        <div class="pt-10 md:pt-12 text-xl md:text-2xl text-gray-600 font-semibold">검색</div>
    </div>

    <div class="px-5 pt-7 pb-2">
      <Search />
    </div> -->

<!-- 글 목록 -->

    <!-- <div class="px-5">
        <div class="pt-8 md:pt-11 pb-4 text-xl md:text-2xl text-gray-600 font-semibold">최근 업로드</div>
        <div class="text-gray-500 font-normal text-sm md:text-base">최근 공부 흔적입니다.</div>
    </div> -->

        <div class="max-w-7xl grid grid-cols-1 md:grid-cols-1 mt-5 md:mt-6 mb-8 md:mb-14">
            <div class="px-5 md:px-6 group" v-for="article of articles" :key="article">
              <!-- <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }"> -->
              <nuxt-link :to="{path: `/articles/${article.slug}`}" replace>
                  <div class="article-inner flex border-b py-6 md:py-8 border-gray-200">
                    <div class="h-content hidden md:block">
                      <div class="md:h-52 md:w-72 square-box">
                        <!-- <img class="profile h-full group-hover:scale-105 transition duration-300" 
                        src="~/assets/resources/open-py-on-colab.png" alt=""> -->
                        <img v-if="`${article.img}` == undefined || `${article.img}` == null || `${article.img}` == 'null' || `${article.img}` == 'undefined'" class="profile h-full group-hover:scale-105 transition duration-300" 
                        :src="require(`~/static/${article.category}.jpg`)" alt="">
                        <!-- <img v-else class="profile h-full group-hover:scale-105 transition duration-300" 
                        :src="require(`~/static/${article.category}.jpg`)" alt=""> -->
                        <img v-else class="profile h-full group-hover:scale-105 transition duration-300" 
                        :src="require(`~/static/${article.slug}/${article.img}`)" alt="">
                      </div>
                    </div>
                    <div class="px-4 md:pl-9">
                        <p class="mb-1.5 md:mb-3 text-sm md:text-base text-gray-400">{{article.category}}</p>
                        <h3 class="mb-1.5 md:mb-3 text-xl md:text-2xl font-semibold text-gray-600">{{ article.title }}</h3>
                        <p class="mb-1.5 md:mb-3 text-sm md:text-base text-gray-400 custom-text">{{article.description}}</p>
                        <p class="text-sm md:text-base text-gray-400">{{ formatDate(article.createdAt) }} · {{article.author}}</p>
                    </div>
                  </div>
              </nuxt-link>
            </div>
        </div>

        <!-- <div class="mx-auto">
          <button class="bg-blue-500 text-xl text-black p-10" @click="loadMore">아티클 더보기</button>
        </div> -->

<infinite-loading class="pb-12 md:pb-16" @infinite="infiniteHandler" spinner="spiral">
                <div slot="no-more" class="mx-auto">
                  <div class="text-gray-600 font-medium text-base md:text-lg md:pb-2.5 pb-4">더 이상 글이 없네요 😭 <br/> 멤버가 되셔서 직접 글을 써보시는 건 어때요?</div>
                  <div class="text-gray-600 font-medium underline text-sm md:text-base"> <a href="https://cosadama.com/recruit">모집공고 보러가기</a> </div>
                </div>
                <div slot="no-results" class="">
                  <div class="text-gray-600 font-medium text-base md:text-lg md:pb-2.5 pb-4">요청하신 글이 없어요 😭 <br/> 멤버가 되셔서 직접 글을 써보시는 건 어때요?</div>
                  <div class="text-gray-600 font-medium underline text-sm md:text-base"> <a href="https://cosadama.com/recruit">모집공고 보러가기</a> </div>
                </div>
                <div slot="error" slot-scope="{ trigger }" class="text-gray-600 font-medium text-base md:text-lg">
                  뭔가 문제가 있나봐요.
                  <a href="javascript:;" @click="trigger">여기</a> 를 눌러주세요.
                </div>
</infinite-loading>

              <!-- <infinite-loading @infinite="infiniteHandler" spinner="spiral">
                <div slot="no-more">No more message</div>
                <div slot="no-results">No results message</div>
                <div slot="error" slot-scope="{ trigger }">
                  Error message, click
                  <a href="javascript:;" @click="trigger">here</a> to retry
                </div>
              </infinite-loading> -->

    </div>

  </div>
</template>

<script>
export default {

  data() {
    return {
      page: 0,
      limit: 10,
      articles: [],
    };
  },

  
  async fetch() {
    this.articles = await this.fetchData();
  },
  fetchOnServer: true,
  methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('ko', options)
        },
        fetchData() {
          return this.$content("articles")
          .limit(this.limit)
          .skip(this.limit * this.page)
          .sortBy('createdAt', 'desc')
          .fetch();
        },
        infiniteHandler($state) {
          setTimeout(async () => {
            this.page += 1;
            let additionalItems = await this.fetchData();
            if (additionalItems.length > 0) {
              this.articles.push(...additionalItems);
              $state.loaded();
            } else {
              $state.complete();
            }
          }, 500);
        },
  },

  // async asyncData({ $content, params }) {
  //   const page = ref(0);
  //   const articles = await $content('blog', params.slug)
  //     .sortBy('createdAt', 'desc')
  //     .limit(10)
  //     .fetch();
  //   return {
  //     articles
  //   }
  // },



}
</script>

<style scoped>
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
    border-radius: 70%;
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
