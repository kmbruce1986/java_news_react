import React from 'react';

const CategoryHead =  (props) => {

  if(props.category){
    return (
      <div className="content-head">
        <h1>&emsp;&emsp;{props.category.title}</h1>&emsp;&emsp;&emsp;&nbsp;
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
