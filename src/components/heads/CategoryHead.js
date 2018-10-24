import React from 'react';

const CategoryHead =  (props) => {

  if(props.category){
    return (
      <div className="content-head">{props.category.title}</div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }



}

export default CategoryHead;
