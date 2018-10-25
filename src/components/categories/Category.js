import React from 'react';


const Category = (props) => {
  const categories = props.categories.map((category) => {
    let url = "/categories/" + category.id;
  		return <a href={url}><li key={category.id}>{category.title}</li></a>
  	})

  	return (
  		<div className="component nav-links">
  			<ul className="name">{categories} </ul>
  		</div>
  	)
}

export default Category;
