import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useErrorHandler } from 'react-error-boundary';

import API from '../../api';
import { useAuth } from '../../auth/use-auth';
import { useResponse } from '../../libs/useResponse';
import { validationSchema } from './publish-event-page.schema';

import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { FormInput } from '../../components/FormInput/FormInput.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';
import { FormInputTextArea } from '../../components/FormInputTextArea/FormInputTextArea.components';

import './publish-event-page.styles.scss';

export const PublishEventPage = () => {
  const { user, token } = useAuth();
  const [feePolicy, setFeePolicy] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleError = useErrorHandler();
  const { response, createResponse } = useResponse();
  const publishForm = useRef(null);
  const scrollToForm = () => publishForm.current.scrollIntoView();
  const match = useRouteMatch();
  const history = useHistory();

  const navigateToEventPage = () =>
    history.push(`/events/id/${match.params.id}`);

  useEffect(() => {
    const fetchEventAndCheckAuth = async () => {
      try {
        const event = await new API(token).getEvent(match.params.id);
        //handle event alrady published
        if (event.published) history.push(`/events/id/${match.params.id}`);
        setDataFetched(true);
      } catch (err) {
        handleError(err);
      }
    };
    if (user._id) fetchEventAndCheckAuth();
  }, [match.params.id, token, history, user._id, handleError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await validationSchema.validate(
        { feePolicy, refundPolicy },
        { abortEarly: false }
      );
      await new API(token).publishEvent(match.params.id, {
        feePolicy,
        refundPolicy,
      });
      navigateToEventPage();
    } catch (err) {
      createResponse(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!dataFetched)
    return <LoadingResource page={true}>Loading event...</LoadingResource>;

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
              warning
              onClick={() => setShowConfirm(false)}
            >
              Go back
            </CustomButton>
            <CustomButton type="submit" submitting={submitting}>
              Confirm submit
            </CustomButton>
          </div>
        </Alert>
        <Row>
          <Col xs={12}>
            <ResponseMessage response={response} />
          </Col>
        </Row>
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
