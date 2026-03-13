import { z } from "zod";

type FieldConfig = {
  schema_id: number;
  primary_id: number;
  name: string;
  type: "string" | "number" | "boolean";
  required: number;
};

export const generateZodSchema = (fields: FieldConfig[]) => {
  const schemaShape: Record<string, any> = {};


  for (const field of fields) {
    let validator;

    switch (field.type) {
      case "string":
        validator = z.string();
        break;
      case "number":
        validator = z.number();
        break;
      case "boolean":
        validator = z.boolean();
        break;
      default:
        validator = z.any();
    }

    if (!field.required) {
      validator = validator.optional();
    }

    schemaShape[field.name] = validator;
  }


  

  return z.object(schemaShape)
};