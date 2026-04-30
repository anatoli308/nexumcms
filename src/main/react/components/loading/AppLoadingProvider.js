import React from 'react';

const AppLoadingContext = React.createContext(null);
const FETCH_INTERCEPTOR_FLAG = '__nexumFetchInterceptorActive';
const ORIGINAL_FETCH_KEY = '__nexumOriginalFetch';

export function AppLoadingProvider({ children }) {
    const [pendingCount, setPendingCount] = React.useState(0);

    const startLoading = React.useCallback(() => {
        let finished = false;
        setPendingCount((current) => current + 1);

        return () => {
            if (finished) {
                return;
            }

            finished = true;
            setPendingCount((current) => Math.max(0, current - 1));
        };
    }, []);

    const trackPromise = React.useCallback(
        async (promiseOrFactory) => {
            const finish = startLoading();
            try {
                const promise = typeof promiseOrFactory === 'function' ? promiseOrFactory() : promiseOrFactory;
                return await promise;
            } finally {
                finish();
            }
        },
        [startLoading]
    );

    React.useEffect(() => {
        if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
            return undefined;
        }

        if (window[FETCH_INTERCEPTOR_FLAG]) {
            return undefined;
        }

        const originalFetch = window.fetch.bind(window);
        window[FETCH_INTERCEPTOR_FLAG] = true;
        window[ORIGINAL_FETCH_KEY] = originalFetch;

        window.fetch = (...args) => {
            const finish = startLoading();

            return Promise.resolve()
                .then(() => originalFetch(...args))
                .finally(() => {
                    finish();
                });
        };

        return () => {
            if (window[ORIGINAL_FETCH_KEY]) {
                window.fetch = window[ORIGINAL_FETCH_KEY];
                delete window[ORIGINAL_FETCH_KEY];
            }

            window[FETCH_INTERCEPTOR_FLAG] = false;
        };
    }, [startLoading]);

    const value = React.useMemo(
        () => ({
            isLoading: pendingCount > 0,
            pendingCount,
            startLoading,
            trackPromise
        }),
        [pendingCount, startLoading, trackPromise]
    );

    return <AppLoadingContext.Provider value={value}>{children}</AppLoadingContext.Provider>;
}

export function useAppLoading() {
    const context = React.useContext(AppLoadingContext);

    if (!context) {
        throw new Error('useAppLoading must be used inside AppLoadingProvider');
    }

    return context;
}
