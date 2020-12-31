import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Commentitem from './commentitem'

const Comments = ({ comments, postid }) => {
  return (
    <Fragment>
      <div className='container'>
        <h3 className='text-info'>Comments</h3>
      </div>
      {comments && comments.length > 0
        ? comments.map((comment) => {
            return (
              <Commentitem
                key={comment._id}
                comment={comment}
                postid={postid}
              />
            )
          })
        : null}
    </Fragment>
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default Comments
