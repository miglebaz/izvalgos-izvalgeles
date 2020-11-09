
import axios from 'axios'
import Nav from './Nav'
import {useState, useEffect} from 'react'

const SinglePost = (props) => {
    const [post, setPost] = useState('')
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
        .then(response => {
          //  console.log(response)
            setPost(response.data)
        })
        .catch( err => alert('Error fetching single post'))
}, []);

    return(
        <div className="container pb-5">
            <Nav />
            <br />
    <h1 className="display-4 text-center">{post.title}</h1>
    <p className="lead text-center">Įžvalga įžvalgėlė</p>
            <hr />
            <p className="lead">{post.content}</p>
            <p>
                Autorius <span className="badge">{post.user}</span> Sukurta{' '}
                <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
            </p>
        </div>

    )
}

export default SinglePost;