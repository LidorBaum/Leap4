import { Tooltip } from '@mui/material';
import { Url } from '../interfaces/interfaces';
export const UrlPreview = ({ url }: { url: Url }) => {
    return (
        <div className="url-card flex column">
            <p className="original-url">
                Original address: <strong>{url.originalUrl}</strong>
            </p>
            <p className="mapped-url">
                Mapped address: <strong>{url.mappedUrl}</strong>
            </p>
        </div>
    );
};
