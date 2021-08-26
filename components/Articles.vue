<template>
    <div class="articles">
        <div class="article" v-for="article of articles" :key="article">
        <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
            <div class="article-inner">
            <img :src="require(`~/assets/resources/${article.img}`)" alt="" />
            <div class="detail">
                <p class="category">{{article.category}}</p>
                <h3 class="title">{{ article.title }}</h3>
                <p class="datetime">{{ article.datetime }}</p>
            </div>
            </div>
        </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const articles = await $content('blog', params.slug)
        .only(['title', 'description', 'img', 'datetime', 'category', 'slug'])
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
    .articles {
        margin: 0 auto;
        max-width: 1080px;
    }
    .article{
        margin: 1rem 2.7rem 2rem;
        display: inline-flex;
    }
    .article-inner{
        position: relative;
        width: 28rem;
    }
    .article-inner img {
        width: 100%;
        max-width: 450px;
    }
    .article-inner .detail{
        padding: 1rem 0rem;
    }
    .category{
        color: #8B95A1;
        font-weight: 400;
        font-size: 0.85rem;
        padding-bottom: 0.8rem;
    }
    .title{
        color: #333D4B;
        font-weight: 600;
        font-size: 1.8rem;
        padding-bottom: 0.8rem;
    }
    .datetime{
        color: #8B95A1;
        font-weight: 400;
        font-size: 0.85rem;
    }
</style>