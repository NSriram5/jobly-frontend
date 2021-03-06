import { useState } from "react";
import JoblyApi from "./api";

function useJoblyAPI(inputToken = "") {
    const [token, setToken] = useState(inputToken);
    const [JoblyAPI, setJoblyApi] = useState(new JoblyApi);



}