import { MutableRefObject, useRef, useState } from 'react';
import { AddUrlForm } from './cmps/AddUrlForm';
import './assets/styles/global.scss';
import { UrlsList } from './cmps/UrlsList';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SearchUrlModal } from './cmps/SearchUrlModal';
import { SnackbarHandlerContext } from './contexts/SnackbarHandlerContext';
import { SnackbarContext } from './contexts/SnackbarContext';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material';
import { Snack } from './interfaces/interfaces';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function App() {
    const [openAddUrlModal, setOpenAddUrlModal] = useState(false);
    const [openSearchUrlModal, setOpenSearchUrlModal] = useState(false);
    const addButtonRef = useRef() as MutableRefObject<HTMLButtonElement>;
    const searchButtonRef = useRef() as MutableRefObject<HTMLButtonElement>;
    const [snack, setSnack] = useState<Snack>({
        open: false,
        message: '',
        severity: undefined,
    });

    const handleOpenAddUrlModal = () => setOpenAddUrlModal(true);
    const handleOpenSearchUrlModal = () => setOpenSearchUrlModal(true);

    const handleCloseAddUrlModal = () => {
        setOpenAddUrlModal(false);
        //Using setTimeout because I need to wait for setOpen to end
        setTimeout(() => {
            addButtonRef.current.blur();
        }, 100);
    };
    const handleCloseSearchUrlModal = () => {
        setOpenSearchUrlModal(false);
        //Using setTimeout because I need to wait for setOpen to end
        setTimeout(() => {
            addButtonRef.current.blur();
        }, 100);
    };

    const notificationHandler = {
        success: (message: string) => showNotification('success', message),
        error: (message: string) => showNotification('error', message),
        info: (message: string) => showNotification('info', message),
        warning: (message: string) => showNotification('warning', message),
    };

    const showNotification = (severity: AlertColor, message: string) => {
        const snackObj = { severity, message, open: true };
        if (snack.open) {
            setSnack((prevSnack: any) => {
                return { ...prevSnack, open: false };
            });
            return setTimeout(() => {
                setSnack(snackObj);
            }, 100);
        } else setSnack(snackObj);
    };

    const handleClose = () => {
        setSnack((prevSnack: any) => {
            return { ...prevSnack, open: false };
        });
    };

    return (
        <div className="App">
            <Provider store={Store}>
                <SnackbarHandlerContext.Provider value={notificationHandler}>
                    <SnackbarContext.Provider value={{ snack, setSnack }}>
                        {
                            <Snackbar
                                TransitionComponent={Slide}
                                onClose={handleClose}
                                autoHideDuration={3000}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                dir="ltr"
                                open={snack.open}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity={snack.severity}
                                    sx={{ width: '100%' }}
                                >
                                    {snack.message}
                                </Alert>
                            </Snackbar>
                        }
                        <div className="content flex column center">
                            <div className="flex cta center">
                                <Button
                                    variant="contained"
                                    onClick={handleOpenAddUrlModal}
                                    ref={addButtonRef}
                                >
                                    Add New URL
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenSearchUrlModal}
                                    ref={searchButtonRef}
                                >
                                    Get Original URL from ID
                                </Button>
                            </div>
                            <Modal
                                open={openAddUrlModal}
                                onClose={handleCloseAddUrlModal}
                            >
                                <Box sx={style}>
                                    <AddUrlForm
                                        closeModal={handleCloseAddUrlModal}
                                    />
                                </Box>
                            </Modal>
                            <Modal
                                open={openSearchUrlModal}
                                onClose={handleCloseSearchUrlModal}
                            >
                                <Box sx={style}>
                                    <SearchUrlModal
                                        closeModal={handleCloseSearchUrlModal}
                                    />
                                </Box>
                            </Modal>
                            <UrlsList />
                        </div>
                    </SnackbarContext.Provider>
                </SnackbarHandlerContext.Provider>
            </Provider>
        </div>
    );
}

export default App;
