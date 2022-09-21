import React, { useContext } from 'react';
import { userIdentity, userAuth, userPostCout } from '../App';
import { pigeon_backend } from '../../../declarations/pigeon_backend/index';
import Posts from './Posts';

const style = {
    textfiled: {
        width: "100%",
        height: "100px",
        padding: "0 30px",
        border: "none",
        fontSize: "20px",
        fontWeight: "bold",
        outline: 0,
        background: "transparent",
        boxShadow: "none",
    },
    formSection: {
        paddingTop: "5px",
        borderBottom: "1px solid black",
        marginBottom: "20px"
    },
    bluBtn: {
        margin: "15px",
        width: "150px",
        height: "40px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#308efe",
        fontFamily: "'Open Sans', sans-serif",
    }
}

const Post = () => {
    const { identity, setIdentity } = useContext(userIdentity);
    const { isAuthenticated, setIsAuthenticated } = useContext(userAuth);
    const { postCount, setPostCount } = useContext(userPostCout);
    const [value, setValue] = React.useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const content = await pigeon_backend.addPost(value);
        alert("Hurray!! Your post is successfully posted.");
        // window.location.reload();
        setPostCount(postCount + 1);
        console.log(postCount);
    }

    return (
        <>

            {identity && isAuthenticated ? (
                <div className="container">
                    <form onSubmit={e => { handleSubmit(e) }} style={style.formSection}>
                        <div id="inputcontainer">
                            <textarea type="text" value={value} onChange={e => setValue(e.target.value)} style={style.textfiled} placeholder="Type here Something....." />
                            <input type="submit" value="Post" style={style.bluBtn} />
                        </div>
                    </form>
                    <Posts />
                </div>
            ) : (
                <div>
                    Anonymous user
                </div>
            )}
        </>
    );
};

export default Post;