import img from "../assets/logo.jpg"

const Logo = ({width = "50px"}) => {
    return (
        <img src={img} alt="Logo placeholder" style={{width, borderRadius: "40%"}}/>
    );
}
 
export default Logo;