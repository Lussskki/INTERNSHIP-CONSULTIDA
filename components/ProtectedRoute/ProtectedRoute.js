import { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "../../context"
import { useRouter } from 'next/router'

export default function ProtectedRoute({ children }) {
  const { authenticating, user } = useContext(UserContext);
  const [ hasPermission, setHasPermission] = useState(false)
  const { push } = useRouter()
  const readyForAuth = useRef(typeof window !== 'undefined')
  const hasPermissionRef = useRef()

  useEffect(() => {
    if (authenticating) {
      readyForAuth.current = true
      return
    }
    if (readyForAuth.current && !authenticating) {
      if (user) {
        hasPermissionRef.current = true
        setHasPermission(true)
      } else {
        if (!hasPermissionRef.current && user !== undefined) {
          setHasPermission(false)
          hasPermissionRef.current = false
          push("/")
        }
      }
    }
  },[authenticating, setHasPermission, user, push])

  if (hasPermission) {
    return (
      <>
        {children}
      </>
    )
  }

  return null
}