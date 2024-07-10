import  { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wallet } from "lucide-react";
import { Button } from "./ui/button";
import ProgressBar from "./progressbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ChallengeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [day, setDay] = useState(1);
  const [tokens, setTokens] = useState(500);
  const [goal, setGoal] = useState(3);
  const [tune, setTune] = useState(false);
  const [total, setTotal] = useState(4000);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://assignment-i4ip.onrender.com/user/${id}`);
        const userData = response.data;
        setDay(userData.day);
        setGoal(userData.goal);
        setTotal(userData.tokens);
        setTokens(userData.day < 4 ? 500 : 1000); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.post(
          `https://assignment-i4ip.onrender.com/user/:${id}/tune`,
          { tune }
        );
        const userData = response.data;
        setDay(userData.day);
        setTokens(userData.day < 4 ? 500 : 1000); 
        setGoal(userData.goal);
      
        
      } catch (error) {
        console.error("Error updating tune status:", error);
      }
    }, 86400000); 
    return () => clearInterval(interval);
  }, [id]);

  const handleCreateTune = () => {
    setTune(true);
    toast.success("Wow tune created!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="mt-5 flex justify-center gap-3 flex-wrap">
        <Card className="max-w-sm bg-black text-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Compose Daily and Win Tokens!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Challenge yourself to create a new tune each day! Earn 500 tokens
              after 3 days and an extra 1000 tokens after 7 days. Stay creative
              and keep composing to unlock your rewards!
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="flex items-center">
                <Wallet
                  className="mr-2 h-7 w-7"
                  onClick={() => navigate(`/tokens/${total}`)}
                />
                Day {day} of {goal} ({tokens} Tokens)
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar currentDay={day} goal={goal} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 text-center">
        <Button variant="outline" onClick={handleCreateTune}>
          Create Tune
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCard;
