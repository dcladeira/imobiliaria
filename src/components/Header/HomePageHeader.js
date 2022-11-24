import { useEffect, useState } from "react";
import {
  Form,
  Col,
  Row,
  ButtonGroup,
  ToggleButton,
  InputGroup,
  Button,
} from "react-bootstrap";
import "./HomePageHeader.css";
import axios from "axios";

function HomePageHeader({ apiUrl, filter, setFilter }) {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    try {
      const fetchCities = async () => {
        const response = await axios.get(apiUrl);
        response.data.forEach((property) => {
          if (cities.indexOf(property.city) < 0)
            setCities([...cities, property.city]);
          if (states.indexOf(property.state) < 0)
            setStates([...states, property.state]);
        });
      };
      fetchCities();
    } catch (e) {
      console.log(e);
    }
  }, [cities, states, apiUrl]);

  function handleChange(e) {
    console.log(e.target.nextSibiling, e.target.value)
    if (e.target.type === "checkbox") {
      setFilter({
        ...filter,
        amenities: { ...filter.amenities, [e.target.name]: e.target.checked },
      });
    } else {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    }
  }

  function handleClick(e) {

    if(e.target.previousSibling.value === filter[e.target.previousSibling.name]) {
        setFilter({ ...filter, [e.target.previousSibling.name]: '' });
    } else {
    setFilter({ ...filter, [e.target.previousSibling.name]: e.target.previousSibling.value });
  }
}

  function handleClear() {
    setFilter({
      city: "",
      state: "",
      type: "",
      transaction: "venda",
      bedrooms: "",
      bathrooms: "",
      minValue: "0",
      maxValue: "",
      amenities: {
        swimming: false,
        concierge: false,
        gourmet: false,
        parking: false,
      },
    });
  }

  return (
    <div className="hp-bg d-flex flex-column justify-content-center align-items-center">
      <section className="text-center">
        <h1> Iron House</h1>
        <h2> Assessoria Imobiliaria</h2>
      </section>

      <section className="filter-container">
        <div className="d-flex justify-content-between">
          <ButtonGroup className="mb-3 transaction-btn">
            <ToggleButton
              type="radio"
              id="radio-venda"
              htmlFor="radio-venda"
              variant="outline-primary"
              name="transaction"
              value="venda"
              checked={filter.transaction === "venda"}
             // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
             onClick={handleClick}

            >
              VENDA
            </ToggleButton>
            <ToggleButton
              type="radio"
              id="radio-aluguel"
              htmlFor="radio-aluguel"
              variant="outline-primary"
              name="transaction"
              value="aluguel"
              checked={filter.transaction === "aluguel"}
             // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
            onClick={handleClick}
            >
              ALUGUEL
            </ToggleButton>
          </ButtonGroup>

          <Button
            onClick={handleClear}
            className="clear-filter mb-3"
            variant="outline-primary"
          >
            LIMPAR FILTROS
          </Button>
        </div>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Select
                onChange={handleChange}
                value={filter.type}
                name="type"
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option value="">Tipo de imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                onChange={handleChange}
                value={filter.state}
                name="state"
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option name="state" value="">
                  Estado
                </option>

                {states.map((state) => {
                  return (
                    <option key={state} name="state" value={state}>
                      {state}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                onChange={handleChange}
                value={filter.city}
                name="city"
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option name="city" value="">
                  Cidade
                </option>
                {cities.map((city) => {
                  return (
                    <option key={city} name="city" value={city}>
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
              <Form.Label htmlFor="min-value" className="d-flex align-items-center"><svg className="svg-inline--fa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z"/></svg>Valor Mínimo</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="min-value"
                  name="minValue"
                  value={filter.minValue}
                  onChange={handleChange}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col className="col-3">
              <Form.Label htmlFor="max-value" className="d-flex align-items-center"><svg className="svg-inline--fa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z"/></svg>Valor Máximo</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="max-value"
                  name="maxValue"
                  type="number"
                  value={filter.maxValue}
                  onChange={handleChange}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Col>

            {/* FILTRO DE QUARTOS */}
            <Col className="d-flex flex-column align-items-center">
              <Form.Label className="d-flex align-items-center"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bed" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="svg-inline--fa fa-bed fa-w-20" data-v-832c9870="" data-v-45ef37c4=""><path fill="currentColor" d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z" data-v-832c9870="" data-v-45ef37c4="" className=""></path></svg>N° de quartos</Form.Label>
              <ButtonGroup className="">
                <ToggleButton
                  type="radio"
                  id="radio-1-bedrooms"
                  htmlFor="radio-1-bedrooms"
                  variant="outline-primary"
                  name="bedrooms"
                  value="1"
                  checked={filter.bedrooms === "1"}
                  // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
                  onClick={handleClick}
                >
                  1
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-2-bedrooms"
                  htmlFor="radio-2-bedrooms"
                  variant="outline-primary"
                  name="bedrooms"
                  value="2"
                  checked={filter.bedrooms === "2"}
                  // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
                  onClick={handleClick}
                >
                  2
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-3-bedrooms"
                  htmlFor="radio-3-bedrooms"
                  variant="outline-primary"
                  name="bedrooms"
                  value="3"
                  checked={filter.bedrooms === "3"}
                  // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
                  onClick={handleClick}
                >
                  3
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-4-bedrooms"
                  htmlFor="radio-4-bedrooms"
                  variant="outline-primary"
                  name="bedrooms"
                  value="4"
                  checked={filter.bedrooms === "4"}
                  // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
                  onClick={handleClick}
                >
                  4 +
                </ToggleButton>
              </ButtonGroup>
            </Col>
            {/* FILTRO DE BANHEIROS */}

            <Col className="d-flex flex-column align-items-center">
              <Form.Label className="d-flex align-items-center"><svg className="svg-inline--fa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/></svg>N° de banheiros</Form.Label>
              <ButtonGroup className="">
                <ToggleButton
                  type="radio"
                  id="radio-1-bathroom"
                  htmlFor="radio-1-bathroom"
                  variant="outline-primary"
                  name="bathrooms"
                  value="1"
                  checked={filter.bathrooms === "1"}
                  // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
                  onClick={handleClick}
                >
                  1
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-2-bathrooms"
                  htmlFor="radio-2-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="2"
                  checked={filter.bathrooms === "2"}
                  // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
                  onClick={handleClick}
                >
                  2
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-3-bathrooms"
                  htmlFor="radio-3-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="3"
                  checked={filter.bathrooms === "3"}
                  // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
                  onClick={handleClick}
                >
                  3
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-4-bathrooms"
                  htmlFor="radio-4-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="4"
                  checked={filter.bathrooms === "4"}
                  // Antes estava usando o onChange={handleChange}, porém como é um radio, ele não me dava a opção de deixar nenhuma opção selecionada, ai adaptei usando o onclick
                  onClick={handleClick}
                >
                  4 +
                </ToggleButton>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center">
              <Form.Check
                type="switch"
                id="swimming"
                name="swimming"
                label="Piscina"
                checked={filter.amenities.swimming}
                onChange={handleChange}
              />
            </Col>
        
            <Col>
              <Form.Check
                type="switch"
                id="concierge"
                name="concierge"
                label="Portaria"
                checked={filter.amenities.concierge}
                onChange={handleChange}
              />
            </Col>

            <Col>
              <Form.Check
                type="switch"
                id="gourmet"
                name="gourmet"
                label="Espaço Gourmet"
                checked={filter.amenities.gourmet}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Check
                type="switch"
                id="parking"
                name="parking"
                label="Estacionamento"
                checked={filter.amenities.parking}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form>
      </section>
    </div>
  );
}

export default HomePageHeader;
