import { Expose } from "class-transformer";

export class AccountGroupDtoBase {
    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    name: string;
}

export class AccountGroupDto extends AccountGroupDtoBase {
    @Expose()
    accountGroup: any;

    @Expose()
    type: string;

    @Expose()
    stockControl: true;

    @Expose()
    active: true;

    @Expose()
    taxClassification: string;

    @Expose()
    taxIncluded: string;

    @Expose()
    taxConsumptionValue: number;

    @Expose()
    taxes: any;

    @Expose()
    prices: any;

    @Expose()
    unit: any;

    @Expose()
    key: any;

    @Expose()
    unitLabel: string;

    @Expose()
    reference: string;

    @Expose()
    description: string;

    @Expose()
    additionalFields: any;

    @Expose()
    availableQuantity: number;

    @Expose()
    warehouses: any;

    @Expose()
    metadata: any;
}