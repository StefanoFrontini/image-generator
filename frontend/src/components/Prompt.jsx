import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  prompt: yup.string().required().min(1),
});

const Prompt = ({ prompt, setState }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div>
      <label
        htmlFor="prompt"
        className="block text-sm font-medium text-gray-700"
      >
        Start with a detailed description
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name="prompt"
          id="prompt"
          {...register("prompt")}
          value={prompt}
          onChange={(e) =>
            setState((state) => {
              return {
                ...state,
                prompt: e.target.value,
              };
            })
          }
          className="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          // placeholder="a pencil and watercolor drawing of a bright city in the future with flying cars"
          // defaultValue={prompt}
          aria-invalid="true"
          aria-describedby="email-error"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {errors.prompt?.message}
      </p>
    </div>
  );
};

export default Prompt;
