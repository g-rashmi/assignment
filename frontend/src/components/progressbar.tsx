
interface progres{
currentDay:number, 
goal:number
}
const ProgressBar = ({ currentDay, goal }:progres) => {
  const progressPercentage = (currentDay / goal) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full h-4.5">
      <div className="h-4 rounded-full" style={{ width: `${progressPercentage}%` ,backgroundColor:"#9164FF"}}>  
      </div>
    </div>
  );
};

export default ProgressBar;