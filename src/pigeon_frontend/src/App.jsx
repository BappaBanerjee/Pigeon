import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import RightSidebar from "./components/Sidebar/RightSidebar";
import { AuthClient, AuthClientLoginOptions } from "../../../node_modules/@dfinity/auth-client/lib/cjs/index";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Identity } from "@dfinity/agent";
import NotAuthenticated from "./components/NotAuthenticated";



const style = {
    container: {
        padding: "0px 320px",
        display: "flex"
    }
}

const client = createContext();
const userIdentity = createContext();
const userAuth = createContext();
const userPostCout = createContext();//context craeted to get the post count, to render posts

const App = () => {
    const [authClient, setAuthClient] = React.useState();
    const [identity, setIdentity] = React.useState();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [postCount, setPostCount] = React.useState(0);
    const identityProvider = process.env.II_PROVIDER_URL || "https://identity.ic0.app/#authorize";
    const fakeProvider = process.env.II_PROVIDER_USE_FAKE == "true";

    React.useEffect(() => {
        async function fetchData() {
            let createClient = await AuthClient.create();
            setAuthClient(createClient);
            setIdentity(createClient.getIdentity().getPrincipal().toString());
            if (await createClient.isAuthenticated()) {
                setIsAuthenticated(true);
            }
        }
    });

    return (
        <userIdentity.Provider value={{ identity, setIdentity }}>
            <userAuth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
                <client.Provider value={authClient}>
                    <userPostCout.Provider value={{ postCount, setPostCount }}>
                        {isAuthenticated ? (
                            <div style={style.container}>
                                <Sidebar />
                                <Outlet />
                                <RightSidebar />
                            </div>
                        ) : (
                            <NotAuthenticated />
                        )}
                    </userPostCout.Provider>
                </client.Provider>
            </userAuth.Provider>
        </userIdentity.Provider>
    )


};

export default App;
export { userIdentity, userAuth, client, userPostCout };