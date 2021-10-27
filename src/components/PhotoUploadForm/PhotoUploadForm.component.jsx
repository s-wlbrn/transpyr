import React from 'react';
import { withRouter } from 'react-router-dom';

import authContext from '../../auth/use-auth';
import API from '../../api';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';
import { CustomButton } from '../CustomButton/CustomButton.component';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner.component';

import './PhotoUploadForm.styles.scss';

class PhotoUploadForm extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      submitting: false,
      response: { error: false, message: null },
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
      this.setState({
        response: { error: true, message: 'Please select a valid image.' },
      });
      return false;
    }

    this.reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.setState({ selectedFile: imageFile, response: { message: null } });
      };
      img.onerror = () => {
        this.setState({
          response: { error: true, message: 'Invalid image content.' },
        });
        return false;
      };

      img.src = e.target.result;
    };
    this.reader.readAsDataURL(imageFile);
  };

  handleUpload = async (e) => {
    e.preventDefault();
    const { token } = this.context;
    const { selectedFile, response } = this.state;

    //Handle invalid image
    if (response instanceof Error) {
      return false;
    }

    //Handle no image selected
    if (!selectedFile) {
      this.setState({
        response: { error: true, message: 'Please select an image to upload.' },
      });
      return false;
    }

    //Create form data object and add photo field
    const formData = new FormData();
    const id = this.props.resourceId || '';
    formData.append('photo', selectedFile);
    //Call API
    try {
      this.setState({ submitting: true });
      await new API(token).uploadPhoto(this.props.resource, id, formData);

      this.setState({
        response: {
          error: false,
          message: 'Photo uploaded successfully!',
        },
      });

      if (this.props.successCallback) {
        this.props.successCallback();
      }
    } catch (err) {
      this.setState({
        response: { error: true, message: err.message },
      });
    } finally {
      this.setState({ submitting: false });
    }
  };

  render() {
    const { submitting, response } = this.state;
    return (
      <section className="photo-upload-container">
        {this.reader.result && <img src={this.reader.result} alt="resource" />}
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
          <div className="photo-upload-controls">
            {this.props.cancel && (
              <CustomButton type="button">Cancel</CustomButton>
            )}

            <CustomButton type="submit" submitting={submitting}>
              Upload
            </CustomButton>
          </div>
        </form>
        <ResponseMessage response={response} />
      </section>
    );
  }
}

export default withRouter(PhotoUploadForm);
