

const ImageBox = ({imageUrl, altText, size}) => {

    return (
      <div className='mb-6'>
        <img
          src={imageUrl}
          alt={altText}
          className='object-contain w-full bg-gray-200 rounded'
        />
      </div>
    );
}

export default ImageBox;
