'use client'

import {Button} from "@heroui/button";
import {Slider} from "@heroui/slider";
import {Select, SelectItem} from "@heroui/select";
import {useFilters} from "@/hooks/useFilters";
import {Spinner} from "@heroui/spinner";
import {Switch} from "@heroui/switch";

export default function Filters() {
    // const pathname = usePathname();
    const {genderList, orderByList, filters, selectAge, selectGender, selectOrder, isPending, totalCount, selectWithPhoto} = useFilters();

    // if (pathname !== '/members') {
    //     return null;
    // }

    return (
        <div className="shadow-md py-2">
            <div className="flex flex-row justify-around items-center">
                <div className='flex gap-2 items-center'>
                    <div className="text-secondary font-semibold text-xl">
                        Results: {isPending ? <Spinner size='sm' color='secondary' /> : totalCount}
                    </div>
                    {/*{isPending && <Spinner size='sm' color='secondary' />}*/}
                </div>

                <div className='flex gap-2 items-center'>
                    <div>Gender:</div>
                    {genderList.map(({icon: Icon, value}) => (
                        <Button
                            key={value}
                            size='sm'
                            isIconOnly
                            //color='secondary'
                            color={filters.gender.includes(value) ? 'secondary' : 'default'}
                            onPress={() => selectGender(value)}
                        >
                            <Icon size={24} />
                        </Button>
                    ))}
                </div>
                <div className="flex flex-row items-center gap-2 w-1/4">
                    <Slider
                        aria-label='slider for age selection'
                        label='Age range'
                        color='secondary'
                        size='sm'
                        minValue={18}
                        maxValue={100}
                        //defaultValue={[18, 100]}
                        defaultValue={filters.ageRange}
                        onChangeEnd={(value) => selectAge(value as number[])}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <p className='text-sm'>With photo</p>
                    <Switch
                        color='secondary'
                        isSelected={filters.withPhoto}
                        size='sm'
                        onChange={selectWithPhoto}
                    />
                </div>
                <div className="w-1/4">
                    <Select
                        size='sm'
                        fullWidth
                        //placeholder='Order by'
                        label='Order by'
                        variant='bordered'
                        color='secondary'
                        aria-label='Order by selector'
                        //selectedKeys={new Set([searchParams.get('orderBy') || 'updated'])}
                        selectedKeys={new Set([filters.orderBy])}
                        //onSelectionChange={handleOrderSelect}
                        onSelectionChange={selectOrder}
                    >
                        {orderByList.map(item => (
                            <SelectItem key={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    )
}