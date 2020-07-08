import React, { useEffect } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

export default function(SpecificComponent, option, adminRoute = null) {

  // option: null => 아무나
  // option: true => 로그인한 유저만 
  // option: false => 로그인 안한 유저만

  // adminRoute : null => 아무나

  function AuthenticationCheck(props) {

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response)

        // 로그인 하지 않은 상태
        if(!response.payload.isAuth) {
          if(option) {
            props.history.push('/login')
          }
        } else {
          // 로그인 한 상태
          if(adminRoute && !response.payload.isAdmin) {
            props.history.push('/')
          }else {
            if(option === false){
              props.history.push('/')
            }
          }
        }
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck
}