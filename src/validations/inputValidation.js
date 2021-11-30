import * as yup from "yup";

export const schema = yup.object().shape({
	text: yup.string().required(),
});
