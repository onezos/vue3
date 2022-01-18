const app = Vue.createApp({
    data() {
        return {
            hello: 'Hello Vue3'
        }
    }
});
const mountedApp = app.mount('#app');