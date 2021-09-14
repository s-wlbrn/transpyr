import React from 'react';
import { StreamedImage } from '../StreamedImage/StreamedImage.component';

import './EventThumbnail.styles.scss';

export const EventThumbnail = ({ id }) => (
  <StreamedImage
    folder="events"
    id={id}
    alt="event"
    className="event-thumbnail"
  />
);
