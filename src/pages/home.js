import {React} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

/**
 * Home Page
 * 
 * function to return home page data with relevant information and images
 * 
 * @author Mehtab Gill
 */

function HomePage(props){

const nav = useNavigate();

    const service = props.services && props.services.map((value) => (
            <div  key={value.id} className="col-lg-4 mb-5">
                <div className="card h-100 shadow border-0">
                    <div className="card-body p-4">
                        <div className="badge bg-primary bg-gradient rounded-pill mb-2">Health+</div>
                        <a className="text-decoration-none link-dark stretched-link" href="#!"><h5 className="card-title mb-3">{value.attributes.title}</h5></a>
                        <p className="card-text mb-0">{value.attributes.desc}</p>
                    </div>
                    <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                        <div className="d-flex align-items-end justify-content-between">
                            <div className="d-flex align-items-center">
                            <Button onClick={() => {nav("/services");}}> View All </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )

    return(
        <div>
            <div className='p-5 text-center bg-image jumbotron'>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='text-white'>
                    <h1 className='mb-3'>Health and Nutrition</h1>
                    <h4 className='mb-3'>Jaya Venayak</h4>
                    </div>
                </div>
            </div>

            <section className='features'>
            <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mb-0">A better insight to your health.</h2></div>
                        <div className="col-lg-8">
                            <div className="row gx-5 row-cols-1 row-cols-md-2">
                                <div className="col mb-5 h-100">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                                    <h2 className="h5">Flexibility</h2>
                                    <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more text.</p>
                                </div>
                                <div className="col mb-5 h-100">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building"></i></div>
                                    <h2 className="h5">Convenience</h2>
                                    <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more text.</p>
                                </div>
                                <div className="col mb-5 mb-md-0 h-100">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                                    <h2 className="h5">Assessments</h2>
                                    <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more text.</p>
                                </div>
                                <div className="col h-100">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                                    <h2 className="h5">Fast and Reliable</h2>
                                    <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more text.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='quote'>
            <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-10 col-xl-7">
                            <div className="text-center">
                                <div className="fs-4 mb-4 fst-italic">"Food is not just fuel, it's information. It talks to your DNA and tells it what to do."</div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..."></img>
                                    <div className="fw-bold">
                                    - Dr. Deepak Chopra
                                        <span className="fw-bold text-primary mx-1">/</span>
                                        Award-winning nutritionist and author
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='features'>
            <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <div className="text-center">
                                <h2 className="fw-bolder">Our services</h2>
                                <p className="lead fw-normal text-muted mb-5">
                                    Providing quality and personalised nutritional guidance
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5">
                        {service}
                    </div>
                    <aside className="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
                        <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
                            <div className="mb-4 mb-xl-0">
                                <div className="fs-3 fw-bold text-white">New products, delivered to you.</div>
                                <div className="text-white-50">Sign up for our newsletter for the latest updates.</div>
                            </div>
                            <div className="ms-xl-4">
                                <div className="input-group mb-2">
                                    <input className="form-control" type="text" placeholder="Email address..." aria-label="Email address..." aria-describedby="button-newsletter"></input>
                                    <button className="btn btn-outline-light" id="button-newsletter" type="button">Sign up</button>
                                </div>
                                <div className="small text-white-50">We care about privacy, and will never share your data.</div>
                            </div>
                        </div>
                    </aside>
                </div>            
            </section>
            
        </div>
    )}

export default HomePage