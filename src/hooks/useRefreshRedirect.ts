import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../ContextStore";

export default function useRefreshRedirect() {
  const { selectedNav } = useStore()
  const navigate  = useNavigate();

  useEffect(() => {
    if (selectedNav === 'options') {
      navigate('/')
    }
  });
}