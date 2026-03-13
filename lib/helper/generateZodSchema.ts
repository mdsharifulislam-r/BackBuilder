import { z } from "zod";

type FieldConfig = {
  schema_id: number;
  primary_id: number;
  name: string;
  type: "string" | "integer" | "boolean" | "float" | "null";
  required: number;
};

export const generateZodSchema = (fields: FieldConfig[]) => {
  const schemaShape: Record<string, any> = {};


  for (const field of fields) {
    let validator;

    switch (field.type) {
      case "string":
        validator = z.string({required_error:`${field.name} is required`});
        break;
      case "integer":
        validator = z.number({required_error:`${field.name} is required`});
        break;
    case "float":
        validator = z.number({required_error:`${field.name} is required`});
        break;
      case "boolean":
        validator = z.boolean({required_error:`${field.name} is required`});
        break;
      default:
        validator = z.any({required_error:`${field.name} is required`});
        break;
    }

    if (!field.required) {
      validator = validator.optional();
    }

    schemaShape[field.name] = validator;
  }


  

  return z.object(schemaShape)
};