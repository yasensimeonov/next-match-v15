'use client';

import {FieldValues, useForm} from "react-hook-form";
import CardWrapper from "@/components/CardWrapper";
import {GiPadlock} from "react-icons/gi";
import {useState} from "react";
import {ActionResult} from "@/types";
import {generateResetPasswordEmail} from "@/app/actions/authActions";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import ResultMessage from "@/components/ResultMessage";

export default function ForgotPasswordForm() {
    const [result, setResult] = useState<ActionResult<string> | null>(null);
    const { register, handleSubmit, reset, formState: {isSubmitting, isValid} } = useForm();

    const onSubmit = async (data: FieldValues) => {
        setResult(await generateResetPasswordEmail(data.email));
        reset();
    }

    return (
        <CardWrapper
            headerIcon={GiPadlock}
            headerText="Forgot Password"
            subHeaderText="Please enter your email address and we will send you a link to reset your password"
            body={
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
                    <Input
                        type='email'
                        placeholder='Email address'
                        variant='bordered'
                        defaultValue=''
                        {...register('email', {required: true})}
                    />
                    <Button type='submit'
                        color='secondary'
                        isLoading={isSubmitting}
                        isDisabled={!isValid}
                    >
                        Send reset email
                    </Button>
                </form>
            }
            footer={
                <ResultMessage result={result} />
            }
        />
    )
}