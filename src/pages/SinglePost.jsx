import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"


const SinglePost = ({posts}) => {

    const params = useParams()
    
    const currentPost = useMemo( () => posts.find( post => post.id === parseInt( params.id ) ), [params.id, posts])
    
    return (
        <div>
            <h1>{currentPost.title}</h1>
            <p>{currentPost.body}</p>

            <Link to={`/edit/${params.id}`}>
                <button type="button">Edit Post</button>
            </Link>
            <Link to={`/`}>
                <button type="button">Go Back</button>
            </Link>
        </div>
    )
}

export default SinglePost