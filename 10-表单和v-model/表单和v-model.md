## 10 表单和 v-model

在本课中，我们将介绍属性绑定的概念。

------

### 10.1 目标

为用户创建一个表单以添加产品评论。

------

### 10.2 v-model简介

在之前的课程里，我们了解了`v-bind` ，它创建了从数据到模板的单向绑定。但是在使用表单时，这种单向绑定是不够的。我们还需要从模板绑定到数据。

例如常用的登录界面，当用户在输入框中输入用户名和密码时，我们希望在数据中记录和存储数据并传递出去。`v-model`指令帮助我们实现这一点，创建双向数据绑定。

![image-20220125093427306](C:\Users\gdd93\AppData\Roaming\Typora\typora-user-images\image-20220125093427306.png)

```javascript
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
```

📄**login.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>传达事件</title>
    <!-- 导入式样 -->
    <link rel="stylesheet" href="./assets/styles.css" />
    <!-- 导入 Vue.js -->
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="app">
        <div class="nav-bar"></div>
        <v-model-demo></v-model-demo>
    </div>
    <!-- 导入编写的javascript -->
    <script src="./main.js"></script>
    <!-- 导入Components -->
    <script src="./components/VModelDemo.js"></script>
    <!-- 挂载App -->
    <script>
        const mountedApp = app.mount('#app')
    </script>
</body>
</html>
```

我们这节课也是讲`v-model`该如何使用，我们接下来在原有代码的基础上做修改。

------

### 10.3 审阅表单组件

我们将向组件文件夹中添加新的**ReviewForm.js**文件。

📄**components/ReviewForm.js**

```javascript
app.component('review-form', {
    template:
    /*html*/
    `<form class="review-form">
        <h3>评价：</h3>
        <label for="name">姓名:</label>
        <input id="name">

        <label for="review">内容:</label>      
        <textarea id="review"</textarea>

        <label for="rating">等级:</label>
        <select id="rating"">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="提交">  

    </form>`,
    data() {
        return {
            name: '',
            review: '',
            rating: null,
        }
    },
})
```

在我们的模板中，请注意以下元素：

- `<input id="name">`
- `<textarea id="review">`
- `<select id="rating">`

我们希望将这些输入字段绑定到它们各自的数据属性，以便在用户填写表单时，我们在本地存储其数据。

```javascript
data() {
	return {
		name: '',
		review: '',
        rating: null
	}
}
```

我们将通过将`v-model`指令添加到每个输入元素来实现此目的。

📄**components/ReviewForm.js**

```javascript
app.component('review-form', {
    template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit">
        <h3>评价：</h3>
        <label for="name">姓名:</label>
        <input id="name" v-model="name">

        <label for="review">内容:</label>      
        <textarea id="review" v-model="review"></textarea>

        <label for="rating">等级:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="提交">  

    </form>`,
    data() {
        return {
            name: '',
            review: '',
            rating: null,
        }
    },
})
```

请注意，在`<select>`元素上，我们使用了`v-model.number` ，它将数据类型化为数字。

------

#### 10.3.1 提交审核表格

为了提交此表单，我们将在顶部添加一个侦听器：

📄**components/ReviewForm.js**

```javascript
app.component('review-form', {
	template:
	/*html*/
	`<form class="review-form" @submit.prevent="onSubmit">
		...
		<input class="button" type="submit" value="Submit">  
	</form>`
	...
})
```

我们正在使用另一个修饰符，`@submit.prevent="onSubmit"`以防止默认行为（浏览器刷新）。提交此表单后，它将触发该方法`onSubmit()`，我们现在将编写该方法：

**Tips**：`.prevent` 表示提交以后不刷新页面，`prevent`是`preventDefault`，阻止标签默认行为，有些标签有默认行为，例如a标签的跳转链接属性`href`等。

`submit`点击默认行为是提交表单，这里并不需要它提交,只需要执行`onSubmit`方法，故阻止为好。

📄**components/ReviewForm.js**

```javascript
...
    data() {
        return {
            name: '',
            review: '',
            rating: null
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
            }
            this.$emit('review-submitted', productReview)

            this.name = ''
            this.review = ''
            this.rating = null
        }
    }
...
```

该方法将创建一个`productReview`对象，其中包含来自我们的`data` 的`name` 、`review`和`rating` .然后，它将`$emit`一个`review-submitted`事件，并将其`productReview`作为参数发送。

------

#### 10.3.2 使用审阅表单

现在，我们的审阅表单已创建，我们可以将其导入**index.html**.

📄**index.html**

```html
<!-- Import Components -->
...
<script src="./components/ReviewForm.js"></script>
...
```

然后，我们将进入`ProductDisplay.js` ，并在`product-display`模板中添加使用`review-form`组件。

📄**components/ProductDisplay.js**

```html
template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
     ...
    </div>
    <review-form></review-form>
  </div>`
})
```

现在在浏览器中，我们可以看到评论表单。

![image-20220125103041986](C:\Users\gdd93\AppData\Roaming\Typora\typora-user-images\image-20220125103041986.png)

它看起来不错，但是我们单击提交按钮，什么也没有发生，除非我们将发出提交事件，然后接收它，就像我们在上一课中学到的那样，我们需要侦听父作用域（在 `product-display`中）的`review-submitted`中的事件。

当事件被"听到"时，我们会将`productReview`添加到`product-display`组件的数据中。

------

#### 10.3.3 添加产品评论

我们将在`review-form` 上添加事件侦听：

📄**components/ProductDisplay.js**

```html
template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
     ...
    </div>
    <review-form @review-submitted="addReview"></review-form>
  </div>`
})
```

当事件发生时，我们将触发一个新方法`addReview()`。这将向我们的`product-display`组件添加产品评论，这意味着该组件的数据中需要一个新的`reviews`数组。

📄**components/ProductDisplay.js**

```javascript
...
data() {
  return {
    ...
    reviews: []
  }
}
...
```

现在让我们充实一下方法：`addReview()`

📄**components/ProductDisplay.js**

```javascript
...
data() {
  return {
    ...
    reviews: []
   }
 },
methods: {
  ...
  addReview(review) {
    this.reviews.push(review)
  }
},
...
```

现在它存进了我们从`review-submitted`事件中获得的`review`内容，并将其推送到`reviews`数组中。

------

### 10.4 显示评论

现在，我们已经实现了添加评论的功能，我们需要显示这些评论。让我们创建一个新组件来执行此操作。该组件将被称为`review-list` ，我们将像这样构建：

📄**components/ReviewList.js**

```javascript
app.component('review-list', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="review-container">
        <h3>预览:</h3>
        <ul>
            <li v-for="(review, index) in reviews" :key="index">
                {{ review.name }} 给了 {{ review.rating }} 颗星
                <br/>
                "{{ review.review }}"
                <br/>
            </li>
        </ul>
    </div>
`
})
```

它将有一个 prop，以便它可以接收`reviews` 并使用`v-for`模板打印它们，我们这次使用了`index` ，以便我们可以将`:key`属性绑定到它。

现在我们可以在 **index.html** 中导入此组件：

📄**index.html**

```html
<!-- 导入Components -->
...
<script src="./components/ReviewList.js"></script>
...
```

然后把`review-list`添加到`product-display`中的`review-form`组件上方

📄**components/ProductDisplay.js**

```javascript
template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
     ...
    </div>
    <review-list :reviews="reviews"></review-list>
    <review-form @review submitted="addReview"></review-form>
  </div>`
})
```

请注意我们是如何添加`:reviews="reviews"`的，以便我们可以将`reviews`从`product-display`放到`review-list`里

在浏览器中签出此内容后，我们将添加新的评论，单击"提交"，然后查看显示该评论。

![image-20220124163949254](C:\Users\gdd93\AppData\Roaming\Typora\typora-user-images\image-20220124163949254.png)

到目前为止，一切都很好，但是当我们刷新（并没有评论）时，我们仍然看到一个空框，因为`review-list`组件仍在渲染，没有评论可以打印出来。让我们修复它，并且仅在必须`reviews`显示时才呈现该组件。

📄**components/ProductDisplay.js**

```javascript
template: 
  /*html*/
  `<div class="product-display">
    ...
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    ...
  </div>`
})
```

换句话说，如果`reviews`数组为空，我们将不会显示`review-list`组件。

刷新后，它看起来正在工作，并且该组件仅在我们添加评论后显示。

------

### 10.5 基本表单验证

为了完成本课，我们将向我们的`review-form`加一些基本的验证

📄**components/ReviewForm.js**

```javascript
    methods: {
        onSubmit() {
            if (this.name === '' || this.review === '' || this.rating === null || this.recommend === null) {
                alert('亲，请填满所有字段.')
                return
            }

            ...
    }
```

在创建`productReview`之前，我们将检查`this.name`、`this.rating`或`this.review`是否为空。如果是这种情况中的任何一个，我们将显示一个`alert` 。

![image-20220124164019517](C:\Users\gdd93\AppData\Roaming\Typora\typora-user-images\image-20220124164019517.png)



完整代码：

📄**components/ProductDisplay.js**

```javascript
app.component('product-display', {
    props: {
        premium: {
        type: Boolean,
        required: true
        }
    },
    template: 
        `<div class="display">
            <div class="container">
                <div class="image">
                    <!-- 图片放在这-->
                    <img :src="image">
                </div>
                <div class="info">
                    <h1>{{ title }}</h1>
                    <p v-if="inSlanket > 10">有货</p>
                    <p v-else-if="inSlanket <= 10 && inSlanket > 0">快要卖光了</p>
                    <p v-else>缺货</p>
                    <ul>
                        <li v-for="detail in details">{{ detail }}</li>
                    </ul>
                    <div 
                        v-for="(item, index) in items" 
                        :key="item.id" 
                        @mouseover="updateItem(index)"
                        class="color-circle"
                        :style="{ backgroundColor: item.attrs }">
                    </div>
                    <p>运费: {{ shipping }}</p>
                    <button 
                        class="button" 
                        :class="{ disabledButton: !inSlanket }" 
                        :disabled="!inSlanket" 
                        @click="addToCart">
                        添加到购物车
                    </button>
                    <button 
                        class="button" 
                        :class="{ disabledButton: !inSlanket }" 
                        :disabled="!inSlanket" 
                        @click="removeFromCart">
                        删除商品
                    </button>
                </div>
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>`,
    data() {
        return {
            imginfo: '加厚毛毯',
            brand: 'DDTalk',
            details: ['羊羔绒', '加厚', '保暖'],
            items: [
                    { id: 001, attrs: '#1a65c0', image: './assets/images/blue.png', quantity: 50 },
                    { id: 002, attrs: '#ecb563', image: './assets/images/yellow.png', quantity: 0 }
            ],
            selectedItem: 0,
            reviews: []
        }
    },
    computed: {
        title() {
            return this.brand + '牌' + this.imginfo
        },
        image() {
            return this.items[this.selectedItem].image
        },
        inSlanket() {
            return this.items[this.selectedItem].quantity
        },
        shipping() {
            if (this.premium) {
                return '免费'
            }
            return 9.9
        },
    },
    methods: {
        updateItem(index) {
            this.selectedItem = index
        },
        addToCart() {
            this.$emit('add-to-cart', this.items[this.selectedItem].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.items[this.selectedItem].id)
        },
        addReview(review) {
            this.reviews.push(review)
        }
    }
})
```

📄**components/ReviewForm.js**

```javascript
app.component('review-form', {
    template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit">
        <h3>评价：</h3>
        <label for="name">姓名:</label>
        <input id="name" v-model="name">

        <label for="review">内容:</label>      
        <textarea id="review" v-model="review"></textarea>

        <label for="rating">等级:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="提交">  

    </form>`,
    data() {
        return {
            name: '',
            review: '',
            rating: null,
        }
    },
    methods: {
        onSubmit() {
            if (this.name === '' || this.review === '' || this.rating === null || this.recommend === null) {
                alert('亲，请填满所有字段.')
                return
            }

            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
            }
            this.$emit('review-submitted', productReview)

            this.name = ''
            this.review = ''
            this.rating = null
        }
    }
})
```

📄**components/ReviewList.js**

```javascript
app.component('review-list', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="review-container">
        <h3>预览:</h3>
        <ul>
            <li v-for="(review, index) in reviews" :key="index">
                {{ review.name }} 给了 {{ review.rating }} 颗星
                <br/>
                "{{ review.review }}"
                <br/>
            </li>
        </ul>
    </div>
`
})
```

📄**index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>传达事件</title>
    <!-- 导入式样 -->
    <link rel="stylesheet" href="./assets/styles.css" />
    <!-- 导入 Vue.js -->
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="app">
        <div class="nav-bar"></div>
        <div class="cart">购物车({{ cart.length }})</div>
        <product-display 
            :premium="premium" 
            @add-to-cart="updateCart"
            @remove-from-cart="removeById">
        </product-display>
    </div>
    <!-- 导入编写的javascript -->
    <script src="./main.js"></script>
    <!-- 导入Components -->
    <script src="./components/ProductDisplay.js"></script>
    <script src="./components/ReviewForm.js"></script>
    <script src="./components/ReviewList.js"></script>
    <script src="./components/VModelDemo.js"></script>
    <!-- 挂载App -->
    <script>
        const mountedApp = app.mount('#app')
    </script>
</body>
</html>
```

📄**main.js**

```javascript
const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeById(id) {
            const index = this.cart.indexOf(id)
            if (index > -1) {
               this.cart.splice(index, 1)
            }
        }
    }
})
```

