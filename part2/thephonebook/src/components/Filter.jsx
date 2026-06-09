const Filter = (props) => {
    const { filter, filterHandler } = props
    
    return <div>
        Filter shown with <input 
            onChange={filterHandler}
            value={filter}
        />
    </div>
}

export default Filter