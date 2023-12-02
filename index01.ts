import axios from 'axios'

// Get是一个回调函数,回调函数返回MethodDecorator,fnc的参数res,status会返回到getList的参数里面
const Get = (url:string):MethodDecorator =>{
    return (target:any,key:any,desc:PropertyDescriptor)=>{
        const fnc = desc.value; 
        axios.get(url).then(res=>{
            fnc(res,{
                status:200
            })
        }).catch(e=>{
            fnc(e,{
                status:500
            })
        })
    }
}

class Controller{
    constructor(){
        
    }

    @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
    getList(res:any,status:any){
        console.log(res.data.result.list,status);
    }
}
