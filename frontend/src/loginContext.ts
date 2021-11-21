import { createContext  } from "react";
import { userInterface } from './interfaces/userInterface'

const LoginContext = createContext({ 
    loggedInUser: {name: ''},
    setLoggedInUser: (user: userInterface) => {}
})

export const LoginProvider = LoginContext.Provider

export default LoginContext
