
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {

    const navigate = useNavigate();

    return (
      <div>
        {/* Main Features */}
        <section className='container grid gap-8 px-4 py-12 mx-auto md:grid-cols-3'>
          <div className='md:col-span-1'>
            <h2 className='text-3xl font-bold leading-tight'>
              Where every drive feels extraordinary
            </h2>
          </div>

          <div className='md:col-span-1'>
            <h3 className='mb-4 text-xl font-bold'>Variety Brands</h3>
            <p className='mb-8 text-gray-600'>
              Choose from a wide selection of trusted car brands — from economy
              to luxury — all maintained to the highest standards for comfort
              and reliability.
            </p>

            <h3 className='mb-4 text-xl font-bold'>Maximum Freedom</h3>
            <p className='text-gray-600'>
              Rent by the day, week, or month with no hidden fees. Enjoy
              complete flexibility to travel your way, whenever and wherever you
              want.
            </p>
          </div>

          <div className='md:col-span-1'>
            <h3 className='mb-4 text-xl font-bold'>Awesome Suport</h3>
            <p className='mb-8 text-gray-600'>
              Our 24/7 support team is here to help you every step of the way,
              from booking to return. Travel with confidence knowing we’ve got
              your back.
            </p>

            <h3 className='mb-4 text-xl font-bold'>Flexibility On The Go</h3>
            <p className='text-gray-600'>
              Whether your plans change or you’re just feeling spontaneous,
              we’ve made it simple.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className='container grid gap-8 px-4 py-16 mx-auto text-center md:grid-cols-3'>
          <div>
            <h2 className='mb-2 text-5xl font-bold text-primary'>2k+</h2>
            <p className='text-gray-700'>Happy customers</p>
          </div>
          <div>
            <h2 className='mb-2 text-5xl font-bold text-primary'>250+</h2>
            <p className='text-gray-700'>Count of cars</p>
          </div>
          <div>
            <h2 className='mb-2 text-5xl font-bold text-primary'>2+</h2>
            <p className='text-gray-700'>Years of experince</p>
          </div>
        </section>

        {/* Memories Section */}
        <section className='container grid gap-12 px-4 py-16 mx-auto md:grid-cols-2'>
          <div>
            <h2 className='mb-6 text-3xl font-bold'>
              Unlock unforgettable memories on the road
            </h2>
            <p className='mb-8 text-gray-600'>
              Whether it's a weekend getaway or a cross-country adventure, we
              provide the perfect vehicle to match your journey. Enjoy the
              freedom of the open road with modern amenities and hassle-free
              rentals.
            </p>

            <div className='grid gap-6'>
              <div className='flex gap-3'>
                <div className='bg-primary rounded-full p-1 h-6 w-6 flex items-center justify-center mt-0.5'>
                  <Check className='w-4 h-4 text-white' />
                </div>
                <p className='text-gray-600'>
                  Drive with peace of mind in top-rated, safety-inspected
                  vehicles.
                </p>
              </div>

              <div className='flex gap-3'>
                <div className='bg-primary rounded-full p-1 h-6 w-6 flex items-center justify-center mt-0.5'>
                  <Check className='w-4 h-4 text-white' />
                </div>
                <p className='text-gray-600'>
                  Enjoy seamless booking, flexible pickup times.
                </p>
              </div>

              <div className='flex gap-3'>
                <div className='bg-primary rounded-full p-1 h-6 w-6 flex items-center justify-center mt-0.5'>
                  <Check className='w-4 h-4 text-white' />
                </div>
                <p className='text-gray-600'>
                  No mileage limits on most cars — go the distance without the
                  extra costs.
                </p>
              </div>

              <div className='flex gap-3'>
                <div className='bg-primary rounded-full p-1 h-6 w-6 flex items-center justify-center mt-0.5'>
                  <Check className='w-4 h-4 text-white' />
                </div>
                <p className='text-gray-600'>
                  Create unforgettable moments with vehicles suited for every
                  type of traveler
                </p>
              </div>
            </div>
          </div>

          <div className='relative h-[300px] md:h-auto rounded overflow-hidden'>
            <img
              src='/images/car-rental-experience.jpg'
              alt='Car rental experience'
              className='object-cover w-full h-full rounded-lg'
            />
          </div>
        </section>

        {/* Reviews */}
        <section className='container px-4 py-16 mx-auto'>
          <h2 className='mb-12 text-3xl font-bold text-center'>
            Reviews from our customers
          </h2>

          <div className='grid gap-6 md:grid-cols-3'>
            <div className='p-8 rounded-lg bg-gray-50'>
              <div className='mb-4 font-serif text-xl text-primary'>"The smoothest process"</div>
              <p className='mb-8 text-gray-700'>
                “Everything about the rental process was smooth and
                straightforward. The car was clean, efficient, and exactly what
                we needed for our trip. Highly recommend!”
              </p>
              <div className='flex items-center gap-3'>
                <div>
                  <p className='text-xs text-gray-500'>Rental LLC</p>
                  <p className='font-medium'>Emanuel Boyle</p>
                </div>
              </div>
            </div>

            <div className='p-8 rounded-lg bg-gray-50'>
              <div className='mb-4 font-serif text-xl text-primary'>"Phenomenal Service"</div>
              <p className='mb-8 text-gray-700'>
                “Customer service was phenomenal! They helped us choose the
                right car for our road trip and even offered great travel tips.
                We'll definitely rent again.”
              </p>
              <div className='flex items-center gap-3'>
                <div>
                  <p className='text-xs text-gray-500'>Rental - Org</p>
                  <p className='font-medium'>River Graves</p>
                </div>
              </div>
            </div>

            <div className='p-8 rounded-lg bg-gray-50'>
              <div className='mb-4 font-serif text-xl text-primary'>"Booking rental cars. Easily done!"</div>
              <p className='mb-8 text-gray-700'>
                “The app made everything so easy. Picked up the car in minutes,
                and drop-off was just as fast. A perfect experience from start
                to finish.”
              </p>
              <div className='flex items-center gap-3'>
                <div>
                  <p className='text-xs text-gray-500'>Rent LLC</p>
                  <p className='font-medium'>Ryder Malone</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='relative px-4 py-12 mt-12 overflow-hidden bg-primary'>
          <div className='container grid items-center gap-8 mx-auto md:grid-cols-2'>
            <div className='text-white'>
              <h2 className='mb-4 text-3xl font-bold'>Looking for a car?</h2>
              <p className='mb-8 text-white/80'>
                Check out our rental cars we have to offer you!
              </p>
              <button className='bg-[#ff9e0c] text-white px-6 py-2 rounded font-medium' onClick={() => navigate('/vehicles')}>
                View our cars
              </button>
            </div>
          </div>
        </section>
      </div>
    );
}

export default AboutUs;