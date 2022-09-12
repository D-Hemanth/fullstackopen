const calculateBmi = (height: number, mass: number): string => {
  if (height == 0) throw new Error("Can't divide by 0!")

  const bmi = (mass * 100 * 100) / (height * height)

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
  console.log(calculateBmi(180, 74))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
