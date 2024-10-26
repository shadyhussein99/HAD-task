import * as yup from "yup";

export const validationSchema = yup.object().shape({
    title: yup.string().required(" Exam Title is required"),
    description: yup.string().optional(),
    questions: yup
      .array()
      .of(
        yup.object().shape({
          title: yup.string().required("Question title is required"),
          description: yup.string().optional(),
          answers: yup
            .array()
            .of(
              yup.object().shape({
                title: yup.string().required("Answer is required"),
                isCorrect: yup.boolean().required(),
                description: yup.string().optional(),
              })
            )
            .min(2, "At least two answers are required"),
        })
      )
      .min(1, "At least one question required"),
  });