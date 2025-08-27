import { Expose, Type } from "class-transformer";
import { ProviderDtoBase } from "../providers/create-provider.dto";

export class DueDtoBase {
    @Expose()
    prefix: string;

    @Expose()
    consecutive: number;

    @Expose()
    quote: number;

    @Expose()
    date: Date;

    @Expose()
    balance: number;
}

export class AccountPayableDto {
    @Expose()
    @Type(() => DueDtoBase)
    due: DueDtoBase;

    @Expose()
    @Type(() => ProviderDtoBase)
    provider: ProviderDtoBase;
}
