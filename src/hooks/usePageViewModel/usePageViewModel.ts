import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

type LoaderData<T> = {
    vm: T
};

export function usePageViewModel<T>(): T | null {
    const [vm, setVm] = useState<T | null>(null);

    const loaderData = useLoaderData() as LoaderData<T> | undefined;

    useEffect(() => {
        if (!loaderData) {
            return;
        }

        if (vm) return;

        setVm(loaderData.vm);
    }, [loaderData])

    return vm;
} 