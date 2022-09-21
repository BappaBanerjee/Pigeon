import React, { createContext, useContext, useState } from 'react';
import { userIdentity, userAuth, userPostCout } from '../App';
import { pigeon_backend } from '../../../declarations/pigeon_backend/index';
import { pigeon_users } from '../../../declarations/pigeon_users/index';
import PostCard from './PostCard';


const Posts = () => {
    const { identity, setIdentity } = useContext(userIdentity);
    const { isAuthenticated, setIsAuthenticated } = useContext(userAuth);
    const [posts, setPosts] = React.useState([{}]);
    const { postCount, setPostCount } = useContext(userPostCout);

    React.useEffect(() => {
        console.log(postCount);
        (async () => {
            let data = await pigeon_backend.allPosts();
            let usersData = await pigeon_users.whoami();
            // let data = await pigeon_backend.myPosts();
            console.log(usersData.toString());
            let temp = data[0][1];
            while (temp.length == 1) {
                const text = temp[0][0].text;
                const created_at = temp[0][0].created_at;
                const post_id = temp[0][0].id;
                temp = temp[0][1];//updating the temp variable, wrt the structure of the array return by the API
                let newelement = {
                    text: text,
                    post_id: post_id,
                    created_at: created_at
                }
                // console.log(newelement);
                setPosts(current => [...current, newelement])
            }
        })();
    }, [postCount]);

    return (

        <>
            {identity && isAuthenticated ? (
                <div className="container">
                    {posts.map((key, value) => {
                        if (Object.keys(key).length != 0) {
                            return (
                                <PostCard
                                    content={key.text}
                                    id={value}
                                    created_at={key.created_at}
                                />
                            );
                        }
                    })}
                </div>
            ) : (
                <div>
                    Anonymous user
                </div>
            )}
        </>
    );
}

export default Posts;