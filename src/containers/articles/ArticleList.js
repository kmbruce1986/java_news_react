import React from 'react';
// double check route for Article
import Article from '../../components/articles/Article.js';

const ArticleList = (props) => {

	const articles = props.articles.map((article) => {
		return(
		<li key={article.id} className="component-item">
			<Article article={article} />
		</li>
	)
	})

	return (
		<ul className="component-list">
			{articles}
		</ul>
	)
}


export default ArticleList;
