import React from "react";

export const Context = React.createContext({});
export const Storage = ({ children }) => {

    const [active, setActive] = React.useState('Cost Optimization Dashboard');

    return (
        <Context.Provider
          value={{
            active,
            setActive,
          }}
        >
          {children}
        </Context.Provider>
    );
}