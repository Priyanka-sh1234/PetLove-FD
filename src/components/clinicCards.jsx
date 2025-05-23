import React from 'react';
import Card from './Card';

const CardList = () => {
  const handleBooking = () => {
    // Handle booking logic here (e.g., redirect to booking page or show modal)
    console.log("Booking process started!");
  };

  const cards = [
    {
      id: 1,
      image: 'https://img.freepik.com/free-photo/modern-business-center_1127-3157.jpg?ga=GA1.1.2004871835.1738248311',
      title: 'Happy Paws Clinic',
      description: 'Location: Downtown',
      rate: 4.5,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/400x300',
      title: 'Healthy Paws Clinic',
      description: 'Location: Uptown',
      rate: 4.7,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/400x300',
      title: 'Family Vet Care',
      description: 'Location: Midtown',
      rate: 4.2,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {cards.map(card => (
        <Card
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
          rate={card.rate}
          onBookClick={handleBooking}
        />
      ))}
    </div>
  );
};

export default CardList;
