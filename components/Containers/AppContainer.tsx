import axios from "axios";
import { ReactNode, useCallback, useEffect } from "react";

interface Props {
  token: string;
  children: ReactNode;
}

export default function AppContainer({ token, children }: Props) {
  const handleTabClose = useCallback(() => {
    axios.delete(`http://localhost:3000/users/mfa/${token}`);
  }, [token]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleTabClose);
    window.addEventListener("unload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
      window.removeEventListener("unload", handleTabClose);
    };
  }, [handleTabClose]);

  return <>{children}</>;
}
