import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import * as svgCaptcha from 'svg-captcha'

@Controller('/user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('getName')
  getName():string{
    return this.appService.getName();
  }
  // session案例
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
}
