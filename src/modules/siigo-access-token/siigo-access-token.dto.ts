import { Exclude, Expose } from "class-transformer";

export class SiigoAccessTokenDtoBase {
    @Expose()
    access_token: string;

    @Expose()
    expires_in: number;

    @Expose()
    expires_at: Date;

    @Expose()
    token_type: string;

    @Expose()
    scope: string;
}

export class SiigoAccessTokenDto extends SiigoAccessTokenDtoBase {
    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date;
}

export class ManageSiigoAccessTokenDto {
    access_token: string;
    expires_in: number;
    expires_at: Date;
    token_type: string;
    scope: string;
}