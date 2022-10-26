import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import Waves from './Waves';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config';

const Login = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");


    const handelSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        if (!email || !password) {
            setAlert(true);
            setAlertMsg("Please fill all fields");
            setTimeout(() => {
                setAlert(false)
            }, 2000);
            return
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
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
            <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '85vh' }}>
                <div className="row w-30 w-sm-100 ">
                    <div className="col-12 bg-white p-2 rounded">
                        <h1 className='text-center mb-3' >Login</h1>
                        {alert && <Alert alertMsg={alertMsg} />}
                        <form onSubmit={e => handelSubmit(e)}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="Email Address" />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button type="submit" className="btn btn-primary text-center my-btn mt-3 d-block m-auto px-5">Login</button>

                        </form>
                    </div>
                </div>
            </div>

            <Waves />
        </>
    )
}

export default Login