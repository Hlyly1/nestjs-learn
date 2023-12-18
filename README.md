## nestjs学习

IOC控制反转、DI依赖注入

### 装饰器 

```ts
tsconfig.json需要开启
"experimentalDecorators": true,  
```

1. 类装饰器ClassDecorator
2. 属性装饰器PropertyDecorator
3. 方法装饰器MethodDecorator
4. 参数装饰器ParameterDecorator  

### nestjs实现底层Get 
Get是一个回调函数,回调函数返回MethodDecorator,fnc的参数res,status会返回到getList的参数里面

### nestjs---cli

```
npm i -g @nestjs/cli
```

```
nest new demo //创建项目
```

### 快捷指令生成模板
```
nest --help //查看命令
```
demo
```
nest g resource user //生成一套crud模板
nset g co user //生成controller
nest g mo user //生成module
nest g s user  //生成server
```

### restful风格
```
get post put delete patch 
```
```
//开启版本控制 main.js 开启enableVersioning
app.enableVersioning({
    type:VersioningType.URI
})
//controller开启
@Controller({
    path:'user',
    version:'1'
})
//单个开启
@Version("1") 需要导包Version 来自nestjs/common
开启后地址  http://localhost:3000/v1/user
```
```
//常见code编码
200:Ok 响应成功
304:资源未修改(缓存)
400:参数错误
401:身份验证失败
403:orgin referer验证错误
500:服务器错误
502:上游接口问题或者服务器问题 Bad Gateway
```

### session案例
```
npm i express-session --save
```
```
npm i @types/express-session -D  //express-session让其有代码提示
```
实现验证码安装的库
```
npm install svg-captcha  --save
```
实现
```
@Get('code')
  createCode(@Req() req,@Res() res ,@Session() session){
    console.log(123);
    const captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    })
    // 记录code值
    session.code = captcha.text
    // 为了让返回的内容是一个图片
    res.type('image/svg+xml')
    // 返回图片
    res.send(captcha.data)
  }
  @Post('login')
  userLogin(@Body() body,@Session() session){
    console.log(body,session.code);
    if(session.code === undefined) {
      return {
        code:666
      }
    }
    if(session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()){
      return {
        code:200,
        mgs:"验证码正确"
      }
    }else{
      return{
        code:10001,
        msg:'验证码错误'
      }
    }
  }
```
实现过程回顾
```
配置中间件session
import * as session from 'express-session';
app.use(session({secret:'ayi',rolling:true,name:'ayi.sid',cookie:{maxAge:999999999}})
实现方法获取code值
// 记录code值
session.code = captcha.text
// 为了让返回的内容是一个图片
res.type('image/svg+xml')
// 返回图片
res.send(captcha.data)
1.后端将code值写入session
session会自动携带到响应头Set-Cookie返回
2.前端请求的时候携带cookie  后端通过session.code获取 将表单提交的code进行验证
if(session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()){
    return {
    code:200,
    mgs:"验证码正确"
    }
}else{
    return{
    code:10001,
    msg:'验证码错误'
    }
}
```
secret    生成服务端session 签名 可以理解为加盐
name      生成客户端cookie 的名字 默认 connect.sid
cookie    设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
rolling	  在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
path（路径）：指定 cookie 的有效路径。默认情况下，cookie 只在设置它们的路径及其子路径下可见。例如，path: '/' 表示该 cookie 对于网站的所有路径都可见。

httpOnly（仅限 HTTP）：设置为 true 时，表示该 cookie 只能通过 HTTP 请求发送，不能通过客户端脚本（例如 JavaScript）访问。这样可以增加安全性，防止跨站点脚本攻击（XSS）。

secure（安全）：设置为 true 时，表示该 cookie 只能通过 HTTPS 连接发送。这样可以增加安全性，防止在不安全的连接上传输敏感信息。

maxAge（最大过期时间）：指定 cookie 的最大存活时间（以秒为单位）。设置为 null 或不设置 maxAge 时，表示该 cookie 是一个会话 cookie，仅在用户关闭浏览器时过期。如果设置了一个具体的值，表示该 cookie 将在指定的时间后过期。
