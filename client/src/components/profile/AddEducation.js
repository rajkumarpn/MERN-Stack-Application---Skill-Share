import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addEducation} from '../../action/profile'

const AddEducation = ({addEducation,history}) => {
    const [formdata,SetFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const {school,degree,fieldofstudy,from,to,current,description} = formdata;

    const onChange = e =>{
        SetFormData({...formdata,[e.target.name]:e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        console.log(formdata);
        addEducation(formdata,history);
    }

    return (
        <div className="container">
            <div className="row shadow mt-3">
                <div className="col-sm p-3">
                    <h3 className="text-info">Add your work experience</h3>
                    <small className="form-text text-muted">Required fields are marked with *</small>
                <form onSubmit={e=>onSubmit(e)}>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={school} name="school" placeholder="* School/College" required/>
                        <small id="emailHelp" className="form-text text-muted">Please enter the educational institution</small>
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={degree} name="degree" placeholder="* Degree/Specialization" required/>
                        <small id="emailHelp" className="form-text text-muted">Enter the degree or Specialization</small>
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={fieldofstudy} name="fieldofstudy" placeholder="Field of study"/>
                        <small id="emailHelp" className="form-text text-muted">Kindly mention your domain</small>
                    </div>
                    <div className="form-group mt-3">
                        <input type="date" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={from} name="from" placeholder="* From" required/>
                        <small id="emailHelp" className="form-text text-muted">* Mention the date when you started</small>
                    </div>
                    <div className="form-group mt-3">
                        <input type="date" className="form-control" aria-describedby="emailHelp" onChange={e=>onChange(e)} value={to} name="to" placeholder="* To" disabled={current?'disabled':''} required/>
                        <small id="emailHelp" className="form-text text-muted">Course completion date</small>
                    </div>
                    <div className="form-group form-check mt-3">
                        <input type="checkbox" className="form-check-input" name="current" value={current} id="exampleCheck1" onChange={e=>SetFormData({...formdata,current:!current})}/>
                        <small id="emailHelp" className="form-text text-muted">Currently studying</small>
                    </div>
                    <div class="form-group mt-3">
                        <textarea class="form-control" id="exampleFormControlTextarea1" onChange={e=>onChange(e)} value={description} name="description" placeholder="Description" rows="3"></textarea>
                        <small id="emailHelp" className="form-text text-muted">Small description on your degree</small>
                    </div>
                    <button type="submit" className="btn btn-info mt-3 text-light">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(withRouter(AddEducation))
