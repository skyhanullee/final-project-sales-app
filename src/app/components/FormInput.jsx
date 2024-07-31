export default function FormInput({ type, name, value, setValue }) {
  return (
    <>
      <label>{name}</label>
      <input
        type={type}
        value={value}
        required
        placeholder="Enter $"
        className="shadow appearance-none 
              bg-gray-200
              border  
              rounded w-full py-2 px-3 
              my-2
              text-gray-800 leading-tight focus:outline-none 
              focus:shadow-outline 
              border-gray-900"
        onChange={(e) => setValue(e.target.value)}
      >
      </input>
    </>
  )
}
