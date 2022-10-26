import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';


const Table = ({ user }) => {

    const collName = `users/${user.uid}/projects`;
    const collRef = collection(db, collName);
    const [projects, setProjects] = useState([])

    //! Realtime Read of todos
    useEffect(() => {
        const unsub = onSnapshot(collRef, snapshot => {
            setProjects(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        });

        return () => {
            unsub();
        }
        // eslint-disable-next-line
    }, []);

    //! Delete Doc
    const deleteProject = async (id) => {
        const docRef = doc(db, collName, id)
        await deleteDoc(docRef, id);
    }
    


    return (
        <>
            <table className="table table-striped table-dark m-0" style={{ borderRadius: '5px' }} >
                <thead>
                    <tr>
                        <th scope="col" width='9%'>S No.</th>
                        <th scope="col" className=' text-center' width='75%'>Project Name &nbsp; <i className="bi bi-box-arrow-up-right"></i></th>
                        <th scope="col" className=' text-center' width='8%'><i className="bi bi-github"></i></th>
                        <th scope="col" className=' text-center' width='8%'></th>
                    </tr>
                </thead>

                <tbody>

                    {
                        projects.map((ele, i) => (
                            <tr key={i} >
                                <th scope="row" width='9%'>{i + 1}</th>
                                <td className='text-center' width='75%'>
                                    <a className='nav-link' target={"_blank"} rel="noreferrer" href={ele.projectLink} title={ele.projectLink}>{ele.projectName}</a>
                                </td>

                                <td className='text-center' width='8%'>
                                    <i role={"button"} className="bi bi-github text-info" onClick={e => window.open(ele.repoLink)} title={ele.repoLink}></i>
                                </td>

                                <th className='text-center' width='8%'>
                                        <i role="button" className="bi bi-trash-fill text-danger" onClick={e => deleteProject(ele.id)} ></i>
                                </th>
                            </tr>
                        ))
                    }



                </tbody>
            </table>
        </>
    )
}

export default Table