import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '叼毛你成功了!';
  }
  getName():string{
    return 'xxx'
  }
}
