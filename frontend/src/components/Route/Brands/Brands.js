// import React from 'react';
// import { Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { categoriesData,brands  } from "../../../static/data";

// // Inline styles for the scrollable row
// const scrollableRowStyle = {
//   whiteSpace: 'nowrap',
//   overflowX: 'scroll',
//   WebkitOverflowScrolling: 'touch',
//   MsOverflowStyle: 'none', // IE and Edge
//   scrollbarWidth: 'none', // Firefox
// };

// // Component that renders the scrollable row of cards
// const Brands = () => {
 
 

//   return (
//     <>
//     <h1> Brands</h1>
//     <div style={scrollableRowStyle} className="d-flex flex-row flex-nowrap overflow-auto">
//       {brands && brands.map((card, index) => (
//         <Card key={index} className="flex-row flex-wrap m-3" style={{ width: '18rem' }}>
//           <Card.Img variant="top" src={card.image_Url} />
//           <Card.Body>
//             {/* <Card.Title>{card.title}</Card.Title> */}
//             {/* <Card.Text>{card.text}</Card.Text> */}
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//     </>
//   );
// };

// export default Brands;


import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Inline styles for the horizontal scrolling container and cards
const baseStyles = {
  scrollContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For Internet Explorer + Edge
  },
  card: {
    flex: '0 0 auto', // Prevent cards from shrinking
    margin: '10px', // Add some space between cards
    // width: '100p', // Set a fixed width for each card
    textAlign: 'center', // Center the text inside the card
  },
  image: {
    width: '100%', // Make the image fill the card
    height: '200px', // Set a fixed height for images
    objectFit: 'cover', // Ensure the aspect ratio is maintained
  }
};

const Brands = () => {
  // Sample data for demonstration
//   const cardsData = [
//     { id: 1, imageUrl: 'https://via.placeholder.com/200x200', title: 'Card 1' },
//     { id: 2, imageUrl: 'https://via.placeholder.com/200x200', title: 'Card 2' },
//     { id: 3, imageUrl: 'https://via.placeholder.com/200x200', title: 'Card 3' },
//     // Add more cards as needed
//   ];
const [hoveredCard, setHoveredCard] = useState(null);
const navigate = useNavigate();

// Function to apply hover style
const getCardStyle = (isHovered) => ({
  ...baseStyles.card,
  backgroundColor: isHovered ? '#f0f0f0' : '#fff', // Change background color on hover
  boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : 'none', // Apply shadow on hover
  transform: isHovered ? 'scale(1.05)' : 'none', // Slightly scale the card on hover
  cursor: 'pointer', // Change cursor to pointer on hover
});

  return (
    <div style={{paddingLeft:"6%",paddingRight:"6%"}}>
    <h1>Brands</h1>
    <div style={baseStyles.scrollContainer} >

    {brands && brands.map((card) => {
              const handleSubmit = (card) => {
                navigate(`/products?brand=${card.title}`);
              };
              return (
                <div  key={card.id} 
        style={getCardStyle(hoveredCard === card.id)} 
        onMouseEnter={() => setHoveredCard(card.id)}
        onMouseLeave={() => setHoveredCard(null)} 
        onClick={() => handleSubmit(card)}>
           
          <img src={card.image_Url} alt={card.title} style={baseStyles.image} />
          <div>{card.title}</div>
        </div>
              );
            })}
      {/* {brands && brands.map(card => (
        <div  key={card.id} 
        style={getCardStyle(hoveredCard === card.id)} 
        onMouseEnter={() => setHoveredCard(card.id)}
        onMouseLeave={() => setHoveredCard(null)}>
          <img src={card.image_Url} alt={card.title} style={baseStyles.image} />
          <div>{card.title}</div>
        </div>
      ))} */}
    </div>
    </div>
  );
};

export default Brands;



