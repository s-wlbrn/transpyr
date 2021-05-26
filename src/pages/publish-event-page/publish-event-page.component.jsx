import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Alert, Col, Container, Row } from 'react-bootstrap';

import { useAuth } from '../../auth/use-auth';
import myAxios from '../../auth/axios.config';

import ErrorPage from '../error-page/error-page.component';

import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { FormInput } from '../../components/FormInput/FormInput.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';

import './publish-event-page.styles.scss';
import { FormInputTextArea } from '../../components/FormInputTextArea/FormInputTextArea.components';

export const PublishEventPage = () => {
  const { user, token } = useAuth();
  const [feePolicy, setFeePolicy] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const publishForm = useRef(null);
  const scrollToForm = () => publishForm.current.scrollIntoView();

  const match = useRouteMatch();
  const history = useHistory();

  const navigateToEventPage = () =>
    history.push(`/events/id/${match.params.id}`);

  useEffect(() => {
    const fetchEventAndCheckAuth = async () => {
      try {
        const response = await myAxios().get(
          `http://localhost:3000/api/events/${match.params.id}?fields=organizer`
        );

        const event = response.data.data;
        if (event.published) history.push(`/events/id/${match.params.id}`);

        //handle unauthorized
        if (user._id !== event.organizer) {
          setError({
            statusCode: 403,
            message: 'You are not the organizer of this event.',
          });
        }

        setDataFetched(true);
      } catch (err) {
        setError(err.response.data);
        setDataFetched(true);
      }
    };

    if (user._id) fetchEventAndCheckAuth();
  }, [match, history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await myAxios(token).put(
        `http://localhost:3000/api/events/${match.params.id}/publish-event`,
        {
          feePolicy,
          refundPolicy,
        }
      );
      navigateToEventPage();
    } catch (err) {
      setResponse(err.response.data.message);
    }
  };

  if (!dataFetched) return <LoadingResource>Loading event...</LoadingResource>;
  if (error) return <ErrorPage {...error} />;

  return (
    <Container fluid as="main" className="publish-event-page">
      <Row>
        <Col xs={12}>
          <h1>Publish event</h1>
          <h2>Just a few more steps to publish your event.</h2>
          <hr />
        </Col>
      </Row>
      <form onSubmit={handleSubmit} ref={publishForm}>
        <Alert variant="warning" show={showConfirm}>
          <Alert.Heading>Ready to publish?</Alert.Heading>
          <p>
            The settings on this page can't be changed once the event is
            published. Confirm everything is correct before continuing.
          </p>
          <hr />
          <div className="confirm-publish-buttons">
            <CustomButton
              type="button"
              style={{ background: 'darkred' }}
              onClick={() => setShowConfirm(false)}
            >
              Go back
            </CustomButton>
            <CustomButton type="submit">Confirm submit</CustomButton>
          </div>
        </Alert>
        {response && (
          <Row>
            <Col xs={12}>
              <ResponseMessage error>{response}</ResponseMessage>
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={12} md={6}>
            <h2>Service fee</h2>
            <p>
              You can either absorb the 4% service fee by taking it out of your
              earnings, or pass the fee on to attendees by adding it to the
              ticket price.
            </p>
            {/* <label htmlFor="absorbFee">Absorb fee</label> */}
            <div className="publish-event-service-fee">
              <FormInput
                type="radio"
                name="feePolicy"
                id="input-absorb-fee"
                value="absorbFee"
                label="Absorb fee"
                onChange={(e) => setFeePolicy(e.target.value)}
              />
              {/* <label htmlFor="passFee">Pass fee on</label> */}
              <FormInput
                type="radio"
                name="feePolicy"
                id="input-pass-fee"
                value="passFee"
                label="Pass fee on"
                onChange={(e) => setFeePolicy(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <h2>Payout Info</h2>
            <p>This feature is not implemented for this demonstration.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h2>Refund Policy</h2>
            <p>
              Note: Refund policies are subject to Transpyr's Terms and
              Conditions. Leave this blank to apply our{' '}
              <a href="#">standard refund policy</a>.
            </p>
            <FormInputTextArea
              name="refundPolicy"
              id="input-refund-policy"
              value={refundPolicy}
              onChange={(e) => setRefundPolicy(e.target.value)}
              rows={5}
              label="Enter refund policy"
              required
            />
          </Col>
        </Row>
        {!showConfirm && (
          <Row>
            <Col xs={6}>
              <CustomButton
                type="button"
                style={{ background: 'darkred' }}
                onClick={navigateToEventPage}
              >
                Go back to event
              </CustomButton>
            </Col>
            <Col xs={6}>
              <CustomButton
                type="button"
                onClick={() => {
                  setShowConfirm(true);
                  scrollToForm();
                }}
              >
                Publish event
              </CustomButton>
            </Col>
          </Row>
        )}
      </form>
    </Container>
  );
};
