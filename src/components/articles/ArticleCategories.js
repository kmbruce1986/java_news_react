import React, { Component }  from 'react';

class ArticleCategories extends Component {

  constructor(props){
    super(props);

    this.state = {
      selectedOptions: []
    }

    this.isSelectedCategory = this.isSelectedCategory.bind(this);

  }

  isSelectedCategory(categoryItem){

    let catFound = false;

    if (this.props.selectedCategories.length > 0){
      this.props.selectedCategories.map((cat) => {
        if (cat == categoryItem._links.self.href ){
          catFound = true;
        }
      })
    }

    return catFound;

  }

  render (){

    const categoryDivs = this.props.categoryItems.map((catItem) => {

      let classes = this.isSelectedCategory(catItem) ? 'category-item selected-category' : 'category-item';

      return (
        <div key={catItem.id}>
          <p
            className={classes}
            onClick={this.props.handleSelectionChange}
            data-category={catItem._links.self.href}
            className={classes}>
            {catItem.title}
          </p>
        </div>
      )
    })

    return (
      <div className="article-categories">
        <h4>Article Categories</h4>
        <div className="article-category-select">
          {categoryDivs}
        </div>
      </div>
    )

  }

}

export default ArticleCategories ;
