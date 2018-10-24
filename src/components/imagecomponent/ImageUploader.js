import React, { Component } from 'react';

class ImageUploader extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedFile: null,
      lastUploadedFileName: '',
      imageUrl: props.imageUrl
    }

    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);



  }

  handleSubmit(event){
    event.preventDefault();
    //console.log("Form submitting");

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    // if(this.state.selectedFile !== null){
    //   console.log(formData);
    //
    // }

    fetch('/uploadFile', { // Your POST endpoint
      method: 'POST',
      // headers: {
      //   "Content-Type": "You will perhaps need to define a content-type here"
      // },
      body: formData// This is your file object
    })
    .then((response) => {
      console.log("Success");
      console.log(response);
      return response.json();
    })
    .then((success) => {
      console.log("Success");
      console.log(success);
      this.setState({
        imageUrl: success.fileName
      })
      this.props.handleImageSelect(success.fileName);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  fileSelectedHandler(event){

    this.setState({selectedFile: event.target.files[0]});
    //console.log(event.target.files[0]);

  }

  render(){

    let image = '';

    if (this.props.imageUrl !== ''){
      image = (
        <img
          className={"article-image " + this.props.type}
          src={this.props.imageStore + this.props.imageUrl}/>
      )
    }


    return (
      <div className={"upload-content " + this.props.type}>
        <div className={"single-upload " + this.props.type}>
          <div className={"image-box " + this.props.type}>
          {image}

          <div className="image-upload-controls">
          <form className={"image-upload " + this.props.type}
            onSubmit={this.handleSubmit}>
            <input
              type="file"
              name="file"
              className="file-input"
              required
              onChange={this.fileSelectedHandler}
            />
            <button
              type="submit"
              className="primary submit-btn">Submit</button>
            </form>
            <div className="upload-response">
              <div id="singleFileUploadError"></div>
              <div id="singleFileUploadSuccess"></div>
            </div>
          </div>
          </div>
          </div>

        </div>
      )
    }

  }

  export default ImageUploader;
