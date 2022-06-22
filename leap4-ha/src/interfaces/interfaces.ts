import { AlertColor } from '@mui/material';

export interface Url {
    originalUrl: string;
    mappedUrl: string;
    id?: string;
}

export interface InitialState {
    urls: Url[];
}

export interface Snack {
    open: boolean;
    message: string;
    severity: AlertColor | undefined;
}
