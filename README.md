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

