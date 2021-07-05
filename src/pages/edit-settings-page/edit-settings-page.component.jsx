import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import myAxios from '../../auth/axios.config';
import { useAuth } from '../../auth/use-auth';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { FormInput } from '../../components/FormInput/FormInput.component';
import { FormInputToggle } from '../../components/FormInputToggle/FormInputToggle.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';
import { useResponse } from '../../libs/useResponse';
import {
  nameValidationSchema,
  passwordValidationSchema,
} from './edit-settings-page.schema';

import './edit-settings-page.styles.scss';

const EditSettingsPage = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [privateFavorites, setPrivateFavorites] = useState('');
  const updatePasswordResponse = useResponse();
  const updateSettingsResponse = useResponse();
  const { user, token, updatePassword, setUser } = useAuth();
  console.log(user);
  //set initial privateFavorites value when user mounted
  useEffect(() => {
    if (user) {
      setPrivateFavorites(user.privateFavorites);
    }
  }, [user]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await passwordValidationSchema.validate(
        { password, newPassword, newPasswordConfirm },
        { abortEarly: false }
      );
      await updatePassword(password, newPassword, newPasswordConfirm);
      updatePasswordResponse.createResponse({ message: 'Password updated!' });
      setPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (err) {
      updatePasswordResponse.createResponse(err);
    }
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    const { id } = e.target;
    try {
      //validate name field if updating name
      if (id === 'update-name') {
        await nameValidationSchema.validate(data);
      }
      const response = await myAxios(token).patch(
        `http://localhost:3000/api/users/me`,
        data
      );
      setUser(response.data.user);
      //clear relevant field
      if (id === 'update-name') {
        setName('');
      }
      updateSettingsResponse.createResponse({ message: 'Settings saved!' });
      setTimeout(() => updateSettingsResponse.clearResponse(), 4000);
    } catch (err) {
      updateSettingsResponse.createResponse(err);
    }
  };

  return (
    <Container fluid as="main" className="edit-settings-page">
      <Row as="header">
        <Col xs={12}>
          <h1>Edit settings</h1>
          <hr />
        </Col>
      </Row>
      <Row as="section" className="edit-settings-forms">
        <Col xs={12} md={6} className="edit-settings-password">
          <form id="update-password" onSubmit={handleUpdatePassword}>
            <h2>Set new password</h2>
            <p>You will need to log in again after changing your password.</p>
            <FormInput
              type="password"
              value={password}
              id="change-password-current"
              onChange={(e) => setPassword(e.target.value)}
              label="Current Password"
            />
            <FormInput
              type="password"
              value={newPassword}
              id="change-password-new"
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
            />
            <FormInput
              type="password"
              value={newPasswordConfirm}
              id="change-password-confirm"
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              label="Confirm New Password"
            />
            <CustomButton type="submit">Change password</CustomButton>
            <ResponseMessage response={updatePasswordResponse.response} />
          </form>
        </Col>
        <Col xs={12} md={6} className="edit-settings-name-favorites">
          <form
            className="edit-settings-name"
            id="update-name"
            onSubmit={(e) => handleSubmit(e, { name })}
          >
            <h2>Set new name</h2>
            <FormInput
              type="name"
              value={name}
              id="input-change-name"
              onChange={(e) => setName(e.target.value)}
              label="New Name"
            />
            <CustomButton type="submit">Change name</CustomButton>
          </form>
          <form className="edit-settings-favorites">
            <h2>Favorites Privacy</h2>
            <p>Should your favorites be hidden from others?</p>
            <FormInputToggle
              checked={privateFavorites}
              handleClick={(e) =>
                handleSubmit(e, { privateFavorites: !privateFavorites })
              }
              id="update-private-favorites"
            />
          </form>
          <ResponseMessage response={updateSettingsResponse.response} />
        </Col>
      </Row>
    </Container>
  );
};

export default EditSettingsPage;
