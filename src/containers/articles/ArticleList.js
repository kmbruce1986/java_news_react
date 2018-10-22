import React from 'react';
import ArticleListItem from '../../components/articles/ArticleListItem.js';

const ArticleList = (props) => {
// may need to be amended - one article or many?
	const articles = props.articles.map((article) => {
		return(
		<li key={article.id} className="component-item">
      {/* placeholder */}
			<ArticleListItem article={article} />
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
