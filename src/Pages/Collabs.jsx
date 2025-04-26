import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import MiniCourse from "./MiniCourse";


const collabInitialData = [
  { name: "Brand A", status: "Pending", rate: 5000 },
  { name: "Brand B", status: "Confirmed", rate: 8000 },
  { name: "Brand C", status: "Negotiating", rate: 6000 },
];

const monthlyEarnings = [
  { month: "Jan", earnings: 5000 },
  { month: "Feb", earnings: 7500 },
  { month: "Mar", earnings: 8500 },
  { month: "Apr", earnings: 6500 },
];

export default function Collabs() {
  const [followers, setFollowers] = useState(0);
  const [views, setViews] = useState(0);
  const [niche, setNiche] = useState("lifestyle");
  const [country, setCountry] = useState("India");
  const [videoLength, setVideoLength] = useState(30);
  const [numReels, setNumReels] = useState(1);
  const [pricingType, setPricingType] = useState("normal");
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [influencerName, setInfluencerName] = useState("");
  const [collabName, setCollabName] = useState("");

  const nicheRates = {
    India: {
      lifestyle: 0.03,
      fitness: 0.04,
      fashion: 0.035,
      tech: 0.045,
      travel: 0.04,
      education: 0.025,
    },
  };

  const bonusRates = {
    normal: 1,
    ugc: 1.2,
    voiceover: 1.15,
    bonusPost: 1.1,
  };

  const calculatePrice = () => {
    if (followers > 0 && views > 0 && videoLength > 0 && numReels > 0) {
      const ratePerFollower = nicheRates[country]?.[niche] || 0.03;
      const ratePerView = ratePerFollower / 2;
      const basePrice = (followers * ratePerFollower + views * ratePerView) * (videoLength / 30) * numReels;
      const adjustedPrice = basePrice * (bonusRates[pricingType] || 1);
      setCalculatedPrice(Math.round(adjustedPrice));
    }
  };

  const generateEmail = () => {
    const emailTemplate = `
Subject: Collaboration Proposal: ${emailSubject}

Hi ${collabName || "[Collaborator Name]"},

I hope you're doing well! I’m reaching out to discuss a potential collaboration. I have ${followers} followers and my reels generally receive ${views} views. I create content in the "${niche}" niche.

I’d love to collaborate and help promote your brand effectively. My proposed rate for this collaboration is ₹${calculatedPrice} for ${numReels} reel(s).

Looking forward to your response!

Best regards,
${influencerName || "[Your Name]"}
    `;
    setEmailBody(emailTemplate);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(emailBody);
    alert("Email copied to clipboard!");
  };

  
    const [collabs, setCollabs] = useState([]);
    const [newCollab, setNewCollab] = useState({
      brand: "",
      deliverables: "",
      price: "",
      deadline: "",
      status: "Pending",
    });
  
    const handleChange = (e) => {
      setNewCollab({ ...newCollab, [e.target.name]: e.target.value });
    };
  
    const addCollab = () => {
      if (newCollab.brand && newCollab.deliverables && newCollab.price && newCollab.deadline) {
        setCollabs([...collabs, newCollab]);
        setNewCollab({
          brand: "",
          deliverables: "",
          price: "",
          deadline: "",
          status: "Pending",
        });
      }
    };
  
    const deleteCollab = (index) => {
      const updated = [...collabs];
      updated.splice(index, 1);
      setCollabs(updated);
    };




  return (
    <div className="p-6 space-y-10 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Collaboration Command Center </h1>
        <p className="text-sm">Plan smart, pitch like a pro, and track your earnings.</p>
      </div>

      {/* Price Calculator */}
      <div className="p-6 rounded-xl shadow border dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Advanced Reel Price Calculator</h2>
        <div className="grid gap-4">
          <label htmlFor="Followers" >Followers</label>
          <input type="number" placeholder="Followers" value={followers} onChange={(e) => setFollowers(+e.target.value)} className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="Avg views">Average Views </label>
          <input type="number" placeholder="Average Views per Reel" value={views} onChange={(e) => setViews(+e.target.value)} className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="niche">Niche</label>
          <select value={niche} onChange={(e) => setNiche(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option value="lifestyle">Lifestyle</option>
            <option value="fitness">Fitness</option>
            <option value="fashion">Fashion</option>
            <option value="tech">Tech</option>
            <option value="travel">Travel</option>
            <option value="education">Education</option>
          </select><label htmlFor="country">Country</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option value="India">India</option>
          </select>
          <label htmlFor="videolenght">Length</label>
          <input type="number" placeholder="Video Length (seconds)" value={videoLength} onChange={(e) => setVideoLength(+e.target.value)} className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="number of reels">Number of reels </label>
          <input type="number" placeholder="Number of Reels" value={numReels} onChange={(e) => setNumReels(+e.target.value)} className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="Pricingtype">Pricing type</label>
          <select value={pricingType} onChange={(e) => setPricingType(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option value="normal">Standard Reel</option>
            <option value="ugc">UGC</option>
            <option value="voiceover">Voiceover</option>
            <option value="bonusPost">Bonus Post</option>
          </select>
        </div>
        <button onClick={calculatePrice} className="mt-4 bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
          Estimate Price
        </button>
        {calculatedPrice > 0 && <p className="mt-2 text-lg font-semibold">Estimated Total Price: ₹{calculatedPrice}</p>}
      </div>

      {/* Earnings Chart */}
      <div className="p-6 rounded-xl shadow border dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4"> Monthly Earnings Tracker</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyEarnings}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div 
      className="p-6 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4"> Monthly Collab Tracker</h2>
      
      {/* Collab Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          name="brand"
          placeholder="Brand Name"
          value={newCollab.brand}
          onChange={handleChange}
          className="p-2 border rounded-xl"
        />
        <input
          type="text"
          name="deliverables"
          placeholder="Deliverables (e.g. 1 Reel, 2 Stories)"
          value={newCollab.deliverables}
          onChange={handleChange}
          className="p-2 border rounded-xl"
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={newCollab.price}
          onChange={handleChange}
          className="p-2 border rounded-xl"
        />
        <input
          type="date"
          name="deadline"
          value={newCollab.deadline}
          onChange={handleChange}
          className="p-2 border rounded-xl"
        />
        <select
          name="status"
          value={newCollab.status}
          onChange={handleChange}
          className="p-2 border rounded-xl"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        onClick={addCollab}
        className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
      >
         Add Collab
      </button>

      {/* Collab List */}
      <div className="mt-6">
        {collabs.length === 0 ? (
          <p className="text-gray-500 italic">No collabs added yet...</p>
        ) : (
          <div className="space-y-4">
            {collabs.map((collab, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-xl flex justify-between items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{collab.brand}</span>
                  <span className="text-sm text-gray-600">{collab.deliverables}</span>
                  <span className="text-sm"> ₹{collab.price}</span>
                  <span className="text-sm"> Deadline: {collab.deadline}</span>
                  <span className={`text-sm font-medium ${collab.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                    Status: {collab.status}
                  </span>
                </div>
                <button
                  onClick={() => deleteCollab(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
    <div className="p-6 rounded-xl shadow border dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Email Writer</h2>
        <div className="grid gap-2">
          <input type="text" placeholder="Your Name" value={influencerName} onChange={(e) => setInfluencerName(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Brand/Collaborator's Name" value={collabName} onChange={(e) => setCollabName(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Email Subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <button onClick={generateEmail} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Generate Email
          </button>
        </div>
        {emailBody && (
          <>
            <textarea value={emailBody} readOnly className="w-full mt-4 p-3 border rounded h-40 dark:bg-gray-700 dark:border-gray-600" />
            <button onClick={copyEmail} className="mt-2 bg-gray-700 text-white p-2 rounded hover:bg-gray-800 w-full">📋 Copy to Clipboard</button>
          </>
        )}
      </div>
      

      
    </div>

    
  );
};



