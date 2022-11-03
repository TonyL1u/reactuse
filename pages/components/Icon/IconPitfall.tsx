/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { memo } from 'react';

export const IconPitfall = memo<JSX.IntrinsicElements['svg']>(function IconPitfall({ className }) {
    return (
        <svg className={className} width="1.11em" height="1.11em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 0.398926C19.552 0.398926 20 0.846926 20 1.39893V15.3989C20 15.9509 19.552 16.3989 19 16.3989H4.455L0 19.8989V1.39893C0 0.846926 0.448 0.398926 1 0.398926H19ZM18 2.39893H2V15.7839L3.763 14.3989H18V2.39893ZM8.515 4.81093L8.962 5.49893C7.294 6.40193 7.323 7.85093 7.323 8.16293C7.478 8.14293 7.641 8.13893 7.803 8.15393C8.705 8.23793 9.416 8.97893 9.416 9.89893C9.416 10.8649 8.632 11.6489 7.666 11.6489C7.129 11.6489 6.616 11.4039 6.292 11.0589C5.777 10.5129 5.5 9.89893 5.5 8.90393C5.5 7.15393 6.728 5.58593 8.515 4.81093ZM13.515 4.81093L13.962 5.49893C12.294 6.40193 12.323 7.85093 12.323 8.16293C12.478 8.14293 12.641 8.13893 12.803 8.15393C13.705 8.23793 14.416 8.97893 14.416 9.89893C14.416 10.8649 13.632 11.6489 12.666 11.6489C12.129 11.6489 11.616 11.4039 11.292 11.0589C10.777 10.5129 10.5 9.89893 10.5 8.90393C10.5 7.15393 11.728 5.58593 13.515 4.81093Z"
                fill="currentColor"
            />
        </svg>
    );
});
