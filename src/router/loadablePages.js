import React from 'react';
export const LoadableNotFound = React.lazy(() =>
    import('../components/NotFound').then(({NotFound: element}) => ({
        default: element
    }))
);

export const LoadableMain = React.lazy(() =>
    import('../components/Main').then(({Main: element}) => ({
        default: element
    }))
);

export const LoadableLogin = React.lazy(() =>
    import('../components/Login').then(({Login: element}) => ({
        default: element
    }))
);