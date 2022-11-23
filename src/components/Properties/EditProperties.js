import {
  Button,
  Modal,
  Form,
  Stack,
  Row,
  Col,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProperties({ id, apiUrl, body, setBody }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastDanger, setShowToastDanger] = useState(false);
  const toggleShowToastSuccess = () => setShowToastSuccess(!showToastSuccess);
  const toggleShowToastDanger = () => setShowToastDanger(!showToastDanger);

  const navigate = useNavigate();
  const types = ["Casa", "Apartamento", "Terreno"];
  const transactions = ["Venda", "Aluguel"];

  useEffect(() => {
    try {
      const fetchProperty = async () => {
        const response = await axios.get(`${apiUrl}/${id}`);
        setBody(response.data);
      };
      fetchProperty();
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl, id, setBody]);

  const handleChange = (e) => {
    if (e.target.name.slice(0, 8) === "checkbox") {
      const { amenities } = body;
      amenities[e.target.name.slice(9)] = e.target.checked;
      setBody({ ...body });
      return;
    }
    if (e.target.name.slice(0, 5) === "photo") {
      const { photos } = body;
      photos[Number(e.target.name.slice(-1))] = e.target.value;
      setBody({ ...body });
      return;
    }
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clone = { ...body };
      const id = clone._id;
      delete clone._id;
      await axios.put(`${apiUrl}/${id}`, clone);
      toggleShowToastSuccess();
      setTimeout(() => {
        toggleShowToastSuccess();
        handleClose();
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      toggleShowToastDanger();
      setTimeout(() => {
        toggleShowToastDanger();
        handleClose();
        navigate("/");
      }, 2000);
    }
  };

  const addPhoto = () => {
    const { photos } = body;
    photos.push("");
    setBody({ ...body });
  };

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        Editar imóvel
      </Button>

      <Modal key={body._id} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edição do imóvel</Modal.Title>
        </Modal.Header>
        <ToastContainer position="top-center">
          <Toast
            bg="success"
            show={showToastSuccess}
            onClose={toggleShowToastSuccess}
          >
            <Toast.Header>
              <strong className="me-auto">Iron House</strong>
            </Toast.Header>
            <Toast.Body>Imóvel alterado com sucesso!</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer position="top-center">
          <Toast
            bg="danger"
            show={showToastDanger}
            onClose={toggleShowToastDanger}
          >
            <Toast.Header>
              <strong className="me-auto">Iron House</strong>
            </Toast.Header>
            <Toast.Body>
              Não foi possível alterar neste momento, tente mais tarde.
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Row>
                <Col xs="2">
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={body.code}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira o título do anúncio do imóvel"
                    name="title"
                    value={body.title}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Insira a descrição completa imóvel"
                name="description"
                value={body.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select name="type" onChange={handleChange}>
                    <option value={body.type}>{body.type}</option>
                    {types
                      .filter((t) => t !== body.type)
                      .map((t) => {
                        return <option value={t}>{t}</option>;
                      })}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Transação</Form.Label>
                  <Form.Select name="transaction" onChange={handleChange}>
                    <option value={body.transaction}>{body.transaction}</option>
                    {transactions
                      .filter((t) => t !== body.transaction)
                      .map((t) => {
                        return <option value={t}>{t}</option>;
                      })}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Localização</Form.Label>
              <Row className="mb-2">
                <Col xs="2">
                  <Form.Control
                    type="text"
                    placeholder="UF"
                    name="state"
                    value={body.state}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Cidade"
                    name="city"
                    value={body.city}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Bairro"
                    name="neighborhood"
                    value={body.neighborhood}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Endereço"
                    name="address"
                    value={body.address}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Área</Form.Label>
                  <Form.Control
                    type="number"
                    name="area"
                    value={body.area}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Quartos</Form.Label>
                  <Form.Control
                    type="number"
                    name="bedrooms"
                    value={body.bedrooms}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Banheiros</Form.Label>
                  <Form.Control
                    type="number"
                    name="bathrooms"
                    value={body.bathrooms}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Preço</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={body.price}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comodidades</Form.Label>
              <Stack direction="horizontal" gap={3}>
                <Form.Check
                  type="checkbox"
                  label="Piscina"
                  name="checkbox-swimming"
                  onChange={handleChange}
                  defaultChecked={body.amenities.swimming}
                />
                <Form.Check
                  type="checkbox"
                  label="Portaria"
                  name="checkbox-concierge"
                  onChange={handleChange}
                  defaultChecked={body.amenities.concierge}
                />
                <Form.Check
                  type="checkbox"
                  label="Área gourmet"
                  name="checkbox-gourmet"
                  onChange={handleChange}
                  defaultChecked={body.amenities.gourmet}
                />
                <Form.Check
                  type="checkbox"
                  label="Vaga de garagem"
                  name="checkbox-parking"
                  onChange={handleChange}
                  defaultChecked={body.amenities.parking}
                />
              </Stack>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL da fotos</Form.Label>
              {body.photos.map((photo, index) => {
                return (
                  <Row>
                    <Col>
                      <Form.Control
                        className="mb-2 photoUrl"
                        type="text"
                        placeholder="Insira a URL da foto"
                        name={"photo-" + index}
                        value={photo}
                        onChange={handleChange}
                      />
                    </Col>
                    {/* <Col xs="1">
                      <Button variant="danger" onClick={delPhoto(index)}>-</Button>
                    </Col> */}
                  </Row>
                );
              })}
              <Row>
                <Col></Col>
                <Col>
                  <Button onClick={addPhoto}>+</Button>
                </Col>
              </Row>
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditProperties;
