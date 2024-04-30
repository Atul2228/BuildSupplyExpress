
import { categoriesData,brands  } from "../../../static/data";




import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const baseStyles = {
  scrollContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none', 
  },
  card: {
    flex: '0 0 auto', 
    margin: '10px', 
    
    textAlign: 'center', 
  },
  image: {
    width: '100%', 
    height: '200px', 
    objectFit: 'cover', 
  }
};

const Brands = () => {

const [hoveredCard, setHoveredCard] = useState(null);
const navigate = useNavigate();

const getCardStyle = (isHovered) => ({
  ...baseStyles.card,
  backgroundColor: isHovered ? '#f0f0f0' : '#fff', 
  boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : 'none', 
  transform: isHovered ? 'scale(1.05)' : 'none', 
  cursor: 'pointer', 
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

    </div>
    </div>
  );
};

export default Brands;



