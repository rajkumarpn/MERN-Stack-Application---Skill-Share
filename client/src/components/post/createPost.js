import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {addPost} from '../../action/post'
import {connect} from 'react-redux'

const CreatePost = ({addPost}) => {
    const [text,setText] = useState('');

    const handlesubmit = e =>{
        e.preventDefault();
        addPost(text);
    }
    return (
                <form onSubmit={e=>handlesubmit(e)}>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Write something!</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={text} onChange={(e)=>setText(e.target.value)} required></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" className="btn btn-info text-light mt-2 mb-2">Submit</button>
                </div>
                </form>
    )
}

CreatePost.propTypes = {
    addPost:PropTypes.func.isRequired,
}

export default connect(null,{addPost})(CreatePost)
