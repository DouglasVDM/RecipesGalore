import React from "react";

const RecipeCard = ({ recipe }) => (
  <div className="col-sm-4 mb-4">
    <div className="card h-100">
      <img src={recipe.image} className="card-img-top" alt={recipe.id} />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
      </div>
    </div>
  </div>
);

export default RecipeCard;
