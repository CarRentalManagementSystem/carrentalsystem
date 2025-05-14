
import { Check } from "lucide-react";

const AboutUs = () => {

    return (
        <div>
            {/* Main Features */}
            <section className="container grid gap-8 px-4 py-12 mx-auto md:grid-cols-3">
                <div className="md:col-span-1">
                <h2 className="text-3xl font-bold leading-tight">Where every drive feels extraordinary</h2>
                </div>

                <div className="md:col-span-1">
                <h3 className="mb-4 text-xl font-bold">Variety Brands</h3>
                <p className="mb-8 text-gray-600">
                    Platea non auctor fermentum sollicitudin. Eget adipiscing sapien sit quam natoque ornare cursus viverra
                    odio.
                </p>

                <h3 className="mb-4 text-xl font-bold">Maximum Freedom</h3>
                <p className="text-gray-600">
                    Diam quam gravida ultricies velit duis consequat integer. Est aliquet posuere vel rhoncus massa volutpat in.
                </p>
                </div>

                <div className="md:col-span-1">
                <h3 className="mb-4 text-xl font-bold">Awesome Suport</h3>
                <p className="mb-8 text-gray-600">
                    Eget adipiscing sapien sit quam natoque ornare cursus viverra odio. Diam quam gravida ultricies velit.
                </p>

                <h3 className="mb-4 text-xl font-bold">Flexibility On The Go</h3>
                <p className="text-gray-600">
                    Vitae pretium nulla sed quam id nisl semper. Vel non in proin egestas dis faucibus rhoncus. Iacus dignissim
                    aenean pellentesque nisl.
                </p>
                </div>
            </section>

            {/* Stats */}
            <section className="container grid gap-8 px-4 py-16 mx-auto text-center md:grid-cols-3">
                <div>
                <h2 className="text-5xl font-bold text-[#5937e0] mb-2">20k+</h2>
                <p className="text-gray-700">Happy customers</p>
                </div>
                <div>
                <h2 className="text-5xl font-bold text-[#5937e0] mb-2">540+</h2>
                <p className="text-gray-700">Count of cars</p>
                </div>
                <div>
                <h2 className="text-5xl font-bold text-[#5937e0] mb-2">25+</h2>
                <p className="text-gray-700">Years of experince</p>
                </div>
            </section>

            {/* Memories Section */}
            <section className="container grid gap-12 px-4 py-16 mx-auto md:grid-cols-2">
                <div>
                <h2 className="mb-6 text-3xl font-bold">Unlock unforgettable memories on the road</h2>
                <p className="mb-8 text-gray-600">
                    Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc
                    interdum gravida ullamcorper.
                </p>

                <div className="grid gap-6">
                    <div className="flex gap-3">
                    <div className="bg-[#5937e0] rounded-full p-1 h-6 w-6 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Velit semper morbi. Purus non eu cursus porttitor tristique et gravida.</p>
                    </div>

                    <div className="flex gap-3">
                    <div className="bg-[#5937e0] rounded-full p-1 h-6 w-6 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum.</p>
                    </div>

                    <div className="flex gap-3">
                    <div className="bg-[#5937e0] rounded-full p-1 h-6 w-6 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor.</p>
                    </div>

                    <div className="flex gap-3">
                    <div className="bg-[#5937e0] rounded-full p-1 h-6 w-6 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Quis nunc interdum gravida ullamcorper.</p>
                    </div>
                </div>
                </div>

                <div className="relative h-[300px] md:h-auto rounded-lg overflow-hidden">
                <img
                    src="https://via.placeholder.com/500x400"
                    alt="Car rental experience"
                    className="object-cover w-full h-full rounded-lg"
                />
                </div>
            </section>

            {/* Reviews */}
            <section className="container px-4 py-16 mx-auto">
                <h2 className="mb-12 text-3xl font-bold text-center">Reviews from our customers</h2>

                <div className="grid gap-6 md:grid-cols-3">
                <div className="p-8 rounded-lg bg-gray-50">
                    <div className="text-[#5937e0] text-4xl font-serif mb-4">"</div>
                    <p className="mb-8 text-gray-700">
                    Et aliquet netus at sapien pellentesque mollis nec dignissim maccenas. Amet erat volutpat quisque odio
                    purus feugiat. In gravida neque.
                    </p>
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
                        <img src="https://via.placeholder.com/40" alt="Customer" className="object-cover w-full h-full" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Rental LLC</p>
                        <p className="font-medium">Emanuel Boyle</p>
                    </div>
                    </div>
                </div>

                <div className="p-8 rounded-lg bg-gray-50">
                    <div className="text-[#5937e0] text-4xl font-serif mb-4">"</div>
                    <p className="mb-8 text-gray-700">
                    Purus consectetur varius quis urna phaselius enim mattis. Sem tincidunt tortor nunc egestas amet
                    adipiscing ligula.
                    </p>
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
                        <img src="https://via.placeholder.com/40" alt="Customer" className="object-cover w-full h-full" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Rental - Org</p>
                        <p className="font-medium">River Graves</p>
                    </div>
                    </div>
                </div>

                <div className="p-8 rounded-lg bg-gray-50">
                    <div className="text-[#5937e0] text-4xl font-serif mb-4">"</div>
                    <p className="mb-8 text-gray-700">
                    Quam neque odio urna euismod felis. Sit egestas magna in quisque famesadpibus quis sapien magna. Nisl non
                    eget sit pellentesque tristique et.
                    </p>
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
                        <img src="https://via.placeholder.com/40" alt="Customer" className="object-cover w-full h-full" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Rent LLC</p>
                        <p className="font-medium">Ryder Malone</p>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#5937e0] py-12 px-4 mt-12 relative overflow-hidden">
                <div className="container grid items-center gap-8 mx-auto md:grid-cols-2">
                <div className="text-white">
                    <h2 className="mb-4 text-3xl font-bold">Looking for a car?</h2>
                    <p className="mb-4 text-2xl font-bold">+537 547-6401</p>
                    <p className="mb-8 text-white/80">
                    Amet cras hac orci lacus. Faucibus ipsum arcu lectus odio sapien bibendum ullamcorper in...
                    </p>
                    <button className="bg-[#ff9e0c] text-white px-6 py-2 rounded-md font-medium">Book now</button>
                </div>
                <div className="relative h-[200px] md:h-[250px]">
                    <img src="https://via.placeholder.com/400x250" alt="Car" className="object-contain w-full h-full" />
                </div>
                </div>
            </section>
        </div>
  )
}

export default AboutUs;