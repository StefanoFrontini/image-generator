import Select from "react-select";
const SelectInput = ({ property, setState, options, label }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <Select
        options={options}
        // defaultValue={options[0]}
        onChange={(e) =>
          setState((state) => {
            return {
              ...state,
              [property]: e.value,
            };
          })
        }
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
      {/* <select */}
      {/*   defaultValue={data ? data[0] : ""} */}
      {/*   id={data.label} */}
      {/*   name={data.label} */}
      {/* > */}
      {/*   {data.options.map((el, index) => { */}
      {/*     return <option key={index}>{el}</option>; */}
      {/*   })} */}
      {/* </select> */}
    </div>
  );
};
export default SelectInput;
