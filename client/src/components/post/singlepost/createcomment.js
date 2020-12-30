import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {addComment} from '../../../action/post'
import {connect} from 'react-redux'

const CreateComment = ({addComment,postid}) => {
    const [text,setText] = useState('');

    const handlesubmit = e =>{
        e.preventDefault();
        const data = {
            text,
            postid
        }
        addComment(data);
    }
    return (
                <div className="container">
                <form onSubmit={e=>handlesubmit(e)}>
                <div className="form-group" style={{backgroundColor:'white'}}>
                    <label for="exampleFormControlTextarea1">Add a comment</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={text} onChange={(e)=>setText(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-info text-light mt-2 mb-2">Submit</button>
                </div>
                </form>
                </div>
    )
}

CreateComment.propTypes = {
    addComment:PropTypes.func.isRequired,
    postid:PropTypes.any.isRequired
}

export default connect(null,{addComment})(CreateComment)
