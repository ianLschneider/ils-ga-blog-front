import { Link, useNavigate } from 'react-router-dom'


const divStyle = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
}

const titleStyle = {
    textAlign: "#333",
    fontSize: "4em",
}


const Post = ({ post, deletePost }) => {
    const navigate = useNavigate()

    const handleDelete = event => {
        event.preventDefault()
        deletePost(post.id)
        navigate('/')
    }
 
    return (
        <div style={ divStyle }>
            <Link to={`/post/${post.id}`}>
                <h1 style={ titleStyle }>{ post.title }</h1>        
            </Link>
            <form onSubmit={handleDelete}>
                <input type="submit" value="Delete Post" />
            </form>
        </div>
    )
}

export default Post