import React from 'react';
import { withRouter } from 'react-router-dom';

import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';
import { CustomButton } from '../CustomButton/CustomButton.component';

import './PhotoUploadForm.styles.scss';
import myAxios from '../../auth/axios.config';
import authContext from '../../auth/use-auth';

class PhotoUploadForm extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      messageResponse: null,
      messageValidation: null,
      imageUrl: null,
    };

    this.reader = new FileReader();
  }

  onFileChange = (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) {
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      this.setState({ messageValidation: 'Please select a valid image.' });
      return false;
    }

    this.reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.setState({ selectedFile: imageFile, messageValidation: null });
      };
      img.onerror = () => {
        this.setState({ messageValidation: 'Invalid image content.' });
        return false;
      };

      img.src = e.target.result;
    };
    this.reader.readAsDataURL(imageFile);
  };

  handleUpload = async (e) => {
    e.preventDefault();
    const { token } = this.context;
    const { selectedFile, messageValidation } = this.state;

    //Handle invalid image
    if (messageValidation) {
      return false;
    }

    //Handle no image selected
    if (!selectedFile) {
      this.setState({
        messageResponse: {
          isSuccess: false,
          message: 'Please select an image to upload.',
        },
      });
      return false;
    }

    //Create form data object and add photo field
    const formData = new FormData();
    const id = this.props.resourceId || '';
    formData.append('photo', selectedFile);
    //Call API
    try {
      await myAxios(token).patch(
        `http://localhost:3000/api/${this.props.resource}/${id}`,
        formData
      );

      this.setState({
        messageResponse: {
          isSuccess: true,
          message: 'Photo uploaded successfully!',
        },
      });

      if (this.props.successCallback) {
        this.props.successCallback();
      }
    } catch (err) {
      console.log(err.response);
      this.setState({
        messageResponse: {
          isSuccess: false,
          message: err.response.data.message,
        },
      });
    }
  };

  render() {
    const { messageResponse, messageValidation } = this.state;
    return (
      <div className="photo-upload-container">
        {this.reader.result && <img src={this.reader.result} alt="Event" />}
        <form
          className="photo-upload-form"
          id="photo-upload-form"
          onSubmit={this.handleUpload}
        >
          <input
            type="file"
            id="img"
            name="img"
            accept=".jpg,.jpeg,.png"
            onChange={this.onFileChange}
          />
          {messageValidation && (
            <ResponseMessage error>{messageValidation}</ResponseMessage>
          )}
          <CustomButton type="submit">Upload</CustomButton>
        </form>
        {messageResponse && (
          <ResponseMessage error={!messageResponse.isSuccess}>
            {messageResponse.message}
          </ResponseMessage>
        )}
      </div>
    );
  }
}

export default withRouter(PhotoUploadForm);
