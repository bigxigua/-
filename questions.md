# 前端面试题集合
#### express和koa的对比，两者中间件的原理，koa捕获异常多种情况说一下
  express是洋葱型，koa是直线型

#### 你项目里用到第三方登录涉及的oAuth(JWT)协议的实现原理，以及你本地的实现原理，第三方登录怎么样保证安全性
   实现登录的方式：
    (1). 用户向服务器发送用户名和密码，服务器验证通过后，在当前会话里保存用户的相关数据，在向客户端返回一个session_id，写入用户的cookie，用户随后的每一次的非跨域请求
    都会带上这个id，服务器再根据这个id去查询用户信息返回到客户端。
    (2). 用户向服务器发送用户名和密码，服务器验证通过后（bcrypt.compare库可用来比较明文密码和加密后密码的一致性）,将用户的唯一标示(用户名)通过jwt.sign生成一个token,用户每次
    请求都带上，然后再服务端去验证这个token的合法性。然后去再去查询用户信息
    (3). 服务端查询到用户信息后，使用特定算法进行加密签名，具体结构为：Header.Payload.Signature，Header里保存加密算法，类别等信息，layOut里包含需要传递的用户信息
     Signature为使用加密算法和密钥等签名字符串，服务端在解析即可===Authorization Header内/POST 请求的数据体里面。对JSON进行加密签名
    安全性： 敏感信息不可放在layout内，不要放在cookie里。过期时间设置小一点。

#### 快排等其他排序方法
  ```javascript
  ```

#### ajax 实现过程
  ```javascript
      xmlhttp = new XmlHttpRequest();
      xmlHttp.open('GET', url, true);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
            }
          }
      }
      xmlhttp.send();
  ```

#### js的事件循环eventloop
  `调用栈` `消息队列` `任务队列`
  调用栈顾名思义是一种栈的结构，当一个函数被调用时，会将该函数推到栈顶部，执行完之后，再推出，而消息队列是web APIs(浏览器)或nodejs内的C/C++ APIs中的一些方法被触发时，等待callback被推到消息队列中，此时`事件循环`会判断当前的调用栈是否为空，如果为空会将回调推倒调用栈顶执行，而任务队列则是es6中的概念，es6中的promise中then里的回调会被推倒任务队列中，任务队列和消息队列的区别是任务队列的优先级比消息队列的要高。

#### wepack打包原理
wepack是一种模块打包机制，它会识别你的入口文件，也就是entry里的入口文件，从入口文件开始，识别你的模块依赖，webpack会对你的代码进行分析，其实webpack所做的就是，分析代码、
转换代码、编译代码、输出代码、webpack本身也是一个node模块，所以所写的webpack.config.js也是以commonjs形式书写的。再说wepack.config.js的结构。包括devtool，entry、output、module(loadder)，plugins、devServer

#### 跨域cookie
  1. 设置xmlHttpRequest.withCrediential为true
  2. 服务端设置CORS头，不能设置为通配符
  3. 服务端设置 ACESS-CONTROL-ALLOW-CREDIENTIAL：true
  注意：如果是post请求，且content-type为：application/json的形式，因为会先发一个OPTIONS的预检请求，所以需要服务端对OPTIONS做同样处理

#### 内存泄露的排除定位和解决方法
  不被js的垃圾回收机制回收的。永远占用内存，js垃圾回收机制会判断一个变量/函数不再被引用时会进行回收，比如：以下代码会产生内存泄漏
  ```javascript
    // 在vue组件中的mounted生命周期内
    mounted() {
      window.addEventLisener('resize', () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      });
    }
  ```
  此时resize事件监听器内的箭头函数中的this指向VUE实例，而this.width又指向了window上的innerWidth属性，发生循环引用，不会被GC回收掉。导致内存泄漏
  解决办法：在组件被销毁时移除事件监听器。
  定位方法：chrome的devtools提供了录制一段时间内内存使用情况的工具，在memory中点击Allocation instrument o

#### websocket实现原理

#### 继承
  继承的大致原理都是让一个一个构造函数的原型等于另一个构造函数的实例，并保证原构造函数的原型的contructor不变。
  ```javascript
    // 组合寄生式继承
    function extendHandle(child, parent) {
      function getInstans(proto) {
        const _fn_ = function () {};
        _fn_.prototype = proto;
        return new _fn_();
      }
      child.prototype = getInstans(parent.prototype);
      // 或者 child.prototype = Object.create(parent.prototype);
      child.prototype.contructor = child;
    }
  ```

#### instansof 运算符的判断原理
  判断一个构造函数/类的prototype属性是否目标对象的原型链上，比如 obj instansof Object
  1. 先判断obj.__proto__ === Object.prototype。是则返回true，否则进行下一步
  2. 判断obj.__proto__.__proto__ ===  Object.prototype, 如此反复。

#### 闭包的作用理解，以及那些地方用过闭包，以及闭包的缺点，如何实现闭包
  当一个函数return出另一个函数，这个函数访问了父函数的内部变量，而返回出的这个函数在外部被执行就产生了闭包.
  闭包的优点：可以读取函数的内部变量，且内部变量不会在外部函数执行完之后清除，会一直保存在内存中，可以减少全局变量污染，在实际应用中闭包常用来封装变量，比如节流函数

#### vue的双向数据绑定的原理
  Object.defineProperty() ,数组的双向绑定是使用
  ```javascript
      var arr = [1, 2];
      var arrayProto = Object.create(Array.prototype);
      Object.defineProperty(arrayProto, 'push', {
        value: Array.prototype.push
      });
      arr.__proto__  = arrayProto;
  ``` 
#### react和vue的区别，你开发如何选择技术栈
    相似之处：虚拟DOM，组件化，props， 构建工具，开发工具 
    主要区别： 
    （1）模版 vs JSX
        vue鼓励我们去写近似常规HTML的模板，并提供了很多方便的模板属性，但vue也是支持render函数和jsx的。只是不默认而已
        react使用javascript的语法扩展-jsx来书写，在react里是all-in-js的。
    （2）对象属性 vs 状态管理
        对于react来说，应用的状态state是很关键的概念，state对象在react应用中是不可变的。意味着它不能被直接改变，需要使用`setState`方法
        而在vue应用中，应用状态由data对象进行管理。可以直接去操作data对象来改变应用状态。多数情况下框架内置的状态管理不足以支撑大型项目。需要配合外部
        的状态管理方案一起使用。

#### 强缓存和协商缓存
  1. 强缓存:由http头部的cache-control或expires字段来控制，强缓存不会发起请求，直接使用浏览器本地或磁盘上缓存的文件，强制刷新可重新发起请求。
  cache-control：max-age=31536000，Expires：Tue, 07 Apr 2020 03:16:14 GMT，同时出现的话cache-control的max-age生效，是否使用缓存由客户端决定。
  cache-control的常用字段：no-cache：不使用本地缓存，可使用协商缓存 no-store：永远不使用缓存，每次都发起一个新的请求来获取完整资源。public：客户端和cdn，中间代理服务器均可缓存，private：只允许客户端浏览器缓存
  2. 协商缓存: 是否使用缓存由服务端来决定，有两个头部对：
    （1）If-Modify-Since和Last-Modify，值表示的是资源在服务端上次更新的时间。命中返回304
    （1）If-None-Match和Etag，值表示的是资源在服务端的摘要字符串。命中返回304

### css相关
#### BFC
  BFC块级格式化上下文，表示的是一个独立的布局环境，BFC中的元素布局不受外部影响，都会由着父元素的垂直方向排列，浮动元素，绝对定位元素，非块级元素，和overflow不为visiable的块级元素均会产生BFC。同一个BFC中垂直排列的元素会产生margin重叠，而BFC也可以用来解决margin重叠，只需要将其放在不同的BFC中即可，BFC也可以解决内部元素浮动时高度无法被撑起来的场景。

### 网络相关
#### TCP的三次握手
  1. 客户端发送SYN(建立联机)和seq=x(顺序号码)，通俗来说就是告诉服务端你在吗？我想建立连接，我是谁
  2. 服务端收到之后发送一个ACK=x+1（确认包）和SYN包，和seq=y，通俗来说就是告诉客户端：我在的，我是谁
  3. 客户端发送ACK=y+1给服务端，建立连接

#### vue的一些优化
  1. 按需加载，异步组件，vue提供了创建组件的工厂函数，配合webpack的代码分割更好。
  2. 合理使用v-if和v-show
  3. 给列表设置唯一key
  4. 对组件进行细粒度化设计，避免一个组件内部状态过多。


#### js尾递归优化

#### 前端性能理解，优化有哪些

#### redux原理讲讲
