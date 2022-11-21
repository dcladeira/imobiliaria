import { useEffect, useState } from "react";
import { Form, Col, Row, ButtonGroup, ToggleButton } from "react-bootstrap";
import "./HomePageHeader.css";
import axios from "axios";

function HomePageHeader({ apiUrl }) {
  const [cities,setCities] = useState([]);
  const [states,setStates] = useState([]);
  const [radioValue, setRadioValue] = useState('venda');  
  
  
  useEffect(() => {
    try {
      const fetchCities = async () => {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        response.data.map((property) => {
            console.log(property.city)
            if(cities.indexOf(property.city)<0)
          setCities([...cities,property.city])
          console.log(cities)
        });
      };
      fetchCities();
    } catch (e) {
      console.log(e);
    }
  },[cities,apiUrl]);

  useEffect(() => {
    try {
      const fetchStates = async () => {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        response.data.map((property) => {
            console.log(property.state)
            if(states.indexOf(property.state)<0)
            setStates([...states,property.state])
          console.log(states)
        });
      };
      fetchStates();
    } catch (e) {
      console.log(e);
    }
  },[states,apiUrl]);

  return (
    <div className="hp-bg d-flex flex-column justify-content-center align-items-center">
      <section className="text-center">
        <h1> Iron House</h1>
        <h2> Assessoria Imobiliaria</h2>
      </section>

      <section className="mx-10 filter-container">
      

      <ButtonGroup className='mb-3 transaction-btn'>
          <ToggleButton
            type="radio"
            id='radio-venda'
            for='radio-venda'
            variant='outline-primary'
            name="transaction"
            value='venda'
            checked={radioValue === 'venda'}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            Venda
          </ToggleButton>
          <ToggleButton
            type="radio"
            id='radio-aluguel'
            for='radio-aluguel'
            variant='outline-primary'
            name="transaction"
            value='aluguel'
            checked={radioValue === 'aluguel'}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            Aluguel
          </ToggleButton>
      </ButtonGroup>


        <Form>
          <Row>
            <Col>
              <Form.Select className="select-filter" size="lg" aria-label="Default select example">
                <option>Tipo de imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select className="select-filter" size="lg" aria-label="Default select example">
                <option name='state'>Estado</option>

                {states.map((state) => {
                  return <option name='state' value={state}>{state}</option>;
                })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select className="select-filter"  size="lg" aria-label="Default select example">
                <option name='city'>Cidade</option>
                {cities.map((city) => {
                  return <option name='city' value={city}>{city}</option>;
                })}
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </section>
    </div>
  );
}

export default HomePageHeader;
