import React, { Component } from 'react';
import  Joi  from 'joi-browser';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css'

class Home extends Component {
    state = { 
        data : {
            Name: '',
            Email: '',
            Club: '',
            Designation: '',
            Tele : ''
        }
     }
     
     schema = {
        Name: Joi.string().required(),
        Email: Joi.string().required(),
        Club: Joi.string().allow(''),
        Designation: Joi.string().allow(''),
        Tele: Joi.string().required()
     }

     handleErrors() {
        const result = Joi.validate(this.state.data, this.schema)

        let errors = {}
        if(!result.error){
            return null
        } else {
            errors[result.error.details[0].path[0]] = result.error.details[0].message
            console.log(errors);
            return errors   
        }
    }

     handleChange = event => {
        
        let { data } = this.state

        data[event.currentTarget.name] = event.currentTarget.value
        this.setState({data: data})
       
    }

     doSubmit = event => {
        event.preventDefault()
        console.log(this.state.data);
        try {
            this.saveItem(this.state.data)
            toast.success('Form submitted')
            setTimeout(() => {
                window.location.reload();
            }, 7000);
            
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error);
        }
     }

     saveItem = async (object) => {
        console.log(object);
        await axios.post('/home', object)
    }

    render() { 
        return (
            <div className='home'>
            <ToastContainer />
                <div className='header'>
                <div className='bg'></div>
                <div className='bg bg2'></div>
                <div className='bg bg3'></div>
                    <h1><center> Installation Ceremony of 
                     Rotaract Club of <br></br> Informatics Institute of Technology</center></h1>
                </div>
                <div className='content'>
                    <div className='pic'>
                        <img src='/assets/images/invitation-dummy.jpg' />
                    </div>
                    <div className='form'>
                    <div className='fields'>
                        <form onSubmit={this.doSubmit}>
                            <label htmlFor='Name'>Your Full Name : *</label> <br />
                            <input name='Name' type='text' value={this.state.data.Name} onChange={this.handleChange} /> <br />
                            <label htmlFor='Email'>Your Email : *</label> <br />
                            <input name='Email' type='email' value={this.state.data.Email} onChange={this.handleChange} /> <br />
                            <label htmlFor='Club'>Rotaract Club :</label> <br />
                            <input name='Club' type='text' value={this.state.data.Club} onChange={this.handleChange} /> <br />
                            <label htmlFor='Designation'>Designation :</label> <br />
                            <input name='Designation' className='desig' type='text' value={this.state.data.Designation} onChange={this.handleChange} /> <br />
                            <label htmlFor='Tele'>Telephone Number : *</label> <br />
                            <input name='Tele' className='tele' type='text' value={this.state.data.Tele} onChange={this.handleChange} /> <br />
                            <button disabled={this.handleErrors()} type='submit' className='button-19' style={{width: '100px'}}>Submit</button>
                        </form>
                        </div>
                        <div className='no-fields'></div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Home;