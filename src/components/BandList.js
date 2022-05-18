import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {
    const [bands, setBands] = useState([]);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('band-list', (bands) => {
            setBands(bands);
        });

        // Ya no escuche
        return () => socket.off('band-list');
    }, [socket]);

    const nameChanged = (event, id) => {
        const newName = event.target.value;
        setBands(
            bands => bands.map(band => {
                if (band.id === id) band.name = newName;
                return band;
            })
        );
    }

    const onLeaveFocus = (id, name) => {
        socket.emit('cambiar-nombre-banda', { id, name });
    }

    const vote = (id) => {
        socket.emit('votar-banda', { id });
    }

    const remove = (id) => {
        socket.emit('borrar-banda', { id });
    }

    const createRows = () => {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button
                            className='btn btn-primary'
                            onClick={() => vote(band.id)}
                        > +1 </button>
                    </td>
                    <td>
                        <input
                            className='form-control'
                            value={band.name}
                            onChange={event => nameChanged(event, band.id)}
                            onBlur={() => onLeaveFocus(band.id, band.name)}
                        />
                    </td>
                    <td><h3> {band.votes} </h3></td>
                    <td>
                        <button
                            className='btn btn-danger'
                            onClick={() => remove(band.id)}
                        >Borrar</button>
                    </td>
                </tr>
            ))
        );
    }
    return (
        <>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}
