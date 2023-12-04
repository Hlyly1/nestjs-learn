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

