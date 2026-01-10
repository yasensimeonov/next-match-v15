import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FaFemale, FaMale} from "react-icons/fa";
import useFilterStore from "@/hooks/useFilterStore";
import {useEffect, useTransition} from "react";
import {Selection} from '@heroui/react';
import usePaginationStore from "@/hooks/usePaginationStore";
import {useShallow} from "zustand/react/shallow";

export const useFilters = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // const {filters} = useFilterStore(useShallow(
    //     state => ({
    //         filters: state.filters
    //     })));

    const {filters, setFilters} = useFilterStore();

    const {pageNumber, pageSize, setPage, totalCount} = usePaginationStore(
        useShallow(
            state => ({
                pageNumber: state.pagination.pageNumber,
                pageSize: state.pagination.pageSize,
                setPage: state.setPage,
                totalCount: state.pagination.totalCount
            })));

    const {gender, ageRange, orderBy} = filters;

    useEffect(() => {
        if (gender || ageRange || orderBy) {
            setPage(1);
        }
    }, [ageRange, gender, orderBy, setPage]);

    useEffect(() => {
        startTransition(() => {
            const searchParams = new URLSearchParams();

            if (gender) searchParams.set('gender', gender.join(','));
            if (ageRange) searchParams.set('ageRange', ageRange.toString());
            if (orderBy) searchParams.set('orderBy', orderBy);
            if (pageSize) searchParams.set('pageSize', pageSize.toString());
            if (pageNumber) searchParams.set('pageNumber', pageNumber.toString());

            router.replace(`${pathname}?${searchParams}`);
        })
    }, [gender, ageRange, orderBy, searchParams, pathname, router, pageSize, pageNumber]);

    const orderByList = [
        {label: 'Last active', value: 'updated'},
        {label: 'Newest members', value: 'created'},
    ]

    const genderList = [
        {value: 'male', icon: FaMale},
        {value: 'female', icon: FaFemale},
    ]

    const handleAgeSelect = (value: number[])=> {
        // const params = new URLSearchParams(searchParams);
        // params.set('ageRange', value.join(','));
        // router.replace(`${pathname}?${params}`);

        setFilters('ageRange', value);
    }

    const handleOrderSelect = (value: Selection)=> {
        if (value instanceof Set) {
            // const params = new URLSearchParams(searchParams);
            // params.set('orderBy', value.values().next().value as string);
            // router.replace(`${pathname}?${params}`);

            setFilters('orderBy', value.values().next().value as string);
        }
    }

    const handleGenderSelect = (value: string)=> {
        // const params = new URLSearchParams(searchParams);
        //
        // if (selectedGender.includes(value)) {
        //     params.set('gender', selectedGender.filter(g => g !== value).toString());
        // } else {
        //     params.set('gender', [...selectedGender, value].toString());
        // }
        // router.replace(`${pathname}?${params}`);

        if (gender.includes(value)) {
            setFilters('gender', gender.filter(g => g !== value));
        } else {
            setFilters('gender', [...gender, value]);
        }
    }

    return {
        orderByList,
        genderList,
        selectAge: handleAgeSelect,
        selectGender: handleGenderSelect,
        selectOrder: handleOrderSelect,
        filters,
        isPending,
        totalCount
    }

}