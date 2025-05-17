

const ImageBox = ({imageUrl, altText, onError}) => {

    return (
      <div className='mb-6'>
        <img
          src={imageUrl}
          alt={altText}
          className='object-contain w-full bg-gray-200 rounded'
          onError={onError}
        />
      </div>
    );
}

export default ImageBox;
