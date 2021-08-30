import { useHistory } from "react-router-dom";
const useRedirect = path => {
  const history = useHistory();
  history.push(`/${path}`);
};

export default useRedirect;
