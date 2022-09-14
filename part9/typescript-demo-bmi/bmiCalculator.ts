// TypeScript's Interface object type keyword, which is one way to define the "shape" an object should have
interface BodyMassParams {
  heightInCm: number
  weightInKg: number
}

// the args has only 4 arguments because when we execute the script to run this, > ts-node bmiCalculator.ts "180" "91" , will be run which has 4 params
export const parseBmiArguments = (height: number, weight: number): BodyMassParams => {
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      heightInCm: height,
      weightInKg: weight,
    }
  } else {
    throw new Error('Provided values for height & mass were not numbers!')
  }
}

export const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  if (heightInCm == 0) throw new Error("Can't divide by 0!")

  const bmi = (weightInKg * 100 * 100) / (heightInCm * heightInCm)

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)'
  } else if (bmi > 16.0 && bmi < 16.9) {
    return 'Underweight (Moderate thinness)'
  } else if (bmi > 17.0 && bmi < 18.4) {
    return 'Underweight (Mild thinness)'
  } else if (bmi > 18.5 && bmi < 24.9) {
    return 'Normal (Healthy weight)'
  } else if (bmi > 25.0 && bmi < 29.9) {
    return 'Overweight (Pre-obese)'
  } else if (bmi > 30.0 && bmi < 34.9) {
    return 'Obese (Class I)'
  } else if (bmi > 35.0 && bmi < 39.9) {
    return 'Obese (Class II)'
  } else {
    return 'Obese (Class III)'
  }
}

try {
  // We can get the calculateBmi to work with command-line parameters using process.argv
  const { height, mass } = parseBmiArguments(process.argv)
  console.log(calculateBmi(height, mass))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
