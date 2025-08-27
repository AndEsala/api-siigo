import { Expose } from "class-transformer";

export class ProviderDtoBase {
    @Expose()
    id: string;

    @Expose()
    identification: string;

    @Expose()
    name: string;
}

export class CreateProviderDto {}
