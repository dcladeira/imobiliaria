import { Button, Modal, Form, Stack, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EditProperties({ apiURL, body, setBody, property }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const types = ["Casa", "Apartamento", "Terreno"];
  const transactions = ["Venda", "Aluguel"];

  const handleChange = (e) => {
    if (e.target.name.slice(0,8) === "checkbox") {
      const {amenities} = body;
      amenities[e.target.name.slice(9)] = e.target.checked;
      setBody({ ...body});
      return;
    } 
    if (e.target.name.slice(0,5) === "photo") {
      const {photos} = body;
      photos[Number(e.target.name.slice(-1))] = e.target.value;
      setBody({ ...body });
      return;
    }
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clone = {...body};
      const id = clone._id;
      delete clone._id;
      await axios.put(`${apiURL}/${id}`, clone);
      handleClose();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        Editar imóvel
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edição do imóvel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Row>
                <Col xs="2">
                  <Form.Label>Código</Form.Label>
                  <Form.Control type="text" name="code" value={body.code} onChange={handleChange}/>
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
                      .filter((t) => t !== property.type)
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
                      .filter((t) => t !== property.transaction)
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
                  <Form.Control type="number" name="area" value={body.area} onChange={handleChange}/>
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
                  <Form.Control type="number" name="price" value={body.price} onChange={handleChange}/>
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
              <Form.Control
              className="mb-2"
                type="text"
                placeholder="Insira a URL da foto"
                name="photo-0"
                value={body.photos[0]}
                onChange={handleChange}
              />
              <Form.Control
              className="mb-2"
                type="text"
                placeholder="Insira a URL da foto"
                name="photo-1"
                value={body.photos[1]}
                onChange={handleChange}
              />
              <Form.Control
                type="text"
                placeholder="Insira a URL da foto"
                name="photo-2"
                value={body.photos[2]}
                onChange={handleChange}
              />
            </Form.Group>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit">Salvar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditProperties;