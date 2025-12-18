import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/authService';
import '../styles/FraisHorsForfait.css';

const FraisHorsForfaitForm = ({ idFrais, fraisHFToEdit = null }) => {
    const [date, setDate] = useState("");
    const [libelle, setLibelle] = useState("");
    const [montant, setMontant] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    
    useEffect(() => {
        if (fraisHFToEdit) {
            setDate(fraisHFToEdit.date_fraishorsforfait);
            setLibelle(fraisHFToEdit.lib_fraishorsforfait);
            setMontant(fraisHFToEdit.montant_fraishorsforfait);
        }
    }, [fraisHFToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const data = {
                id_frais: idFrais,
                date: date,
                libelle: libelle,
                montant: parseFloat(montant)
            };

            if (fraisHFToEdit) {
                
                data.id_fraishorsforfait = fraisHFToEdit.id_fraishorsforfait;
                await axios.post(`${API_URL}fraisHF/modif`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                
                await axios.post(`${API_URL}fraisHF/ajout`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

           
            navigate(`/frais/${idFrais}/hors-forfait`);

        } catch (error) {
            console.error("Erreur enregistrement:", error);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Date :</label>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
            />

            <label>Montant :</label>
            <input 
                type="number" 
                step="0.01" 
                value={montant} 
                onChange={(e) => setMontant(e.target.value)} 
                required 
            />

            <label>Libellé :</label>
            <input 
                type="text" 
                value={libelle} 
                onChange={(e) => setLibelle(e.target.value)} 
                required 
            />

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={loading}>
                    {loading ? 'Enregistrement...' : (fraisHFToEdit ? 'Mettre à jour' : 'Ajouter')}
                </button>
                <button 
                    type="button" 
                    className="return-button"
                    onClick={() => navigate(`/frais/${idFrais}/hors-forfait`)}
                >
                    Annuler
                </button>
            </div>
        </form>
    );
};

export default FraisHorsForfaitForm;