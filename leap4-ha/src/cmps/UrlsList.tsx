import { UrlPreview } from './UrlPreview';
import { useSelector, RootStateOrAny } from 'react-redux';
import { InitialState } from '../interfaces/interfaces';

export const UrlsList = () => {
    const { urls } = useSelector<RootStateOrAny>(
        state => state.urlReducer
    ) as InitialState;

    if (!urls.length) return <h1>No urls yet, want to be the first one?</h1>;

    return (
        <div className="urls-container flex">
            {urls.map((url, idx) => {
                return <UrlPreview key={idx} url={url} />;
            })}
        </div>
    );
};
