import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { saveToken, setToken } from './AuthSlice';

function Authenticate() {
    const { token } = useParams();
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(() => {
        saveToken(token)
        dispatch(setToken(token))
        console.log('user from mobile or web authenticated');
        console.log('navigating to dashboard...');
        navigate('/dashboard')
    }, []);

}

export default Authenticate;