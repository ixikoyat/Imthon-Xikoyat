import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css"
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';






function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Home = () => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [value, setValue] = React.useState(0);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const [korzina, setKorzina] = useState([])
    const [data, setData] = useState({
        pizza:[],
        burger:[],
        iceCream:[],
        coming:[]
    })
    const axios = require('axios').default;
    useEffect(() => {
        axios.get('https://myjson.dit.upm.es/api/bins/6qau')
            .then(function (v) {
                console.log(v);
            
                setData(v.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    }, []);


    const Korzina = (v) => {
        let a = [...korzina];
        a.push(v);
        setKorzina(a)

    }

    console.log(korzina);

    const navigate = useNavigate()
    const Going = () => {

        navigate("/korzina", 
        { state: korzina })

    }

   






  return (
    <div>
      <header >
    <div className='menu'>
        
        <ul className='nav_menu'>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            <li>
                <a href="#">Abaut</a>
            </li>
            <li>
                <a href="#">Menu</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
        <button variant="primary" onClick={handleShow} className="korzina_btn" >
            <AiOutlineShoppingCart />
        </button>
         

        <div className="row ">
        <div className="col-4 m-4 ">
                <h3 className='fs-3'>Authentic local <br/>
                food in Tbay</h3>
                <h6 className='fs-5'>TBayEAT is a courier service in which authentic home cook  <br/>
                food is delived to a customer</h6>
                <div className='mb-5'>
                <input type="text" className='form-label' placeholder='qidirish'/>
                <button className='btn btn-outline-warning'>Search</button>
           
            </div>
        </div>
        </div>
       
    </div>


    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Tanlangan mahsulotlar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

            {
                korzina.map((v, i) => {
                    return <div className="row card_korzina">
                        <div className="col-4">
                            <img src={v.img} className='img-fluid'  />
                        </div>
                        <div className="col-8">

                            <h4>Name: {v.name}</h4>
                            <p>narx:{v.id}</p>
                            <h6>Price: {v.price}</h6>

                           

                        </div>
                    </div>
                })
            }


            <button className='btn btn-info' onClick={() => Going()}>Go to Corzine</button>

        </Offcanvas.Body>
    </Offcanvas>
      </header>


      <section>
      <div className='container'>
          <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="pizza" {...a11yProps(0)} />
                      <Tab label="burger" {...a11yProps(1)} />
                      <Tab label="iceCream" {...a11yProps(2)} />
                      <Tab label="coming" {...a11yProps(3)} />
                      
                  </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                  <div className="row 2">
                      {
                          (data.pizza.length > 0 ) ? (
                              data.pizza.map((v, i) => {
                                  return <div className='col-4' key={v.name}>
                                      <div className="card_tech">
                                          <img src={v.img} alt="rasm" className='tech_picture' />
                                          <h1>{v.name}</h1>
                                          <p>narx:{v.id}</p>
                                          <div className='buttons_card'>
                                              <button className='Korzina_tugma1' onClick={() => Korzina(v)} >Add to Korsine</button>

                                             
                                          </div>


                                      </div>
                                  </div>
                              })
                          ) : (<h1>error</h1>)
                      }
                  </div>

              </TabPanel>

              <TabPanel value={value} index={1}>
                  <div className="row">
                      {
                          (data.burger.length > 0) ? (
                              data.burger.map((v, i) => {
                                  return <div className='col-4' key={v.name}>
                                      <div className="card_tech">
                                          <img src={v.img} alt="" className='tech_picture' />
                                          <h1>{v.name}</h1>
                                          <p>narx:{v.id}</p>
                                         
                                          <div className='buttons_card'>
                                              <button className='Korzina_tugma1' onClick={() => Korzina(v)} >Add to Korsine</button>

                                              
                                          </div>
                                      </div>
                                  </div>
                              })
                          ) : (<h1>error</h1>)
                      }
                  </div>
              </TabPanel>

              <TabPanel value={value} index={2}>
                  <div className="row">
                      {
                          (data.iceCream.length > 0) ? (
                              data.iceCream.map((v, i) => {
                                  return <div className='col-4' key={v.name}>
                                      <div className="card_tech">
                                          <img src={v.img} alt="" className='tech_picture' />
                                          <h1>{v.name}</h1>
                                          <p>narx:{v.id}</p>
                                          <div className='buttons_card'>
                                              <button className='Korzina_tugma1' onClick={() => Korzina(v)} >Add to Korsine</button>

                                             
                                          </div>

                                      </div>
                                  </div>
                              })
                          ) : (<h1>error</h1>)
                      }
                  </div>
              </TabPanel>

              <TabPanel value={value} index={3}>
              <div className="row">
                  {
                      (data.coming.length > 0) ? (
                          data.coming.map((v, i) => {
                              return <div className='col-4' key={v.name}>
                                  <div className="card_tech">
                                      <img src={v.img} alt="" className='tech_picture' />
                                      <h1>{v.name}</h1>
                                      <p>narx:{v.id}</p>
                                      <div className='buttons_card'>
                                          <button className='Korzina_tugma1' onClick={() => Korzina(v)} >Add to Korsine</button>

                                          
                                      </div>

                                  </div>
                              </div>
                          })
                      ) : (<h1>error</h1>)
                  }
              </div>
          </TabPanel>

        
          </Box>
      </div>
      </section>


        <footer>
        <div className='footer_navs'>
          <div className="container">
          <ul className='nav_menu'>
          <li>
              <Link to={"/"}>Home</Link>
          </li>
          <li>
              <a href="#">Abaut</a>
          </li>
          <li>
              <a href="#">Menu</a>
          </li>
          <li>
              <a href="#">Contact</a>
          </li>
      </ul>



          </div>
          </div>
         </footer>
    </div>
  )
}

export default Home
