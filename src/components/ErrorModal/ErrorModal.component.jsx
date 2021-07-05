import { Modal } from 'react-bootstrap';
import ErrorPage from '../../pages/error-page/error-page.component';

import './ErrorModal.styles.scss';

export const ErrorModal = ({ error, resetErrorBoundary }) => (
  <Modal
    show={true}
    onHide={() => resetErrorBoundary()}
    className="error-modal"
  >
    <Modal.Header closeButton>
      <Modal.Title>Error</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ErrorPage error={error} />
    </Modal.Body>
  </Modal>
);
