import classes from "./Signup.module.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../../Common/MessageBox/MessageBox";
import BackToHomeBtn from "../../Common/BackToHomeBtn/BackToHomeBtn";
import Spinner from "../../Common/Spinner/Spinner";
import validation from "./validation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { v4 as uuidv4 } from "uuid";
export default function SignUp() {
  const navigate = useNavigate();
  // After the end of the operation, it reports the result.
  // If "message" is set to "true", the "Message component" will be displayed.
  const [message, setMessage] = useState({
    show: false,
    error: false,
    messageTitle: "",
    messageSubTitle: "",
  });

  // If "backToHomeBtn" was "true", the "backToHomeBtn" button will be displayed.
  const [backToHomeBtnSate, setBackToHomeBtnSate] = useState(true);
  // After clicking on the "Next" button, the next step will be displayed.
  const [showStep, setShowStep] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  // If it is "true", "Spinner" will be activated.
  const [spinner, setSpinner] = useState(false);
  // If it is "true", text of password will be displayed.
  const [showPassword, setShowPassword] = useState(false);
  // Email state
  const [email, setEmail] = useState({
    email: "",
    error: false,
    errorText: "",
  });
  // Password state
  const [password, setPassword] = useState({
    password: "",
    error: false,
    errorText: "",
  });
  // Name state
  const [name, setName] = useState({
    name: "",
    error: false,
    errorText: "",
  });

  // When the "Inputs" are entered correctly and the "Submit" button is pressed, "handleSubmit()" will run.
  // This function is a "async" function.
  const handleSubmit = async () => {
    setBackToHomeBtnSate(false);
    // First, all elements inside the form fail.
    document.getElementById("signUpSubmitBtn").disabled = true;
    document.getElementById("signUpForm").style.pointerEvents = "none";
    // Spinner => true
    setSpinner(true);
    // All user information is placed in "data" to be sent to the server.
    const data = {
      id: uuidv4(),
      email: email.email,
      password: password.password,
      name: name.name,
      dashboard: {
        cart: [],
        information: {
          fName: "",
          lName: "",
          email: email.email,
          phone: "",
          gender: "",
          state: "",
          city: "",
          zipCode: "",
          address: "",
        },
        orders: [],
        favorites: [],
        comments: [],
        tickets: [],
        reviews: [],
        returns: [],
        buy: [],
        totalPurchases: 0,
        totalDiscounts: 0,
        numberOfGoodsSold: 0,
        salesAmount: 0,
        offers: 0,
      },
    };
    // Post "data"
    await axios
      .post(`/users`, data)
      .then((res) => {
        console.log(res);
        // Spinner => false
        setSpinner(false);
        setMessage({
          ...message,
          show: true,
          messageTitle: "Welcome to our store.",
          messageSubTitle: "Please wait while we redirect you...",
        });
        localStorage.setItem("auth-user", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((err) => {
        setSpinner(false);
        setMessage({
          ...message,
          show: true,
          error: true,
          messageTitle: "Sorry, an error has occurred.",
          messageSubTitle: "Please try again.",
        });
      });
  };
  // JSX
  return (
    <>
      <BackToHomeBtn backToHome={backToHomeBtnSate} />
      <div className={classes.container}>
        <div className={`${classes.card} ${spinner ? classes.disabled : ""}`}>
          {!message.show ? (
            <>
              <figure className={classes.logo}>
                <LazyLoadImage
                  effect="blur"
                  src="/assets/svg/light-logo.svg"
                  alt="logo"
                />
              </figure>
              <form className={classes.form} spellCheck={false} id="signUpForm">
                <div
                  className={`${classes.bodyWrapper}
                ${showStep.step1 ? classes.step1 : ""}
                ${showStep.step2 ? classes.step2 : ""}
                ${showStep.step3 ? classes.step3 : ""}`}
                >
                  <section
                    className={`${classes.body}
                  ${showStep.step1 ? null : classes.hide}`}
                  >
                    <h1>Create account</h1>
                    <fieldset className={classes.inputWrapper}>
                      <input
                        autoFocus
                        className={`${classes.input} ${
                          email.error ? classes.error : null
                        }`}
                        type="text"
                        placeholder="someone@example.com"
                        onChange={(e) => {
                          setEmail({
                            ...email,
                            email: e.target.value,
                          });
                        }}
                      />
                      {email.error && (
                        <p className={classes.textError}>{email.errorText}</p>
                      )}
                      <div className={classes.context}>
                        <p className={classes.dispatch}>
                          {" "}
                          Do you have an account?
                        </p>
                        <Link to={"/login"}>Login</Link>
                      </div>
                    </fieldset>
                    <div className={classes.btnGroup}>
                      <button
                        id="emailBtn"
                        className={classes.button}
                        onClick={(e) => {
                          e.preventDefault();
                          validation(
                            "email",
                            email,
                            setEmail,
                            setShowStep,
                            handleSubmit,
                            setSpinner,
                            setMessage
                          );
                        }}
                      >
                        {spinner ? (
                          <Spinner size={"20px"} borderSize={"2px"} />
                        ) : (
                          "Next"
                        )}
                      </button>
                    </div>
                  </section>
                  <section
                    className={`   ${classes.body}
                  ${showStep.step2 ? null : classes.hide}`}
                  >
                    <h1>Enter password</h1>
                    <fieldset className={classes.inputWrapper}>
                      <div className={classes.passwordWrapper}>
                        <input
                          id="passwordInput"
                          className={`${classes.input} ${
                            password.error ? classes.error : null
                          }`}
                          type={showPassword ? "text" : "password"}
                          placeholder="e.g. d5y2a9R4"
                          onChange={(e) => {
                            setPassword({
                              ...password,
                              password: e.target.value,
                            });
                          }}
                        />
                        <div
                          className={classes.iconWrapper}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? (
                            <i className="fa-regular fa-eye-slash"></i>
                          ) : (
                            <i className="fa-regular fa-eye"></i>
                          )}
                        </div>
                      </div>
                      {password.error && (
                        <p className={classes.textError}>
                          {password.errorText}
                        </p>
                      )}
                    </fieldset>
                    <div className={`${classes.btnGroup} ${classes.flex}`}>
                      <div
                        className={classes.backBtn}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowStep({
                            step1: true,
                            step2: false,
                            step3: false,
                          });
                        }}
                      >
                        <i className="fa-regular fa-chevron-left"></i>
                      </div>
                      <button
                        id="passwordBtn"
                        className={classes.button}
                        onClick={(e) => {
                          e.preventDefault();
                          validation(
                            "password",
                            password,
                            setPassword,
                            setShowStep,
                            handleSubmit,
                            setSpinner
                          );
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </section>
                  <section
                    className={`   ${classes.body}
                  ${showStep.step3 ? null : classes.hide}`}
                  >
                    <h1>What’s your name ?</h1>
                    <fieldset className={classes.inputWrapper}>
                      <input
                        id="nameInput"
                        className={`${classes.input} ${
                          name.error ? classes.error : null
                        }`}
                        type="text"
                        placeholder="e.g. John Doe"
                        onChange={(e) => {
                          setName({
                            ...name,
                            name: e.target.value.toLowerCase(),
                          });
                        }}
                      />
                      {name.error && (
                        <p className={classes.textError}>{name.errorText}</p>
                      )}
                    </fieldset>
                    <div className={`${classes.btnGroup} ${classes.flex}`}>
                      <div
                        className={classes.backBtn}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowStep({
                            step1: false,
                            step2: true,
                            step3: false,
                          });
                        }}
                      >
                        <i className="fa-regular fa-chevron-left"></i>
                      </div>
                      <button
                        id="signUpSubmitBtn"
                        type="submit"
                        className={classes.button}
                        onClick={(e) => {
                          e.preventDefault();
                          validation(
                            "name",
                            name,
                            setName,
                            setShowStep,
                            handleSubmit,
                            setSpinner
                          );
                        }}
                      >
                        {spinner ? (
                          <Spinner size={"20px"} borderSize={"2px"} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </section>
                </div>
              </form>
            </>
          ) : (
            <div className={classes.message}>
              <MessageBox
                error={message.error}
                messageTitle={message.messageTitle}
                messageSubTitle={message.messageSubTitle}
              />
              {message.error ? (
                <div
                  style={{
                    color: "var(--color-primary)",
                    width: " 100%",
                    marginTop: "5rem",
                  }}
                >
                  <Link to={"/"}>Back to Home</Link>
                </div>
              ) : (
                <div className={classes.loading}>
                  <Spinner size={"35px"} borderSize={"4px"} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
