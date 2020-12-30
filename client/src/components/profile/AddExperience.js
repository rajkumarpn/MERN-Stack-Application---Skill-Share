import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addExperience} from '../../action/profile'

const AddExperience = ({addExperience,history}) => {
    const [formdata,SetFormData] = useState({
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const {title,company,location,from,to,current,description} = formdata;

    const onChange = e =>{
        SetFormData({...formdata,[e.target.name]:e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        console.log(formdata);
        addExperience(formdata,history);
    }

    return (
        <div className="container">
            <div className="row shadow mt-3">
                <div className="col-sm p-3">
                    <h3 className="text-info">Add your work experience</h3>
                    <small className="form-text text-muted">Required fields are marked with *</small>
                <form onSubmit={e=>onSubmit(e)}>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={title} name="title" placeholder="* Title" required/>
                        <small id="emailHelp" className="form-text text-muted">Please enter your job title</small>
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={company} name="company" placeholder="* Company" required/>
                        <small id="emailHelp" className="form-text text-muted">Company you worked for</small>
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={location} name="location" placeholder="Location"/>
                        <small id="emailHelp" className="form-text text-muted">Kindly mention your location</small>
                    </div>
                    <div className="form-group mt-3">
                        <input type="date" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={from} name="from" placeholder="* From" required/>
                        <small id="emailHelp" className="form-text text-muted">* Mention the date when you started</small>
                    </div>
                    <div className="form-group mt-3">
                        <input type="date" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={to} name="to" placeholder="* To" disabled={current?'disabled':''} required/>
                        <small id="emailHelp" className="form-text text-muted">Last working day</small>
                    </div>
                    <div className="form-group form-check mt-3">
                        <input type="checkbox" className="form-check-input" name="current" value={current} id="exampleCheck1" onChange={e=>SetFormData({...formdata,current:!current})}/>
                        <small id="emailHelp" className="form-text text-muted">Currently working</small>
                    </div>
                    <div class="form-group mt-3">
                        <textarea class="form-control" id="exampleFormControlTextarea1" onChange={e=>onChange(e)} value={description} name="description" placeholder="Description" rows="3"></textarea>
                        <small id="emailHelp" className="form-text text-muted">Small description on the work experience</small>
                    </div>
                    <button type="submit" className="btn btn-info mt-3 text-light">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired,
}

export default connect(null,{addExperience})(withRouter(AddExperience))
