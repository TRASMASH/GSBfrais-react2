import React from 'react';
import { useNavigate } from 'react-router-dom';

const FraisHorsForfaitTable = ({ fraisHorsForfaitList, idFrais, onDelete }) => {
    const navigate = useNavigate();

    return (
        <table className="frais-hors-forfait-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Libellé</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {fraisHorsForfaitList.map((hf) => (
                    <tr key={hf.id_fraishorsforfait}>
                        <td>{hf.date_fraishorsforfait}</td>
                        <td>{hf.montant_fraishorsforfait} €</td>
                        <td>{hf.lib_fraishorsforfait}</td>
                        <td>
                            <button 
                                style={{ marginRight: '5px', backgroundColor: '#ffc107', color: 'black' }}
                                onClick={() => navigate(`/frais/${idFrais}/hors-forfait/modifier/${hf.id_fraishorsforfait}`)}
                            >
                                Modifier
                            </button>
                            <button 
                                style={{ backgroundColor: '#dc3545' }}
                                onClick={() => onDelete(hf.id_fraishorsforfait)}
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FraisHorsForfaitTable;