import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { IncomeType, PaymentType } from "@prisma/client";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const signInFields = (reback: string): IFormField[] => [
    {
      label: "البريد الالكتروني",
      name: "email",
      type: "email",
      autoFocus: true,
      required: true,
      placeholder: "floosy@example.com",
    },
    {
      label: "كلمه المرور",
      name: "password",
      type: "password",
      required: true,
      placeholder: "********",
    },
  ];

  const signUpFields = (reback: string): IFormField[] => [
    {
      label: "البريد الالكتروني",
      name: "email",
      type: "email",
      autoFocus: true,
      required: true,
      placeholder: "floosy@example.com",
    },
    {
      label: "كلمه المرور",
      name: "password",
      type: "password",
      required: true,
      placeholder: "********",
    },
    {
      label: "تأكيد كلمه المرور",
      name: "confirmPassword",
      type: "password",
      required: true,
      placeholder: "********",
    },
    {
      label: "اسم المستخدم",
      name: "username",
      type: "text",
      required: true,
      placeholder: "فلوسي",
    },
  ];

  const expenseFields = (userId: string): IFormField[] => [
    {
      label: "المستخدم",
      name: "userId",
      type: "text",
      readOnly: true,
      defaultValue: userId,
    },
    {
      label: "المبلغ",
      name: "amount",
      type: "number",
      autoFocus: true,
      required: true,
      placeholder: "100",
    },
    {
      label: "وصف",
      name: "description",
      type: "text",
      required: false,
      placeholder: "وصف",
    },
    {
      label: "نوع الدفع",
      name: "paymentType",
      type: "select",
      required: true,
      placeholder: "اختر نوع الدفع",
      options: [
        { label: "كاش", value: PaymentType.Cash },
        { label: "بنك", value: PaymentType.Bank },
        { label: "المحفظة", value: PaymentType.Wallet },
      ],
    },
  ];

  const incomeFields = (userId: string): IFormField[] => [
    {
      label: "المستخدم",
      name: "userId",
      type: "text",
      readOnly: true,
      defaultValue: userId,
    },
    {
      label: "المبلغ",
      name: "amount",
      type: "number",
      autoFocus: true,
      required: true,
      placeholder: "100",
    },
    {
      label: "وصف",
      name: "description",
      type: "text",
      required: false,
      placeholder: "وصف",
    },
    {
      label: "المصدر",
      name: "source",
      type: "select",
      required: true,
      placeholder: "اختر مصدر الدخل",
      options: [
        { label: "الراتب", value: IncomeType.Salary },
        { label: "عمل حر", value: IncomeType.Business },
        { label: "هدية", value: IncomeType.Gift },
        { label: "أخرى", value: IncomeType.Other },
      ],
    },
  ];

  const getFormFields = (userId: string): IFormField[] => {
    switch (slug) {
      case Pages.Signin:
        return signInFields();
      case Pages.Signup:
        return signUpFields();
      case Pages.Expense:
        return expenseFields(userId);
      case Pages.Income:
        return incomeFields(userId);
      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
