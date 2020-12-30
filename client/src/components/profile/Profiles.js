import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProfiles } from '../../action/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ getAllProfiles, profile: { loading, allProfiles } }) => {
  useEffect(() => {
    getAllProfiles()
  }, [])
  console.log(loading)
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm'>
          {loading ? (
            <Fragment>
              <div class='spinner-border text-info' role='status'>
                <span class='sr-only'></span>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {allProfiles && allProfiles.length === 0 ? (
                <Fragment>No Profiles found</Fragment>
              ) : (
                <Fragment>
                  <h3
                    className='m-4 text-info'
                    style={{ fontWeight: 'bolder' }}
                  >
                    Member Profiles
                  </h3>
                  {allProfiles.length > 0 &&
                    allProfiles.map((profile) => {
                      return <ProfileItem key={profile._id} profile={profile} />
                    })}
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getAllProfiles })(Profiles)
