import React from 'react';


const Category = (props) => {
  const categories = props.categories.map((category) => {
    let url = "/categories/" + category.id;
  		return <li key={category.id}><a href={url}>{category.title}</a></li>
  	})

  	return (
  		<div className="component">
  			<ul className="name">{categories} </ul>
  		</div>
  	)
}

export default Category;
