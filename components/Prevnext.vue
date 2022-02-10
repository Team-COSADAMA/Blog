<template>
    <div class="flex justify-between pt-12 px-3">
        <div class="w-5/12 ml-3 md:ml-0 bg-gray-100 rounded-xl p-3 md:px-8 md:py-6 group hover:bg-zinc-200 transition duration-500">
            <NuxtLink v-if="prev" :to="{path: `/articles/${prev.slug}`}" replace>
                <div class="text-center md:text-left text-gray-500">Previous Post</div>
                <div class="hidden md:block text-gray-700 font-medium mt-1">{{ prev.title }}</div>
            </NuxtLink>
            <nuxt-link v-else to='/'>
                        <div class="text-center md:text-left text-gray-500">No Previous Post</div>
                        <div class="hidden md:block text-gray-700 font-medium mt-1 font-medium mt-1">
                            <span>홈으로 돌아가기</span>
                        </div>
            </nuxt-link>
        </div>
        <div class="w-5/12 mr-3 md:mr-0 bg-gray-100 rounded-xl p-3 md:px-8 md:py-6 group hover:bg-zinc-200 transition duration-500">
            <NuxtLink v-if="next" :to="{path: `/articles/${next.slug}`}" replace>
                <div class="text-center md:text-right text-gray-500">Next Post</div>
                <div class="hidden md:block text-right text-gray-700 font-medium mt-1 font-medium mt-1">{{ next.title }}</div>
            </NuxtLink>
            <nuxt-link v-else to='/'>
                <div class="text-center md:text-right text-gray-500">No Next Post</div>
                <div class="hidden md:block text-right text-gray-700 font-medium mt-1 font-medium mt-1">
                    <span>홈으로 돌아가기</span>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
        prev: {
            type: Object,
            default: () => null
        },
        next: {
            type: Object,
            default: () => null
        }
        }
    }
</script>

<style scoped>
</style>