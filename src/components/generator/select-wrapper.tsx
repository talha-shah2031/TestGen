const SelectWrapper = ({ label, icon: Icon, value, onChange, options }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm bg-white appearance-none"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={!option.enabled}
              className={!option.enabled ? "text-gray-400" : ""}
            >
              {option.label}
            </option>
          ))}
        </select>
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
  
  export default SelectWrapper
  
  