import DropdownWrapper from './DropdownWrapper'
import fetch from '../../helpers/fetch'
import useSWR from 'swr'

export default function DropdownAsync({ defaultlLabel,fluid, leftTitle, fetchUrl, onSelect, value, title }) {  
  const { data, error } = useSWR(fetchUrl, fetch, {fallbackData: {data: []}})

  if (error) return <div></div>

  const { data: items } = data

  return (
    <DropdownWrapper defaultlLabel={defaultlLabel} fluid={fluid} leftTitle={leftTitle} onSelect={onSelect} loading={!data} options={items} selected={value} title={title}/>
  )
}