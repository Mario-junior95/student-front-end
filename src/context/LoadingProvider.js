import React from "react";

const Loadingcontext = React.createContext();
export default Loadingcontext;

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Loadingcontext.Provider value={[loading, setLoading]}>
      {children}
    </Loadingcontext.Provider>
  );
};
