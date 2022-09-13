interface ExercisesResult {
  periodLength: number,
  trainingDays: number, 
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calculateExercises = (targetHoursValue: number, dailyExerciseHours: Array<number>): ExercisesResult => {
  if(targetHoursValue < 1) throw new Error('original taget exercise hours is below zero!');

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hour => hour > 0).length;
  const target = Number(targetHoursValue);
  const totalHours = dailyExerciseHours.reduce((sum, currentHour) => sum + currentHour, 0);
  const average = totalHours / periodLength;
  const success = (average >= target) ? true : false;

  let rating;
  let ratingDescription;
  if(average < (target / 3)) {
    rating = 1;
    ratingDescription = 'You have failed to reach daily exercise hours, keep trying!';
  } else if (average > target) {
    rating = 3;
    ratingDescription = 'Great going you\'ve reached your daily exercises hours goal!';
  } else {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  }

  console.log({
    periodLength: periodLength,
    trainingDays: trainingDays, 
    success: success,
    rating: rating,
    ratingDescription: ratingDescription, 
    target: target,
    average: average,
  })

  return {
    periodLength: periodLength,
    trainingDays: trainingDays, 
    success: success,
    rating: rating,
    ratingDescription: ratingDescription, 
    target: target,
    average: average,
  };
}

try {
  calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]);
