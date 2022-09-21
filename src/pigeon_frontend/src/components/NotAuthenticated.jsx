import React, { useContext } from 'react';
import { userIdentity, userAuth, client } from '../App';
import { AuthClient } from '../../../../node_modules/@dfinity/auth-client/lib/cjs/index';
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Identity } from "@dfinity/agent";
import styled from "styled-components";


const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const NotAuthenticated = () => {

    const identityProvider = process.env.II_PROVIDER_URL || "https://identity.ic0.app/#authorize";

    const { identity, setIdentity } = useContext(userIdentity);
    const { isAuthenticated, setIsAuthenticated } = useContext(userAuth);
    const authClient = useContext(client);
    console.log(isAuthenticated);
    const fakeProvider = process.env.II_PROVIDER_USE_FAKE == "true";

    async function fetchData() {
        if (!isAuthenticated) {
            if (fakeProvider) {
                // for local development, the identity can be generated
                // bypassing the Internet Identity login workflow
                let createClient = await AuthClient.create({
                    identity: Ed25519KeyIdentity.generate(),
                });
                console.log(createClient.getIdentity().getPrincipal().toString());
                setIdentity(createClient.getIdentity().getPrincipal().toString());
                setIsAuthenticated(true);

            } else {
                let createClient = await AuthClient.create();
                await createClient.login({
                    onSuccess: async () => {
                        setIdentity(createClient.getIdentity().getPrincipal().toString());
                        setIsAuthenticated(true);
                    },
                    onError: (error) => {
                        setIsAuthenticated(false);
                    },
                    identityProvider
                })
            }
        }
        console.log(isAuthenticated);
    }

    return (
        <>
            <div className="container">
                <h1>Oops! Seems like you are Not an Autheticated User! Please Click in the button to login to the Internet Identity</h1>
                <Button onClick={fetchData}>
                    Login
                </Button>
            </div>

        </>
    );
};

export default NotAuthenticated;