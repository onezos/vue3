app.component('v-model-demo', {
    template: `
    <div class="model-display">
        <form class="model-form">
            <h3 class="model-h3">后台管理系统</h3>
            <label>用户名:<input v-model="username" /></label>
            <label>密码:<input v-model="password" /></label>
            <input class="button" type="submit" value="登录">  
        </form>
    </div>`,
    data() {
        return {
            username: 'dd talk',
            password: ''
        }
    }
})