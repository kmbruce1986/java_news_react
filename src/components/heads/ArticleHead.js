import React from 'react';

const ArticleHead =  (props) => {

  let url = "/article/" + props.article.id;
  return (
    <div><a href={url}>{props.article.headline}</a></div>
  )


}

export default ArticleHead;
