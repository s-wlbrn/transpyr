import MapContainer from '../../../../components/MapContainer/MapContainer.component';

import './EventDetailsMap.styles.scss';

export const EventDetailsMap = ({ coordinates }) => (
  <section id="event-map">
    <MapContainer coordinates={coordinates} />
  </section>
);
