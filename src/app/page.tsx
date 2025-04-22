import {Button} from "@heroui/button";
import {FaRegSmile} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1 className='text-3xl text-red-500'>Hello World!</h1>
            <Button
                as={Link}
                href='/members'
                color='primary'
                variant='bordered'
                startContent={<FaRegSmile size={20} />}
            >
                Take me to Members!
            </Button>
        </div>
    );
}
