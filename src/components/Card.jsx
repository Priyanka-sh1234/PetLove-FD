// src/components/Card.js
import React from 'react';

const Card = ({ clinic }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img className="w-full h-56 object-cover" src={clinic.imageUrl} alt={clinic.name} />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{clinic.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{clinic.description}</p>
            </div>
        </div>
    );
};

export default Card;
