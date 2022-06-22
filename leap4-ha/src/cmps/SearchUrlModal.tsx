import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import {
    ChangeEvent,
    FunctionComponent,
    MutableRefObject,
    SyntheticEvent,
    useEffect,
    useRef,
    useState,
    useContext,
} from 'react';
import urlService from '../services/urlService';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';

interface Props {
    closeModal: () => void;
}

export const SearchUrlModal: FunctionComponent<Props> = ({ closeModal }) => {
    const notificationHandler = useContext(SnackbarHandlerContext);
    const [isLoading, setLoading] = useState(false);
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [id, setId] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSearchUrl = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!id) return;
        setLoading(true);
        const res = await urlService.getUrlById(id);
        if (res.error) {
            notificationHandler.error(res.error.message.message);
            setLoading(false);
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
            return;
        }
        setUrl(res.originalUrl);
        setLoading(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (url) setUrl('');
        setId(event.target.value);
    };

    return (
        <div className="add-url-form-container">
            <form className="add-url-form flex column" onSubmit={onSearchUrl}>
                <TextField
                    name="id"
                    label="Url ID"
                    variant="outlined"
                    value={id}
                    onChange={handleChange}
                    disabled={isLoading}
                    inputRef={inputRef}
                />
                {url && (
                    <p>
                        Original URL Address: <strong>{url}</strong>
                    </p>
                )}
                <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    disabled={Boolean(url)}
                >
                    Search URL by ID
                </LoadingButton>
            </form>
        </div>
    );
};
