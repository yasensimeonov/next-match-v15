import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FaFemale, FaMale} from "react-icons/fa";
import useFilterStore from "@/hooks/useFilterStore";
import {useEffect} from "react";
import {Selection} from '@heroui/react';

export const useFilters = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    // const {filters} = useFilterStore(useShallow(
    //     state => ({
    //         filters: state.filters
    //     })));

    const {filters, setFilters} = useFilterStore();

    const {gender, ageRange, orderBy} = filters;

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (gender) searchParams.set('gender', gender.join(','));
        if (ageRange) searchParams.set('ageRange', ageRange.toString());
        if (orderBy) searchParams.set('orderBy', orderBy);

        router.replace(`${pathname}?${searchParams}`);

    }, [gender, ageRange, orderBy, searchParams, pathname, router]);

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
        filters
    }

}