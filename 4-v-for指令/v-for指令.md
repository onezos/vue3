## 4.`v-for`列表呈现

在本课中，我们将介绍`v-for`的使用。

------

### 4.1 目标

从数据中的数组呈现到页面上的列表。

------

### 4.2 循环访问数据数组

在上一课的代码中，我们添加一个 `details`

📄**main.js**

```javascript
const app = Vue.createApp({
    data() {
        return {
            imginfo: '商品',
            image: './assets/images/smile.png',
            inSmile: 100,
            details: ['20% 眼睛', '10% 嘴', '20% 红脸蛋'],
            ]               
        }
    }
});
const mountedApp = app.mount('#app');
```

现在的问题是：我们如何将这些数据显示为列表？

我们将首先在**index.html**中创建一个无序列表`li`。在它的内部，我们将添加另一个 Vue指令：`v-for`

📄**index.html**

```html
<ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>
```

我们可以用`v-for`指令基于一个数组来渲染一个列表。`v-for` 指令需要使用`detail in details`形式的特殊语法，其中 `details`是源数据数组，而`detail`则是被迭代的数组元素的别名。

![image-20220119192907206](C:\Users\gdd93\AppData\Roaming\Typora\typora-user-images\image-20220119192907206.png)



------

### 4.3 增加产品的种类

为了更熟悉`v-for`，我们将在我们的应用程序中处理另一个示例。让我们向数据中添加一个`items`新数组：

📄**main.js**

```javascript
const app = Vue.createApp({
    data() {
        return {
            imginfo: '商品',
            image: './assets/images/smile.png',
            inSmile: 100,
            details: ['20% 眼睛', '10% 嘴', '20% 红脸蛋'],
            items: [
                    { id: 001, attrs: 'smile'},
                    { id: 002, attrs: 'cry' }
            ]               
        }
    }
});
const mountedApp = app.mount('#app');
```

对应每一个`id`，对应的打印出它的`attrs`

📄**index.html**

```html
<div v-for="item in items" :key="item.id">{{ item.attrs }}</div>
```

完整代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>属性绑定</title>
    <!-- 导入式样 -->
    <link rel="stylesheet" href="./assets/styles.css" />
    <!-- 导入 Vue.js -->
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="app">
        <div class="container">
            <div class="image">
                <!-- 图片放在这-->
                <img :src="image">
            </div>
            <div class="info">
                <h1>{{ imginfo }}</h1>
                <p v-if="inSmile > 10">有货</p>
                <p v-else-if="inSmile <= 10 && inSmile > 0">快要卖光了</p>
                <p v-else>缺货</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div v-for="item in items" :key="item.id">{{ item.attrs }}</div>
            </div>
        </div>
        
    </div>
    <!-- 导入编写的javascript -->
    <script src="./main.js"></script>
</body>

</html>
```

请注意，当我们循环浏览数组时，这次新增加了一个`key`，当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时DOM 状态 (例如：表单输入值) 的列表渲染输出。

![image-20220119195016693](C:\Users\gdd93\AppData\Roaming\Typora\typora-user-images\image-20220119195016693.png)

------

### 4.4 `key`属性：列表项的必备属性

通过`:key="item.id"`我们使用简写`v-bind`将`item`的`id`绑定到`key`属性。这为每个 DOM 元素提供了一个唯一的键，以便 Vue 可以抓住该元素，从而重用和重新排序现有元素时，不会在应用程序中更新时丢失对它的跟踪。

**Tips:**

不要使用对象或数组之类的非基本类型值作为 `v-for` 的 key。请用字符串或数值类型的值

------------------

### 4.5 `v-for` 的索引参数

`v-for` 还支持一个可选的第二个参数，即当前项的索引。

我们修改一下代码

📄**index.html**

```html
<div v-for="(item, index) in items" :key="item.id">{{ index }} -- {{ item.attrs }}</div>
```

页面上就看到索引值了。所以对于普通的数组，我们可以使用索引作为key值。

![image-20220119201802667](C:\Users\gdd93\AppData\Roaming\Typora\typora-user-images\image-20220119201802667.png)

---------------------

### 4.6 `v-for` 中使用对象

你也可以用 `v-for` 来遍历一个对象的 property。

我们修改一下代码，添加个对象

📄**main.js**

```javascript
objs: {
    name: 'zhang san',
    age: 18
}
```

完整代码

```javascript
const app = Vue.createApp({
    data() {
        return {
            imginfo: '商品',
            image: './assets/images/smile.png',
            inSmile: 100,
            details: ['20% 眼睛', '10% 嘴', '20% 红脸蛋'],
            items: [
                    { id: 001, attrs: 'smile'},
                    { id: 002, attrs: 'cry' }
            ],
            objs: {
                name: 'zhang san',
                age: 18
            }
        }
    }
});
const mountedApp = app.mount('#app');
```



📄**index.html**

添加

```html
 <div v-for="(obj, name, index) in objs">{{ index }} - {{ name }}- {{ obj }}</div>
```

参数1是属性值，参数2是属性的名字，参数3是索引值。

完整代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>属性绑定</title>
    <!-- 导入式样 -->
    <link rel="stylesheet" href="./assets/styles.css" />
    <!-- 导入 Vue.js -->
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="app">
        <div class="container">
            <div class="image">
                <!-- 图片放在这-->
                <img :src="image">
            </div>
            <div class="info">
                <h1>{{ imginfo }}</h1>
                <p v-if="inSmile > 10">有货</p>
                <p v-else-if="inSmile <= 10 && inSmile > 0">快要卖光了</p>
                <p v-else>缺货</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div v-for="(item, index) in items" :key="item.id">{{ index }} -- {{ item.attrs }}</div>
                <div v-for="(obj, name, index) in objs">{{ index }} - {{ name }}- {{ obj }}</div>
            </div>
        </div>
        
    </div>
    <!-- 导入编写的javascript -->
    <script src="./main.js"></script>
</body>

</html>
```

页面展示

![image-20220119204426370](C:\Users\gdd93\AppData\Roaming\Typora\typora-user-images\image-20220119204426370.png)
