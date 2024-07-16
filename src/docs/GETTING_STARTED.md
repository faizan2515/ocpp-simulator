## General Settings

<SETTINGS_MARKDOWN>

## Session Specific Settings

<SESSION_SETTINGS_MARKDOWN>

## Configuration OCPP 1.6

Any GET query parameter that is not in the above Settings list will be set as a
charge station configuration key. These can be retrieved or changed using the
`GetConfiguration` and `ChangeConfiguration` OCPP commands.

Here's a list of configuration keys that are implemented:

<CONFIGURATION_MARKDOWN_16>

## Configuration OCPP 2.0.1

OCPP 2.0.1 has many different keys. Therefore, we have not implemented them all.
We just provide a few configuration keys for testing.

| Key                      | description                                              |
| ------------------------ | -------------------------------------------------------- |
| `SecurityCtrlr.Identity` | OCPP Identity used in authenticating the charge station' |
