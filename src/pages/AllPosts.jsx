import Post from '../components/Post'
import { Link } from 'react-router-dom'

const AllPosts = props => (

    <>

        <Link to="/new">
            <button type="button">Add Post</button>
        </Link>

        { props.posts.map( post => <Post post={post} key={post.id} deletePost={props.deletePost}/>) }

    </>
)

export default AllPosts