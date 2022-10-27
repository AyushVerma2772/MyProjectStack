import React, { useState } from 'react';
import Table from './Table';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase-config';
import Alert from './Alert';


const Home = ({ user }) => {

    const collName = `users/${user.uid}/projects`;
    const collRef = collection(db, collName);
    const [projectName, setProjectName] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [repoLink, setRepoLink] = useState('');
    const [alert, setAlert] = useState();
    const [alertType, setAlertType] = useState("danger");
    const regx = /^(https:\/\/|http:\/\/|www\.)/;


    const handelSubmit = async (e) => {

        e.preventDefault();

        if (!projectName || !repoLink) {
            setAlertType("danger")
            setAlert("Please fill both Project Name and GitHub Repo Link");
            setTimeout(() => {
                setAlert(null)
            }, 2500);
            return
        }

        if (!regx.test(repoLink)) {
            setAlertType("danger")
            setAlert(`Invalid Repo Link`);
            setTimeout(() => {
                setAlert(null)
            }, 2500);
            return
        }

        if ( projectLink && !regx.test(projectLink)) {
            setAlertType("danger")
            setAlert(`Invalid Project Link`);
            setTimeout(() => {
                setAlert(null)
            }, 2500);
            return
        }

        await addDoc(collRef, {
            projectName,
            projectLink,
            repoLink,
            time: serverTimestamp()
        });
        setProjectName("");
        setProjectLink("");
        setRepoLink("");
        setAlert("Project added");
        setAlertType("success");
        setTimeout(() => {
            setAlert(null)
        }, 2000);
    }




    return (
        <>
            <div className="container-fluid position-relative">
                {alert && <Alert alertMsg={alert} alertType={alertType} />}
                {/* Project Add form */}
                <div className='container'>
                    <div className="row my-2">
                        <div className="col-12">
                            <form className='container' onSubmit={e => handelSubmit(e)} >
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" className="form-control my-2" id="project-name" placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} />
                                    </div>

                                    <div className="col-lg-6">
                                        <input type="text" className="form-control my-2" id="project-link" placeholder="Project Link" value={projectLink} onChange={e => setProjectLink(e.target.value)} />
                                    </div>

                                    <div className="col-lg-6">
                                        <input type="text" className="form-control my-2" id="github-link" placeholder="GitHub Repo Link" value={repoLink} onChange={e => setRepoLink(e.target.value)} />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col my-2">
                                        <button className='btn btn-primary align-middle my-btn px-4'>Add<i className="bi bi-plus-lg"></i></button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>

                    <h2 className='mt-4 mb-1'>My Projects</h2>
                </div>

                {/* Project Table */}
                <div className="container my-3 p-0 rounded d-flex flex-column align-items-center table-responsive">
                    <Table user={user} />
                </div>


            </div>
        </>
    )
}

export default Home;