interface RaceTimeGuideProps {
  timeHours?: string;
  timeMinutes?: string;
  timeSeconds?: string;
  distance?: string;
}

export default function RaceTimeGuide({ timeHours, timeMinutes, timeSeconds, distance }: RaceTimeGuideProps) {
  const totalSeconds = parseInt(timeHours || '0') * 3600 + parseInt(timeMinutes || '0') * 60 + parseInt(timeSeconds || '0');
  
  if (!totalSeconds || !distance) return null;

  const getTimeGuidance = () => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const timeString = hours > 0 
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Time ranges based on common race performance levels
    const getGuidanceByDistance = () => {
      switch (distance.toLowerCase()) {
        case '5k':
          if (totalSeconds < 900) return { level: "Elite", color: "bg-purple-50", tips: ["Focus on speed maintenance", "Track and field experience shows"] };
          if (totalSeconds < 1200) return { level: "Competitive", color: "bg-blue-50", tips: ["Strong aerobic base", "Regular interval training"] };
          if (totalSeconds < 1500) return { level: "Good", color: "bg-green-50", tips: ["Solid fitness level", "Room for speed improvement"] };
          if (totalSeconds < 1800) return { level: "Average", color: "bg-yellow-50", tips: ["Building endurance", "Focus on consistency"] };
          return { level: "Beginner", color: "bg-gray-50", tips: ["Great starting point", "Focus on completing the distance"] };
        
        case '10k':
          if (totalSeconds < 1800) return { level: "Elite", color: "bg-purple-50", tips: ["Olympic-level performance", "Professional training required"] };
          if (totalSeconds < 2400) return { level: "Competitive", color: "bg-blue-50", tips: ["Club-level racing", "Structured training plan"] };
          if (totalSeconds < 3000) return { level: "Good", color: "bg-green-50", tips: ["Strong recreational runner", "Regular training shows"] };
          if (totalSeconds < 3600) return { level: "Average", color: "bg-yellow-50", tips: ["Building endurance", "Consistent effort pays off"] };
          return { level: "Beginner", color: "bg-gray-50", tips: ["Excellent goal achievement", "Focus on gradual improvement"] };
        
        case 'half marathon':
          if (totalSeconds < 4200) return { level: "Elite", color: "bg-purple-50", tips: ["Professional-level fitness", "Years of dedicated training"] };
          if (totalSeconds < 5400) return { level: "Competitive", color: "bg-blue-50", tips: ["Excellent club runner", "High weekly mileage"] };
          if (totalSeconds < 6600) return { level: "Good", color: "bg-green-50", tips: ["Strong recreational athlete", "Consistent training base"] };
          if (totalSeconds < 7800) return { level: "Average", color: "bg-yellow-50", tips: ["Solid endurance", "Room for improvement with training"] };
          return { level: "Beginner", color: "bg-gray-50", tips: ["Great accomplishment", "Focus on building mileage gradually"] };
        
        case 'marathon':
          if (totalSeconds < 9000) return { level: "Elite", color: "bg-purple-50", tips: ["World-class performance", "Elite athlete training"] };
          if (totalSeconds < 10800) return { level: "Competitive", color: "bg-blue-50", tips: ["Boston qualifier level", "Serious training commitment"] };
          if (totalSeconds < 12600) return { level: "Good", color: "bg-green-50", tips: ["Strong recreational marathoner", "Excellent endurance base"] };
          if (totalSeconds < 15600) return { level: "Average", color: "bg-yellow-50", tips: ["Solid marathon performance", "Consistent training shows"] };
          return { level: "Beginner", color: "bg-gray-50", tips: ["Amazing achievement", "26.2 miles is no small feat"] };
        
        default:
          return { level: "Good", color: "bg-blue-50", tips: ["Solid performance", "Keep up the training"] };
      }
    };

    const guidance = getGuidanceByDistance();

    return {
      timeString,
      ...guidance,
      description: `Your ${timeString} ${distance} goal represents ${guidance.level.toLowerCase()} performance level.`
    };
  };

  const guidance = getTimeGuidance();

  return (
    <div className={`mt-6 p-4 ${guidance.color} rounded-lg`}>
      <h3 className="font-semibold text-gray-800 mb-2">Race Performance Analysis - {guidance.level}</h3>
      <p className="text-gray-700 mb-3">{guidance.description}</p>
      <div>
        <h4 className="font-medium text-gray-800 mb-1">Training Focus:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {guidance.tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}