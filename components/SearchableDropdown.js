import React, { useEffect, useState } from 'react';
import api from '../api';
import Select from 'react-select';

function SingleSelect({ defaultValue, onSelect }) {
  const [options,setOptions] = useState([])

  useEffect(() => {
    getOptions()
  },[])

  async function getOptions() {
    const { data } = await api.getTimezones()
    setOptions(data.map(item => ({
      value: item.id,
      label: item.name
    })))
  }

  if (options.length) {
    return (  
      <Select
        onChange={onSelect}
        options={options}
        defaultValue={{label: defaultValue.name}}
        isSearchable={true}
      />
    )
  }
  return null
 
}

export default SingleSelect