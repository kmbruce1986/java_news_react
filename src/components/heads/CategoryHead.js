import React from 'react';

const CategoryHead =  (props) => {

  console.log(props);
  if(props.category){
    return (
      <div>{props.category.title}</div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }



}

export default CategoryHead;
