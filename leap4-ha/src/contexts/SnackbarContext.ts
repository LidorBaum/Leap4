import { createContext, Dispatch, SetStateAction } from 'react';
import { Snack } from '../interfaces/interfaces';

interface context {
    snack: Snack;
    setSnack: Dispatch<SetStateAction<Snack>>;
}
export const SnackbarContext = createContext<context>({
    snack: { open: false, message: '', severity: undefined },
    setSnack: () => null,
});
