/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../action/register'
import { PropTypes } from 'prop-types'

export const Navbar = ({ register, logout }) => {
  const guestlink = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link active' aria-current='page' to='/developers'>
          Members
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </Fragment>
  )

  const authlink = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link active' to='/dashboard'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            class='bi bi-person'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'
            />
          </svg>{' '}
          Dashboard
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link active' aria-current='page' to='/developers'>
          Members
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link active' aria-current='page' to='/posts'>
          Posts
        </Link>
      </li>
      <li className='nav-item'>
        <a
          className='nav-link active'
          aria-current='page'
          onClick={() => logout()}
        >
          Logout
        </a>
      </li>
    </Fragment>
  )
  return (
    <Fragment>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <h4>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                className='bi bi-code-slash'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z'
                />
              </svg>{' '}
              Skill Share
            </h4>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarText'
            aria-controls='navbarText'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarText'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {!register.loading && register.isAuthenticated
                ? authlink
                : guestlink}
            </ul>
            <span className='navbar-text'>
              {/* Navbar text with an inline element */}
            </span>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  register: state.register,
})

Navbar.propTypes = {
  register: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { logout })(Navbar)
