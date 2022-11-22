import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LoginModal({ setIsAdmin, showLogin, setShowLogin }) {
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const handleChange = (e) => setPassword(e.target.value);

  const handleClose = () => setShowLogin(false);
  const handleSave = (e) => {
    if (password === "123456") {
      setIsAdmin(true);
      setShowLogin(false);
      setPasswordIncorrect(false);
    } else {
      setPasswordIncorrect(true);
    }
  };

  return (
    <Modal show={showLogin} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Logar como Administrador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="my-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Insira a senha de Administrador"
          />
        </Form.Group>
        {passwordIncorrect && <p className="text-danger">Senha inválida</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Entrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
