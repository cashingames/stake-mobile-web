import { Base64 } from "js-base64";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { saveToken, setToken } from './AuthSlice';

function Authenticate() {
    const { token } = useParams();
    const decodedToken = Base64.decode(token)
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(() => {
        saveToken(decodedToken);
        dispatch(setToken(decodedToken));
        navigate('/dashboard');
        // eslint-disable-next-lin
    }, [dispatch, navigate, decodedToken]);

    return <div> Loading ... </div>;

}

export default Authenticate;