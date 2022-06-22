import { createContext } from 'react';

interface context {
    success: (message: string) => NodeJS.Timeout | undefined;
    error: (message: string) => NodeJS.Timeout | undefined;
    warning: (message: string) => NodeJS.Timeout | undefined;
    info: (message: string) => NodeJS.Timeout | undefined;
}

export const SnackbarHandlerContext = createContext<context>({
    success: () => undefined,
    error: () => undefined,
    warning: () => undefined,
    info: () => undefined,
});
