import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import API from '../../api';
import { useAuth } from '../../auth/use-auth';
import { useResponse } from '../../libs/useResponse';
import { validationSchema } from './edit-profile-page.schema';

import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { FormInputTextArea } from '../../components/FormInputTextArea/FormInputTextArea.components';
import PhotoUploadForm from '../../components/PhotoUploadForm/PhotoUploadForm.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';

import './edit-profile-page.styles.scss';

const EditProfilePage = () => {
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const { user, token, refreshToken } = useAuth();
  const { response, createResponse } = useResponse();

  useEffect(() => {
    if (user) {
      setTagline(user.tagline || '');
      setBio(user.bio || '');
      setInterests(user.interests || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ tagline, bio, interests });
      await new API(token).updateUser({ tagline, bio, interests });
      await refreshToken();
      createResponse({ message: 'Profile saved!' });
    } catch (err) {
      createResponse(err);
    }
  };

  return (
    <Container fluid as="main" className="edit-profile-page">
      <Row as="header">
        <Col xs={12}>
          <h1>Edit profile</h1>
          <hr />
        </Col>
      </Row>
      <Row as="section" className="edit-profile-upload-photo">
        <Col xs={12}>
          <h2>Upload photo</h2>
          <p>Allowed types: .jpg, .jpeg, .gif, .png</p>
          <PhotoUploadForm
            resource="users/me"
            successCallback={async () => await refreshToken()}
          />
        </Col>
      </Row>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6} as="section" className="edit-profile-tagline">
            <h2>Edit tagline</h2>
            <p>
              A short summary about you/your organization (max 150 characters)
            </p>
            <FormInputTextArea
              name="tagline"
              id="input-tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              label="Tagline"
              rows={4}
              maxLength={150}
            />
          </Col>
          <Col xs={12} md={6} as="section" className="edit-profile-interests">
            <h2>Edit interests</h2>
            <p>
              List your favorite activities or the kinds of events you like to
              attend (max 500 characters)
            </p>
            <FormInputTextArea
              name="interests"
              id="input-interests"
              onChange={(e) => setInterests(e.target.value)}
              value={interests}
              rows={4}
              maxLength={500}
              label="Enter interests"
            />
          </Col>
        </Row>
        <Row as="section" className="edit-profile-bio">
          <Col xs={12}>
            <h2>Edit bio</h2>
            <p>
              A longer description for visitors to your profile (max 1000
              characters)
            </p>
            <FormInputTextArea
              name="bio"
              id="input-bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={5}
              maxLength={1000}
              label="Enter bio"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} offset={6}>
            <CustomButton type="submit">Submit</CustomButton>
            <ResponseMessage response={response} />
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default EditProfilePage;
