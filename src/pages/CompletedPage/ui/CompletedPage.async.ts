import { lazy } from 'react';

export const CompletedPageAsync = lazy(() => new Promise(resolve => {
    // @ts-ignore
    setTimeout(() => resolve(import('./CompletedPage')), 1500);
}))