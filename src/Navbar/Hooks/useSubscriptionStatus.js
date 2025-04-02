import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {setSubscriptionStatus} from "../../Store/Slices/SubscriptionSlice"

const useSubscriptionStatus = (apiUrl) => {
  const dispatch = useDispatch();
  const [isSubscribed, setIsSubscribed] = useState(
    JSON.parse(localStorage.getItem("isSubscribed")) || false
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const CookieToken = Cookies.get("jwtToken");
    if (!CookieToken) {
      setIsLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const response = await fetch(`${apiUrl}/userPayment/usertoken`, {
          method: "GET",
          headers: { Authorization: `Bearer ${CookieToken}` },
        });

        const data = await response.json();
        const subscribed = data.length > 0;

        setIsSubscribed(subscribed);
        localStorage.setItem("isSubscribed", JSON.stringify(subscribed));
        dispatch(setSubscriptionStatus(subscribed));
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [dispatch, apiUrl]);

  return { isSubscribed, isLoading };
};

export default useSubscriptionStatus;
