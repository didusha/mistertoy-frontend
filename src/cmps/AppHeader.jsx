// import { UserMsg } from './UserMsg.jsx'
// import { LoginSignup } from './LoginSignup.jsx'
// import { userService } from '../services/user.service.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { logout } from '../store/actions/user.actions.js'
// import { TOGGLE_TOYT_IS_SHOWN } from '../store/reducers/toy.reducer.js'
// import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import logo from '../assets/img/mister-toy-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const [isOpen, setIsOpen] = useState(false)
     const { t, i18n } = useTranslation();
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
    //     dispatch({ type: TOGGLE_CART_IS_SHOWN })
    // }

    function onToggleNavBar() {
        setIsOpen(!isOpen)
    }

    return (
        <header className="app-header">
            <section className="header-container">
                <img className="logo" src={logo} alt="logo" />

                {!isOpen ? (
                    <FontAwesomeIcon className="btn-nav-toggle" icon={faBars} onClick={onToggleNavBar} />
                ) : (
                    <FontAwesomeIcon className="btn-nav-toggle" icon={faXmark} onClick={onToggleNavBar} />
                )}

                <nav className={`app-nav ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/" >{t('home')}</NavLink>
                    <NavLink to="/about" >{t('about')}</NavLink>
                    <NavLink to="/toy" >{t('products')}</NavLink>
                    <NavLink to="/dashboard" >{t('dashboard')}</NavLink>
                    {/* <a onClick={onToggleCart} href="#">🛒 Cart</a> */}

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
