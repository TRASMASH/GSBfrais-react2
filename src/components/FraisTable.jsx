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
  
  // États pour les filtres (optionnel selon votre avancement, je laisse votre code)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true); 
  const [minMontant, setMinMontant] = useState(""); 

  useEffect(() => {
    if (!user || !token) return;
    const fetchFrais = async () => {
      try {
        const response = await axios.get(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFraisList(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("Erreur lors de la récupération des frais:", error);
        setLoading(false);
      }
    };
    fetchFrais(); 
  }, [user, token]); 

  // --- NOUVEAU : Fonction de suppression ---
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce frais ?')) return;

    try {
        // La méthode DELETE avec un body nécessite la propriété "data" dans axios
        await axios.delete(`${API_URL}frais/suppr`, {
            data: { id_frais: id },
            headers: { Authorization: `Bearer ${token}` }
        });

        // Mise à jour locale de la liste pour retirer l'élément supprimé
        setFraisList(fraisList.filter((frais) => frais.id_frais !== id));
        
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert("Erreur lors de la suppression du frais.");
    }
  };

  const term = (searchTerm || "").trim().toLowerCase();
  const minMontantNum = parseFloat(minMontant);
  const hasMinMontant = !Number.isNaN(minMontantNum);

  const filteredFrais = (fraisList || []).filter((f) => {
      if (!filterNonNull) return true;
      return f?.montantvalide != null;
    })
    .filter((f) => {
      const anneemois = f?.anneemois ? String(f.anneemois).toLowerCase() : "";
      const idVisiteur = f?.id_visiteur != null ? String(f.id_visiteur).toLowerCase() : "";
      const idFrais = f?.id_frais != null ? String(f.id_frais).toLowerCase() : "";
      const montantValide = f?.montantvalide != null ? String(f.montantvalide).toLowerCase() : "";

      const matchesTerm = !term || anneemois.includes(term) || idVisiteur.includes(term) || idFrais.includes(term) || montantValide.includes(term);
      const matchesMinMontant = !hasMinMontant || (f?.montantvalide != null && Number(f.montantvalide) >= minMontantNum);
      return matchesTerm && matchesMinMontant;
    });

  if (loading) return <div><b>Chargement des frais ...</b></div>;

  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>
      
      {/* (Vos filtres ici si vous voulez les garder) */}

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
              <td>{frais.montantvalide != null ? `${frais.montantvalide} €` : "€"}</td>
              <td> 
                <button 
                    onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)} 
                    className="edit-button" 
                > 
                    Modifier 
                </button> 
                {/* --- NOUVEAU : Bouton Supprimer --- */}
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