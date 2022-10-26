import React from 'react';
import { Link } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth'
import { auth } from '../firebase-config';


const Navbar = ({ user }) => {

    const logOut = async () => {
        await signOut(auth);
    }

    const changeUsername = async () => {
        const newName = prompt("Enter new name");
        if (newName) {
            await updateProfile(user, { displayName: newName });
            window.location.reload();
        }
    }

    return (
        <>
            <nav className="navbar navbar-light .bg-transparent">
                <div className="container-fluid">

                    <Link className="navbar-brand fw-semibold fs-3" to='/' >My Project Stack</Link>

                    <div className='d-flex align-items-center'>
                        {user && <span className='fw-semibold mx-4 fs-4'>{user.displayName}</span>}

                        {user && <button className="btn btn-sm btn-warning mx-2" onClick={changeUsername}><i className="bi bi-pencil-fill"></i>
                        </button>}

                        {!user && <Link className='nav-link text-white mx-2 btn btn-sm btn-success py-1 px-2' to='/login'>Login</Link>}

                        {!user && <Link className='text-white nav-link mx-2 btn btn-sm py-1 px-2 my-btn' to="/signup">Sign up</Link>}

                        {user && <button className='mx-2 btn btn-sm btn-danger' onClick={logOut} >Log out</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar