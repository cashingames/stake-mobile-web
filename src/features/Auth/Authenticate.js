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
        saveToken(Base64.decode(token));
        dispatch(setToken(Base64.decode(token)));
        navigate('/dashboard');
        // eslint-disable-next-lin
    }, [dispatch, navigate, token]);

    return <div> Loading ... </div>;

}

export default Authenticate;