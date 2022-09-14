// TypeScript's Interface object type keyword, which is one way to define the "shape" an object should have
interface ExerciseParams {
  target: number;
  dailyTrainingHours: Array<number>;
}

// the args has only 4 arguments because when we execute the script to run this, > ts-node bmiCalculator.ts "180" "91" , will be run which has 4 params
export const parseExerciseArguments = (
  target: number,
  dailyExercises: Array<number>
): ExerciseParams => {
  // Array.prototype.some() - some() method allows us to establish if some (at least one) elements within an array meets a certain requirement.
  // It stops evaluating the array (short circuits) the first time it finds an element that does satisfy the given requirement
  if (!isNaN(target) && !dailyExercises.some(isNaN)) {
    return {
      target: target,
      dailyTrainingHours: dailyExercises,
    };
  } else {
    throw new Error(
      'Malformatted Parameters: Provided values for target & dailyTrainingHours were not number & Array of numbers'
    );
  }
};

// TypeScript's Interface object type keyword, which is one way to define the "shape" an object should have
interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  targetHoursValue: number,
  dailyExerciseHours: Array<number>
): ExercisesResult => {
  if (targetHoursValue < 1)
    throw new Error('original target exercise hours is below one!');

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hour) => hour > 0).length;
  const target = Number(targetHoursValue);
  const totalHours = dailyExerciseHours.reduce(
    (sum, currentHour) => sum + currentHour,
    0
  );
  const average = totalHours / periodLength;
  const success = average >= target ? true : false;

  let rating;
  let ratingDescription;
  if (average < target / 2) {
    rating = 1;
    ratingDescription =
      'You have failed to reach daily exercise hours, keep trying!';
  } else if (average > target) {
    rating = 3;
    ratingDescription =
      "Great going you've reached your daily exercises hours goal!";
  } else {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};
