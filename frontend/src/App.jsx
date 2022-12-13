import Loading from "./components/Loading";
import Form from "./components/Form";
import Images from "./components/Images";
import Header from "./components/Header";
import { useFetch } from "./components/useFetch";
import Alert from "./components/Alert";
import { useState } from "react";

const App = () => {
  const { loading, data, generateImageRequest, error } = useFetch();
  const [promptSubmit, setPromptSubmit] = useState(null);
  return (
    <>
      {error && <Alert error={error} />}
      <Header />
      <Form
        setPromptSubmit={setPromptSubmit}
        generateImageRequest={generateImageRequest}
      />
      {/* <form> */}
      {/* <Prompt prompt={state.prompt} setState={setState} /> */}
      {/**/}
      {/* <SelectInput */}
      {/*   property="n" */}
      {/*   selectedValue={state.n} */}
      {/*   label={labelNumber} */}
      {/*   setState={setState} */}
      {/*   options={optionsNumber} */}
      {/* /> */}
      {/* <SelectInput */}
      {/*   property="size" */}
      {/*   selectedValue={state.size} */}
      {/*   label={labelSize} */}
      {/*   setState={setState} */}
      {/*   options={optionsSize} */}
      {/* /> */}
      {/* <Button generateImageRequest={generateImageRequest} state={state} /> */}

      {/*</form>*/}
      <Images loading={loading} data={data} promptSubmit={promptSubmit} />
    </>
  );
};

export default App;
