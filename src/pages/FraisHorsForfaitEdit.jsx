import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/authService';
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm';
import '../styles/FraisHorsForfait.css';

const FraisHorsForfaitEdit = () => {
    const { id, idHF } = useParams(); 
    const [fraisHF, setFraisHF] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFraisHF = async () => {
            const token = localStorage.getItem('token');
            try {
                
                const response = await axios.get(`${API_URL}fraisHF/${idHF}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFraisHF(response.data);
            } catch (error) {
                console.error("Erreur récupération frais HF:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFraisHF();
    }, [idHF]);

    if (loading) return <div>Chargement...</div>;
    if (!fraisHF) return <div>Frais hors forfait introuvable</div>;

    return (
        <div className="frais-hors-forfait-container">
            <h3>Modifier un frais hors forfait</h3>
            <FraisHorsForfaitForm idFrais={id} fraisHFToEdit={fraisHF} />
        </div>
    );
};

export default FraisHorsForfaitEdit;