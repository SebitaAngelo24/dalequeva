import React from "react";
import './styles.css';
import {Link, link} from 'react-router-dom';

export default function Menu() {
    return (
        <div>
            <h1>Menu</h1>

            <button className="btn btn-secondary" type="button" >
                <Link to="./Registro">Reservas</Link>
            </button>
        </div>
    )
}