import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const Form = props => {

    const navigate = useNavigate()
    const params = useParams()


    const currentPost = useMemo(() => props.posts.find( post => post.id === parseInt(params.id) ), [params.id, props.posts] )

    const [formData, setFormData] = useState(
        props.formType === 'new' ? {
            title: '',
            body: '',
        } : {
            title: currentPost.title,
            body: currentPost.body,
            id: parseInt(currentPost.id),
        }
    )


    const styles = {
        form: {
            maxWidth: '300px',
            margin: '0 auto',
            textAlign: 'center',
        },
        input: {
            display: 'inline-block',
            width: '100%',
            height: '28px',
            border: '1px solid black',
            borderRadius: '3px',
        },
        textarea:{
            width: '100%',
            paddingBottom: '35%',
            border: '1px solid black',
            borderRadius: '3px',
            resize: 'none',
        },
        submit: {
            display: 'block',
            margin: '20px auto',
            background: '#323232',
            border: '1px solid black',
            borderRadius: '3px',
            width: '134px',
            height: '32px',
            color: '#fff',
            fontWeight: '600'
        }
    }

    const handleChange = event => {
        setFormData( prev =>(
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ) )
    }

    const handleSubmission = event => {
        event.preventDefault()
        props.handleSubmit(formData, props.formType)
        navigate('/')
    }

    return (
        <form style={styles.form} onSubmit={handleSubmission}>
            <h3>Title</h3>
            <input
                style={styles.input}
                type='text'
                onChange={handleChange}
                value={formData.title}
                name='title'
               
            />
            <h3>Body</h3>
            <textarea
                style={styles.textarea}
                placeholder=""
                onChange={handleChange}
                name='body'
                defaultValue={formData.body}
            />
            <input type="submit" style={styles.submit} value={props.buttonLabel} />
        </form>
    )
}

export default Form