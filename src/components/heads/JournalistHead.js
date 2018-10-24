import React from 'react';

const JournalistHead =  (props) => {

  if (props.user){
    return (
      <div className="journalist-head">
        <h3>{props.article.journalist.firstName} {props.article.journalist.lastName}</h3>
        <h4>{props.article.journalist.jobTitle}</h4>
        <h4>{props.article.journalist.bio}</h4>
        <h4>{props.article.journalist.twitterHandle}</h4>
        <a href={"/journalist/" + props.article.journalist.id}>Edit</a>
      </div>
    )
  } else {

    return (
      <div className="journalist-head">
        <h3>{props.article.journalist.firstName} {props.article.journalist.lastName}</h3>
        <h4>{props.article.journalist.jobTitle}</h4>
        <h4>{props.article.journalist.bio}</h4>
        <h4>{props.article.journalist.twitterHandle}</h4>
      </div>
    )
  }

}

export default JournalistHead;
