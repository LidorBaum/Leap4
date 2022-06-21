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
} from 'react';
import { useDispatch } from 'react-redux';
import { addUrl } from '../redux/actions';

interface Props {
    //CHECK WHAT IS IT TYPE OF Fn
    closeModal: any;
}
export const AddUrlForm: FunctionComponent<Props> = ({ closeModal }) => {
    const dispatch = useDispatch();
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
        closeModal();
        dispatch(
            addUrl({
                originalUrl: url,
                mappedUrl: url,
            })
        );
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
