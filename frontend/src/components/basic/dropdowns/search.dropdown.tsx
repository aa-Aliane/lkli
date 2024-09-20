import { TextInput } from '../basic/inputs'

interface ISearchDropdownProps {
    items: string[];
}
const SearchDropdown = () => {
  return (
    <div className='dropdown'>
        <TextInput register={null}/>
        <ul className="dropdown__items"></ul>
    </div>
  )
}

export default SearchDropdown