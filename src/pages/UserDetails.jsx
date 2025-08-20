import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

export function UserDetails() {

  const params = useParams()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadUser(params.userId)

    // socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }

  }, [params.id])

  async function loadUser(userId) {
    try {
      const userToShow = await userService.getById(userId)
      if (!userToShow) {
        navigate('/')
        return
      }
      setUser(userToShow)

    } catch (err) {
      showSuccessMsg('Cannot load user')
      console.log('Cannot load user', err)
    }
  }

  // function onUserUpdate(user) {
  //   showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
  //   store.dispatch({ type: 'SET_WATCHED_USER', user })
  // }

  return (
    <section className="user-details">
      <h1>User Details</h1>
      {user && <div>
        <h3>
          {user.fullname}
        </h3>
        <img src={user.imgUrl} style={{ width: '100px' }} />
        <pre> {JSON.stringify(user, null, 2)} </pre>
      </div>}
    </section>
  )
}