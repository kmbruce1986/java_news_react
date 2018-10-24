import React from 'react';

const ArticleHead =  (props) => {

  let url = "/article/" + props.article.id;
  return (
    <div><a href={url}><h1>{props.article.headline}</h1> <br/> <h2>{props.article.subline} </h2> <img src={"http://localhost:8080/images/"+ props.article.thumbnailImage} alt=""/> </a></div>
  )


}

export default ArticleHead;
