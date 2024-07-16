import { ChargeStationEventHandler } from 'lib/ChargeStation/eventHandlers';
import { RequestStartTransactionRequest } from 'schemas/ocpp/2.0/RequestStartTransactionRequest';
import { RequestStartTransactionResponse } from 'schemas/ocpp/2.0/RequestStartTransactionResponse';

const handleRequestStartTransaction: ChargeStationEventHandler<
  RequestStartTransactionRequest
> = ({ chargepoint, callMessageId, callMessageBody }) => {
  const { remoteStartId, evseId, idToken } = callMessageBody;

  let response: RequestStartTransactionResponse = { status: 'Accepted' };

  if (chargepoint.hasRunningSession(Number(evseId))) {
    response = { status: 'Rejected' };
  } else {
    setTimeout(() => {
      chargepoint.startSession(
        Number(evseId),
        {
          authorizationType: 'rfid',
          carBatteryKwh: 0,
          carBatteryStateOfCharge: 0,
          maxPowerKw: 0,
          uid: idToken.idToken,
          remoteStartId,
        },
        'rfid'
      );
    }, 100);
  }

  chargepoint.writeCallResult(callMessageId, response);
};

export default handleRequestStartTransaction;
