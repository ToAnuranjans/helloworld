export interface ICountry {
    country_code: string;
    country_name: string;
    states: IState[];
}

export interface IState {
    state_code: string;
    state_name: string;
}

export interface ICity {
    city_code: string;
    city_name: string;
    localities: ILocality[]
}

export interface ILocality {
    locality_code: string;
    locality_name: string;
    latitude: string;
    longitude: string;
}