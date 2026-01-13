'use client';

import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {GiPadlock} from "react-icons/gi";
import {Button} from "@heroui/button";
import {registerSchema, RegisterSchema} from "@/lib/schemas/registerSchema";
import {registerUser} from "@/app/actions/authActions";
import {handleFormServerErrors} from "@/lib/util";
import UserDetailsForm from "@/app/(auth)/register/UserDetailsForm";

export default function RegisterForm() {
    // const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting}} = useForm<RegisterSchema>({
    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
    });

    const {handleSubmit, setError, getValues, formState: {errors, isValid, isSubmitting}} = methods;

    //const onSubmit = async (data: RegisterSchema)=> {
    const onSubmit = async ()=> {
        console.log(getValues());

        // const result = await registerUser(data);
        //
        // if (result.status === 'success') {
        //     console.log('User registered successfully.');
        // } else {
        //     handleFormServerErrors(result, setError);
        // }
    }

    return (
        <Card className='w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-secondary'>
                    <div className='flex flex-row gap-3 items-center'>
                        <GiPadlock size={30} />
                        <h1 className='text-3xl font-semibold'>Register</h1>
                    </div>
                    <p className='text-neutral-500'>
                        Welcome to NextMatch
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-4'>

                            <UserDetailsForm />

                            {errors.root?.serverError && (
                                <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                            )}
                            <Button
                                isLoading={isSubmitting}
                                isDisabled={!isValid}
                                fullWidth
                                color='secondary'
                                type='submit'
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CardBody>
        </Card>
    );
}
