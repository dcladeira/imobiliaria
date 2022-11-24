import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Stack,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function AddProperties({ apiUrl }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastFail, setShowToastFail] = useState(false);
  const [showToastIncomplete, setShowToastIncomplete] = useState(false);
  const toggleShowToastSuccess = () => setShowToastSuccess(!showToastSuccess);
  const toggleShowToastFail = () => setShowToastFail(!showToastFail);
  const handleShowToastIncomplete = () => setShowToastIncomplete(true);
  const handleCloseToastIncomplete = () => setShowToastIncomplete(false);

  const navigate = useNavigate();
  const types = ["Casa", "Apartamento", "Terreno"];
  const transactions = ["Venda", "Aluguel"];
  const [body, setBody] = useState({
    code: "",
    title: "",
    description: "",
    type: "",
    transaction: "",
    state: "",
    city: "",
    neighborhood: "",
    address: "",
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    amenities: {
      swimming: false,
      concierge: false,
      gourmet: false,
      parking: false,
    },
    photos: [""],
  });

  const handleChange = (e) => {
    if (e.target.name.slice(0, 8) === "checkbox") {
      const { amenities } = body;
      amenities[e.target.name.slice(9)] = e.target.checked;
      setBody({ ...body });
    }
    else if (e.target.name.slice(0, 5) === "photo") {
      const { photos } = body;
      photos[Number(e.target.name.slice(-1))] = e.target.value;
      setBody({ ...body });
    }
    else {
      setBody({ ...body, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (body.transaction === "" || body.type === "" || body.state === "" || body.city === "") {
        handleShowToastIncomplete();
        setTimeout(() => handleCloseToastIncomplete(), 1500);
      } else {
        try {
          await axios.post(apiUrl, body);
          toggleShowToastSuccess();
          setTimeout(() => {
            toggleShowToastSuccess();
            setBody({
              code: "",
              title: "",
              description: "",
              type: "",
              transaction: "",
              state: "",
              city: "",
              neighborhood: "",
              address: "",
              area: 0,
              bedrooms: 0,
              bathrooms: 0,
              price: 0,
              amenities: {
                swimming: false,
                concierge: false,
                gourmet: false,
                parking: false,
              },
              photos: [""],
            });
            handleClose();
            navigate("/");
          }, 1500);
        } catch (error) {
          console.log(error);
          toggleShowToastFail();
          setTimeout(() => {
            toggleShowToastFail();
            handleClose();
            navigate("/");
          }, 1500);
        }
      }

  };

  const addPhoto = () => {
    const {photos} = body;
    photos.push("");
    setBody({...body});
  }

  // const delPhoto = (i) => {
  //   let {photos} = body;
  //   photos.filter((a, b) => b !== i);
  //   setBody({...body});
  // }

  return (
    <div>
      <Modal
        key={body._id}
        show={show}
        onHide={() => {
          navigate(-1);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar imóvel</Modal.Title>
        </Modal.Header>
        <ToastContainer position="middle-center">
          <Toast
            bg="success"
            show={showToastSuccess}
            onClose={toggleShowToastSuccess}
          >
            <Toast.Header>
              <strong className="me-auto">Iron House</strong>
            </Toast.Header>
            <Toast.Body>Imóvel cadastrado com sucesso!</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer position="middle-center">
          <Toast
            bg="danger"
            show={showToastFail}
            onClose={toggleShowToastFail}
          >
            <Toast.Header>
              <strong className="me-auto">Iron House</strong>
            </Toast.Header>
            <Toast.Body>
              Não foi possível cadastrar neste momento, tente mais tarde.
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer position="middle-center">
          <Toast
            bg="warning"
            show={showToastIncomplete}
            onClose={handleCloseToastIncomplete}
          >
            <Toast.Header>
              <strong className="me-auto">Iron House</strong>
            </Toast.Header>
            <Toast.Body>
              Preencha os campos obrigatórios.
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
                  <Form.Label>Tipo<span style={{color:"red"}}> *</span></Form.Label>
                  <Form.Select name="type" onChange={handleChange}>
                    <option value="0">Selecione uma opção</option>
                    {types.map((t) => {
                      return <option value={t}>{t}</option>;
                    })}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Transação<span style={{color:"red"}}> *</span></Form.Label>
                  <Form.Select name="transaction" onChange={handleChange}>
                    <option value="0">Selecione uma opção</option>
                    {transactions.map((t) => {
                      return <option value={t}>{t}</option>;
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Localização<span style={{color:"red"}}> *</span></Form.Label>
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
                  <Form.Label>Valor</Form.Label>
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
            <Form.Group className="mb-3" id="photosUrl" onChange={handleChange}>
              <Form.Label>URL da fotos</Form.Label>
              {body.photos.map((photo, index) => {
                return (
                  <Row>
                    <Col>
                      <Form.Control
                        className="mb-2 photoUrl"
                        type="text"
                        placeholder="Insira a URL da foto"
                        name={"photo-"+index}
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
            <p style={{color:"red"}}>* Campos obrigatórios: tipo, transação, UF, cidade.</p>
            </Form.Group>
            <Button
              variant="secondary"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar imóvel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddProperties;