const Persons = (props) => {
    const { shownPersons } = props
    
    return (
        <ul>
            {shownPersons.map((person) => 
                <li key={person.name}>
                    {person.name} {person.number}
                </li>
            )}
        </ul>
    )
}

export default Persons