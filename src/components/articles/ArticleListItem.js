import React from 'react';

const ArticleListItem = (props) => {
  return(
    <div className="individual-article">
      <img className="thumbnail-image" src={"http://localhost:8080/images/"+ props.article.thumbnailImage} alt=""/><h2>{props.article.headline} </h2>
    </div>
  )
}

export default ArticleListItem;
