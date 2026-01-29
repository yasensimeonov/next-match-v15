import {auth} from "@/auth";
import ClientSession from "@/components/ClientSession";

export default async function Home() {
    const session = await auth();

    return (
        <div className='flex flex-row justify-around mt-20 gap-6'>
            <div className='bg-green-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto'>
                <h3 className='text-2xl font-semibold'>User Session Data (Server-side):</h3>
                {session ? (
                    <div>
                        <pre>{JSON.stringify(session, null, 2)}</pre>
                        {/*<form action={async () => {*/}
                        {/*    'use server';*/}

                        {/*    await signOut();*/}
                        {/*}}>*/}
                        {/*    <Button*/}
                        {/*        type='submit'*/}
                        {/*        color='primary'*/}
                        {/*        variant='bordered'*/}
                        {/*        startContent={<FaRegSmile size={20} />}*/}
                        {/*    >*/}
                        {/*        Sign Out*/}
                        {/*    </Button>*/}
                        {/*</form>*/}
                    </div>
                ) : (
                    <div>Not signed in</div>
                )}
            </div>
            <ClientSession />
        </div>
    );
}
