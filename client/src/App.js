
import Nav from './Nav'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


const App = () => {
    const[posts, setPosts] = useState([])

    const fetchPosts = () => {
        axios.get(`${process.env.REACT_APP_API}/posts`)
        .then(response => {
          //  console.log(response)
            setPosts(response.data)
        })
        .catch( err => alert('Error fetching posts'))

    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const deleteConfirm = slug => {
        let answer = window.confirm('Ar tikrai norite ištrinti įžvalgą?');
        if (answer) {
            deletePost(slug);
        }
    };

    const deletePost = slug => {
        // console.log('delete', slug, ' post');
        axios
            .delete(`${process.env.REACT_APP_API}/post/${slug}`)
            .then(response => {
                alert(response.data.message);
                fetchPosts();
            })
            .catch(error => alert('Error deleting'));
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1 className="display-4 text-center pb-5">Įžvalgos įžvalgėlės</h1>
            <hr />
            {posts.map((post, i) => (
                <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
                    <div className="col pt-3 pb-2">
                        <Link to={`/post/${post.slug}`}>
                        <h2 class="h4">{post.title}</h2>
                        </Link>
                        <p className="lead">{post.content.substring(0, 100)}</p>
                        <p>
                            Autorius <span className="badge">{post.user}</span> Sukurta{' '}
                            <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
                        </p>
                
                    </div>
                    <div className="col-md-2 pt-3">
                                <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                                    Atnaujinti
                                </Link>
                                <button
                                    onClick={() => deleteConfirm(post.slug)}
                                    className="btn btn-sm btn-outline-danger ml-1"
                                >
                                    Ištrinti
                                </button>
                        </div>
                </div>
            ))}
        </div>
    );
};

export default App; 