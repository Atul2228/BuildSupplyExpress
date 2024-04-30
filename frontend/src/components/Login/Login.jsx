


import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success("Login succesfull");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  return (
    <center>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <form action="#" method="post" onSubmit={handleSubmit}>
          <input
            type="email"
            id="username"
            name="username"
            required
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            style={{ backgroundColor: "white", width: "100%", height: "10%" }}
          />

          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            style={{ backgroundColor: "white", width: "100%", height: "10%" }}
          />

          <div className={styles.bottomContianer}>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <div className={styles.forgotPassword}>
                             <a
                   href=".forgot-password"
                   className="font-medium text-blue-600 hover:text-blue-500"
                 >
                   Forgot your password?
                 </a>
            </div>
          </div>

          <button type="submit" className="bg-info bg-gradient">
            Login
          </button>

          <div className={styles.signUp}>
            <p>Not have an account</p>

            <Link to="/sign-up">Sign Up</Link>
          </div>
        </form>
      </div>
    </center>
  );
}

export default Login;

