import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { saveToken, setToken } from './AuthSlice';

function Authenticate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useParams();
    saveToken(token);
    dispatch(setToken(token)).then(() => navigate('/dashboard'));

    return <div> Loading ... </div>;

}

export default Authenticate;