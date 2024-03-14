import axios from "axios";
import { useAppDispatch, useAppSelector } from "../Context/hooks";
import { actions as snippetAction } from "../Context/snippetReducer";
import { actions as miscAction } from "../Context/miscReducer";
import Cookie from "universal-cookie";
import Snippet from "@/types/Snippet";

export function useUtils() {
  const dispatch = useAppDispatch();
  const token = new Cookie().get("csrftoken");
  const data: Snippet = {
    pk: useAppSelector((state) => state.editReducer.pk),
    title: useAppSelector((state) => state.editReducer.title),
    language: useAppSelector((state) => state.editReducer.language),
    description: useAppSelector((state) => state.editReducer.description),
    code: useAppSelector((state) => state.editReducer.code),
    prefix: useAppSelector((state) => state.editReducer.prefix),
    created_date: useAppSelector((state) => state.editReducer.created_date), 
  };

  const addSnippet = async () => {
    axios
      .post("/onii-store/save", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(miscAction.setMode("read"));
          dispatch(snippetAction.addSnippet(res.data));
        }
      });
  };

  const editSnippet = async () => {
    axios
      .post("/onii-store/edit", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(miscAction.setMode("read"));
          dispatch(snippetAction.updateSnippet(data));
        }
      });
  }

  return {addSnippet, editSnippet}
}
