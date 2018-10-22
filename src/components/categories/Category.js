import React from 'react';


const Category = (props) => {
  const categories = props.categories.map((category) => {
  		return <li key={category.id}>{category.title}</li>
  	})

  	return (
  		<div className="component">
  			<ul className="name">{categories} </ul>
  		</div>
  	)
}

export default Category;
