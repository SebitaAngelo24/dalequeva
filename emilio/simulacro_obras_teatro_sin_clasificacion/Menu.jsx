import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <div className="container_app">
        <h4>Simulacro Obras de teatro sin calificacion</h4>
        <nav className="btn-group mt-3 pb-1">
            <Link className='btn btn-primary' to='/obra'>Ir a obras</Link>
        </nav>
        </div>
    );
    }