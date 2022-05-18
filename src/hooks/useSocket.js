import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (urlSocket) => {
    const socket = useMemo(() => io.connect(urlSocket, { transports: ['websocket'] }), [urlSocket]);
    const [online, setOnline] = useState(false);

    useEffect(() => {
        setOnline(socket.connected);

    }, [socket]);

    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true);
        });

    }, [socket]);

    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false);
        });

    }, [socket]);

    return { socket, online }
}