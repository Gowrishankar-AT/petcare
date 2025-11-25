// pages/index.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const isLoggedIn = !!localStorage.getItem("token"); 
    // or however you store authentication info

    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };
  return (
  
      <div>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600">PetCare Clinic</div>
          <nav className="space-x-6">
            <a href="#home" className="hover:text-green-500">Home</a>
            <a href="#about" className="hover:text-green-500">About Us</a>
            <a href="#clinic" className="hover:text-green-500">Our Clinic</a>
            <a href="#services" className="hover:text-green-500">Grooming</a>
            <a href="#services" className="hover:text-green-500">Medical Care</a>
            <a href="#services" className="hover:text-green-500">Food & Accessories</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
  id="home"
  className="bg-[url('https://i.pinimg.com/1200x/88/e6/6f/88e66f1ec7c0b6982757ff5959b0d7d1.jpg')] bg-cover bg-center py-16 flex flex-col items-center text-center"
>
  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Welcome toShnaker Clinic</h1>
  <p className="text-white max-w-2xl mb-6">
    Your trusted partner for your furry friends. Compassionate care, modern facilities, and personalized attention.
  </p>
  <Button onClick={handleClick} >Book an Appointment</Button>
</section>


      {/* Why Customers Love Us */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Customers Love Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow text-center">
              <img
                src="https://media.istockphoto.com/id/1198398874/photo/dog-groomer-cares-for-brown-toy-poodle-dog-in-a-specialized-salon-female-professional-holding.webp?a=1&b=1&s=612x612&w=0&k=20&c=6WGFmtgGiZ9yhUWzzSWD-hzAfXQVtvO6mODZo_LxuVM="
                alt="Caring Staff"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">Caring Staff</h3>
              <p className="text-gray-600">
                Our trained staff ensures your pets receive love and attention during every visit.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow text-center">
              <img
                src="https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=60"
                alt="Modern Clinic"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">Modern Clinic</h3>
              <p className="text-gray-600">
                Equipped with advanced facilities for diagnostics, surgery, and care.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow text-center">
              <img
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=60"
                alt="Trusted Services"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">Trusted Services</h3>
              <p className="text-gray-600">
                We prioritize your pet's well-being and provide reliable medical and grooming services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section id="services" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
           {[
  { name: "Vet Consult", image: "https://plus.unsplash.com/premium_photo-1663133414738-d8e2c14e05ad?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Vaccination", image: "https://images.unsplash.com/photo-1608326389417-d3f9cc46de04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBldCUyMHZhY2luYXRpb258ZW58MHx8MHx8fDA%3D" },
  { name: "In-house Diagnose", image: "https://images.unsplash.com/photo-1596383924639-fe5d552cc862?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Surgery", image: "https://plus.unsplash.com/premium_photo-1663013500255-775d9d949ad5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Grooming", image: "https://images.unsplash.com/photo-1528846104175-4fd300ee59da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwZ3Jvb21pbmd8ZW58MHx8MHx8fDA%3D" },
  { name: "Physio", image: "https://media.istockphoto.com/id/1246556001/photo/dog-massage-therapy.webp?a=1&b=1&s=612x612&w=0&k=20&c=fAxPcODzbAvBP9zWPVB87KRxY001kZoOs3-1IkBte2Q=" },
  { name: "Supplies", image: "https://plus.unsplash.com/premium_photo-1661389541526-e791e83bd3f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGV0JTIwc3VwcGxpZXN8ZW58MHx8MHx8fDA%3D" },
  { name: "Intensive Care", image: "https://media.istockphoto.com/id/171374892/photo/cute-dog-sleeping-xlarge.webp?a=1&b=1&s=612x612&w=0&k=20&c=WgYBFbFGY7WZXCvmN6UFZk9bm4GUrfgIrrFssqyaLR4=" },
].map((service) => (
  <div key={service.name} className="bg-white rounded-lg shadow p-6">
    <img
      src={service.image}
      alt={service.name}
      className="w-full h-36 object-cover rounded mb-4"
    />
    <h3 className="font-semibold text-lg">{service.name}</h3>
  </div>
))}
          </div>
        </div>
      </section>

      {/* Infrastructure / Clinic Images */}
      <section id="clinic" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Infrastructure</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "https://plus.unsplash.com/premium_photo-1661962620229-614e281fe009?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGV0JTIwY2xpbmljfGVufDB8fDB8fHww",
              "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGV0JTIwY2xpbmljfGVufDB8fDB8fHww",
              "https://plus.unsplash.com/premium_photo-1661962453590-5653f2283a5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBldCUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D",
            ].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Clinic ${idx + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p>123 PetCare St, Pet City, PC 45678</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p>Email: info@petcareclinic.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-400">Facebook</a>
              <a href="#" className="hover:text-green-400">Instagram</a>
              <a href="#" className="hover:text-green-400">Twitter</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-400">
          &copy; 2025 PetCare Clinic. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
