<template>
    <div class="w-full p-3 border-b md:border-b border-gray-200">
        <div class="max-w-4xl mx-auto flex items-center justify-between">

            <div class="ml-1.5 md:ml-0">
                <nuxt-link to="/">
                    <HeaderLogo />
                </nuxt-link>
            </div>

            <div class="">
                <ul class="flex space-x-1 text-base items-center">
                    <!-- <li>
                        <div class="py-1 px-2 rounded-lg hover:bg-gray-100">
                            <nuxt-link to="socio" class="text-gray-500 text-sm">사회학</nuxt-link>
                        </div>
                    </li>
                    <li>
                        <div class="py-1 px-2 rounded-lg hover:bg-gray-100">
                            <nuxt-link to="others" class="text-gray-500 text-sm">그 외</nuxt-link>
                        </div>
                    </li> -->
                    <li>
                        <div class="group pl-4">
                            <a href="https://github.com/Team-COSADAMA" target="blank" class="">
                                <GithubLogo />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- <div class="md:hidden flex content-center">
                <button @click="drawer">
                <svg 
                    class="h-8 w-8 fill-current text-black"
                    fill="none" stroke-linecap="round" 
                    stroke-linejoin="round" stroke-width="2" 
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                </button>
            </div>

            <div class="hidden md:block">
                <ul class="flex space-x-3 text-base">
                    <li>
                        <div class="py-2 px-3 rounded-lg hover:bg-gray-100">
                            <nuxt-link to="/" class="text-gray-700">Posts</nuxt-link>
                        </div>
                    </li>
                    <li>
                        <div class="py-2 px-3 rounded-lg hover:bg-gray-100">
                            <a href="http://www.cosadama.com" target="blank" class="text-gray-700">Projects</a>
                        </div>
                    </li>
                    <li>
                        <div class="py-2 px-3 rounded-lg hover:bg-gray-100">
                            <a href="https://github.com/Team-COSADAMA" target="blank" class="text-gray-700">GitHub</a>
                        </div>
                    </li>
                </ul>
            </div>

            <transition
                enter-class="opacity-0"
                enter-active-class="ease-out transition-medium"
                enter-to-class="opacity-100"
                leave-class="opacity-100"
                leave-active-class="ease-out transition-medium"
                leave-to-class="opacity-0"
            >
                <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
                    <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
                </div>
            </transition>

            <aside class="p-5 transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
                
                <div class="close">
                <button class="absolute top-0 right-0 mt-4 mr-4" @click=" isOpen = false">
                    <svg 
                    class="w-6 h-6"
                    fill="none" stroke-linecap="round" 
                    stroke-linejoin="round" stroke-width="2"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                </div>
                
                <ul class="divide-y font-sans mt-4">
                <li><nuxt-link to='/' @click="isOpen = false" class="my-4 inline-block text-gray-700">Posts</nuxt-link></li>
                <li><a href="http://www.cosadama.com" target="blank" @click="isOpen = false" class="my-4 inline-block text-gray-700">Projects</a></li>
                <li><a href="https://github.com/Team-COSADAMA" target="blank" @click="isOpen = false" class="my-4 inline-block text-gray-700">GitHub</a></li>
                <li><a href="http://www.cosadama.com" target="blank" @click="isOpen = false" class="mt-6 inline-block"><FooterLogo/></a></li>
                </ul>
                <p href="#" @click="isOpen = false" class="my-4 inline-block text-sm font-normal text-gray-500">© 2021 COSADAMA, <br/> All Rights Reserved.</p>

            </aside> -->

        </div>
    </div>
</template>

<script>
    export default {
    data() {
        return {
        isOpen: false
        };
    },
    methods: {
        drawer() {
        this.isOpen = !this.isOpen;
        }
    },
    watch: {
        isOpen: {
        immediate: true,
        handler(isOpen) {
            if (process.client) {
            if (isOpen) document.body.style.setProperty("overflow", "hidden");
            else document.body.style.removeProperty("overflow");
            }
        }
        }
    },
    mounted() {
        document.addEventListener("keydown", e => {
        if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
        });
    }
    };
</script>

<style scoped>

</style>