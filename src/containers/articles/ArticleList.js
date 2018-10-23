import React from 'react';
import ArticleListItem from '../../components/articles/ArticleListItem.js';

const ArticleList = (props) => {
	const articles = props.articles.map((article) => {
		let url = "/article/" + article.id;
		return(
		<li key={article.id} className="component-item">
			<a href={url}>
			<ArticleListItem article={article} />
			</a>
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
