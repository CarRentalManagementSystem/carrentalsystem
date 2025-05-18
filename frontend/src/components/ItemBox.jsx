const ItemBox = ({children}) => {
    return (
        <div className='p-6 mb-6 bg-[#f9f9f9] rounded'>
          <div className='grid grid-cols-3 gap-6'>
            {children}
          </div>
        </div>
    )
}

export default ItemBox;