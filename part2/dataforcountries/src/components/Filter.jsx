const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Find Countries: <input onChange={handleFilterChange} value={filter}/>
    </div>
  )
}

export default Filter