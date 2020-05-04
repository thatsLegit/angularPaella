export interface TokenResponse {
    access_token: string;
    token_type: TokenTypeEnum;
    expires_in: number;
    scope: string;
}

export enum TokenTypeEnum {
    BEARER = "Bearer"
}