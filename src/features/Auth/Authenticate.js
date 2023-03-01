import { Base64 } from "js-base64";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { saveToken, setToken } from './AuthSlice';

function Authenticate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useParams();
    const decodedToken = Base64.decode(token)
    saveToken(decodedToken);
    dispatch(setToken(decodedToken)).then(() => navigate('/dashboard'));

    return <div> Loading ... </div>;

}

export default Authenticate;