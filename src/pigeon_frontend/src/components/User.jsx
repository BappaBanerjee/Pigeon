import React from 'react';
import { pigeon_users } from '../../../declarations/pigeon_users/index';
import UserForm from './UserForm';
const User = () => {
    const [user, setUser] = React.useState();
    let userData;
    React.useEffect(() => {
        (async () => {
            userData = await pigeon_users.readProfile();
            console.log(userData.err.NotFound);
        })();
    }), [];
    return (
        <div className='container'>
            {userData?.NotFound == null ? (
                <UserForm />
            ) : (
                "You are validated"
            )}
        </div>
    );
};

export default User;