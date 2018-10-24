import React from 'react';

const JournalistHead =  (props) => {


  return (
    <div className="content-head">{props.article.journalist.firstName} </div>
  )

}

export default JournalistHead;
