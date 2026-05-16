import { Modal } from "react-bootstrap";
import MapSelector from "./GoogleMapSelector.js";

export default function AddressModal({ show, onClose }) {

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Delivery Address</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <MapSelector />

      </Modal.Body>

    </Modal>
  );
}