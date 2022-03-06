<template>
<div>
    <div class="relative">
        <div class="bg-img section w-full py-48 sm:py-64 md:py-72 xl:py-80 inline-block" style="background-image: url(category.jpg)"></div>
        <div class="absolute bottom-0 w-full h-full bg-gradient-to-t from-zinc-800"></div>
        <div class="absolute bottom-0 w-full">
        <div class="max-w-7xl mx-auto pb-6 md:pb-14 px-6 md:px-6">
            <div class="text-white font-semibold text-3xl md:text-4xl pb-2.5 md:pb-4">
                카테고리
            </div>
            <div class="text-slate-300 text-sm md:text-base keep-all">
            원하는 주제가 있다면 스스로 공부하고 커뮤니티에 나눠요. <br class="hidden md:inline"/> 아래는 코사다마의 멤버들이 다양한 주제를 공부한 흔적이에요.
            </div>
        </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto pt-9 md:pt-16 pb-12 md:pb-24 px-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-2 md:gap-y-5">
        <div v-for='category of categories' :key="category">
            <nuxt-link :to='`/category/${category.slug}`'>
            <div class="group relative">
                <div class="lead-box rounded-lg h-52 sm:h-60 md:h-72 mb-5 bg-slate-500 bg-img group-hover:scale-105 transition duration-300" :style="{ backgroundImage: `url(/${category.img})` }">
                <div class="absolute bottom-0 w-full h-full bg-gradient-to-t from-zinc-600 rounded-lg"></div>
                <div class="absolute bottom-0 w-full py-6 px-6">
                    <div class="text-white text-2xl font-medium pb-2">{{category.slug}}</div>
                    <div class="text-slate-300 text-sm keep-all">{{category.description}}</div>
                </div>
                </div>
            </div>
            </nuxt-link>
        </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const categories = await $content('category', params.slug)
        .sortBy('order', 'asc')
        .fetch();
        return { categories }
    },
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