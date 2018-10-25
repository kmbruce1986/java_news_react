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
    this.handleImageSubmit = this.handleImageSubmit.bind(this);



  }

  handleImageSubmit(event){
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);


    fetch('/uploadFile', { // Your POST endpoint
      method: 'POST',
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
          <div className={"image-upload " + this.props.type}>
            <input
              type="file"
              name="file"
              className="file-input"
              onChange={this.fileSelectedHandler}
            />
            <button
             onClick={this.handleImageSubmit}
              className="primary submit-btn">Submit</button>
            </div>
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
