import React from 'react';
import { Modal, Button, Form, Header, Divider } from 'semantic';
import modal from 'helpers/modal';
import { HelpTip } from 'components';
import {ChargeStationSetting} from "lib/settings";

@modal
export default class SettingsModal extends React.Component {
  state = {
    config: this.props.configuration.variablesToKeyValueMap(),
    settings: this.props.settings || [],
    settingsList: this.props.settingsList || [],
  };

  setSettingsField = (e, { name, value }) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value,
      },
      configuration: this.state.configuration,
    });
  };

  setConfigurationField = (e, { name, value }) => {
    this.setState({
      config: {
        ...this.state.config,
        [name]: {
          ...this.state.config[name],
          value,
        },
      },
      settings: this.state.settings,
    });
  };

  static getDerivedStateFromProps({configuration, settings}, prevState) {
    if (configuration.getVersion() != prevState.currentVersion) {
      return {...prevState, config: configuration.variablesToKeyValueMap(), currentVersion: configuration.getVersion()}
    }
    return prevState
  }

  onSubmit = () => {
    this.props.onSave(this.state);
    this.props.close();
  };
  render() {
    const { config, settings, settingsList } = this.state;

    return (
      <>
        <Modal.Header>Settings &amp; Configuration</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSubmit} id="edit-settings">
            <Header as="h3" content="Settings" />
            {settingsList?.map((item) => {
              if (item.key === ChargeStationSetting.OCPPConfiguration) {
                return (
                    <div key={item.key} style={{ marginBottom: '8px' }}>
                      <Form.Select
                          label={
                            <strong
                                style={{
                                  marginBottom: '4px',
                                  display: 'inline-block',
                                }}>
                              {item.name}
                              {item.description && (
                                  <HelpTip text={item.description} />
                              )}
                            </strong>
                          }
                          options={item.options.map(i => ({text: i, value: i}))}
                          name={item.key}
                          value={settings[item.key]}
                          onChange={(e, { name, value }) => {

                            if(this.state.settings.ocppConfiguration != value) {
                              this.props.onProtocolChange(value);
                              this.setSettingsField(e, {name, value})
                            }
                          }}
                      />
                    </div>
                )
              }
              return (
                <div key={item.key} style={{ marginBottom: '8px' }}>
                  <Form.Input
                    label={
                      <strong
                        style={{
                          marginBottom: '4px',
                          display: 'inline-block',
                        }}>
                        {item.name}
                        {item.description && (
                          <HelpTip text={item.description} />
                        )}
                      </strong>
                    }
                    name={item.key}
                    value={settings[item.key]}
                    onChange={this.setSettingsField}
                  />
                </div>
              );
            })}
            <Divider hidden />
            <Header as="h3" content="Configuration Keys" />
            {Object.values(config).map((item) => {
              return (
                <Form.Input
                  key={item.key}
                  label={
                    <strong
                      style={{
                        marginBottom: '4px',
                        display: 'inline-block',
                      }}>
                      {item.key}
                      {item?.description && <HelpTip text={item.description} />}
                    </strong>
                  }
                  name={item.key}
                  value={item.value}
                  onChange={this.setConfigurationField}
                />
              );
            })}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary form="edit-settings" content="Save" />
        </Modal.Actions>
      </>
    );
  }
}
