import React from 'react';
import FraisForm from '../components/FraisForm'; 

const FraisAdd = () => {
    return (
        <div className="frais-add-page" style={{ padding: '20px' }}>
            <h1>Ajouter une nouvelle note de frais</h1>
            
           
            <FraisForm />
        </div>
    );
};

export default FraisAdd;