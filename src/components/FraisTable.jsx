import React, { useState, useEffect } from "react";
import fraisData from "../data/frais.json";
import "./FraisTable.css";

export default function FraisTable() {
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Etats de filtrage / recherche
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true); // checkbox : afficher seulement montantvalide != null
  const [minMontant, setMinMontant] = useState(""); // valeur minimale pour montant validé (chaîne pour input)

  useEffect(() => {
    // simulate API delay 500 ms
    const timer = setTimeout(() => {
      setFraisList(fraisData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const term = (searchTerm || "").trim().toLowerCase();
  const minMontantNum = parseFloat(minMontant);
  const hasMinMontant = !Number.isNaN(minMontantNum);

  const filteredFrais = (fraisList || [])
    // applique le filtre "monant validé non null" seulement si filterNonNull est true
    .filter((f) => {
      if (!filterNonNull) return true;
      return f?.montantvalide != null;
    })
    // filtre de recherche + filtre montant minimal
    .filter((f) => {
      // normalisation / protections
      const anneemois = f?.anneemois ? String(f.anneemois).toLowerCase() : "";
      const idVisiteur = f?.id_visiteur != null ? String(f.id_visiteur).toLowerCase() : "";
      const idFrais = f?.id_frais != null ? String(f.id_frais).toLowerCase() : "";
      const montantValide = f?.montantvalide != null ? String(f.montantvalide).toLowerCase() : "";

      // si recherche vide, on ne filtre pas sur texte
      const matchesTerm =
        !term ||
        anneemois.includes(term) ||
        idVisiteur.includes(term) ||
        idFrais.includes(term) ||
        montantValide.includes(term);

      // si utilisateur a saisi un montant minimal, vérifier
      const matchesMinMontant = !hasMinMontant || (f?.montantvalide != null && Number(f.montantvalide) >= minMontantNum);

      return matchesTerm && matchesMinMontant;
    });

  if (loading) return <div><b>Chargement des frais ...</b></div>;

  return (
    <div className="frais-table-container">
      <h2>Liste des frais</h2>

      {/* Filtres : case à cocher, champ montant min, champ recherche */}
      <div className="filter-controls" style={{ marginBottom: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={filterNonNull}
            onChange={(e) => setFilterNonNull(e.target.checked)}
          />
          <span>Afficher seulement les frais avec montant validé</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Montant min :</span>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 100"
            value={minMontant}
            onChange={(e) => setMinMontant(e.target.value)}
            style={{ width: 120 }}
          />
        </label>

        <div style={{ flex: 1, minWidth: 220 }}>
          <input
            type="text"
            placeholder="Rechercher par année-mois, ID visiteur, ID frais ou montant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ width: "100%" }}
          />
        </div>
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
              <td>{/* montant saisi calculé plus tard */}</td>
              <td>{frais.montantvalide != null ? `${frais.montantvalide} €` : "€"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
