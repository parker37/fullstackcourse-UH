const Filter = (props) => {
    console.log('Filter props', props);
    const { filter, filterHandler } = props
    
    return <div>
        Filter shown with <input 
            onChange={filterHandler}
            value={filter}
        />
    </div>
}

export default Filter