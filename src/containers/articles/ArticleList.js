import React from 'react';
import ArticleListItem from '../../components/articles/ArticleListItem.js';

const ArticleList = (props) => {
	const articles = props.articles.map((article) => {
		let url = "/article/" + article.id;
		return(
			<div key={article.id} className="content-head">
				<a href={url}>
					<ArticleListItem article={article} />
				</a>
			</div>
		)
	})



	return (

		<div className="article-item">
			{articles}
		</div>
	)
}


export default ArticleList;
