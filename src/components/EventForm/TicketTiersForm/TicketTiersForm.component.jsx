import React from 'react';

import { Row, Col, Container } from 'react-bootstrap';

import { FormInput } from '../../FormInput/FormInput.component';
import { TicketTierList } from '../TicketTierList/TicketTierList.component';
import { CustomButton } from '../../CustomButton/CustomButton.component';
import { ResponseMessage } from '../../ResponseMessage/ResponseMessage.component';

import './TicketTiersForm.styles.scss';

class TicketTiersForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTier: this.initialCurrentTier,
      editMode: false,
      tierToEdit: '',
      error: '',
    };
  }

  initialCurrentTier = {
    tierName: '',
    tierDescription: '',
    capacity: '',
    price: '',
    online: false,
  };

  isFormValid(validators) {
    const { currentTier } = this.state;
    const { ticketTiers } = this.props;
    let formValid = true;
    let errors = [];

    // Check if all fields are complete
    if (validators.complete) {
      //Get array of form values
      let tierValues = Object.values(currentTier);

      let formComplete = true;
      //remove the online boolean value
      const newTiers = tierValues.filter((e) => typeof e !== 'boolean');
      //flag isFormComplete false if empty value found
      newTiers.forEach((value) => {
        if (!value) formComplete = false;
      });

      if (!formComplete) {
        errors.push('Please fill out all fields.');
        formValid = false;
      }
    }

    if (validators.name) {
      //trim whitespace from name
      currentTier.tierName = currentTier.tierName.trim();
      //collect all tier names and convert to lowercase
      let names = ticketTiers.map((tier) => tier.tierName.toLowerCase());
      //name of new tier is unique if not included in names array
      let unique = !names.includes(currentTier.tierName.toLowerCase());

      if (!unique) {
        errors.push('A tier with this name already exists.');
        formValid = false;
      }
    }

    if (validators.capacity) {
      if (!currentTier.online && Number(currentTier.capacity) === 0) {
        errors.push('In-person tickets must have a capacity.');
        formValid = false;
      } else if (Number(currentTier.capacity) < 0) {
        errors.push('Invalid capacity.');
        formValid = false;
      }
    }

    if (validators.price) {
      if (currentTier.price < 0) {
        errors.push('Invalid price.');
        formValid = false;
      }
    }

    if (errors.length) this.setState({ error: errors.join(' ') });
    return formValid;
  }

  toggleEditMode = (tier) => {
    if (this.state.editMode && this.state.tierToEdit === tier.tierName) {
      this.setState({
        currentTier: this.initialCurrentTier,
        editMode: false,
        tierToEdit: '',
        error: '',
      });
    } else {
      this.setState({
        currentTier: tier,
        editMode: true,
        tierToEdit: tier.tierName,
        error: '',
      });
    }
  };

  handleTierChange = ({ target: { name, value } }) => {
    this.setState({
      currentTier: { ...this.state.currentTier, [name]: value },
    });
  };

  handleOnlineCheckbox = () => {
    this.setState({
      currentTier: {
        ...this.state.currentTier,
        online: !this.state.currentTier.online,
      },
    });
  };

  handleTierSubmit = () => {
    const { currentTier } = this.state;
    const { ticketTiers } = this.props;
    if (
      this.isFormValid({
        complete: true,
        name: true,
        capacity: true,
        price: true,
      })
    ) {
      //Format tier data
      currentTier.capacity = Number(currentTier.capacity);
      currentTier.price = Number(currentTier.price);
      //add to ticketTiers
      this.props.handleChange({
        target: { name: 'ticketTiers', value: [...ticketTiers, currentTier] },
      });
      this.setState({
        currentTier: this.initialCurrentTier,
        error: '',
      });
    }
  };

  handleTierEdit = () => {
    const { currentTier, tierToEdit } = this.state;
    const { ticketTiers } = this.props;
    if (this.isFormValid({ complete: true, capacity: true, price: true })) {
      //Format tier data
      currentTier.capacity = Number(currentTier.capacity);
      currentTier.price = Number(currentTier.price);
      //Set new tierList with tier replaced
      const updatedTiers = ticketTiers.map((tier) =>
        tier.tierName === tierToEdit ? currentTier : tier
      );
      this.props.handleChange({
        target: { name: 'ticketTiers', value: updatedTiers },
      });
      this.setState({
        currentTier: this.initialCurrentTier,
        editMode: false,
        tierToEdit: '',
        error: '',
      });
    }
  };

  handleTierDelete = () => {
    const { tierToEdit } = this.state;
    const { ticketTiers } = this.props;
    const updatedTiers = ticketTiers.filter(
      (tier) => tier.tierName !== tierToEdit
    );
    this.props.handleChange({
      target: { name: 'ticketTiers', value: updatedTiers },
    });
    this.setState({
      currentTier: this.initialCurrentTier,
      editMode: false,
      tierToEdit: '',
      error: '',
    });
  };

  render() {
    const {
      currentTier: { tierName, tierDescription, online, capacity, price },
      editMode,
      tierToEdit,
      error,
    } = this.state;
    const { ticketTiers } = this.props;
    return (
      <Container fluid className="ticket-tiers-form">
        <Row>
          <Col xs={12}>
            <h2>Specify the ticket types available for the event.</h2>
            <TicketTierList
              tierList={ticketTiers}
              tierToEdit={tierToEdit}
              toggleEditMode={this.toggleEditMode}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            {editMode ? (
              <CustomButton type="button" onClick={this.handleTierEdit}>
                Confirm Edit
              </CustomButton>
            ) : (
              <CustomButton type="button" onClick={this.handleTierSubmit}>
                Add Ticket Type
              </CustomButton>
            )}
          </Col>
          {editMode ? (
            <Col xs={6}>
              <CustomButton
                type="button"
                style={{ background: 'darkred' }}
                onClick={this.handleTierDelete}
              >
                Delete Ticket
              </CustomButton>
            </Col>
          ) : null}
        </Row>
        <Row>
          <Col xs={12}>
            <div className="ticket-tiers-message">
              {error && <ResponseMessage error>{error}</ResponseMessage>}
            </div>
          </Col>
          <Col xs={12} className="ticket-tiers-name-group">
            <FormInput
              name="tierName"
              type="name"
              id="tier-name"
              value={tierName}
              handleChange={this.handleTierChange}
              label="Ticket Name"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormInput
              name="tierDescription"
              type="text"
              id="tier-description"
              value={tierDescription}
              handleChange={this.handleTierChange}
              label="Ticket Description"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="online-input-group">
            <label htmlFor={'tier-online'} className="online-input-label">
              Online Attendence
            </label>
            <FormInput
              name="online"
              type="checkbox"
              id="tier-online"
              checked={online}
              handleChange={this.handleOnlineCheckbox}
              required
            />
          </Col>
          <Col xs={4}>
            <FormInput
              name="capacity"
              type="number"
              id="tier-capacity"
              value={capacity}
              handleChange={this.handleTierChange}
              label="# of Tickets"
            />
          </Col>
          <Col xs={4}>
            <FormInput
              name="price"
              type="number"
              id="tier-price"
              value={price}
              handleChange={this.handleTierChange}
              label="Ticket Price"
              required
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TicketTiersForm;
