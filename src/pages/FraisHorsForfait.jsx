import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/authService';
import FraisHorsForfaitTable from '../components/FraisHorsForfaitTable';
import '../styles/FraisHorsForfait.css'; 

const FraisHorsForfait = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const token = localStorage.getItem('token');

   
    const fetchFraisHorsForfaitList = async () => {
        try {
            const response = await axios.get(`${API_URL}fraisHF/liste/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFraisHorsForfaitList(response.data);

           
            let somme = 0;
            response.data.forEach((hf) => {
                somme += parseFloat(hf.montant_fraishorsforfait);
            });
            setTotal(somme);

        } catch (error) {
            console.error('Erreur chargement frais HF:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFraisHorsForfaitList();
    }, [id]);

  
    const handleDelete = async (idFraisHF) => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce frais hors forfait ?')) return;

        try {
            await axios.delete(`${API_URL}fraisHF/suppr`, {
                data: { id_fraisHF: idFraisHF }, 
                headers: { Authorization: `Bearer ${token}` }
            });
            
            fetchFraisHorsForfaitList(); 
        } catch (error) {
            console.error('Erreur suppression:', error);
        }
    };

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="frais-hors-forfait-container">
            <h2>Frais hors forfait</h2>
            
            <FraisHorsForfaitTable 
                fraisHorsForfaitList={fraisHorsForfaitList} 
                idFrais={id}
                onDelete={handleDelete}
            />
            
            <div className="total">Total : {total.toFixed(2)} €</div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate(`/frais/${id}/hors-forfait/ajouter`)}>
                    Ajouter
                </button>
                <button className="return-button" onClick={() => navigate(`/frais/modifier/${id}`)}>
                    Retour
                </button>
            </div>
        </div>
    );
};

export default FraisHorsForfait;