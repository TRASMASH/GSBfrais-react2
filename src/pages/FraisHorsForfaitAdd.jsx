import React from 'react';
import { useParams } from 'react-router-dom';
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm';
import '../styles/FraisHorsForfait.css';

const FraisHorsForfaitAdd = () => {
    const { id } = useParams(); 

    return (
        <div className="frais-hors-forfait-container">
            <h3>Ajouter un frais hors forfait</h3>
            <FraisHorsForfaitForm idFrais={id} />
        </div>
    );
};

export default FraisHorsForfaitAdd;