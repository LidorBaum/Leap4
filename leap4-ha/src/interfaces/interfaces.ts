export interface Url {
    originalUrl: string;
    mappedUrl: string;
}

export interface InitialState {
    urls: Url[];
}
