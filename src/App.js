import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connSocketServer = () => {
    const socket = io.connect('http://localhost:8080', {
        transports: ['websocket']
    });
    return socket;
}

function App() {

    const [socket] = useState(connSocketServer());
    const [online, setOnline] = useState(false);
    const [bands, setBands] = useState([]);

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

    useEffect(() => {
        socket.on('band-list', (bands) => {
            setBands(bands);
        });

    }, [socket]);

    const toVote = (id) => {
        socket.emit('votar-banda', { id })
    }

    return (
        <div className="container">
            <div className="alert">
                <p>
                    Service status:
                    {
                        online
                            ? <span className="text-success">ONLINE</span>
                            : <span className="text-danger">OFFLINE</span>
                    }
                </p>
            </div>

            <h1>BandNames</h1>
            <hr />
            <div className="row">
                <div className="col-8"><BandList data={bands} votar={toVote} /></div>
                <div className="col-4"><BandAdd /></div>
            </div>
        </div>
    );
}

export default App;
