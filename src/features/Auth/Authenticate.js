import { Base64 } from "js-base64";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { saveToken, setToken } from './AuthSlice';

function Authenticate() {
    const { token } = useParams();


    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const decodedToken = Base64.decode(token)
        saveToken(decodedToken);
        dispatch(setToken(decodedToken));
        navigate('/dashboard');
        // eslint-disable-next-line
    }, []);

    return <div> Loading ... </div>;

}

export default Authenticate;