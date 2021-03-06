import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES,
} from './types';

///Get current profile
export const getCurrentProfile = () => dispacth => {
  dispacth(setProfileLoading());
  axios
    .get('/api/profile/')
    .then(res => {
      dispacth({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispacth({
        type: GET_PROFILE,
        payload: {},
      });
    });
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add Project
export const addProject = (projectInfo, history) => dispacth => {
  axios
    .post('/api/profile/projects/add', projectInfo)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispacth({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add experience
export const addExperience = (expData, history) => dispacth => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispacth({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add education
export const addEducation = (expData, history) => dispacth => {
  axios
    .post('/api/profile/education', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispacth({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete experience
export const deleteExperience = id => dispacth => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispacth({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch(err =>
      dispacth({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Get all profiles
export const getProfiles = () => dispacth => {
  axios
    .get('/api/profile/all')
    .then(res =>
      dispacth({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch(err =>
      dispacth({
        type: GET_PROFILES,
        payload: null,
      })
    );
};

//Get profile by handle
export const getUserByHandle = (handle) => dispacth => {
  dispacth(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispacth({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispacth({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

//Delete education
export const deleteEducation = id => dispacth => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispacth({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch(err =>
      dispacth({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete account
export const deleteAccount = () => dispacth => {
  if (window.confirm('Are you user, this can NOT be undone.')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispacth({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch(err =>
        dispacth({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

//Remove current user
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
