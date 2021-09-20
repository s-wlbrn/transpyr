import React, { useEffect, useMemo, useState } from 'react';

import { Row, Col, Container, Alert } from 'react-bootstrap';

import { FormInput } from '../../FormInput/FormInput.component';
import { TicketTierList } from '../TicketTierList/TicketTierList.component';
import { CustomButton } from '../../CustomButton/CustomButton.component';
import { ResponseMessage } from '../../ResponseMessage/ResponseMessage.component';

import './TicketTiersForm.styles.scss';
import { validationSchema } from './TicketTiersForm.schema';
import { useResponse } from '../../../libs/useResponse';
import { FormInputToggle } from '../../FormInputToggle/FormInputToggle.component';
import { validationSchemaArray } from '../EventForm.schema';

const initialCurrentTier = {
  tierName: '',
  tierDescription: '',
  capacity: '',
  price: '',
  online: false,
  limitPerCustomer: '',
};

export const TicketTiersForm = ({
  ticketTiers,
  handleEventChange,
  totalCapacity,
}) => {
  const [currentTier, setCurrentTier] = useState(initialCurrentTier);
  const [editMode, setEditMode] = useState(false);
  const [tierToEdit, setTierToEdit] = useState(null);
  const [capacityAlert, setCapacityAlert] = useState(null);
  const { response, createResponse, clearResponse } = useResponse();

  const ticketNames = useMemo(() => {
    return ticketTiers.map((tier) => tier.tierName.toLowerCase());
  }, [ticketTiers]);

  //validate ticketTiers on every submit for displaying alert
  useEffect(() => {
    const validateTicketTiers = async () => {
      try {
        await validationSchemaArray[3].validate(
          { ticketTiers, totalCapacity },
          { abortEarly: false }
        );
        setCapacityAlert(null);
      } catch (err) {
        setCapacityAlert(err.errors.join(' '));
      }
    };
    validateTicketTiers();
  }, [ticketTiers, totalCapacity]);

  const toggleEditMode = (tier) => {
    if (editMode && tierToEdit === tier.tierName) {
      setCurrentTier(initialCurrentTier);
      setEditMode(false);
      setTierToEdit(null);
      clearResponse();
    } else {
      setCurrentTier(tier);
      setEditMode(true);
      setTierToEdit(tier.tierName);
      clearResponse();
    }
  };

  const handleTierChange = ({ target: { name, value, type } }) => {
    setCurrentTier({
      ...currentTier,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleToggleOnline = () => {
    setCurrentTier({
      ...currentTier,
      online: !currentTier.online,
    });
  };

  const handleTierSubmit = async () => {
    try {
      const submittedTier = { ...currentTier };
      //trim name whitespace
      submittedTier.tierName = submittedTier.tierName.trim();
      //name of new tier is unique if not included in tierNames array
      const unique = !ticketNames.includes(
        submittedTier.tierName.toLowerCase()
      );
      if (!unique && !editMode) {
        throw new Error('Ticket name must be unique.');
      }
      if (submittedTier.capacity > totalCapacity) {
        throw new Error('Ticket capacity cannot exceed the event maximum.');
      }

      //validate other fields
      await validationSchema.validate(
        { ...submittedTier },
        { abortEarly: false }
      );

      //add to ticketTiers
      const updatedTicketTiers = editMode
        ? ticketTiers.map((tier) =>
            tier.tierName === tierToEdit ? submittedTier : tier
          )
        : [...ticketTiers, submittedTier];
      handleEventChange({
        target: { name: 'ticketTiers', value: updatedTicketTiers },
      });

      //initialize
      setCurrentTier(initialCurrentTier);
      clearResponse();
      if (editMode) {
        setTierToEdit(false);
        setEditMode(false);
      }
    } catch (err) {
      createResponse(err);
    }
  };

  const handleTierDelete = () => {
    const updatedTiers = ticketTiers.filter(
      (tier) => tier.tierName !== tierToEdit
    );
    handleEventChange({
      target: { name: 'ticketTiers', value: updatedTiers },
    });
    setCurrentTier(initialCurrentTier);
    clearResponse();
    setTierToEdit(null);
    setEditMode(false);
  };

  const {
    tierName,
    tierDescription,
    online,
    capacity,
    price,
    limitPerCustomer,
  } = currentTier;
  return (
    <Container fluid className="ticket-tiers-form">
      {capacityAlert && (
        <Row>
          <Col xs={12}>
            <Alert show={true} variant="warning">
              {capacityAlert}
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="ticket-tiers-tier-list">
        <Col xs={12}>
          <h2>Specify the ticket types available for the event.</h2>
          <TicketTierList
            tierList={ticketTiers}
            tierToEdit={tierToEdit}
            toggleEditMode={toggleEditMode}
          />
        </Col>
      </Row>
      <Row className="ticket-tiers-controls">
        <Col xs={6}>
          <CustomButton type="button" onClick={handleTierSubmit}>
            {editMode ? 'Confirm Edit' : 'Add Ticket Type'}
          </CustomButton>
        </Col>
        {editMode && (
          <Col xs={6}>
            <CustomButton type="button" warning onClick={handleTierDelete}>
              Delete Ticket
            </CustomButton>
          </Col>
        )}
      </Row>
      <Row>
        <Col xs={12}>
          <ResponseMessage response={response} />
        </Col>
        <Col xs={12} className="ticket-tiers-name-group">
          <FormInput
            name="tierName"
            type="name"
            id="tier-name"
            value={tierName}
            handleChange={handleTierChange}
            label="Ticket Name"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <FormInput
            name="tierDescription"
            type="text"
            id="tier-description"
            value={tierDescription}
            handleChange={handleTierChange}
            label="Ticket Description"
            required
          />
        </Col>
        <Col xs={4}>
          <FormInput
            name="limitPerCustomer"
            type="number"
            id="tier-limit"
            value={limitPerCustomer}
            handleChange={handleTierChange}
            label="Per Customer"
            min="1"
            max={capacity || undefined}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="online-input-group">
          <label htmlFor={'tier-online'} className="online-input-label">
            Online
          </label>
          <FormInputToggle
            name="online"
            checked={online}
            id="tier-online"
            onClick={handleToggleOnline}
          />
        </Col>
        <Col xs={4} className="capacity-input-group">
          <FormInput
            name="capacity"
            type="number"
            id="tier-capacity"
            value={capacity}
            handleChange={handleTierChange}
            label="Capacity"
            min="0"
            max={totalCapacity}
          />
          <div className="capacity-input-total-capacity">{`Event total: ${totalCapacity}`}</div>
        </Col>
        <Col xs={4}>
          <FormInput
            name="price"
            type="currency"
            id="tier-price"
            value={price}
            handleChange={handleTierChange}
            label="Price"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TicketTiersForm;
