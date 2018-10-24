import React from 'react';

const CategoryHead =  (props) => {

  if(props.category){
    return (
      <div className="content-head">
        <h1>{props.category.title}</h1>
          <img className="category-img" src={"/images/" + props.category.title + ".jpg"} alt=""/>
      </div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }



}

export default CategoryHead;
