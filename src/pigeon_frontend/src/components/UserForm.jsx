import React from 'react';
import './userform.css';
import { pigeon_users } from '../../../declarations/pigeon_users/index';



const UserForm = () => {
    const [name, setName] = React.useState();
    const [displayName, setDisplayName] = React.useState();
    const [about, setAbout] = React.useState();
    const [location, setLocation] = React.useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let uname = name;
        let udisplay = displayName;
        let uabout = about;
        let ulocation = location;

        let userData = {
            bio: {
                name: uname,
                displayName: udisplay,
                about: uabout,
                location: ulocation
            }
        }
        let res = await pigeon_users.createProfile(userData);
        console.log(res);
    }

    return (
        <div class="userFormContainer">
            <form class="userform" action="" onSubmit={e => { handleSubmit(e) }}>
                <div >
                    <p>Name</p>
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <p>Display Name</p>
                    <input type="text" placeholder="Display Name" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                </div>
                <div>
                    <p>Password</p>
                    <input type="text" placeholder="..." value={about} onChange={e => setAbout(e.target.value)} />
                </div>
                <div>
                    <p>Password</p>
                    <input type="text" placeholder="..." value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div class="btn">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;