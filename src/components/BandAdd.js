import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {
    const [valor, setValor] = useState('');
    const { socket } = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (valor.trim().length > 0) {
            socket.emit('agregar-nombre-banda', { name: valor });
            setValor('');
        }
    }

    return (
        <>
            <h3>Agregar banda</h3>
            <form onSubmit={handleSubmit}>
                <input
                    className='form-control'
                    placeholder='Nuevo nombre de banda'
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                />
            </form>
        </>
    )
}
