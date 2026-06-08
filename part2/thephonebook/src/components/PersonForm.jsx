const PersonForm = (props) => {
    console.log('PersonForm props', props);
    
    const { 
        onSubmit,
        nameHandler,
        nameState,
        numberHandler,
        numberState
     } = props

    return (
        <form onSubmit={onSubmit}>
            <div>
                Name: <input 
                onChange={nameHandler}
                value={nameState}
                />
            </div>
            <div>
                Number: <input 
                onChange={numberHandler}
                value={numberState}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm