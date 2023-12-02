// 类装饰器
const doc:ClassDecorator = (target:any)=>{
    console.log(target);//[class ceshiDemo]
    target.prototype.name = "xiaoshuai"
}
@doc
class classDoc{
    constructor(){

    }
}
const d:any = new classDoc();
console.log(d.name); //xiaoshuai 

// 属性装饰器

const docc:PropertyDecorator = (target:any,key:string|symbol)=>{
    console.log(target,key); //{} name  {}指向attrDoc的原型对象，name为属性名
}

class attrDoc{
    @docc
    public name:string
    constructor(){
        this.name = '小帅'
    }
}

// 方法装饰器

const doccc:MethodDecorator = (target:any,key:string|symbol,desc:any)=>{
    console.log(target,key,desc);
    /**
     * {} getName {
            value: [Function: getName],
            writable: true,
            enumerable: false,
            configurable: true
        }
     */
}

class methodClass{
    constructor(){}
    @doccc
    getName(){
        
    }
}

const m = new methodClass();
console.log(m.getName);

// 参数装饰器

const docccc:ParameterDecorator = (target: any, key: string | symbol | undefined, index: number)=>{
    console.log(target,key,index);//{} getName 1     1:表示参数所在位置
    
}

class parameClass{
    
    constructor(){

    }
    getName(name:string,@docccc age:number){
         
    }
}

const p = new parameClass();
console.log(m.getName);

