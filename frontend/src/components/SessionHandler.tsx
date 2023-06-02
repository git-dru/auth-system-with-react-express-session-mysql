import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { getSession } from "../redux/actions/userAction";

const SessionHandler = () => {
  const email = useAppSelector((state: RootState) => state.user.email);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const session = async () => {
      await dispatch(getSession());
      navigate("/home");
    };
    session();
  }, []);

  return null;
};

export default SessionHandler;
