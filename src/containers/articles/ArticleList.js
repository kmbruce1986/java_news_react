import React from 'react';
// double check route for Article
import Article from '../../components/articles/Article.js';

const ArticleList = (props) => {
// may need to be amended - one article or many?
	const articles = props.articles.map((article) => {
		return(
		<li key={article.id} className="component-item">
			<Article article={article} />
		</li>
	)
	})

// function to define what should be rendered in the HeadContent - either category name, journalist, or toparticle
  function checkHeadContentType(articles){
    // if to be sorted via category
     return articles[0].category;
//  if to be sorted via journalist
    return articles[0].journalist;
// if all articles to be returned 
    else return "all";
  }

	return (
    <div headContentType={checkHeadContentType(articles)}></div>
		<ul className="component-list">
			{articles}
		</ul>
	)
}


export default ArticleList;
