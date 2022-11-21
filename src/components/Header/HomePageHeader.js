import { useEffect, useState } from "react";
import {
  Form,
  Col,
  Row,
  ButtonGroup,
  ToggleButton,
  InputGroup,
} from "react-bootstrap";
import "./HomePageHeader.css";
import axios from "axios";

function HomePageHeader({ apiUrl }) {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [radioValue, setRadioValue] = useState("venda");
  const [numberOfRooms, setNumberOfRooms] = useState("1");
  const [numberOfBathrooms, setNumberOfBathrooms] = useState("1");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState();

  useEffect(() => {
    try {
      const fetchCities = async () => {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        response.data.map((property) => {
          console.log(property.city);
          if (cities.indexOf(property.city) < 0)
            setCities([...cities, property.city]);
          console.log(cities);
        });
      };
      fetchCities();
    } catch (e) {
      console.log(e);
    }
  }, [cities, apiUrl]);

  useEffect(() => {
    try {
      const fetchStates = async () => {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        response.data.map((property) => {
          console.log(property.state);
          if (states.indexOf(property.state) < 0)
            setStates([...states, property.state]);
          console.log(states);
        });
      };
      fetchStates();
    } catch (e) {
      console.log(e);
    }
  }, [states, apiUrl]);

  return (
    <div className="hp-bg d-flex flex-column justify-content-center align-items-center">
      <section className="text-center">
        <h1> Iron House</h1>
        <h2> Assessoria Imobiliaria</h2>
      </section>

      <section className="filter-container">
        <ButtonGroup className="mb-3 transaction-btn">
          <ToggleButton
            type="radio"
            id="radio-venda"
            for="radio-venda"
            variant="outline-primary"
            name="room"
            value="venda"
            checked={radioValue === "venda"}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            Venda
          </ToggleButton>
          <ToggleButton
            type="radio"
            id="radio-aluguel"
            for="radio-aluguel"
            variant="outline-primary"
            name="room"
            value="aluguel"
            checked={radioValue === "aluguel"}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            Aluguel
          </ToggleButton>
        </ButtonGroup>

        <Form>
          <Row>
            <Col>
              <Form.Select
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option>Tipo de imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option name="state">Estado</option>

                {states.map((state) => {
                  return (
                    <option name="state" value={state}>
                      {state}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option name="city">Cidade</option>
                {cities.map((city) => {
                  return (
                    <option name="city" value={city}>
                      {city}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Row>

          <Row>
            {/* FILTRO DE VALOR */}
            <Col className="col-3">
              <Form.Label htmlFor="min-value">Valor Mínimo</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="min-value"
                  name="min-value"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col className="col-3">
              <Form.Label htmlFor="max-value">Valor Máximo</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="max-value"
                  name="max-value"
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Col>

            {/* FILTRO DE QUARTOS */}
            <Col className="d-flex flex-column align-items-center">
            <Form.Label>N° de quartos</Form.Label>
              <ButtonGroup  className="">
                <ToggleButton
                  type="radio"
                  id="radio-1-room"
                  for="radio-1-room"
                  variant="outline-primary"
                  name="room"
                  value="1"
                  checked={numberOfRooms === "1"}
                  onChange={(e) => setNumberOfRooms(e.currentTarget.value)}
                >
                  1
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-2-rooms"
                  for="radio-2-rooms"
                  variant="outline-primary"
                  name="room"
                  value="2"
                  checked={numberOfRooms === "2"}
                  onChange={(e) => setNumberOfRooms(e.currentTarget.value)}
                >
                  2
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-3-rooms"
                  for="radio-3-rooms"
                  variant="outline-primary"
                  name="room"
                  value="3"
                  checked={numberOfRooms === "3"}
                  onChange={(e) => setNumberOfRooms(e.currentTarget.value)}
                >
                  3
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-4-rooms"
                  for="radio-4-rooms"
                  variant="outline-primary"
                  name="room"
                  value="4"
                  checked={numberOfRooms === "4"}
                  onChange={(e) => setNumberOfRooms(e.currentTarget.value)}
                >
                  4 +
                </ToggleButton>
              </ButtonGroup>
</Col>
              {/* FILTRO DE BANHEIROS */}

              <Col className="d-flex flex-column align-items-center">
            <Form.Label>N° de banheiros</Form.Label>
              <ButtonGroup  className="">
                <ToggleButton
                  type="radio"
                  id="radio-1-bathroom"
                  for="radio-1-bathroom"
                  variant="outline-primary"
                  name="bathroom"
                  value="1"
                  checked={numberOfBathrooms === "1"}
                  onChange={(e) => setNumberOfBathrooms(e.currentTarget.value)}
                >
                  1
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-2-bathrooms"
                  for="radio-2-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="2"
                  checked={numberOfBathrooms === "2"}
                  onChange={(e) => setNumberOfBathrooms(e.currentTarget.value)}
                >
                  2
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-3-bathrooms"
                  for="radio-3-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="3"
                  checked={numberOfBathrooms === "3"}
                  onChange={(e) => setNumberOfBathrooms(e.currentTarget.value)}
                >
                  3
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-4-bathrooms"
                  for="radio-4-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="4"
                  checked={numberOfBathrooms === "4"}
                  onChange={(e) => setNumberOfBathrooms(e.currentTarget.value)}
                >
                  4 +
                </ToggleButton>
              </ButtonGroup>


            </Col>
          </Row>
        </Form>
      </section>
    </div>
  );
}

export default HomePageHeader;
