import styles from "./authPage.module.css"
import {isFetchBaseQueryError, useAuthMutation, useCreateUserMutation, useGetUserDataQuery} from "../store/api.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    const [auth,authStatus] = useAuthMutation();
    const [create,createStatus] = useCreateUserMutation();
    const {isSuccess} = useGetUserDataQuery()
    const [formData,setFormData] = useState<{login:string,pass:string}>({login:"",pass:""})
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess)
        {
            navigate("/")
        }
    },[isSuccess])

    return(
        <div className={styles.container}>
            <div className={styles.form}>
                <input type={"text"} id={"login"} placeholder={"Логин"} onChange={(element) => setFormData({...formData,login:element.target.value})}/>
                <input type={"password"} id={"password"} placeholder={"Пароль"} onChange={(element) => setFormData({...formData,pass:element.target.value})}/>
                <button onClick={() => auth({login:formData.login,password:formData.pass})}>Войти</button>
                <button onClick={() => create({login:formData.login,password:formData.pass})}>Зарегистрироваться</button>
                {
                    authStatus.isError && isFetchBaseQueryError(authStatus.error) &&
                    <span>{(authStatus.error.data as {message:string}).message.toString()}</span>}
                {
                    createStatus.isError && isFetchBaseQueryError(createStatus.error) &&
                    <span>{(createStatus.error.data as {message:string}).message.toString()}</span>}
            </div>
        </div>
    )
}

export default AuthPage;