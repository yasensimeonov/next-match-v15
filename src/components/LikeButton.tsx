'use client';

import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {PiSpinnerGap} from "react-icons/pi";

type Props = {
    loading: boolean;
    hasLiked: boolean;
    toggleLikeAction: () => void;
}

export default function LikeButton({ loading, hasLiked, toggleLikeAction }: Props) {
    return (
        <>
            {!loading ? (
                <div onClick={toggleLikeAction} className="relative hover:opacity-80 transition cursor-pointer">
                    <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px]' />
                    <AiFillHeart size={24} className={hasLiked ? 'fill-rose-500' : 'fill-neutral-500/70'} />
                </div>
            ) : (
                <PiSpinnerGap size={32} className='fill-white animate-spin' />
            )}
        </>
    )
}