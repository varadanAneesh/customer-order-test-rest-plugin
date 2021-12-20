import { Controller, Get, Post, Body } from '@nestjs/common';
import { Ctx, OrderService, RequestContext } from '@vendure/core'; 
import { TestRestService } from './test-rest.service';
@Controller('test')
export class TestRestController {
  constructor(private testRestService :TestRestService) {}

  @Get()
  getTestData(@Ctx() ctx: RequestContext, @Body() input:any) {
    return this.testRestService.findByCustomerId(ctx,input.ID)
  }
}