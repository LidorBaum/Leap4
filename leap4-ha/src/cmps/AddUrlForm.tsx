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
import { useDispatch } from 'react-redux';
import { addUrl } from '../redux/actions';
import urlService from '../services/urlService';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';

interface Props {
    closeModal: () => void;
}
export const AddUrlForm: FunctionComponent<Props> = ({ closeModal }) => {
    const dispatch = useDispatch();
    const notificationHandler = useContext(SnackbarHandlerContext);
    const [isLoading, setLoading] = useState(false);
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [url, setUrl] = useState('');
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onAddUrl = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!url) return;
        setLoading(true);
        const res = await urlService.addUrl(url);
        if (res.error) {
            notificationHandler.error(res.error.message.message);
            setLoading(false);
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
            return;
        }
        closeModal();
        dispatch(
            addUrl({
                originalUrl: res.originalUrl,
                mappedUrl: res.mappedUrl,
                id: res.id,
            })
        );
        notificationHandler.success('URL Address added succesfully');
        setUrl('');
        setLoading(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    return (
        <div className="add-url-form-container">
            <form className="add-url-form flex column" onSubmit={onAddUrl}>
                <TextField
                    name="url"
                    label="Url Address"
                    variant="outlined"
                    value={url}
                    onChange={handleChange}
                    disabled={isLoading}
                    inputRef={inputRef}
                />
                <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                >
                    Add URL!
                </LoadingButton>
            </form>
        </div>
    );
};
