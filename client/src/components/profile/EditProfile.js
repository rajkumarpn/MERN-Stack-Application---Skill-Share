import React, { Fragment,useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addProfile} from '../../action/profile'
import ShowAlert from '../../action/alert'
import {withRouter} from 'react-router-dom';
import {getProfile} from '../../action/profile';
import {Link} from 'react-router-dom';

const EditProfile = props => {

    const [togglesocial,setToggelsocial] = useState(false);
    const [formdata,setFormdata] = useState({
        company:'',
        website:'',
        location:'',
        status:'Junior Developer',
        skills:'',
        bio:'',
        social:'',
        facebook:'',
        twitter:'',
        instagram:'',
        linkedin:'',
        youtube:''
    });

    useEffect(()=>{
        props.getProfile();
            setFormdata({
                company:props.profile.loading||!props.profile.profile.company?'':props.profile.profile.company,
                website:props.profile.loading||!props.profile.profile.website?'':props.profile.profile.website,
                location:props.profile.loading||!props.profile.profile.location?'':props.profile.profile.location,
                status:props.profile.loading||!props.profile.profile.status?'':props.profile.profile.status,
                skills:props.profile.loading||!props.profile.profile.skills?'':props.profile.profile.skills.join(','),
                bio:props.profile.loading||!props.profile.profile.bio?'':props.profile.profile.bio,
                social:props.profile.loading||!props.profile.profile.social?'':props.profile.profile.social,
                facebook:props.profile.loading||!props.profile.profile.social?'':props.profile.profile.social.facebook,
                twitter:props.profile.loading||!props.profile.profile.social?'':props.profile.profile.social.twitter,
                instagram:props.profile.loading||!props.profile.profile.social?'':props.profile.profile.social.instagram,
                linkedin:props.profile.loading||!props.profile.profile.social?'':props.profile.profile.social.linkedin,
                youtube:props.profile.loading||!props.profile.profile.social?'':props.profile.profile.social.youtube,
            })
    },[props.profile.loading])



    const {company,website,location,status,skills,bio,facebook,twitter,instagram,linkedin,youtube} = formdata;

    const onChange = e =>{
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }


    const onSubmit = e =>{
        e.preventDefault();
        if(skills===''){
            props.ShowAlert('Your skills are required','danger')
            return
        }
        console.log(formdata)
        props.addProfile(formdata,props.history,true);
    }
    return (
        <div className="container mt-3 shadow">
            <div className="row p-2">
                <div className="col-sm">
                    <h2 className="text-info">Edit Your Profile</h2>
                    <h5>Let's get some information to make your profile stand out</h5>
                    <small className="form-text text-muted">* required fields</small>
                    <div className="form-group inputfrm">
                        <select className="form-control" id="exampleFormControlSelect1" onChange={e=>onChange(e)} value={status} name="status" placeholder="* Select Professional Status">
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Mid Level Developer">Mid Level Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Student">Student</option>
                        <option value="Trainer">Trainer</option>
                        </select>
                        <small id="companyHelp" className="form-text text-muted">Give us an idea on where you are at your career</small>
                    </div>
                    <div className="form-group inputfrm">
                    <input type="text" className="form-control" value={company} name="company" onChange={e=>onChange(e)} aria-describedby="companyHelp" placeholder="Company"/>
                    <small id="companyHelp" className="form-text text-muted">Could be your own company or one you work for</small>
                    </div>
                    <div className="form-group inputfrm">
                    <input type="text" className="form-control" value={website} name="website" onChange={e=>onChange(e)} aria-describedby="websiteHelp" placeholder="Website"/>
                    <small id="websiteHelp" className="form-text text-muted">Could be your own or company website</small>
                    </div>
                    <div className="form-group inputfrm">
                    <input type="text" className="form-control" value={location} name="location" onChange={e=>onChange(e)} aria-describedby="locationHelp" placeholder="Location"/>
                    <small id="locationHelp" className="form-text text-muted">City and State suggested (eg: coimbatore,TN)</small>
                    </div>
                    <div className="form-group inputfrm">
                    <input type="text" className="form-control" value={skills} name="skills" onChange={e=>onChange(e)} aria-describedby="websiteHelp" placeholder="* Skills" required/>
                    <small id="websiteHelp" className="form-text text-muted">Please use comma seperated values (eg:PHP,React)</small>
                    </div>
                    <div className="form-group inputfrm">
                    <textarea className="form-control" name="bio" rows="3" value={bio} aria-describedby="tellus" onChange={e=>onChange(e)} placeholder="A short bio of yourself"></textarea>
                    <small id="tellus" className="form-text text-muted">Tell us a little about yourself</small>
                    </div>
                    {/* social media */}
                    <button className="btn btn-default" onClick={()=>setToggelsocial(!togglesocial)}>Add social media</button>
                    <small id="tellus" className="form-text text-muted">*optional</small><br/>
                    {togglesocial&&<Fragment>
                    <div className="form-group">
                            <div className="input-group mb-2">
                            <div className="input-group-prepend">
                            <div className="input-group-text">f</div>
                            </div>
                            <input type="text" className="form-control" onChange={e=>onChange(e)} value={facebook} id="inlineFormInputGroup" name="facebook" placeholder="Facebook"/>
                            </div>

                            <div className="input-group mb-2">
                            <div className="input-group-prepend">
                            <div className="input-group-text">t</div>
                            </div>
                            <input type="text" className="form-control" value={twitter} onChange={e=>onChange(e)} id="inlineFormInputGroup" name="twitter" placeholder="Twitter"/>
                            </div>

                            <div className="input-group mb-2">
                            <div className="input-group-prepend">
                            <div className="input-group-text">i</div>
                            </div>
                            <input type="text" className="form-control" value={instagram} onChange={e=>onChange(e)} id="inlineFormInputGroup" name="instagram" placeholder="Instagram"/>
                            </div>

                            <div className="input-group mb-2">
                            <div className="input-group-prepend">
                            <div className="input-group-text">ln</div>
                            </div>
                            <input type="text" className="form-control" value={linkedin} onChange={e=>onChange(e)} id="inlineFormInputGroup" name="linkedin" placeholder="Linkedin"/>
                            </div>

                            <div className="input-group mb-2">
                            <div className="input-group-prepend">
                            <div className="input-group-text">Y</div>
                            </div>
                            <input type="text" className="form-control" value={youtube} onChange={e=>onChange(e)} id="inlineFormInputGroup" name="youtube" placeholder="Youtube"/>
                            </div>
                    </div>
                    </Fragment>}
                    <button className="btn btn-md btn-info text-light" onClick={e=>onSubmit(e)}>Submit</button>
                    <Link className="btn btn-md btn-warning text-light m-2" to="/dashboard">Back</Link>
                </div>
            </div>            
        </div>
    )
}
const mapStateToProps = state =>({
    profile:state.profile
})
EditProfile.propTypes = {
    addProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    ShowAlert:PropTypes.func.isRequired,
    getProfile:PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{addProfile,ShowAlert,getProfile})(withRouter(EditProfile));
