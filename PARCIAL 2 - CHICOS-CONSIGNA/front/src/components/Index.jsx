import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css'

export default function Index() {
    return (
        <div className="container_app">
            <h4>Desarrollo de Software</h4>
            <h6>Parcial 18/06/2024</h6>
            <nav className='btn-group mt-3 pb-1'>
                <Link className='btn btn-primary' to='/registro'>Registrar Ingreso</Link>
            </nav>
        </div>
    );
}