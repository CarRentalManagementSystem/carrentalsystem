import { Car, Facebook, Instagram, LocateIcon, Phone, Send, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {

  const vehicleGroups =[
      { id: '1', name: 'Sedan' },
      { id: '2', name: 'Compact' },
      { id: '3', name: 'SUV' },
      { id: '4', name: 'Convertible' },
      { id: '5', name: 'Hatchback' },
      { id: '6', name: 'Van' },
      { id: '7', name: 'Truck' },
      { id: '8', name: 'Wagon' },
      { id: '9', name: 'Luxury' },
      { id: '10', name: 'Sports' },
    ];

  return (
    <footer className='py-8 bg-white border-t border-gray-100'>
      <div className='container px-6 mx-auto'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='p-2 rounded-full bg-primary'>
                <Car className='w-4 h-4 text-white' />
              </div>
              <span className='font-medium'>Best Car Rental</span>
            </div>

            <p className='mb-4 text-sm text-gray-600'>
              Discover a seamless way to rent your perfect car. Reliable, fast,
              and ready when you are.
            </p>

            <div className='flex gap-3'>
              <SocialIcon icon='facebook' />
              <SocialIcon icon='twitter' />
              <SocialIcon icon='instagram' />
              <SocialIcon icon='linkedin' />
            </div>
          </div>

          <div className='md:ml-8'>
            <ContactInfo
              icon='location'
              title='Address'
              content='Brisbane CBD, Brisbane, QLD 4000'
            />
          </div>

          <div>
            <ContactInfo
              icon='email'
              title='Email'
              content='alexyoo@email.com'
            />
          </div>

          <div>
            <ContactInfo icon='phone' title='Phone' content='+617 547-6401' />
          </div>
        </div>

        <div className='grid gap-8 mt-12 md:grid-cols-3'>
          <div>
            <h3 className='mb-4 font-medium'>Useful links</h3>
            <ul className='grid gap-2'>
              <FooterLink text='Home' to='/' />
              <FooterLink text='About us' to='/about' />
              <FooterLink text='Contact us' to='/contact' />
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-medium'>Vehicles</h3>
            <ul className='grid grid-cols-4 gap-2'>
             { vehicleGroups.map(group => (
              <FooterLink text={group.name} id={group.id} to='/vehicles'/>
             ))}
            </ul>
          </div>
        </div>

        <div className='pt-6 mt-12 text-sm text-center text-gray-500 border-t border-gray-100'>
          © Copyright Best Car Rental. 2025.
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ icon }) => {
  return (
    <Link
      to='#'
      className='p-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200'
    >
      {icon === 'facebook' ? (
        <Facebook className="w-4 h-4"/>
      ) : icon === 'twitter' ? (
        <Twitter className="w-4 h-4" />
      ) : icon === 'instagram' ? (
        <Instagram className="w-4 h-4"/>
      ) : (
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z'
            stroke='#464255'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6 9H2V21H6V9Z'
            stroke='#464255'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z'
            stroke='#464255'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </Link>
  );
}

const ContactInfo = ({ icon, title, content }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-4'>
        <div className='p-2 text-black bg-orange-400 rounded-full'>
          {icon === 'location' ? (
            <LocateIcon className='w-4 h-4' />
          ) : icon === 'email' ? (
            <Send className='w-4 h-4' />
          ) : (
            <Phone className='w-4 h-4' />
          )}
        </div>
        <span className='font-medium'>{title}</span>
      </div>
      <p className='text-sm text-gray-600'>{content}</p>
    </div>
  );
}

const FooterLink = ({ text, to, id }) => {

  return (
    <li>
      <Link to={to} className='text-sm text-gray-600 hover:text-primary' state={{selectedGroup: id}}>
        {text}
      </Link>
    </li>
  );
}

export default Footer;
