import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service'
import { ReviewList } from '../cmps/ReviewList.jsx'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

export function UserDetails() {

  const params = useParams()
  const [user, setUser] = useState(null)
  console.log("🚀 ~ UserDetails ~ user:", user)
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

  function getUserCapitals(fullname) {
    if (!fullname) return ''
    return fullname.trim().split(/\s+/).map(word => word[0].toUpperCase()).join('')
  }

  function shouldShowActionBtns(review) {
    if (!user) return false
    if (user.isAdmin) return true
    return review.byUser?._id === user._id
  }

  // function onUserUpdate(user) {
  //   showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
  //   store.dispatch({ type: 'SET_WATCHED_USER', user })
  // }

  return (
    <section className="user-details main-layout">
      {user &&
        <div>
          {user.imgUrl ?
            <img src={user.imgUrl} style={{ width: '100px' }} /> :
            <div className="user-logo-image">{getUserCapitals(user.fullname)}</div>
          }
            <p>Full Name: {user.fullname}</p>
            <p>User Name: {user.username}</p>
            <p>Score: {user.score}</p>
            <p>Role: {user.isAdmin ? 'Admin' : 'User'}</p>
          <hr></hr>
          <ReviewList reviews={user.reviews} showAboutToy={true} />
        </div>}
    </section>
  )
}
{/* <pre> {JSON.stringify(user, null, 2)} </pre> */ }