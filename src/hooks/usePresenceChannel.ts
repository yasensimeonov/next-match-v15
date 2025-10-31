import usePresenceStore from "@/hooks/usePresenceStore";
import {useEffect, useRef} from "react";
import {Channel} from "pusher-js";

export const usePresenceChannel = () => {
    const {set, add, remove} = usePresenceStore(state => ({
        set: state.set,
        add: state.add,
        remove: state.remove
    }));

    const channelRef = useRef<Channel | null>(null);

    useEffect(() => {

    }, [])

}