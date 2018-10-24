import React from 'react';

const ArticleListItem = (props) => {
  return(
    <div className="individual-article">{props.article.headline}</div>
  )
}

export default ArticleListItem;
