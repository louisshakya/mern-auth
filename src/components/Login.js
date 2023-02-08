import React, { useEffect, useState } from "react";
import axios from "../Services/axiosInterceptor";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState();
  const [isToggled, setIsToggled] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/users/login", input);
      if (response.status === 200) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        navigate("/");
      }
    } catch (error) {
      if (error?.message && error?.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    handleShowUsers();
  }, []);

  const handleShowUsers = async () => {
    try {
      const response = await axios.get("/api/auth/users/list");
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (error) {
      if (error?.message && error?.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleLogin}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: " #ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Logo</span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id=""
                          placeholder="Enter Email"
                          className="form-control form-control-lg"
                          name="email"
                          value={input.email}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          placeholder="Enter Password"
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          name="password"
                          value={input.password}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#393f81" }}>
                          Register Here
                        </Link>
                      </p>
                    </form>
                    <button
                      onClick={handleClick}
                      className="btn btn-dark btn-lg btn-block mb-3"
                    >
                      Show all users
                    </button>
                    {isToggled
                      ? users.map((user, index) => (
                          <p key={index}>name : {user.name}</p>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
