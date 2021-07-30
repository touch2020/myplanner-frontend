function Input(props) {
    return (
        <form onSubmit={props.handleSubmit}>
        <label>
        My Plan &nbsp;
        <input type="text" required={true} value={props.input} onChange={props.handleChange}/>
        </label>
        &nbsp;<input type="submit" value="Create"/>
      </form>
    )
}

export default Input;