import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { saveToken, setToken } from './AuthSlice';

function Authenticate() {
    const { token } = useParams();
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(() => {
        saveToken(token);
        dispatch(setToken(token));
        navigate('/dashboard');
        // eslint-disable-next-line
    }, []);

    return <div> Loading ... </div>;

}

export default Authenticate;