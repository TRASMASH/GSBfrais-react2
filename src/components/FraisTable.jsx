import React, { useState, useEffect } from "react";
import "./FraisTable.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 
import { API_URL } from "../services/authService"; 
import { useNavigate } from 'react-router-dom';

export default function FraisTable() {
  const { user, token } = useAuth(); 
  const navigate = useNavigate(); 
  
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const [filterNonNull, setFilterNonNull] = useState(false); 

  useEffect(() => {
    if (!user || !token) return;
    const fetchFrais = async () => {
      try {
        const response = await axios.get(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFraisList(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des frais:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchFrais(); 
  }, [user, token]); 


  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce frais ?')) return;

    try {
        await axios.delete(`${API_URL}frais/suppr`, {
            data: { id_frais: id },
            headers: { Authorization: `Bearer ${token}` }
        });
        setFraisList(fraisList.filter((frais) => frais.id_frais !== id));
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert("Erreur lors de la suppression du frais.");
    }
  };

  const filteredFrais = (fraisList || []).filter((f) => {
     
      if (filterNonNull) {
          return f.montantvalide !== null;
      }
     
      return true;
  });

  if (loading) return <div><b>Chargement des frais ...</b></div>;

  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>

      
      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={filterNonNull}
            onChange={() => setFilterNonNull(!filterNonNull)}
          />
          Afficher uniquement les montants validés
        </label>
      </div>
   

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Justificatifs</th>
            <th>Date modification</th>
            <th>Montant saisi</th> 
            <th>Montant validé</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredFrais.map((frais) => (
            <tr key={frais.id_frais}>
              <td>{frais.id_frais}</td>
              <td>{frais.id_etat}</td>
              <td>{frais.anneemois}</td>
              <td>{frais.id_visiteur}</td>
              <td>{frais.nbjustificatifs}</td>
              <td>{frais.datemodification}</td>
              <td>{frais.montantsaisi != null ? `${frais.montantsaisi} €` : "€"}</td>
              <td>{frais.montantvalide != null ? `${frais.montantvalide} €` : "Non validé"}</td>
              <td> 
                <button 
                    onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)} 
                    className="edit-button" 
                > 
                    Modifier 
                </button> 
                <button 
                    onClick={() => handleDelete(frais.id_frais)} 
                    className="delete-button"
                >
                    Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}