import React, { Suspense, lazy } from "react";

export default function suspenseHOC(importLazy: any, fallback = null) {
    const LazyComponent = lazy(() => importLazy());

    return function SuspenseWrapper(props: any) {
        return (
            <Suspense fallback={fallback || (<div></div>)}>
                <LazyComponent {...props} />
            </Suspense>
        );
    }
};
