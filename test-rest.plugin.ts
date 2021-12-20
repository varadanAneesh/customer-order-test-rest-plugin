import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { TestRestController } from './test-rest.controller';
import { TestRestService } from './test-rest.service';

@VendurePlugin({
  imports: [PluginCommonModule],
  controllers: [TestRestController],
  providers:[TestRestService]
})
export class TestRestPlugin {}