import {Button} from "@heroui/button";
import {FaRegSmile} from "react-icons/fa";
import {auth, signOut} from "@/auth";

export default async function Home() {
    const session = await auth();

    return (
        <div>
            <h1 className='text-3xl text-red-500'>Hello World!</h1>

            <h3 className='text-2xl font-semibold'>User Session Data:</h3>
            {session ? (
                <div>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                    <form action={async () => {
                        'use server';

                        await signOut();
                    }}>
                        <Button
                            type='submit'
                            color='primary'
                            variant='bordered'
                            startContent={<FaRegSmile size={20} />}
                        >
                            Sign Out
                        </Button>
                    </form>
                </div>
            ) : (
                <div>Not signed in</div>
            )}
        </div>
    );
}
