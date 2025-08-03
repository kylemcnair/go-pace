interface PaceGuideProps {
  paceMinutes?: string;
  paceSeconds?: string;
  unit?: 'mile' | 'km';
}

export default function PaceGuide({ paceMinutes, paceSeconds, unit = 'mile' }: PaceGuideProps) {
  const pace = parseInt(paceMinutes || '0') * 60 + parseInt(paceSeconds || '0');
  
  if (!pace) return null;

  const getPaceGuidance = () => {
    const unitText = unit === 'mile' ? 'mile' : 'kilometer';
    
    if (pace < 300) { // Under 5:00
      return {
        level: "Elite/Competitive",
        description: `Your ${Math.floor(pace/60)}:${(pace%60).toString().padStart(2, '0')} per ${unitText} pace is in the elite range. This pace suggests you&apos;re a highly trained competitive runner.`,
        trainingTips: [
          "Focus on speed maintenance and injury prevention",
          "Include regular tempo runs and interval training",
          "Ensure adequate recovery between intense sessions"
        ]
      };
    } else if (pace < 420) { // 5:00-7:00
      return {
        level: "Advanced",
        description: `Your ${Math.floor(pace/60)}:${(pace%60).toString().padStart(2, '0')} per ${unitText} pace indicates advanced fitness. You&apos;re likely an experienced runner with consistent training.`,
        trainingTips: [
          "Mix tempo runs, intervals, and long runs for balanced training",
          "Consider incorporating hill training for strength",
          "Track weekly mileage and gradually increase volume"
        ]
      };
    } else if (pace < 540) { // 7:00-9:00
      return {
        level: "Intermediate",
        description: `Your ${Math.floor(pace/60)}:${(pace%60).toString().padStart(2, '0')} per ${unitText} pace shows solid running fitness. You&apos;re building endurance and speed effectively.`,
        trainingTips: [
          "Focus on building aerobic base with easy runs",
          "Add one tempo run per week for lactate threshold improvement",
          "Include one long run weekly to build endurance"
        ]
      };
    } else if (pace < 720) { // 9:00-12:00
      return {
        level: "Beginner to Intermediate",
        description: `Your ${Math.floor(pace/60)}:${(pace%60).toString().padStart(2, '0')} per ${unitText} pace is great for building your running foundation. Consistency is key at this stage.`,
        trainingTips: [
          "Run at a conversational pace most days",
          "Gradually increase weekly mileage by 10%",
          "Focus on time on feet rather than speed initially"
        ]
      };
    } else {
      return {
        level: "Beginner",
        description: `Your ${Math.floor(pace/60)}:${(pace%60).toString().padStart(2, '0')} per ${unitText} pace is perfect for starting your running journey. Every step is building your fitness.`,
        trainingTips: [
          "Start with walk-run intervals to build endurance",
          "Aim for 3-4 running sessions per week",
          "Focus on completing the distance, not the speed"
        ]
      };
    }
  };

  const guidance = getPaceGuidance();

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-2">Training Guidance - {guidance.level}</h3>
      <p className="text-gray-700 mb-3">{guidance.description}</p>
      <div>
        <h4 className="font-medium text-gray-800 mb-1">Training Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {guidance.trainingTips.map((tip, index) => (
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