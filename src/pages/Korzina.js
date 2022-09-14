import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./style.css"
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';



const steps = ['Pizzani tanglaga', ' kartalarni kiritng', 'Sotib oldingiz, Tabriklaymiz siz chopildiz!'];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Korzina = () => {

    const location = useLocation();
    const [korzinaData, setKorzinaData] = useState(location.state);



    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("Ixtiyoriy boʻlmagan qadamni oʻtkazib yubora olmaysiz.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
        <header>
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
            <div className="row ">
            <div className="col-4 m-4 ">
                    <h3 className='fs-3'>Authentic local <br/>
                    food in Tbay</h3>
                    <h6 className='fs-5'>TBayEAT is a courier service in which authentic home cook  <br/>
                    food is delived to a customer</h6>
                    <div className='mb-5'>
                    <input type="text" className='form-label'/>
                    <button className='btn btn-outline-warning'>Search</button>
                </div>
            </div>
            
    
            </div>
           
        </div>
    
    
      
          </header>

            <div className="container">
                {
                    korzinaData.map((v, i) => {
                        return <div className='row card2'>
                            <div className="col-4">
                                <img src={v.img} alt="rasm" className='img-fluid' />
                            </div>
                            <div className='col-8'>
                                <h2 className='text-success'>{v.name}</h2>
                                <p className='text-secondary'>{v.desc}</p>
                                <p className='text-danger fs-3'>$ {v.price}</p>

                            </div>
                        </div>
                    })
                }







                <div className="d-flex justify-content-end pt-3 pb-3">
                    <Button onClick={handleOpen}>Sotib olish</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h1 className='text-center text-success'>Bu yerda sotib olish qoidalari bor</h1>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (isStepOptional(index)) {
                                        labelProps.optional = (
                                            <Typography variant="caption">Optional</Typography>
                                        );
                                    }
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Qaytadan boshlash</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className="container">
                                        <p className='text-center'>Birinchi bajaradiganish .....</p>
                                        <input type="text"  className='form-control'/>
                                        <button className='btn btn-danger m-1'>ortga qaytish</button>
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Orqaga qaytish
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {isStepOptional(activeStep) && (
                                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                Skip
                                            </Button>
                                        )}

                                        <Button onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Tugatish' : 'Keyingisi'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </Box>
                    </Box>
                </Modal>
            </div>


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

export default Korzina
