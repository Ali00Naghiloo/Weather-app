import "./.css";
import { Link } from "react-router-dom"
import { Button } from "antd";
import "antd/dist/antd.css"; 

const Login = () => {
    return ( 
        <form className="body1" action="">
            <input required className="user-name" type="text" />
            {/* <Button className="signin" type="primary"><Link to="/home">Home</Link></Button> */}
            <input type="submit" value="Sign in" />
        </form>
     );
}
 
export default Login;