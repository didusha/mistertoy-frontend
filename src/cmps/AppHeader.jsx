// import { UserMsg } from './UserMsg.jsx'
// import { LoginSignup } from './LoginSignup.jsx'
// import { userService } from '../services/user.service.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { logout } from '../store/actions/user.actions.js'
// import { TOGGLE_TOYT_IS_SHOWN } from '../store/reducers/toy.reducer.js'
// import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import logo from '../assets/img/mister-toy-logo.png';

// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    // const dispatch = useDispatch()
    // const user = useSelector(storeState => storeState.userModule.loggedInUser)
    // console.log('user:', user)

    // function onLogout() {
    //     logout()
    //         .then(() => {
    //             showSuccessMsg('logout successfully')
    //         })
    //         .catch((err) => {
    //             showErrorMsg('OOPs try again')
    //         })
    // }



    // function onToggleToyt(ev) {
    //     ev.preventDefault()
    //     dispatch({ type: TOGGLE_TOYT_IS_SHOWN })
    // }

    return (
        <header className="app-header">
            <section className="header-container">

                <img className="logo" src={logo} alt="logo" />
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Products</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    {/* <a onClick={onToggleToyt} href="#">🛒 Toyt</a> */}

                </nav>
            </section>
            {/* {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg /> */}
        </header>
    )
}
