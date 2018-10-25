import React from 'react';

const ArticleHead =  (props) => {

  let url = "/article/" + props.article.id;
  return (
    <div className="content-head"><a href={url}><h1>&emsp;&emsp;{props.article.headline}</h1> <h2>&emsp;&emsp;&nbsp;&nbsp;{props.article.subline} </h2> &emsp;&emsp;&emsp;<img className="article-image" src={"http://localhost:8080/images/"+ props.article.thumbnailImage} alt=""/> </a></div>
  )


}

export default ArticleHead;
