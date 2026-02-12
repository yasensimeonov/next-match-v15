import {verifyEmail} from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import {MdOutlineMailOutline} from "react-icons/md";
import {Spinner} from "@heroui/spinner";
import ResultMessage from "@/components/ResultMessage";

export default async function VerifyEmailPage({searchParams}:
    {searchParams: Promise<{token: string}>}
) {
    const {token} = await searchParams;
    const result = await verifyEmail(token);

    return (
        <CardWrapper
            headerIcon={MdOutlineMailOutline}
            headerText='Verify your email address'
            body={
                <div className='flex flex-col space-y-4 items-center'>
                    <div className='flex flex-row items-center'>
                        <p>Verifying your email address. Please wait...</p>
                        {!result && <Spinner color='secondary' />}
                    </div>
                </div>
            }
            footer={
                <ResultMessage result={result} />
            }
        />
    )
}