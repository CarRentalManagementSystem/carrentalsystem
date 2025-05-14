
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

const handleSubmit = async (e) => {

navigate('/report');

}


  // if(user){
    return (
      <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
        <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Live Chat</h1>
        <form  className="space-y-5"><button type="submit" className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
            Start
          </button>
          </form>
        <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Report Issue</h1>
        <form onSubmit={handleSubmit} className="space-y-5"><button type="submit" className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
            Report
          </button>
          </form>
      </div>
    );
  // } else {
  //    return (
  //   <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
  //       <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Live Chat</h1>
  //       <form  className="space-y-5"><button type="submit" className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
  //           Start
  //         </button>
  //         </form>
  //   </div>
  //   )
  // }


};

export default Contact;
