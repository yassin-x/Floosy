import { InputTypes } from "@/constants/enums";
import { IFormField, ValidationErrors } from "@/types/app";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import TextareaField from "./TextareaField";
import SelectMenu from "./SelectMenu";

interface Props extends IFormField {
  error: ValidationErrors;
}

const FormFields = (props: Props) => {
  const { type } = props;
  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextField {...props} />;
    }

    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }
    if (type === InputTypes.TEXTAREA) {
      return <TextareaField {...props} />;
    }
    if (type === InputTypes.SELECT) {
      return <SelectMenu {...props} />;
    }

    return <TextField {...props} />;
  };

  return <>{renderField()}</>;
};

export default FormFields;
