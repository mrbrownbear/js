import { useEffect } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

// Dynamically import react-select without SSR
const Select = dynamic(() => import("react-select"), { ssr: false });

// Simple fetcher to get models from /api/engines
const fetchModels = () => fetch("/api/engines").then((res) => res.json());

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR("models", fetchModels);

  // store the selected model in SWR; fallbackData is initially empty
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "",
  });

  // Once models are loaded, auto-select the first one if we have no current model
  useEffect(() => {
    if (!isLoading && models?.modelOptions?.length && !model) {
      setModel(models.modelOptions[0].value);
    }
  }, [models, isLoading, model, setModel]);

  return (
    <Select
      isSearchable
      isLoading={isLoading}
      menuPosition="fixed"
      options={models?.modelOptions}
      // Make the select controlled by picking the option that matches "model"
      value={models?.modelOptions?.find((option : any) => option.value === model) || null}
      placeholder={model || "Select a model"}
      className="text-black placeholder:text-white w-full"
      onChange={(selectedOption : any) => setModel(selectedOption.value)}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "blue" : "#ffffff50",
          backgroundColor: "transparent",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "#ffffff",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
      }}
    />
  );
};

export default ModelSelection;
