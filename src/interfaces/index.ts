export enum CoinTypes {
    OneEuro = 100,
    FiftyCents = 50,
    TwentyCents = 20,
    FiveCents = 5,
    TwoCents = 2,
    OneCent = 1,
}

export interface ICoin {
    readonly name: string;
    readonly value: CoinTypes;
    inventory: number;
}
