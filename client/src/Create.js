import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav'

const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });
    // destructure values from state
    const { title, content, user } = state;

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, title: '', content: '', user: '' });
                // show sucess alert
                alert(`Įžvalga ${response.data.title} pridėta`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container pb-5">
            <Nav />
            <h1 className="display-4">Pridėk įžvalgą</h1>
            <br />

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Įžvalga</label>
                    <input
                        onChange={handleChange('title')}
                        value={title}
                        type="text"
                        className="form-control"
                        placeholder=""
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Papasakok plačiau, kokiom aplinkybėm įžvalga atsirado?</label>
                    <textarea
                        onChange={handleChange('content')}
                        value={content}
                        type="text"
                        className="form-control"
                        placeholder="Su kuo buvai? Kur buvai? Ką veikei?"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Autorius</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="Vardas"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-dark">Pridėti</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
