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

