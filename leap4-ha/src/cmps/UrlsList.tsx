import { UrlPreview } from './UrlPreview';
import { useSelector, RootStateOrAny } from 'react-redux';
import { InitialState } from '../interfaces/interfaces';
import { useDispatch } from 'react-redux';
import urlService from '../services/urlService';
import { setUrlsFromDB } from '../redux/actions';
import { useEffect } from 'react';
import loader from '../assets/images/loader.json';
import Lottie from 'lottie-react';

export const UrlsList = () => {
    const dispatch = useDispatch();

    const { urls } = useSelector<RootStateOrAny>(
        state => state.urlReducer
    ) as InitialState;

    useEffect(() => {
        const getAllUrls = async () => {
            const urlsFromDB = await urlService.getAllUrls();
            if (urlsFromDB.error)
                return console.log('there was an error', urlsFromDB.error);
            if (!urlsFromDB.urls.length) return dispatch(setUrlsFromDB(null));
            dispatch(setUrlsFromDB(urlsFromDB.urls));
        };
        getAllUrls();
    }, []);

    if (!urls) return <h1>No urls yet, want to add the first one?</h1>;
    if (!urls.length)
        return <Lottie animationData={loader} loop={true} autoPlay={true} />;

    return (
        <div className="urls-container flex">
            {urls.map((url, idx) => {
                return <UrlPreview key={idx} url={url} />;
            })}
        </div>
    );
};
