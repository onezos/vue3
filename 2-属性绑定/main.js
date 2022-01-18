const app = Vue.createApp({
    data() {
        return {
            imginfo: 'Hello Vue3',
            image: './assets/images/vue.png'
        }
    }
});
const mountedApp = app.mount('#app');