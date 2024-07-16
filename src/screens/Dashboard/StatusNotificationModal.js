import React from 'react';
import { Modal, Button, Form, Divider } from 'semantic';
import modal from 'helpers/modal';

function selectDefaultConnector(availableConnectors) {
  return ['1', '2'].filter((connectorId) => {
    return !availableConnectors.includes(Number(connectorId));
  });
}

// Valid status transitions referenced from Page 41 https://www.oasis-open.org/committees/download.php/58944/ocpp-1.6.pdf

const Status = {
  Available: 'Available',
  Occupied: 'Occupied',
  // Preparing: 'Preparing',
  // Charging: 'Charging',
  // SuspendedEV: 'SuspendedEV',
  // SuspendedEVSE: 'SuspendedEVSE',
  // Finishing: 'Finishing',
  Reserved: 'Reserved',
  Unavailable: 'Unavailable',
  Faulted: 'Faulted',
};

const newStatusOption = (status, description) => {
  const option = {
    key: status,
    text: status,
    description: description,
    value: status,
    canTransitionFrom: new Set([status]),
  };
  StatusOptions.push(option);
  return {
    allowAll: function () {
      option.canTransitionFrom = new Set(Object.values(Status));
      return this;
    },
    allowedFrom: function (status) {
      option.canTransitionFrom.add(status);
      return this;
    },
    notAllowedFrom: function (status) {
      option.canTransitionFrom.delete(status);
      return this;
    },
  };
};

const StatusOptions = [];

const filteredStatusOptions = (currentStatus) =>
  StatusOptions.filter((option) => option.canTransitionFrom.has(currentStatus));

newStatusOption(
  Status.Available,
  'Connector is available for a new user'
).allowAll();

newStatusOption(Status.Occupied, 'EV is charging').allowAll();

newStatusOption(Status.Reserved, 'Connector is reserved for a user')
  .allowedFrom(Status.Available)
  .allowedFrom(Status.Faulted);

newStatusOption(
  Status.Unavailable,
  'Connector is not available for a new user'
).allowAll();

newStatusOption(
  Status.Faulted,
  'Charge Point or Connector encountered an error and is not available to deliver a charge'
).allowAll();

@modal
export default class StatusNotificationModal extends React.Component {
  state = {
    status: this.props.currentStatus || {},
    session: this.props.session,
    connectorId: selectDefaultConnector(this.props.availableConnectors)[0],
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.availableConnectors.length !==
      this.props.availableConnectors.length
    ) {
      this.setState({
        connectorId: selectDefaultConnector(this.props.availableConnectors)[0],
      });
    }
  }

  onSubmit = () => {
    this.props.onSave({
      connectorId: this.state.connectorId,
      connectorStatus: this.state.status[this.state.connectorId],
    });
    this.props.close();
  };

  render() {
    const { connectorId, status } = this.state;
    const { availableConnectors } = this.props;

    const connectorOptions = ['1', '2'].map((key) => {
      return {
        key,
        text: `Connector ${key}`,
        value: key,
        disabled: availableConnectors.includes(Number(key)),
      };
    });
    const connectorStatus = this.props.currentStatus[Number(connectorId)];
    const statusOptions = filteredStatusOptions(connectorStatus);

    return (
      <>
        <Modal.Header>Send Connector Status Change</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSubmit} id="edit-status-notification">
            <Form.Dropdown
              label="Connector"
              options={connectorOptions}
              selection
              value={connectorId}
              onChange={(e, { value }) => {
                this.setState({ connectorId: value });
              }}
            />
            <Divider hidden />
            <Form.Dropdown
              label={`Status (currently ${connectorStatus})`}
              options={statusOptions}
              selection
              value={status[connectorId]}
              onChange={(e, { value }) => {
                this.setState({
                  status: {
                    ...status,
                    [connectorId]: value,
                  },
                });
              }}
            />
            <Divider hidden />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            form="edit-status-notification"
            content="Send Update"
          />
        </Modal.Actions>
      </>
    );
  }
}
