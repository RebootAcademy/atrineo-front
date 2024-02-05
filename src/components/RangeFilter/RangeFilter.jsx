const RangeFilter = ({ onChange }) => {
  const handleChange = (e) => {
    onChange(parseInt(e.target.value, 10))
  }

  return (
    <section className='p-4 z-[9999] relative text-base font-bold bg-blue-300 hidden'>
      <label htmlFor="rangeFilter">Filter by range: </label>
      <input 
        type="range"
        id="rangeFilter"
        name="rangeFilter"
        min={0}
        max={10000000}
        defaultValue={5000000}
        step={100000}
        onChange={handleChange}
      />
    </section>
  )
}

export default RangeFilter