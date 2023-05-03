import { useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import classes from "./Payment.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Spinner from "../../Common/Spinner/Spinner";

export default function Payment() {
  const { id } = useParams();
  const [getUser, setGetUser] = useState();
  const [loading, setLoading] = useState(false);
  const [payResult, setPayResult] = useState(false);
  useEffect(() => {
    setGetUser(JSON.parse(localStorage.getItem("auth-user")));
  }, []);

  let navigate = useNavigate();
  const pay = async () => {
    setLoading(true);
    await axios.get(`/users/${getUser.id}`).then((res) => {
      const obj = {
        dashboard: {
          ...res.data.dashboard,
          orders: [...res.data.dashboard.orders, ...res.data.dashboard.cart],
          cart: [],
        },
      };
      axios.patch(`/users/${getUser.id}`, obj).then((res) => {
        localStorage.setItem("auth-user", JSON.stringify(res.data));
        setTimeout(() => {
          setLoading(false);
          setPayResult(true);
          setTimeout(() => {
            navigate("/profile/orders");
          }, 2000);
        }, 3000);
      });
    });
  };
  return (
    <Container>
      <div className={classes.container}>
        <h1 className={classes.title}>Payment gateway</h1>
        <p className={classes.paragraph}>
          Here is the payment gateway page. Complete your operation by clicking
          the payment button.
        </p>
        <button
          className={classes.btn}
          style={{
            background: `${
              loading
                ? "none"
                : payResult
                ? " var(--color-third)"
                : " var(--color-primary)"
            }`,
            pointerEvents: `${loading ? "none" : "initial"}`,
          }}
          onClick={() => pay()}
        >
          {loading ? (
            <Spinner size={"20px"} borderSize={"3px"} />
          ) : payResult ? (
            "Successfully"
          ) : (
            "Pay"
          )}
        </button>
      </div>
      <div className={classes.background}></div>
    </Container>
  );
}
