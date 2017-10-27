# XMLHttpRequest
## XMLHttpRequest对象的属性
1. readystate 请求状态
	- 0  初始化状态
	- 1  open()方法已调用，但是send()方法未调用，请求没有被发送
	- 2  send()方法已调用，http请求已发送到web服务器，但未接收到响应
	- 3  所有响应头部已经接收到了，响应体开始接收但未完成
	- 4  http响应已经全部接收
	
	**请求状态的值变化时，都会触发onreadystatechange事件**

2. responseText 服务器端的文本相应，是字符串

	这里如果是简单的json形式，可以使用JSON.parse()转换为对象
3. responseXML 服务器端的响应，结果格式是XML Document对象
4. status 请求返回的状态码(只读状态，不能改)

	- 200 请求成功
	- 301 永久重定向，所请求的资源移动到新的url，浏览器自动跳转到新的url
	- 302 临时重定向
	- 304 协议缓存
	- 400 客户端请求语法出错
	- 403 
	- 404 未找到资源
	- 500 服务器内部出错
	- 502 网关出错
	- 503 服务器不可用（超载或停机维护）
	- 504 网关超时
	
	[具体的可以看这里](https://juejin.im/post/590082e6a22b9d0065be1a5c)

5. statusText 响应行状态

## XMLHttpRequest对象的方法
### open(method, URL, saynch)建立对服务器的调用
1. method  向服务器发送信息的方式
2. URL表示调用的服务器资源的URL
3. asynch是一个布尔值，默认是true，表示异步。false表示同步

### send(data)方法  向服务器发送请求
参数data的几种类型：

- ArrayBuffer
- Blob
- Document
- DOMString
- FormData
- null

如果请求声明为异步的，这个方法会立即返回，否则会等待，知道接收到响应为止。如果是GET/HEAD请求，send()方法一般不传参数或者直接传null。send(data)中的data会影响content-type的默认值：

1. 如果data是document的类型，同时也是HTML Document类型，content-type的默认值为text/html;charset=UTF-8;否则为application/xml;charset=UTF-8;
2. data是DOMString类型，content-type默认为text/plain;charset=UTF-8
3. data是FormData类型，content-type默认为multipart/form-data;boundary=[xxx]
4. data如果是其他类型，则不会设置content-type的值

## XMLHttpRequest发送请求
1.  send()方法必须在open()之后
2. 使用GET方式不需要填写采纳数
3. 在使用POST方式时需要使用setRequestHeader()添加http头，然后在send()方法中规定希望的数据格式.

```
xhr.open('POST', './data.json', true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send("fname=Henry&lname=Ford");
```
## 盒模型
### 分类
1. 标准盒模型：我们在css样式里设置的width就是content的宽度，在浏览器看到的一个div的外边距是content的宽度+padding宽度+border宽度
2. 怪异盒模型：我们在css样式里设置的width就是一个div的外边距，包含了content+padding+border
这里我们设置标准盒模型和怪异盒模型可以使用css中的box-sizing这个属性来设置

    ```dash
    box-sizing:content-box; 标准盒模型
    box-sizing:border-box;怪异盒模型
    ```
    
### 应用场景
1. 自适应三列布局，三列按比例，其中一个一列的文字距离两边有固定的距离。

### 浏览器兼容问题
IE8以及以上版本支持该属性，火狐浏览器加上-moz-前缀
## 元素
### 块级元素与行级元素
1. 块级元素:默认宽度占父元素的宽，垂直分布，宽和高可以设置。
2. 行内元素：不可以设置宽高，宽高由内容撑开，不可以设置margin-top,margin-bottom，padding-top,padding-bottom。水平分布
3. 行内元素和块级元素的转换
    +  块级元素转换成行内元素的方法： 浮动或者display:inline;
    + 行内元素转换成块级元素的方法： display:block;
    
### 浮动
浮动元素脱离文档流，浮动元素常见的问题：

1. 两个并列的元素，前一个元素浮动，脱离文档流，后面的元素会顶上去。如果想要清除浮动的效果，常见的方法有：
    - 可以设置后一个元素clear:both;
    - 或者给后一个元素也设置浮动;
2. 一个父元素里面有一个子元素，子元素浮动了，脱离文档流会导致父元素没有高度，高度塌陷的问题。
    - 给父元素设置固定高
    - 给父元素设置一个类，给这个类加上一个clearfix的类名，设置
    ```
    .clearfix:after {content:'';clear:both;display:block;}
    ```
    - 给父元素也浮动
    - 给父元素设置overflow:auto或者hidden，触发BFC事件
    
## DOM操作
### 添加操作

- createElement()添加元素节点
- createTextNode()添加本文节点

### 插入操作(插入的过程就是移动)
- appendChild()
- insertBefore()   

### 查找操作

- nextSibling查找下一个元素，但是无法排除换行符和注释的代码
	
	```
	<div id="div1">
		<ul id="ul1">
			<li>111</li>
			<li>222</li>
			<li>333</li>
		</ul>
	</div>
	<div id="div2">哈哈
		<span id="span1">123</span>
	</div>
	<script>
		var oDiv = document.getElementById('div1');
		console.log(oDiv.nextSibling);//#text
	</script>
	```
封装next()函数：

	```
	function next(node) {
		var nextNode = node.nextSibling;
		while (nextNode && nextNode.nodeType !== 1) {
			nextNode = nextNode.nextSibling;
		} 
		return nextNode;
	}
	```
- prevSibling，同上面的问题一样
- getElementById()
- getElementsByTagName()
- getElementsByClassName()兼容性问题

```
function getClassName (name) {
	if (document.getElementsByClassName) {
		return document.getElementsByClassName(name);
	} else {
		var nodes = document.getElementsByTagName('*');
		var results = [];
		for (var i=0; i<nodes.length; i++) {
			if (nodes[i].className === name) {
				results.push(nodes[i]);
			}
		}
		return results;
	}
}
```
- querySelector()
- querySelectorAll()

### 删除
- removeChild

### 复制
- cloneNode(boolean)

	参数为true，是深复制，复制本身和子节点， false是浅复制，只复制本身
	
## 数据类型
- 基本数据类型 undefined, null, boolean, string, number
- 引用数据类型  object

### 判断数据类型的方法：
1. typeof 不能判断null和object
2. instanceof 其__proto__属性是否构造函数的原型  
	对于基本类型，有问题。例如直接var a = 1; a instanceof Number;返回的是false
3. Object.prototype.toString.call(）







