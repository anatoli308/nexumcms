import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppLoading } from './AppLoadingProvider';

function hasModifierKeys(event) {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function shouldIgnoreAnchor(anchor) {
    if (!anchor) {
        return true;
    }

    if (anchor.target && anchor.target !== '_self') {
        return true;
    }

    if (anchor.hasAttribute('download')) {
        return true;
    }

    const href = anchor.getAttribute('href') ?? '';
    return href.startsWith('mailto:') || href.startsWith('tel:');
}

export default function RouterNavigationProgress() {
    const location = useLocation();
    const { startLoading } = useAppLoading();
    const stopLoadingRef = React.useRef(null);

    const beginRouteLoading = React.useCallback(() => {
        if (stopLoadingRef.current) {
            stopLoadingRef.current();
        }

        stopLoadingRef.current = startLoading();
    }, [startLoading]);

    React.useEffect(() => {
        const handleDocumentClick = (event) => {
            if (event.defaultPrevented || event.button !== 0 || hasModifierKeys(event)) {
                return;
            }

            if (!(event.target instanceof Element)) {
                return;
            }

            const anchor = event.target.closest('a[href]');
            if (shouldIgnoreAnchor(anchor)) {
                return;
            }

            const nextUrl = new URL(anchor.href, window.location.href);
            const currentUrl = new URL(window.location.href);

            const isSameTarget =
                nextUrl.origin === currentUrl.origin &&
                nextUrl.pathname === currentUrl.pathname &&
                nextUrl.search === currentUrl.search &&
                nextUrl.hash === currentUrl.hash;

            if (isSameTarget || nextUrl.origin !== currentUrl.origin) {
                return;
            }

            beginRouteLoading();
        };

        const handlePopState = () => {
            const hasTargetChanged =
                window.location.pathname !== location.pathname ||
                window.location.search !== location.search ||
                window.location.hash !== location.hash;

            if (!hasTargetChanged) {
                return;
            }

            beginRouteLoading();
        };

        document.addEventListener('click', handleDocumentClick, true);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('click', handleDocumentClick, true);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [beginRouteLoading, location.pathname, location.search, location.hash]);

    React.useEffect(() => {
        if (!stopLoadingRef.current) {
            return;
        }

        const stopLoading = stopLoadingRef.current;
        stopLoadingRef.current = null;
        stopLoading();
    }, [location.pathname, location.search, location.hash]);

    React.useEffect(
        () => () => {
            if (!stopLoadingRef.current) {
                return;
            }

            const stopLoading = stopLoadingRef.current;
            stopLoadingRef.current = null;
            stopLoading();
        },
        []
    );

    return null;
}
