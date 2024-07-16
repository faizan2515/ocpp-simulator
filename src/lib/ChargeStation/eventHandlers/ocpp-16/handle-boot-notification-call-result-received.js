import { sleep } from '../../../../utils/csv';
import { EventTypes } from '../event-types';

export default async function handleBootNotificationCallResultReceived({
  emitter,
}) {
  // TODO: Handle rejections

  emitter.emitEvent(EventTypes.BootNotificationAccepted);
}
