import axios from "axios";

const validation = (
  input,
  state,
  setState,
  setStep,
  handleSubmit,
  setSpinner,
  setMessage
) => {
  switch (input) {
    case "email":
      emailValidation(state, setState, setStep, setSpinner, setMessage);
      break;
    case "password":
      passwordValidation(state, setState, setStep);
      break;
    case "name":
      nameValidation(state, setState, handleSubmit);
      break;
    default:
      break;
  }
};
// Email validation function
function emailValidation(state, setState, setStep, setSpinner, setMessage) {
  const valid = String(state.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!valid) {
    if (state.email === "") {
      setState({ ...state, error: true, errorText: "Email is required." });
      return;
    }
    setState({
      ...state,
      error: true,
      errorText: "Sorry, your email doesn't right.",
    });
    return;
  }
       setState({ ...state, error: false, errorText: "" });
       setStep({ step1: false, step2: true });
}
// Password validation function
function passwordValidation(state, setState, setStep) {
  const valid = String(state.password).match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
  );
  if (!valid) {
    if (state.password.length < 8 || state.password.length > 20) {
      setState({
        ...state,
        error: true,
        errorText: "Password must be between 8 and 20 characters.",
      });
      return;
    } else if (state.password.search(/[a-z]/) < 0) {
      setState({
        ...state,
        error: true,
        errorText: "Password must contain at least one lowercase letter.",
      });
      return;
    } else if (state.password.search(/[A-Z]/) < 0) {
      setState({
        ...state,
        error: true,
        errorText: "Password must contain at least one uppercase letter.",
      });
      return;
    } else if (state.password.search(/[0-9]/) < 0) {
      setState({
        ...state,
        error: true,
        errorText: "Password must contain at least one number.",
      });
      return;
    } else {
      setState({
        ...state,
        error: true,
        errorText: "Sorry, your password doesn't right.",
      });
      return;
    }
  }
  setState({ ...state, error: false, errorText: "" });
  setStep({ step1: false, step2: false, step3: true });
}
// Name validation function
function nameValidation(state, setState, handleSubmit) {
  const valid = String(state.name).match(/^[a-zA-Z]+ [a-zA-Z]+$/);
  if (!valid) {
    if (state.name === "") {
      setState({
        ...state,
        error: true,
        errorText: "Name is required.",
      });
      return;
    }
    setState({
      ...state,
      error: true,
      errorText: "Please enter your full name (first & last name).",
    });
    return;
  }
  setState({ ...state, error: false, errorText: "" });
  handleSubmit();
}
export default validation;
