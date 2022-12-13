import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { optionsNumber } from "./optionsNumber";
import { optionsSize } from "./optionsSize";
import { surpriseMe } from "./surpriseMe";
import {
  ExclamationCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { useSpring, animated } from "@react-spring/web";
const schema = z.object({
  prompt: z.string().min(1, { message: "Description is required" }),
  imagesNumber: z.number(),
  imagesSize: z.string(),
  // peopleId: z.number(),
});
const randomItem = surpriseMe[Math.floor(Math.random() * surpriseMe.length)];
const Form = ({ generateImageRequest, setPromptSubmit }) => {
  const { setValue, register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      prompt: randomItem,
      imagesNumber: 1,
      imagesSize: "small",
      peopleId: 1,
    },
    mode: "all",
    resolver: zodResolver(schema),
  });
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: 1 },
    config: { duration: 3000 },
  });
  const [randomInput, setRandomInput] = useState(randomItem);
  const handleNext = (sentence) => {
    const index = surpriseMe.indexOf(sentence);
    const nextIndex = (index + 1) % surpriseMe.length;
    setRandomInput(surpriseMe[nextIndex]);
    return surpriseMe[nextIndex];
  };

  const { field: fieldNumber } = useController({
    name: "imagesNumber",
    control,
  });

  const { field: fieldSize } = useController({ name: "imagesSize", control });

  // const { field: fieldPeople } = useController({ name: "peopleId", control });
  //
  // const handleSelectPeople = (option) => {
  //   fieldPeople.onChange(option.value);
  // };

  const handleSave = (formValues) => {
    setPromptSubmit(formValues.prompt);
    generateImageRequest(
      formValues.prompt,
      formValues.imagesSize,
      formValues.imagesNumber
    );
  };
  const handleSelectNumber = (option) => {
    fieldNumber.onChange(option.value);
  };

  const handleSelectSize = (option) => {
    fieldSize.onChange(option.value);
  };

  const { errors } = formState;

  const findNumberLabel = (id) => {
    const found = optionsNumber.find((el) => el.value === id);
    return found.label;
  };
  const findSizeLabel = (id) => {
    const found = optionsSize.find((el) => el.value === id);
    return found.label;
  };

  return (
    <form
      className="max-w-7xl mx-auto px-10"
      onSubmit={handleSubmit(handleSave)}
    >
      <div className="flex items-center">
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-gray-700 mr-2"
        >
          Start with a detailed description
        </label>
        <button
          type="button"
          onClick={() => setValue("prompt", handleNext(randomInput))}
          className="inline-flex items-center rounded border border-transparent bg-violet-100 px-2.5 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          Surprise me
        </button>
      </div>
      <div className="relative mt-1 rounded-md shadow-sm">
        <textarea
          {...register("prompt")}
          type="text"
          id="prompt"
          className={`h-24 md:h-20 lg:h-10 block w-full rounded-md  shadow-sm  sm:text-sm ${
            errors.prompt
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-violet-500  focus:ring-violet-500 "
          } resize-none `}
        />
        {errors.prompt && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-red-600" id="prompt-error">
        {errors.prompt?.message}
      </p>

      {/* <div> */}
      {/*   <label */}
      {/*     // htmlFor={label} */}
      {/*     className="block text-sm font-medium text-gray-700" */}
      {/*   > */}
      {/*     Number of Images */}
      {/*   </label> */}
      {/*   <Select */}
      {/*     value={optionsNumber.find(({ value }) => value === fieldNumber.value)} */}
      {/*     onChange={handleSelectNumber} */}
      {/*     options={optionsNumber} */}
      {/*     className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" */}
      {/*   /> */}
      {/* </div> */}
      {/* <p className="mt-2 text-sm text-red-600"> */}
      {/*   {errors.imagesNumber?.message} */}
      {/* </p> */}
      {/**/}
      {/* <div> */}
      {/*   <label */}
      {/*     // htmlFor={label} */}
      {/*     className="block text-sm font-medium text-gray-700" */}
      {/*   > */}
      {/*     Image size */}
      {/*   </label> */}
      {/*   <Select */}
      {/*     value={optionsSize.find(({ value }) => value === fieldSize.value)} */}
      {/*     onChange={handleSelectSize} */}
      {/*     options={optionsSize} */}
      {/*     className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" */}
      {/*   /> */}
      {/* </div> */}
      {/* <p className="mt-2 text-sm text-red-600">{errors.imagesSize?.message}</p> */}
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <Listbox
            value={optionsNumber.find(
              ({ value }) => value === fieldNumber.value
            )}
            onChange={handleSelectNumber}
          >
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700 mt-4">
                  Number of images
                </Listbox.Label>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:text-sm">
                    <span className="block truncate">
                      {findNumberLabel(fieldNumber.value)}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {optionsNumber.map((person) => (
                        <Listbox.Option
                          key={person.value}
                          className={({ active }) =>
                            ` ${
                              active
                                ? "text-white bg-violet-600"
                                : "text-gray-900"
                            } relative cursor-default select-none py-2 pl-3 pr-9
                   `
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`
                            ${selected ? "font-semibold" : "font-normal"}
                             block truncate
                          `}
                              >
                                {person.label}
                              </span>

                              {selected && (
                                <span
                                  className={`
                              ${active ? "text-white" : "text-violet-600"}
                               absolute inset-y-0 right-0 flex items-center pr-4
                           `}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <p className="mt-2 text-sm text-red-600">
            {errors.imagesNumber?.message}
          </p>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Listbox
            value={optionsSize.find(({ value }) => value === fieldSize.value)}
            onChange={handleSelectSize}
          >
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700 mt-4">
                  Image size
                </Listbox.Label>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:text-sm">
                    <span className="block truncate">
                      {findSizeLabel(fieldSize.value)}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {optionsSize.map((person) => (
                        <Listbox.Option
                          key={person.value}
                          className={({ active }) =>
                            ` ${
                              active
                                ? "text-white bg-violet-600"
                                : "text-gray-900"
                            } relative cursor-default select-none py-2 pl-3 pr-9
                   `
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`
                            ${selected ? "font-semibold" : "font-normal"}
                             block truncate
                          `}
                              >
                                {person.label}
                              </span>

                              {selected && (
                                <span
                                  className={`
                              ${active ? "text-white" : "text-violet-600"}
                               absolute inset-y-0 right-0 flex items-center pr-4
                           `}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <p className="mt-2 text-sm text-red-600">
            {errors.imagesSize?.message}
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <animated.button
          // onClick={() => generateImageRequest(state.prompt, state.size, state.n)}
          type="submit"
          disabled={errors.prompt}
          style={{
            opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
            scale: x.to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
          }}
          className="inline-flex items-center rounded-md border border-transparent bg-violet-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-30"
        >
          Generate
        </animated.button>
      </div>
    </form>
  );
};
export default Form;
