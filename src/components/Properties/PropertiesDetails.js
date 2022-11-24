import { useNavigate } from "react-router-dom";
import {
  Button,
  Carousel,
  Badge,
  Row,
  Col,
  Container,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PropertiesDetails.css";
import EditProperties from "./EditProperties";
import axios from "axios";

function PropertiesDetails({ isAdmin, apiUrl }) {
  const { id } = useParams();
  const navigate = useNavigate();
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
    photos: [],
  });
  const [property, setProperty] = useState(body);

  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastDanger, setShowToastDanger] = useState(false);
  const toggleShowToastSuccess = () => setShowToastSuccess(!showToastSuccess);
  const toggleShowToastDanger = () => setShowToastDanger(!showToastDanger);

  useEffect(() => {
    try {
      const fetchProperty = async () => {
        const response = await axios.get(`${apiUrl}/${id}`);
        setProperty(response.data);
      };
      fetchProperty();
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl, id]);

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      toggleShowToastSuccess();
      setTimeout(() => {
        toggleShowToastSuccess();
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      toggleShowToastDanger();
      setTimeout(() => {
        toggleShowToastDanger();
        navigate("/");
      }, 1500);
    }
  };

  return (
    <Container key="property._id" className="propertyDescription">
      <ToastContainer position="middle-center">
        <Toast
          bg="success"
          show={showToastSuccess}
          onClose={toggleShowToastSuccess}
        >
          <Toast.Header>
            <strong className="me-auto">Iron House</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Imóvel excluído com sucesso!</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position="middle-center">
        <Toast
          bg="danger"
          show={showToastDanger}
          onClose={toggleShowToastDanger}
        >
          <Toast.Header>
            <strong className="me-auto">Iron House</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Não foi possível excluir neste momento, tente mais tarde.
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <h1 className='mb-4'>{property.title}</h1>
      <p>
        <Badge bg="info">{property.transaction}</Badge>{" "}
        <Badge bg="info">{property.type}</Badge>{" "}
        <Badge bg="info">{property.city}</Badge>{" "}
        <Badge bg="primary">Imóvel {property.code}</Badge>
      </p>
      <Row className="features">
        <Col className="feature col-2">
        <p><svg className="feature-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z"/></svg></p>
        <p>{property.area} m²</p>
        </Col>
        <Col className="feature col-2">
        <p><svg className="feature-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"/></svg></p>
        <p>{property.bedrooms} quartos</p>
        </Col>
        <Col className="feature col-2">
        <p><svg className="feature-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z"/></svg></p>
        <p>{property.bathrooms} banheiros</p>
        </Col>
      </Row>
      <p id="price">{(+property.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <h3>Descrição:</h3>
      <p>{property.description}</p>
      <h3>Comodidades:</h3>
      <p>
        {property.amenities.swimming && (
          <Badge pill bg="secondary">
            Piscina
          </Badge>
        )}{" "}
        {property.amenities.concierge && (
          <Badge pill bg="secondary">
            Portaria
          </Badge>
        )}{" "}
        {property.amenities.gourmet && (
          <Badge pill bg="secondary">
            Área gourmet
          </Badge>
        )}{" "}
        {property.amenities.parking && (
          <Badge pill bg="secondary">
            Vaga de garagem
          </Badge>
        )}{" "}
      </p>
      <Carousel className="photos">
        {property.photos.map((photo, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 h-50"
                src={photo}
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>

      <Row className="footerButtons">
        <Col>
          {isAdmin && (
            <Button
              variant="danger"
              onClick={() => deleteProperty(property._id)}
            >
              Excluir imóvel
            </Button>
          )}
        </Col>
        <Col>
          {isAdmin && (
            <EditProperties
              id={id}
              apiUrl={apiUrl}
              body={body}
              setBody={setBody}
              property={property}
            />
          )}
        </Col>
        <Col>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertiesDetails;
