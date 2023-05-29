import api from '../api'
import { loadState, saveState } from '../helpers/persist'
import { useEffect, useState, useContext} from 'react'
import { UserContext } from "../context"

export const useUser = () => {
  const [user, setUser] = useState()
  const [isFailed, setIsFailed] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [isFetched, setIsFetched] = useState(false)
  const { user: globalUser, authenticating, setIsAuthenticating, setUser: setGlobalUser } = useContext(UserContext);

  useEffect(() => {
    setGlobalUser(user)
  },[user, setGlobalUser])

  useEffect(() => {
    setIsAuthenticating(true)
  }, [])

  useEffect(() => {
    if (authenticating) {

      const authData = loadState("auth")

      if (authData?.token) {
        getUser()
      } 
      setIsFetching(false)
      setIsFetched(true)
    }
  },[authenticating])

  async function getUser() {
    try {
      const {data} = await api.getUser()
      setUser(data)
      setIsAuthenticating(false)
    } catch(e) {
      setUser(null)
      setIsAuthenticating(false)
    }
  }

  async function deleteUser() {
    try {
      setUser(null)
      await api.logout()
      saveState(null, "auth")
    } catch(e) {
      console.error("Couldnt reset user data")
    }
  }

  const isLoggedIn = (isFetched && !isFailed) &&  user

  return {isLoggedIn, user, getUser, deleteUser, isFetched, isFetching}
}

