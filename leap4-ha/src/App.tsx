import React, { MutableRefObject, useRef, useState } from 'react';
import { AddUrlForm } from './cmps/AddUrlForm';
import './assets/styles/global.scss';
import { UrlsList } from './cmps/UrlsList';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
    const [openModal, setOpen] = useState(false);
    const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>;

    const handleOpenModal = () => setOpen(true);

    const handleCloseModal = () => {
        setOpen(false);

        //Using setTimeout because I need to wait for setOpen to end
        setTimeout(() => {
            buttonRef.current.blur();
        }, 100);
    };

    return (
        <div className="App">
            <Provider store={Store}>
                <div className="content flex column center">
                    <Button
                        variant="contained"
                        onClick={handleOpenModal}
                        ref={buttonRef}
                    >
                        Add New URL
                    </Button>
                    <Modal open={openModal} onClose={handleCloseModal}>
                        <Box sx={style}>
                            <AddUrlForm closeModal={handleCloseModal} />
                        </Box>
                    </Modal>
                    <UrlsList />
                </div>
            </Provider>
        </div>
    );
}

export default App;
