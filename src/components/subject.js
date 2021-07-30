function Subject(props){
    return(
        <div className="subject" key={props.subject.id}>
              <h3><label>{props.subject.name}, {props.subject.professor}</label>
              
              </h3>

              
            </div>
    )
}
export default Subject;