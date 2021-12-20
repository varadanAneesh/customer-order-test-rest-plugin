import { ListQueryBuilder,Order,RequestContext,ID,ListQueryOptions,PaginatedList,translateDeep } from "@vendure/core";
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestRestService{
    constructor(private listQueryBuilder: ListQueryBuilder){}

    async findByCustomerId(
        ctx: RequestContext,
        customerId: ID,
        options?: ListQueryOptions<Order>,
    ): Promise<PaginatedList<Order>> {
        const active = true; // I added this line. Everything else is from the @vendure/core library
        return this.listQueryBuilder
            .build(Order, options, {
                relations: [
                    'lines',
                    'lines.items',
                    'lines.productVariant',
                    'lines.productVariant.options',
                    'customer',
                    'channels',
                    'shippingLines',
                ],
                channelId: ctx.channelId,
                ctx,
            })
            .andWhere('order.customer.id = :customerId', { customerId })
            .andWhere('order.active = :active', { active })
            .getManyAndCount()
            .then(([items, totalItems]) => {
                items.forEach(item => {
                    item.lines.forEach(line => {
                        line.productVariant = translateDeep(line.productVariant, ctx.languageCode, [
                            'options',
                        ]);
                    });
                });
                return {
                    items,
                    totalItems,
                };
            });
    }

}
