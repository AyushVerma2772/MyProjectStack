import React, { useState } from 'react';
import Waves from './Waves';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Signup = () => {

    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const handelSUbmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        if (!name || !email || !password) {
            setAlert(true);
            setAlertMsg("Please fill all fields");
            setTimeout(() => {
                setAlert(false)
            }, 2500);
            return
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;
            await updateProfile(user, { displayName: name })
            navigate("/");

        } catch (error) {
            setAlert(true);
            setAlertMsg(error.message);
            setTimeout(() => {
                setAlert(false)
            }, 2000);
        }
    }

    return (
        <>
            <div className='container d-flex justify-content-center align-items-center position-relative' style={{ minHeight: '85vh' }}>

                <div className="row w-30 w-sm-100 ">
                    <div className="col-12 bg-white p-2 rounded">
                        <h1 className='text-center mb-3' >Sign Up</h1>

                        {alert && <Alert alertMsg={alertMsg} />}

                        <form onSubmit={e => handelSUbmit(e)}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingName" placeholder="Name..." />
                                <label htmlFor="floatingName">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="Email Address" />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button type="submit" className="btn btn-primary text-center my-btn mt-3 d-block m-auto px-5 py-2">Sign Up</button>

                        </form>
                    </div>
                </div>
            </div>

            <Waves />
        </>
    )
}

export default Signup