function Login(props){
    return(
        <form onSubmit={props.tableHandler} >
          <h3>login in Everytime</h3>
          <label>
            id
            <input type="text" required={true} value={props.userid} onChange={props.idHandler}></input>
            pw
            <input type="password" required={true} value={props.userpw} onChange={props.pwHandler}></input>
          </label>
          &nbsp;<input type="submit" value = "Login" ></input>
        </form>

    )
}

export default Login;